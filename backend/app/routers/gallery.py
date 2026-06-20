import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List, Dict, Any

from app.database import get_db
from app.models import GalleryItem, ProjectSubmission, User, AppreciationLog, ProjectTask, Pertemuan, Room
from app.routers.auth import get_current_user

router = APIRouter(prefix="/gallery", tags=["gallery"])

# Router GET: List all published gallery creations
@router.get("")
async def list_gallery_items(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(GalleryItem)
        .options(
            selectinload(GalleryItem.submission).selectinload(ProjectSubmission.siswa),
            selectinload(GalleryItem.submission)
            .selectinload(ProjectSubmission.task)
            .selectinload(ProjectTask.pertemuan)
            .selectinload(Pertemuan.room)
        )
    )
    items = result.scalars().all()
    
    # Format response nicely
    formatted = []
    for item in items:
        sub = item.submission
        room = sub.task.pertemuan.room if sub.task and sub.task.pertemuan else None
        formatted.append({
            "id": item.id,
            "title": sub.task.judul,
            "student_name": sub.siswa.name,
            "ast": sub.final_ast_json,
            "appreciations": item.appreciation_count,
            "published_at": item.published_at,
            "room_id": room.id if room else None,
            "room_name": room.name if room else None
        })
        
    return formatted

# Router POST: Appreciate / Like gallery creation
@router.post("/{item_id}/appreciate")
async def appreciate_gallery_item(
    item_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(GalleryItem).where(GalleryItem.id == item_id))
    item = result.scalars().first()
    if not item:
        raise HTTPException(status_code=404, detail="Karya galeri tidak ditemukan.")

    # Check if user already appreciated this item
    log_check = await db.execute(
        select(AppreciationLog).where(
            AppreciationLog.siswa_id == current_user.id,
            AppreciationLog.gallery_item_id == item_id
        )
    )
    if log_check.scalars().first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Kamu sudah memberikan apresiasi untuk karya ini!"
        )

    # Record appreciation log
    new_log = AppreciationLog(
        id=str(uuid.uuid4()),
        siswa_id=current_user.id,
        gallery_item_id=item_id
    )
    db.add(new_log)
    item.appreciation_count += 1
    await db.flush()
    return {"item_id": item_id, "appreciations": item.appreciation_count}
