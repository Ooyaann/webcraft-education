# BLUEPRINT WEBCRAFT 2.0
## Platform Pengembangan Computational Thinking melalui Web Development
*Sintesis Analisis v1 + v2 + Perspektif GPT — Arsitektur: Vite + React*
*Nayotama Aryaputra Santosa — Juni 2026*

---

## REPOSITIONING INTI

### Dari Platform Coding → Platform CT

Pertanyaan paling tajam dari juri PKM atau dosen pembimbing bukan:

> *"Kenapa cuma HTML dan CSS?"*

Tapi:

> *"Apa yang membuat WebCraft berbeda dari Scratch, Code.org, atau W3Schools?"*

Jawabannya harus ada dan kuat. Inilah repositioning WebCraft:

```
WebCraft bukan platform belajar coding.

WebCraft adalah platform yang mengukur, melatih, dan meningkatkan
Computational Thinking siswa — menggunakan Web Development sebagai medianya.

HTML/CSS → alat
Challenge → media
AI       → pendamping
CT       → produk utamanya
```

Ini mengubah segala sesuatunya. Bukan hanya fitur, tapi cara sistem berpikir tentang setiap interaksi siswa.

---

## ANALISIS GAP KRITIS (Gabungan Temuan)

| Gap | Kondisi Sekarang | Yang Dibutuhkan |
|-----|-----------------|-----------------|
| **Gap 1: Mesin Berpikir** | Siswa langsung coding | Ada fase berpikir sebelum coding (CT Journey) |
| **Gap 2: Definisi CBL** | Level = latihan, bukan challenge nyata | Big Idea → Question → Challenge → Investigate → Act → Reflect |
| **Gap 3: Dimensi Penilaian** | Benar/Salah | Process Score + Product Score + CT Score |
| **Gap 4: Adaptivitas** | Semua siswa materi sama | Jalur berbeda berdasarkan CT profile |
| **Gap 5: Visibilitas Guru** | Guru tidak tahu apa-apa | Heatmap kesalahan + AI Teacher Assistant |
| **Gap 6: Rekam Jejak CT** | Tidak ada | CT Map 4 dimensi per siswa per waktu |

---

## KONSEP BARU: CT JOURNEY (PRE-CODING PHASE)

Ini fitur paling inovatif yang belum ada di platform manapun.

Sebelum membuka kanvas coding, siswa harus melalui **4 tahap berpikir yang dipandu AI**. Ini bukan optional — ini adalah inti dari bagaimana CT dilatih.

### Alur CT Journey untuk 1 Challenge

```
TANTANGAN: "Buat website edukasi pengelolaan sampah"
                            │
                  ┌─────────▼─────────┐
                  │  FASE 1: DEKOMPOSISI   │
                  │                        │
                  │  AI: "Website ini      │
                  │  terdiri dari bagian   │
                  │  apa saja?"            │
                  │                        │
                  │  [Siswa menjawab]      │
                  │  ☑ Judul halaman       │
                  │  ☑ Penjelasan sampah   │
                  │  ☑ Cara memilah        │
                  │  ☑ Gambar ilustrasi    │
                  └─────────┬─────────┘
                            │
                  ┌─────────▼─────────┐
                  │  FASE 2: ABSTRAKSI     │
                  │                        │
                  │  AI: "Dari semua itu,  │
                  │  mana yang PALING      │
                  │  penting? Pilih 3."    │
                  │                        │
                  │  Siswa melakukan       │
                  │  prioritisasi →        │
                  │  ini adalah abstraksi  │
                  └─────────┬─────────┘
                            │
                  ┌─────────▼─────────┐
                  │  FASE 3: PATTERN       │
                  │                        │
                  │  AI: "Dari bagian-     │
                  │  bagianmu, mana yang   │
                  │  punya struktur mirip? │
                  │  (bisa dikelompokkan)" │
                  │                        │
                  │  Siswa mengelompokkan →│
                  │  ini adalah pattern    │
                  │  recognition           │
                  └─────────┬─────────┘
                            │
                  ┌─────────▼─────────┐
                  │  FASE 4: ALGORITMA     │
                  │                        │
                  │  AI: "Urutkan langkah  │
                  │  pembuatannya dari     │
                  │  pertama sampai selesai│
                  │  secara logis."        │
                  │                        │
                  │  Siswa membuat urutan →│
                  │  ini adalah algorithmic│
                  │  thinking              │
                  └─────────┬─────────┘
                            │
                  ┌─────────▼─────────┐
                  │  AI SUMMARY:           │
                  │  "Rencana yang bagus!  │
                  │  Sekarang wujudkan!"   │
                  │  [CT pre-score dicatat]│
                  └─────────┬─────────┘
                            │
                    WORKSPACE TERBUKA
```

**Mengapa ini kuat secara akademik:**
Setiap jawaban siswa di 4 fase ini dianalisis AI dan menghasilkan **CT Pre-Score** — sebelum satu baris kode pun ditulis. Ini membuktikan bahwa WebCraft mengukur CT, bukan sekadar coding skill.

---

## IMPLEMENTASI CBL YANG SESUNGGUHNYA

KTI menyebut CBL tapi implementasinya belum penuh. Ini yang benar:

### Struktur 1 Pertemuan (dalam konteks CBL)

```
┌────────────────────────────────────────────────────────────┐
│  ENGAGE                                                     │
│                                                            │
│  Big Idea: "Teknologi untuk Lingkungan"                    │
│  Essential Question: "Bagaimana website bisa membantu      │
│  orang memahami cara memilah sampah?"                      │
│  The Challenge: "Buat website edukasi pengelolaan sampah"  │
└──────────────────────────┬─────────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────────┐
│  INVESTIGATE (CT JOURNEY)                                   │
│                                                            │
│  AI memandu 4 fase berpikir:                               │
│  Dekomposisi → Abstraksi → Pattern → Algoritma             │
│  [CT pre-score direkam]                                    │
└──────────────────────────┬─────────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────────┐
│  ACT (CODING WORKSPACE)                                     │
│                                                            │
│  Siswa coding berdasarkan rencana CT Journey               │
│  AI Tutor mendampingi (Socratic, tidak kasih jawaban)      │
│  Setiap attempt direkam untuk Process Score                │
└──────────────────────────┬─────────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────────┐
│  REFLECT                                                    │
│                                                            │
│  AI bertanya setelah submit:                               │
│  "Bagian mana yang paling sulit? Mengapa?"                 │
│  "Apa yang akan kamu perbaiki?"                            │
│  "Apakah hasil websitemu sesuai rencana di awal?"          │
│  [Jawaban refleksi dianalisis → CT post-score]             │
└────────────────────────────────────────────────────────────┘
```

Guru bisa CRUD semua komponen di tiap fase: Big Idea, Essential Question, The Challenge, Guiding Questions, dan Reflection Questions.

---

## TRIPLE ASSESSMENT SYSTEM

### Dimensi 1: Process Score (Otomatis)

Mengukur CARA berpikir, bukan hasil akhir.

```
Process Score = f(attempt_count, error_patterns, time_distribution, correction_logic)

Contoh interpretasi AI:
- Siswa A: 8x attempt, pola random (trial & error) → Process Score rendah
- Siswa B: 3x attempt, setiap revisi memperbaiki satu hal spesifik → Process Score tinggi
- Kedua siswa mungkin menghasilkan website yang sama (Product Score sama)
  tapi CT mereka berbeda
```

Data yang direkam per attempt:
```json
{
  "attempt": 3,
  "timestamp": "...",
  "ast_snapshot": {...},
  "delta_from_prev": ["added h1 inside body", "removed orphan p"],
  "time_since_prev": 45,
  "error_type": "structural_fix"
}
```

### Dimensi 2: Product Score (Guru dengan AI Assist)

Guru menilai dengan rubrik, AI memberikan saran skor awal:

| Kriteria | Bobot | AI Check | Guru Validasi |
|----------|-------|----------|---------------|
| Kelengkapan elemen | 25% | ✅ Otomatis | — |
| Kebenaran semantik | 25% | ✅ Otomatis | — |
| Kreativitas desain | 25% | 🔶 Saran AI | ✅ Final guru |
| Kesesuaian challenge | 25% | 🔶 Saran AI | ✅ Final guru |

### Dimensi 3: CT Score (AI Analysis)

Empat dimensi diukur per challenge:

```
CT Score per Challenge:

Dekomposisi    ████████░░  78  — Bagus, tapi masih ada komponen yang terlewat
Pattern        ██████░░░░  62  — Perlu latihan mengelompokkan elemen serupa
Abstraksi      █████████░  88  — Sangat baik, bisa prioritisasi dengan tepat
Algoritma      ███████░░░  72  — Urutan coding sudah logis, bisa lebih efisien
```

CT Score diukur dari:
- Jawaban di CT Journey (pre-coding)
- Pola attempt di workspace (during coding)
- Jawaban refleksi (post-coding)

---

## CT MAP — FITUR VISUALISASI UTAMA

Setiap siswa memiliki CT Map yang berkembang sepanjang semester.

```
CT MAP — Nayotama — Semester Gasal 2026

           Dekomposisi
               ●  90
              / \
   Pattern  ●   ● Algoritma
     70    / \ / \  85
          /   ●   \
        Abstraksi
             80

Pertemuan 1:  ▓▓▓░░  65 - Baru mulai
Pertemuan 4:  ▓▓▓▓░  78 - Berkembang
Pertemuan 8:  ▓▓▓▓▓  87 - Konsisten
```

Manfaat CT Map:
- **Untuk siswa:** Melihat progress diri sendiri → motivasi intrinsik
- **Untuk guru:** Identifikasi siswa yang butuh perhatian per dimensi CT
- **Untuk peneliti:** Data delta CT = validasi empiris efektivitas WebCraft (menjawab keterbatasan KTI)
- **Untuk portofolio:** Bukti konkret peningkatan kemampuan berpikir

---

## ARSITEKTUR FITUR LENGKAP

### Modul 1: Auth & Room System

```
Guru:
  Register (email/NIP) → Buat Room → Generate kode 6-digit
  → Assign Pertemuan → Monitor progress

Siswa:
  Register (email/NISN) → Input kode room → Masuk dashboard kelas
  → Lihat pertemuan yang aktif → Kerjakan Learning Task + Project
```

### Modul 2: Learning Hub (Pengganti Level)

```
Semester
├── Pre-Test (awal semester — WAJIB sebelum akses materi)
│
├── Pertemuan 1: HTML Dasar — Struktur Bumi
│   ├── Engage: Big Idea + Essential Question + The Challenge
│   ├── Investigate: CT Journey (4 fase AI)
│   ├── Act: Workspace (Learning Task)
│   └── Reflect: Pertanyaan refleksi AI
│
├── Pertemuan 2-4: ... (guru CRUD konten)
│
├── 🎯 Project 1: Studi kasus terbuka
│   ├── CT Journey wajib sebelum workspace
│   ├── Workspace bebas (kreasi siswa)
│   └── Submit → Tunggu penilaian guru
│
├── Pertemuan 5-7: ...
│
├── 🎯 Project 2: ...
│
└── Post-Test (akhir semester — menghasilkan delta CT)
```

### Modul 3: AI Tutor (In-Workspace)

Muncul otomatis setelah attempt ke-4. Bisa dipanggil manual.

```
System prompt AI tutor:
"Kamu adalah tutor CT untuk siswa SMP kelas 7. Gunakan metode Socratic.
JANGAN pernah memberikan jawaban langsung. Selalu tanya balik untuk
menuntun siswa menemukan sendiri. Konteks: siswa sedang di Pertemuan 1
(HTML Dasar), materi hari ini adalah konsep nesting/pembungkusan."

Input ke AI setiap request:
- current_ast (kondisi kanvas saat ini)
- target_ast (apa yang seharusnya)
- attempt_history (apa saja yang sudah dicoba)
- error_pattern (kesalahan yang berulang)
- student_message (pertanyaan siswa)
```

### Modul 4: AI Teacher Assistant

Dashboard guru menampilkan insight kelas-wide:

```
Pertemuan 1 — Kelas 7A — 32 siswa

██████████████████████░  91% selesai
CT Score rata-rata: 74.2

🔥 HEATMAP KESALAHAN:
 ████████ 78% — Elemen di luar <body>
 ██████   56% — Lupa menutup tag
 ████     34% — Salah urutan nesting

⚠️  AI INSIGHT:
"78% siswa masih struggle dengan konsep container.
Rekomendasi: Review 15 menit di awal Pertemuan 2
dengan visual analogi 'kotak dalam kotak'."

📉 SISWA BUTUH PERHATIAN:
• Budi Santoso — 0% progress, tidak ada submission
• Rini Amelia — 12 attempt di task yang sama, CT Score rendah
• Andi Kurnia — Skor turun dari P1 ke P2 (flag: butuh intervensi)
```

### Modul 5: Galeri Karya (Evaluasi Transparan)

Setelah guru menilai project → pilih karya mana yang dipublikasikan ke galeri.

```
Galeri menampilkan:
- Live preview mini karya siswa
- Nama & kelas (tanpa nilai — privasi)
- Komentar publik dari guru
- CT badge (level dekomposisi, pattern, dll)
- Appreciation count dari teman sekelas

Privasi:
- Nilai TIDAK ditampilkan ke sesama siswa
- Hanya komentar kualitatif yang publik
- Siswa hanya bisa lihat karya satu room yang sama
```

### Modul 6: Student Portfolio

Setiap siswa punya halaman portfolio yang bisa dishare:

```
Portfolio: Nayotama Aryaputra Santosa
Kelas 7A — WebCraft Education 2026

CT Map: [radar chart 4 dimensi]

Karya:
├── Project 1: Website Daur Air ★★★★
│   Nilai: 85 | CT Score: 78 | Komentar guru: "..."|
│
└── Project 2: Sistem Tata Surya ★★★★★
    Nilai: 92 | CT Score: 88 | Komentar guru: "..."

Badge yang diraih:
🏅 Decomposition Expert
🏅 Pattern Master
⭐ 2 Project Completed
```

---

## ARSITEKTUR TEKNIS: VITE + REACT

### Struktur Proyek

```
webcraft-frontend/
├── index.html
├── vite.config.js
├── package.json
│
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   │
│   ├── pages/
│   │   ├── Beranda.jsx
│   │   ├── RuangBelajar.jsx          ← Workspace utama
│   │   ├── Dashboard.jsx              ← Berbeda untuk guru/siswa
│   │   ├── Galeri.jsx
│   │   ├── CTMap.jsx                  ← CT profile siswa
│   │   └── Portfolio.jsx
│   │
│   ├── components/
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── workspace/
│   │   │   ├── PaletBlok.jsx          ← Toolbox kiri
│   │   │   ├── Kanvas.jsx             ← Area drag-drop utama
│   │   │   ├── KanvasItem.jsx         ← Satu blok di kanvas
│   │   │   ├── DropZone.jsx           ← Area drop nested
│   │   │   ├── PreviewPanel.jsx       ← Live preview
│   │   │   └── CodePanel.jsx          ← Syntax-highlighted code
│   │   │
│   │   ├── ct-journey/               ← FITUR BARU UTAMA
│   │   │   ├── CTJourneyModal.jsx     ← Wrapper modal
│   │   │   ├── DecompositionStep.jsx
│   │   │   ├── PatternStep.jsx
│   │   │   ├── AbstractionStep.jsx
│   │   │   └── AlgorithmStep.jsx
│   │   │
│   │   ├── ai/
│   │   │   ├── AITutorChat.jsx        ← Chat bubble in-workspace
│   │   │   ├── CTScoreRadar.jsx       ← Recharts radar chart
│   │   │   └── InsightCard.jsx        ← Kartu insight guru
│   │   │
│   │   ├── classroom/
│   │   │   ├── RoomCard.jsx
│   │   │   ├── PertemuanCard.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   └── HeatmapGrid.jsx        ← Visualisasi error kelas
│   │   │
│   │   ├── assessment/
│   │   │   ├── RubrikForm.jsx         ← Form penilaian guru
│   │   │   ├── ScoreBreakdown.jsx     ← 3 dimensi score
│   │   │   └── PrePostTest.jsx
│   │   │
│   │   └── gallery/
│   │       ├── KaryaCard.jsx
│   │       └── StarRating.jsx
│   │
│   ├── hooks/
│   │   ├── useAST.js                  ← AST state + operations
│   │   ├── useAITutor.js              ← Claude API integration
│   │   ├── useCTScore.js              ← CT scoring logic
│   │   └── useAttemptTracker.js       ← Rekam histori attempt
│   │
│   ├── store/
│   │   └── useStore.js                ← Zustand global state
│   │
│   ├── services/
│   │   ├── api.js                     ← Axios instance + interceptors
│   │   ├── aiService.js               ← Wrapper Claude API
│   │   └── astUtils.js                ← AST helpers (serialize, validate)
│   │
│   └── styles/
│       ├── global.css                 ← CSS variables neo-brutalism
│       ├── workspace.css
│       └── components.css
│
webcraft-backend/
├── main.py                            ← FastAPI entry point
├── requirements.txt
├── .env
│
├── app/
│   ├── routers/
│   │   ├── auth.py
│   │   ├── rooms.py
│   │   ├── pertemuan.py
│   │   ├── submissions.py
│   │   ├── gallery.py
│   │   └── ai.py                      ← AI proxy endpoint
│   │
│   ├── models/                        ← SQLAlchemy models
│   ├── schemas/                       ← Pydantic schemas
│   ├── services/
│   │   ├── ai_service.py              ← Claude API calls
│   │   ├── ct_analyzer.py             ← CT scoring logic
│   │   └── validator.py               ← Dynamic AST validation
│   └── database.py
```

### State Management: Zustand

```javascript
// store/useStore.js
import { create } from 'zustand'

const useStore = create((set, get) => ({
  // === WORKSPACE STATE ===
  ast: [],                          // Array of AST nodes
  selectedContainerId: null,
  attemptHistory: [],               // [{ast_snapshot, timestamp, errors}]
  attemptCount: 0,

  // === CT JOURNEY STATE ===
  ctJourneyAnswers: {
    decomposition: [],
    abstraction: [],
    pattern: [],
    algorithm: []
  },
  ctPreScore: null,                 // Score dari CT Journey sebelum coding

  // === SESSION STATE ===
  activeLevel: null,
  activeLevelConfig: null,          // {judul, misi, validator_rules}
  user: null,                       // {id, name, role: 'siswa'|'guru'}
  activeRoom: null,

  // === ACTIONS ===
  addBlock: (type, parentId) => { ... },
  removeBlock: (id) => { ... },
  updateContent: (id, content) => { ... },
  recordAttempt: (errors) => {
    const snapshot = {
      ast: get().ast,
      timestamp: Date.now(),
      errors,
      attempt: get().attemptCount + 1
    };
    set(state => ({
      attemptHistory: [...state.attemptHistory, snapshot],
      attemptCount: state.attemptCount + 1
    }));
  },
  resetWorkspace: () => set({
    ast: [],
    attemptHistory: [],
    attemptCount: 0,
    ctJourneyAnswers: { decomposition: [], abstraction: [], pattern: [], algorithm: [] },
    ctPreScore: null
  }),
}));
```

### Custom Hook: useAST

```javascript
// hooks/useAST.js
export function useAST() {
  const { ast, addBlock, removeBlock, updateContent } = useStore();

  // Serialize AST → HTML string (untuk preview)
  const toHTML = useCallback((nodes, depth = 0) => {
    return nodes.map(node => {
      if (CONTAINERS.has(node.type)) {
        const inner = toHTML(node.children || [], depth + 1);
        return `<${node.type}>${inner}</${node.type}>`;
      }
      if (node.type === 'style') {
        return `<style>${node.content}</style>`;
      }
      return `<${node.type}>${escapeHTML(node.content)}</${node.type}>`;
    }).join('\n' + '  '.repeat(depth));
  }, [ast]);

  // Serialize AST → string kode berformat (untuk code panel)
  const toFormattedCode = useCallback(...);

  // Validate AST against rules JSON dari server
  const validate = useCallback((rules) => {
    const errors = [];
    rules.forEach(rule => {
      if (rule.type === 'exists') {
        if (!findInAST(ast, rule.selector)) {
          errors.push({ rule, message: rule.error_message });
        }
      }
      if (rule.type === 'count') {
        const count = countInAST(ast, rule.selector);
        if (count < rule.min) {
          errors.push({ rule, message: rule.error_message });
        }
      }
      // dst...
    });
    return errors;
  }, [ast]);

  return { ast, toHTML, toFormattedCode, validate, addBlock, removeBlock, updateContent };
}
```

### AI Service Integration

```javascript
// services/aiService.js
// Semua AI call melewati backend kita (tidak langsung ke Anthropic dari browser)

export const aiService = {

  // 1. CT Journey — analisis jawaban dekomposisi, abstraksi, dll.
  analyzeCTStep: async (step, question, studentAnswer, challengeContext) => {
    const response = await api.post('/ai/ct-journey', {
      step,        // 'decomposition' | 'abstraction' | 'pattern' | 'algorithm'
      question,
      student_answer: studentAnswer,
      challenge_context: challengeContext
    });
    return response.data; // { feedback, ct_score_delta, next_hint }
  },

  // 2. AI Tutor — hint kontekstual saat coding
  getTutorHint: async ({ currentAST, targetRules, attemptHistory, studentMessage, lessonContext }) => {
    const response = await api.post('/ai/tutor', {
      current_ast: currentAST,
      target_rules: targetRules,
      attempt_history: attemptHistory,    // AI tahu apa yang sudah dicoba
      student_message: studentMessage,
      lesson_context: lessonContext
    });
    return response.data.hint;           // String hint (Socratic, tidak jawab langsung)
  },

  // 3. CT Analyzer — analisis pola berpikir dari seluruh session
  analyzeCTSession: async (attemptHistory, ctJourneyAnswers, reflectionAnswers) => {
    const response = await api.post('/ai/analyze-ct', {
      attempt_history: attemptHistory,
      ct_journey: ctJourneyAnswers,
      reflection: reflectionAnswers
    });
    return response.data;
    // {
    //   decomposition: 78,
    //   pattern: 62,
    //   abstraction: 88,
    //   algorithm: 72,
    //   narrative: "Siswa menunjukkan...",
    //   recommendations: ["..."]
    // }
  },

  // 4. Grading Assistant — saran skor untuk guru
  suggestProjectScore: async (submittedAST, rubrik, challengeContext) => {
    const response = await api.post('/ai/suggest-score', {
      ast: submittedAST,
      rubrik,
      challenge_context: challengeContext
    });
    return response.data;
    // { suggested_scores: {...}, analysis: "...", flags: [...] }
  },

  // 5. Teacher Insights — analisis class-wide
  getClassInsights: async (roomId, pertemuanId) => {
    const response = await api.post('/ai/class-insights', { room_id: roomId, pertemuan_id: pertemuanId });
    return response.data;
    // { error_heatmap, struggling_students, recommendations, ct_class_average }
  },
};
```

### Database Schema (Updated)

```sql
-- USERS & AUTH
users (id, name, email, role ENUM('siswa','guru','admin'), nisn_nip, created_at)
sessions (id, user_id, token_hash, expires_at)

-- ROOMS & CLASSROOM
rooms (id, guru_id, name, code VARCHAR(6), is_active, created_at)
room_members (room_id, siswa_id, joined_at)

-- CURRICULUM CONTENT (guru CRUD)
pertemuan (
  id, room_id, urutan, judul, is_published,
  cbl_engage_json,     -- {big_idea, essential_question, the_challenge, media_url}
  guiding_questions_json,
  reflection_questions_json
)
learning_tasks (
  id, pertemuan_id, judul,
  validator_rules_json, -- [{type, selector, min, error_message}]
  max_attempts_before_ai_hint
)
project_tasks (
  id, pertemuan_id, judul, studi_kasus, deadline,
  rubrik_json          -- [{kriteria, bobot, deskripsi}]
)

-- CT JOURNEY RESPONSES
ct_journey_sessions (
  id, siswa_id, task_id, challenge_context,
  decomposition_answer_json,
  abstraction_answer_json,
  pattern_answer_json,
  algorithm_answer_json,
  ct_pre_score_json,   -- {decomposition, pattern, abstraction, algorithm}
  completed_at
)

-- LEARNING SUBMISSIONS
learning_submissions (
  id, task_id, siswa_id,
  ast_snapshots_json,  -- [{attempt, timestamp, ast, errors, delta}]
  attempt_count, final_score,
  accuracy_score, efficiency_score,
  ct_session_id,       -- FK ke ct_journey_sessions
  reflection_answers_json,
  ct_post_score_json,  -- {decomposition, pattern, abstraction, algorithm}
  ai_tutor_log_json,   -- seluruh percakapan dengan AI tutor
  submitted_at
)

-- PROJECT SUBMISSIONS
project_submissions (
  id, task_id, siswa_id,
  final_ast_json, ct_session_id,
  ai_suggestion_json,  -- saran AI untuk guru
  teacher_score, teacher_comment,
  rubrik_scores_json,
  is_published_to_gallery,
  submitted_at, graded_at
)

-- CT TRACKING (computed, bukan raw)
ct_scores (
  id, siswa_id, pertemuan_id,
  decomposition, pattern_recognition, abstraction, algorithm_design,
  composite_ct_score,
  recorded_at
)

-- GALLERY
gallery_items (id, project_submission_id, published_at, appreciation_count)
gallery_comments (id, gallery_item_id, commenter_id, text, is_public, created_at)

-- PRE/POST TEST
tests (id, room_id, type ENUM('pre','post'), questions_json, created_by, created_at)
test_submissions (id, test_id, siswa_id, answers_json, score, submitted_at)
```

### Tech Stack Lengkap

```
FRONTEND:
  Framework    : React 18 + Vite 5
  Language     : JavaScript (ESModules, bisa TypeScript nanti)
  State        : Zustand
  Styling      : Tailwind CSS + CSS Variables (pertahankan neo-brutalism token)
  Drag & Drop  : @dnd-kit/core (lebih powerful dari HTML5 native DnD)
  Charts       : Recharts (CT Map radar, analytics charts)
  HTTP         : Axios
  Routing      : React Router v6

BACKEND:
  Framework    : FastAPI (Python)
  Database     : PostgreSQL + SQLAlchemy
  Cache/Session: Redis
  Auth         : JWT (python-jose)
  AI           : Anthropic Python SDK (Claude API)
  Deploy       : Railway / Render

DEPLOYMENT:
  Frontend     : Vercel (gratis, CDN global, auto-deploy dari GitHub)
  Backend      : Railway / Render (gratis tier cukup untuk demo/penelitian)
  DB           : Supabase (PostgreSQL managed, gratis tier ada)
  
DEMO (Sekarang, pre-React):
  Hosting      : Netlify / GitHub Pages
  Framework    : Pure HTML/CSS/JS (konversi dari Django, ~2 jam)
```

---

## ROADMAP IMPLEMENTASI (REVISED)

### Fase 0: Demo Lomba (1–2 minggu)
**Target: Platform bisa dipresentasikan tanpa server**

- [ ] Migrasi Django → Pure HTML/CSS/JS (fix 3 bug yang ditemukan)
- [ ] Hardcode galeri dengan 6 karya demo STEAM yang menarik
- [ ] Deploy ke Netlify/GitHub Pages
- [ ] Persiapkan alur demo 5 menit (lihat Analisis v2)

### Fase 1: Setup React (2–3 minggu)
**Target: Semua halaman berjalan di React, tidak ada fungsionalitas yang hilang**

- [ ] Inisiasi proyek Vite + React
- [ ] Migrasi komponen: Header, Footer, Beranda, Galeri
- [ ] Migrasi Workspace ke React (Kanvas, PaletBlok, Panel Preview/Code)
- [ ] Port state AST ke Zustand (useAST hook)
- [ ] Port drag-and-drop ke @dnd-kit
- [ ] Port validator ke useAST.validate()
- [ ] Deploy Vercel

### Fase 2: Backend + Auth (3–4 minggu)
**Target: Login, Room, dan data tersimpan ke database**

- [ ] Setup FastAPI + PostgreSQL + Redis
- [ ] Auth endpoint (register, login, refresh token)
- [ ] Room CRUD + kode undangan
- [ ] Pertemuan CRUD (guru)
- [ ] Submission API (Learning Task + Project)
- [ ] Sambungkan frontend ke backend

### Fase 3: CT Journey + Triple Assessment (4–5 minggu)
**Target: Pre-coding CT Journey berjalan, 3 dimensi score direkam**

- [ ] CTJourneyModal component (4 fase interaktif)
- [ ] CT Journey API endpoint + simpan ke DB
- [ ] Process Score (tracking attempt patterns)
- [ ] Dynamic validator (rules dari DB, bukan hardcode)
- [ ] Rubrik guru + Product Score
- [ ] CT post-score dari refleksi
- [ ] Pre-test & Post-test engine

### Fase 4: AI Integration (4–5 minggu)
**Target: AI benar-benar mengubah pengalaman belajar**

- [ ] Backend AI proxy endpoint (jangan expose API key ke frontend)
- [ ] AI Tutor (Socratic, context-aware)
- [ ] AI CT Journey Analyzer (evaluasi jawaban 4 fase)
- [ ] AI CT Session Analyzer (analisis pola attempt)
- [ ] AI Grading Assistant (saran skor untuk guru)
- [ ] AI Teacher Insights (class-wide heatmap + rekomendasi)

### Fase 5: CT Map + Portfolio + Galeri (3–4 minggu)
**Target: Produk visual yang bisa diklaim sebagai inovasi**

- [ ] CT Map radar chart (Recharts) per siswa, historical data
- [ ] Student Portfolio page
- [ ] Galeri dinamis (dari DB, bukan hardcode)
- [ ] Badge system (CT Expert badges)
- [ ] Export portfolio (PDF)

### Fase 6: Penelitian + Refinement (ongoing)
**Target: Data empiris untuk validasi KTI / PKM / jurnal**

- [ ] Delta score Pre-test vs Post-test
- [ ] CT Score progression data
- [ ] Uji coba dengan sekolah mitra
- [ ] Analisis kualitatif + kuantitatif
- [ ] Publikasi penelitian

---

## COMPETITIVE ADVANTAGE (vs Kompetitor)

| Platform | CT Focus | CBL | AI Tutor | Bhs. Indonesia | STEAM | CT Map |
|----------|----------|-----|----------|----------------|-------|--------|
| Scratch | Tidak | Tidak | Tidak | Partial | Tidak | Tidak |
| Code.org | Partial | Tidak | Tidak | Tidak | Tidak | Tidak |
| W3Schools | Tidak | Tidak | Tidak | Tidak | Tidak | Tidak |
| **WebCraft 2.0** | **INTI** | **PENUH** | **Socratic** | **100%** | **STEAM** | **Ada** |

Satu-satunya yang menggabungkan semua: CT-first, CBL-structured, AI-powered, Bahasa Indonesia, STEAM-contextualized, dengan measurement system yang terukur.

---

## PERNYATAAN POSITIONING FINAL

> WebCraft adalah satu-satunya platform di Indonesia yang mengintegrasikan
> pengukuran Computational Thinking berbasis AI dengan model pembelajaran
> Challenge Based Learning dalam konteks STEAM untuk siswa SMP — menggunakan
> Web Development sebagai media yang konkret dan terukur hasilnya.

HTML dan CSS adalah kendaraan. Yang dijual WebCraft adalah **kemampuan berpikir yang terukur**.

---

*Blueprint v3.0 — Sintesis Analisis Mendalam + Perspektif GPT*
*Framework: Vite + React + FastAPI*
*Nayotama Aryaputra Santosa — Juni 2026*
