import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List, Dict, Any
from pydantic import BaseModel

from app.database import get_db
from app.models import LearningSubmission, ProjectSubmission, User, LearningTask, ProjectTask, GalleryItem, Room, Pertemuan
from app.schemas import LearningSubmissionCreate, ProjectSubmissionCreate
from app.routers.auth import get_current_user

class ProjectGradeInput(BaseModel):
    teacher_score: int
    teacher_comment: str
    rubrik_scores: Dict[str, int]
    is_published_to_gallery: bool

router = APIRouter(prefix="/submissions", tags=["submissions"])

# Helper to calculate process efficiency score based on attempts count
def calculate_efficiency_score(attempts: int) -> int:
    if attempts <= 1:
        return 100
    elif attempts == 2:
        return 90
    elif attempts == 3:
        return 80
    elif attempts == 4:
        return 70
    else:
        return 60

# Router POST: Submit Learning Task attempts and reflections
@router.post("/learning", status_code=status.HTTP_201_CREATED)
async def submit_learning_task(
    submission: LearningSubmissionCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Verify task exists
    task_res = await db.execute(select(LearningTask).where(LearningTask.id == submission.task_id))
    if not task_res.scalars().first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tugas belajar (learning task) tidak ditemukan.")

    # Process metrics
    efficiency = calculate_efficiency_score(submission.attempt_count)
    
    # Check if final snapshot has errors
    final_errors = []
    if submission.ast_snapshots:
        final_errors = submission.ast_snapshots[-1].get("errors", [])
    
    accuracy = 100 if not final_errors else max(0, 100 - (len(final_errors) * 15))
    final_score = int((accuracy + efficiency) / 2)

    new_sub = LearningSubmission(
        id=str(uuid.uuid4()),
        task_id=submission.task_id,
        siswa_id=current_user.id,
        ast_snapshots_json=submission.ast_snapshots,
        attempt_count=submission.attempt_count,
        final_score=final_score,
        accuracy_score=accuracy,
        efficiency_score=efficiency,
        ct_session_id=submission.ct_session_id,
        reflection_answers_json=submission.reflection_answers,
        # Default mock CT scores, updated later by CT Session Analyzer
        ct_post_score_json={
            "decomposition": 85,
            "pattern_recognition": 80,
            "abstraction": 85,
            "algorithm_design": 82
        }
    )
    
    db.add(new_sub)
    await db.flush()
    return {
        "submission_id": new_sub.id,
        "final_score": final_score,
        "accuracy": accuracy,
        "efficiency": efficiency
    }

# Router POST: Submit Project Task
@router.post("/project", status_code=status.HTTP_201_CREATED)
async def submit_project_task(
    submission: ProjectSubmissionCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Verify task exists
    task_res = await db.execute(select(ProjectTask).where(ProjectTask.id == submission.task_id))
    if not task_res.scalars().first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tantangan proyek (project task) tidak ditemukan.")

    # AI Mock suggestion for grading rubrics
    mock_ai_suggestion = {
        "suggested_scores": {
            "Kelengkapan elemen": 90,
            "Kebenaran semantik": 85,
            "Kreativitas desain": 80,
            "Kesesuaian challenge": 95
        },
        "analysis": "Karya siswa tersusun rapi. Tag-tag HTML dasar berada lengkap di dalam body. Penulisan style CSS neo-brutalism kreatif."
    }

    new_sub = ProjectSubmission(
        id=str(uuid.uuid4()),
        task_id=submission.task_id,
        siswa_id=current_user.id,
        final_ast_json=submission.final_ast,
        ct_session_id=submission.ct_session_id,
        ai_suggestion_json=mock_ai_suggestion,
        is_published_to_gallery=False
    )
    
    db.add(new_sub)
    await db.flush()
    return {
        "submission_id": new_sub.id,
        "status": "submitted",
        "message": "Proyek berhasil dikirim! Menunggu evaluasi guru."
    }

# Router GET: List student submissions for a learning task
@router.get("/learning/task/{task_id}")
async def list_learning_submissions(
    task_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(LearningSubmission)
        .where(
            LearningSubmission.task_id == task_id,
            LearningSubmission.siswa_id == current_user.id
        )
    )
    return result.scalars().all()

# Router GET: List all submissions for a project task (Guru only)
@router.get("/project/task/{task_id}")
async def list_project_submissions(
    task_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.role != "guru":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Akses ditolak.")
        
    result = await db.execute(
        select(ProjectSubmission)
        .options(selectinload(ProjectSubmission.siswa))
        .where(ProjectSubmission.task_id == task_id)
    )
    return result.scalars().all()

# Router GET: List all project submissions across all rooms managed by Guru
@router.get("/project")
async def list_all_project_submissions_for_guru(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.role != "guru":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Akses ditolak.")
    
    # Select project submissions in rooms created by this guru
    result = await db.execute(
        select(ProjectSubmission)
        .join(ProjectTask, ProjectSubmission.task_id == ProjectTask.id)
        .join(Pertemuan, ProjectTask.pertemuan_id == Pertemuan.id)
        .join(Room, Pertemuan.room_id == Room.id)
        .where(Room.guru_id == current_user.id)
        .options(
            selectinload(ProjectSubmission.siswa),
            selectinload(ProjectSubmission.task).selectinload(ProjectTask.pertemuan)
        )
    )
    submissions = result.scalars().all()
    
    formatted = []
    for sub in submissions:
        formatted.append({
            "id": sub.id,
            "task_id": sub.task_id,
            "task_title": sub.task.judul,
            "room_id": sub.task.pertemuan.room_id,
            "siswa_id": sub.siswa_id,
            "student_name": sub.siswa.name,
            "final_ast": sub.final_ast_json,
            "ai_suggestion": sub.ai_suggestion_json,
            "teacher_score": sub.teacher_score,
            "teacher_comment": sub.teacher_comment,
            "rubrik_scores": sub.rubrik_scores_json,
            "is_published_to_gallery": sub.is_published_to_gallery,
            "submitted_at": sub.submitted_at
        })
    return formatted

# Router GET: List all learning submissions for the current logged in user (Siswa)
@router.get("/learning/me")
async def list_my_learning_submissions(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(LearningSubmission)
        .options(selectinload(LearningSubmission.task))
        .where(LearningSubmission.siswa_id == current_user.id)
    )
    submissions = result.scalars().all()
    
    formatted = []
    for sub in submissions:
        date_str = sub.submitted_at.strftime("%Y-%m-%d %H:%M") if sub.submitted_at else "-"
        
        feedback_tags = []
        if sub.final_score >= 85:
            feedback_tags.append("Sangat Baik")
        elif sub.final_score >= 70:
            feedback_tags.append("Baik")
        else:
            feedback_tags.append("Perlu Latihan")
            
        formatted.append({
            "id": sub.id,
            "levelTitle": sub.task.judul if sub.task else "Misi Belajar",
            "date": date_str,
            "accuracy": sub.accuracy_score,
            "attempts": sub.attempt_count,
            "ctScore": sub.final_score,
            "feedbackTags": feedback_tags,
            "teacherComment": "Kerja bagus! Terus asah logika pemrogramanmu." if sub.final_score >= 80 else "Tetap semangat dan terus berlatih!"
        })
        
    return formatted

# Router GET: List all project submissions for the current logged in user (Siswa)
@router.get("/project/me")
async def list_my_project_submissions(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(ProjectSubmission)
        .options(selectinload(ProjectSubmission.task))
        .where(ProjectSubmission.siswa_id == current_user.id)
    )
    submissions = result.scalars().all()
    
    formatted = []
    for sub in submissions:
        formatted.append({
            "id": sub.id,
            "task_title": sub.task.judul if sub.task else "Proyek Kreatif",
            "teacher_score": sub.teacher_score,
            "teacher_comment": sub.teacher_comment,
            "is_published_to_gallery": sub.is_published_to_gallery,
            "submitted_at": sub.submitted_at
        })
    return formatted


# Router PUT: Grade project submission (Guru only)
@router.put("/project/{submission_id}/grade")
async def grade_project_submission(
    submission_id: str,
    grade_input: ProjectGradeInput,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.role != "guru":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Akses ditolak. Hanya guru yang dapat menilai.")

    # Find project submission
    result = await db.execute(select(ProjectSubmission).where(ProjectSubmission.id == submission_id))
    submission = result.scalars().first()
    if not submission:
        raise HTTPException(status_code=404, detail="Submission proyek tidak ditemukan.")

    # Update scores & comments
    submission.teacher_score = grade_input.teacher_score
    submission.teacher_comment = grade_input.teacher_comment
    submission.rubrik_scores_json = grade_input.rubrik_scores
    submission.is_published_to_gallery = grade_input.is_published_to_gallery
    
    # Manage gallery publishing
    gal_res = await db.execute(select(GalleryItem).where(GalleryItem.project_submission_id == submission_id))
    gallery_item = gal_res.scalars().first()

    if grade_input.is_published_to_gallery:
        if not gallery_item:
            # Create a new gallery item
            new_item = GalleryItem(
                id=str(uuid.uuid4()),
                project_submission_id=submission_id,
                appreciation_count=0
            )
            db.add(new_item)
    else:
        if gallery_item:
            # Delete the gallery item
            await db.delete(gallery_item)

    await db.flush()
    return {"message": "Submission berhasil dinilai!", "submission_id": submission_id}
