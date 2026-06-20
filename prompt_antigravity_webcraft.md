# PROMPT UNTUK ANTIGRAVITY — WebCraft 2.0

---

## KONTEKS PROYEK

Kamu akan bekerja pada proyek bernama **WebCraft Education** — sebuah platform pembelajaran web interaktif untuk siswa SMP di Indonesia. Proyek ini adalah Karya Tulis Ilmiah (KTI) yang diikutsertakan dalam kompetisi Piala Dekan Fakultas Teknik UNNES 2026, dikembangkan oleh tim dari jurusan Teknik Elektro Universitas Negeri Semarang.

### Misi Platform

WebCraft **bukan** sekadar platform belajar HTML/CSS. Positioning yang benar adalah:

> **Platform Pengembangan Computational Thinking melalui Web Development.**
> HTML dan CSS adalah alat. Challenge adalah media. AI adalah pendamping.
> Produk utamanya adalah kemampuan berpikir komputasional yang terukur.

Platform ini mengintegrasikan tiga pilar:
- **STEAM Context** — materi dikaitkan dengan sains (tata surya, daur air, ekosistem)
- **Challenge Based Learning (CBL)** — Big Idea → Essential Question → Challenge → Investigate → Act → Reflect
- **Computational Thinking (CT)** — Decomposition, Pattern Recognition, Abstraction, Algorithm Design

---

## BACA BLUEPRINT INI TERLEBIH DAHULU

Sebelum melakukan apapun, **baca dan pahami seluruh isi file blueprint berikut**:

```
blueprint_webcraft_v3.md
```

File ini berisi:
- Repositioning inti WebCraft (CT-first, bukan coding-first)
- Analisis gap kritis dari sistem lama
- Konsep CT Journey (fitur pre-coding paling inovatif)
- Implementasi CBL yang sesungguhnya
- Triple Assessment System (Process + Product + CT Score)
- CT Map per siswa (radar chart 4 dimensi)
- Arsitektur teknis lengkap (Vite + React + FastAPI)
- Struktur folder dan komponen React
- Database schema
- Roadmap implementasi per fase

Pastikan kamu memahami semuanya sebelum menulis satu baris kode pun.

---

## KONDISI SAAT INI — PROYEK DJANGO YANG SUDAH ADA

Proyek ini sebelumnya dibangun menggunakan **Django (Python)** sebagai backend framework. Berikut kondisinya:

### Stack Lama (yang akan DIHAPUS)
- **Framework:** Django
- **Template Engine:** Django Template Language (`{% extends %}`, `{% url %}`, `{% static %}`, `{% for %}`, `{% block %}`)
- **Deployment:** PythonAnywhere

### File yang Ada Saat Ini
```
project/
├── base.html              ← Django base template (header + footer + nav)
├── beranda.html           ← Landing page (extends base.html)
├── ruang_belajar.html     ← Workspace editor (extends base.html)
├── galeri.html            ← Gallery page (extends base.html, loop Django ORM)
│
├── style.css              ← Global styles (neo-brutalism, CSS variables)
├── beranda.css            ← Landing page styles
├── ruang_belajar.css      ← Workspace styles
├── galeri.css             ← Gallery styles
│
├── ruang_belajar.js       ← Logika workspace (AST, drag-drop, validator)
└── galeri.js              ← Logika galeri (star rating, komentar)
```

### Yang Perlu Kamu Ketahui Tentang Kode Lama

**Hal positif yang HARUS dipertahankan logikanya:**
1. **Sistem AST (Abstract Syntax Tree)** di `ruang_belajar.js` — logika menyimpan struktur HTML sebagai tree of nodes sudah solid
2. **Drag-and-drop bertingkat** — blok bisa di-drop ke dalam blok lain (nesting)
3. **Validator rules** — sistem pengecekan apakah susunan blok sudah benar per level
4. **Triple-View sync** — perubahan di kanvas → kode HTML → live preview, ketiganya sinkron real-time
5. **CSS block** — ada blok `<style>` khusus untuk level CSS
6. **Design system neo-brutalism** di CSS — tebal border, hard shadow, palet warna ceria, font Fredoka + Nunito — ini harus DIPERTAHANKAN di versi baru

**Bug yang sudah diidentifikasi (harus DIPERBAIKI di versi baru):**
1. Konflik definisi `mulaiLevel` antara inline script di HTML dan `ruang_belajar.js`
2. Canvas tidak di-reset saat siswa berganti level
3. Blok CSS muncul dengan `display: inline-block` padahal seharusnya `display: block`

**Yang TIDAK perlu dipertahankan:**
- Semua Django template syntax
- Struktur URL Django
- Static file system Django
- Galeri hardcoded (akan diganti dengan data dinamis dari API)

---

## TUGAS UTAMA

### Langkah 1: Analisis Mendalam Dulu

Lakukan analisis menyeluruh terhadap:
1. Seluruh isi `blueprint_webcraft_v3.md`
2. Semua file kode yang ada (HTML, CSS, JS)
3. Identifikasi semua logika yang harus dimitrasi
4. Identifikasi semua komponen React yang perlu dibuat
5. Identifikasi semua API endpoint yang dibutuhkan

Buat summary temuan analisismu sebelum mulai coding. Tunjukkan bahwa kamu memahami:
- Apa yang WebCraft coba capai secara pedagogis
- Bagaimana CT Journey bekerja
- Bagaimana Triple Assessment System bekerja
- Bagaimana komponen-komponen React akan berinteraksi

### Langkah 2: Hapus Semua, Bangun dari Nol

Setelah analisis selesai dan kamu yakin memahami segalanya:

**HAPUS seluruh proyek Django yang ada.**

Kemudian bangun ulang dengan stack baru:

---

## STACK TEKNOLOGI BARU

```
FRONTEND:
  Framework    : React 18 + Vite 5
  Language     : JavaScript (ES Modules)
  State        : Zustand
  Styling      : Tailwind CSS + CSS Variables (pertahankan design tokens neo-brutalism)
  Drag & Drop  : @dnd-kit/core
  Charts       : Recharts (untuk CT Map radar chart)
  HTTP         : Axios
  Routing      : React Router v6
  Icons        : Material Symbols Rounded (Google)
  Fonts        : Fredoka + Nunito (Google Fonts)

BACKEND:
  Framework    : FastAPI (Python)
  Database     : PostgreSQL + SQLAlchemy (async)
  Cache        : Redis
  Auth         : JWT (python-jose + passlib)
  AI           : Anthropic Python SDK
  Validation   : Pydantic v2

DEPLOYMENT:
  Frontend     : Vercel
  Backend      : Railway / Render
  Database     : Supabase (PostgreSQL managed)
```

---

## STRUKTUR PROYEK YANG HARUS DIBUAT

```
webcraft/
│
├── frontend/                          ← Vite + React
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── tailwind.config.js
│   │
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       │
│       ├── pages/
│       │   ├── Beranda.jsx
│       │   ├── RuangBelajar.jsx
│       │   ├── Dashboard.jsx          ← berbeda konten untuk guru vs siswa
│       │   ├── Galeri.jsx
│       │   ├── CTMap.jsx              ← CT profile & radar chart siswa
│       │   └── Portfolio.jsx
│       │
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Header.jsx
│       │   │   └── Footer.jsx
│       │   │
│       │   ├── workspace/
│       │   │   ├── PaletBlok.jsx      ← toolbox kiri (drag source)
│       │   │   ├── Kanvas.jsx         ← area utama drag-drop
│       │   │   ├── KanvasItem.jsx     ← satu node di kanvas
│       │   │   ├── DropZone.jsx       ← area drop (flat + nested)
│       │   │   ├── PreviewPanel.jsx   ← live preview iframe sandboxed
│       │   │   └── CodePanel.jsx      ← syntax highlighted code viewer
│       │   │
│       │   ├── ct-journey/            ← FITUR UTAMA BARU
│       │   │   ├── CTJourneyModal.jsx ← wrapper + step navigation
│       │   │   ├── DecompositionStep.jsx
│       │   │   ├── AbstractionStep.jsx
│       │   │   ├── PatternStep.jsx
│       │   │   └── AlgorithmStep.jsx
│       │   │
│       │   ├── ai/
│       │   │   ├── AITutorChat.jsx    ← chat bubble muncul di workspace
│       │   │   ├── CTScoreRadar.jsx   ← Recharts radar chart
│       │   │   └── InsightCard.jsx    ← kartu insight untuk guru
│       │   │
│       │   ├── classroom/
│       │   │   ├── RoomCard.jsx
│       │   │   ├── PertemuanCard.jsx
│       │   │   ├── ProjectCard.jsx
│       │   │   └── HeatmapGrid.jsx
│       │   │
│       │   ├── assessment/
│       │   │   ├── RubrikForm.jsx
│       │   │   ├── ScoreBreakdown.jsx ← tampilkan Process + Product + CT Score
│       │   │   └── TestEngine.jsx     ← pre-test & post-test
│       │   │
│       │   └── gallery/
│       │       ├── KaryaCard.jsx
│       │       └── StarRating.jsx
│       │
│       ├── hooks/
│       │   ├── useAST.js              ← semua operasi AST + serialize + validate
│       │   ├── useAITutor.js          ← komunikasi dengan AI tutor endpoint
│       │   ├── useCTScore.js          ← kalkulasi CT score
│       │   └── useAttemptTracker.js   ← rekam histori attempt
│       │
│       ├── store/
│       │   └── useStore.js            ← Zustand global state
│       │
│       ├── services/
│       │   ├── api.js                 ← Axios instance + interceptors
│       │   ├── aiService.js           ← wrapper semua AI API call
│       │   └── astUtils.js            ← helpers: toHTML, toCode, findNode, dll
│       │
│       └── styles/
│           ├── global.css             ← CSS variables neo-brutalism design tokens
│           └── components.css
│
└── backend/                           ← FastAPI
    ├── main.py
    ├── requirements.txt
    ├── .env.example
    │
    └── app/
        ├── routers/
        │   ├── auth.py
        │   ├── rooms.py
        │   ├── pertemuan.py
        │   ├── submissions.py
        │   ├── ct_journey.py          ← endpoint CT Journey
        │   ├── gallery.py
        │   └── ai.py                  ← AI proxy (jangan expose API key ke frontend)
        │
        ├── models/                    ← SQLAlchemy ORM models
        ├── schemas/                   ← Pydantic request/response schemas
        ├── services/
        │   ├── ai_service.py          ← Claude API integration
        │   ├── ct_analyzer.py         ← CT scoring logic
        │   └── validator.py           ← dynamic AST validation
        └── database.py
```

---

## DETAIL IMPLEMENTASI KRITIS

### 1. Design System (WAJIB dipertahankan persis)

Design token dari CSS lama harus masuk ke Tailwind config dan CSS variables:

```css
:root {
  --bg-color: #E0F2FE;
  --text-main: #0F172A;
  --game-blue: #3B82F6;
  --game-yellow: #FACC15;
  --game-green: #10B981;
  --game-pink: #EC4899;
  --border-thick: 4px solid #0F172A;
  --shadow-hard: 6px 6px 0px #0F172A;
}
```

Style utama: neo-brutalism — border tebal hitam, hard shadow, warna solid punchy, font Fredoka untuk heading/display, Nunito untuk body text.

### 2. AST State di Zustand (inti workspace)

```javascript
// Struktur node AST
{
  id: "node_1",
  type: "body",          // body | div | h1 | p | ul | li | img | button | style
  content: "",           // untuk leaf nodes (h1, p, li, button)
  children: [],          // untuk container nodes (body, div, ul)
  cssContent: ""         // khusus untuk node type 'style'
}

// State Zustand minimal
{
  ast: [],
  selectedContainerId: null,
  attemptHistory: [],
  attemptCount: 0,
  activeLevel: null,
  ctJourneyAnswers: { decomposition: [], abstraction: [], pattern: [], algorithm: [] },
  ctPreScore: null,
  user: null,
  activeRoom: null
}
```

### 3. CT Journey Flow (FITUR PALING PENTING)

CT Journey adalah modal yang muncul SEBELUM kanvas terbuka untuk challenge apapun. Tidak bisa dilewati.

4 fase berurutan, masing-masing dipandu AI:

**Fase 1 — Dekomposisi:**
> "Website [judul challenge] ini terdiri dari bagian-bagian apa saja? Sebutkan sebanyak yang kamu pikirkan."
- Input: text area bebas atau chip input (siswa tambah item satu per satu)
- AI mengevaluasi kelengkapan dan memberi feedback singkat

**Fase 2 — Abstraksi:**
> "Dari semua bagian yang kamu sebutkan, pilih 3 yang paling PENTING untuk dibuat pertama."
- Input: siswa memilih dari jawaban fase 1
- AI mengevaluasi kualitas prioritisasi

**Fase 3 — Pattern Recognition:**
> "Dari bagian-bagian itu, mana yang punya struktur atau pola yang mirip? Kelompokkan!"
- Input: drag-and-drop sederhana untuk mengelompokkan
- AI mengevaluasi kemampuan pengelompokan

**Fase 4 — Algoritma:**
> "Sekarang urutkan langkah pembuatan website ini dari langkah pertama sampai selesai."
- Input: ordered list yang bisa di-drag untuk diurutkan
- AI mengevaluasi logika urutan

Setelah 4 fase: AI menampilkan summary rencana → siswa klik "Mulai Coding!" → kanvas terbuka.

Setiap jawaban dikirim ke endpoint `/ai/ct-journey` untuk dianalisis dan menghasilkan partial CT pre-score.

### 4. Dynamic Validator (bukan if-else hardcoded)

Setiap level/task memiliki `validator_rules_json` yang disimpan di database:

```json
[
  { "type": "exists", "selector": "body", "error_message": "Kamu belum membuat wadah <body>!" },
  { "type": "child_of", "parent": "body", "child": "h1", "error_message": "<h1> harus ada di dalam <body>" },
  { "type": "content_match", "selector": "body > h1", "value": "bumi", "case_insensitive": true, "error_message": "Isi <h1> harus 'Bumi'" },
  { "type": "count", "selector": "body > *", "min": 2, "error_message": "Butuh minimal 2 elemen di dalam <body>" }
]
```

Fungsi `validate(ast, rules)` di `astUtils.js` mengevaluasi semua rules dan mengembalikan array errors.

### 5. Triple Assessment (simpan ketiganya)

```javascript
// Setelah siswa submit learning task:
{
  process_score: {
    accuracy: 85,          // apakah akhirnya benar
    efficiency: 70,        // berdasarkan attempt_count
    improvement_pattern: "systematic"  // dari analisis delta antar attempt
  },
  product_score: null,     // diisi guru untuk project task
  ct_score: {
    decomposition: 78,
    pattern_recognition: 65,
    abstraction: 82,
    algorithm_design: 71,
    source: "ct_journey + process_analysis"
  }
}
```

### 6. AI Proxy Backend (WAJIB — jangan langsung dari browser)

Semua call ke Claude API harus melalui backend FastAPI:

```python
# backend/app/routers/ai.py
@router.post("/ct-journey")
async def analyze_ct_step(request: CTJourneyRequest, user=Depends(get_current_user)):
    """Analisis jawaban CT Journey siswa dan return feedback + partial CT score"""
    ...

@router.post("/tutor")
async def get_tutor_hint(request: TutorRequest, user=Depends(get_current_user)):
    """Socratic hint berdasarkan kondisi AST + histori attempt"""
    ...

@router.post("/analyze-ct")
async def analyze_ct_session(request: CTSessionRequest, user=Depends(get_current_user)):
    """Analisis pola berpikir dari seluruh session → CT Score"""
    ...

@router.post("/suggest-score")
async def suggest_project_score(request: ScoringRequest, user=Depends(get_current_user)):
    """Saran skor untuk guru sebelum penilaian final"""
    ...

@router.post("/class-insights")
async def get_class_insights(request: ClassRequest, user=Depends(get_current_user)):
    """Heatmap error + rekomendasi untuk guru"""
    ...
```

---

## PRIORITAS PENGERJAAN

Kerjakan **berurutan** sesuai urutan ini. Jangan lompat fase.

### Prioritas 1 — Core Workspace (MVP)
1. Setup Vite + React + Zustand + Tailwind
2. Header + routing dasar (Beranda, Ruang Belajar, Galeri)
3. Design system CSS variables + Tailwind config (neo-brutalism)
4. Beranda (port dari HTML lama, hapus Django syntax)
5. PaletBlok + Kanvas + DropZone + KanvasItem (port logika AST dari JS lama)
6. PreviewPanel (iframe sandboxed) + CodePanel (syntax highlighted)
7. Dynamic Validator (rules-based, bukan hardcode)
8. Workspace berfungsi penuh dengan level Easy-1

### Prioritas 2 — CT Journey
9. CTJourneyModal (4 fase, muncul sebelum kanvas)
10. Koneksi CT Journey ke workspace (wajib selesaikan journey dulu)
11. CT pre-score dari jawaban journey

### Prioritas 3 — Backend + Auth
12. FastAPI setup + database + auth JWT
13. Room system + Pertemuan CRUD
14. Submission API + menyimpan attempt history

### Prioritas 4 — AI Integration
15. AI Tutor (Socratic, context-aware)
16. AI CT Analyzer
17. AI Grading Assistant
18. AI Teacher Insights

### Prioritas 5 — Analytics + Portfolio
19. CT Map radar chart (Recharts)
20. Student Portfolio
21. Galeri dinamis

---

## CATATAN PENTING

- **Bahasa Indonesia** untuk semua teks UI (label, pesan, tooltip, notifikasi)
- **Bahasa Inggris** untuk semua kode (variabel, fungsi, komponen, komentar teknis)
- Live preview harus menggunakan `<iframe sandbox="allow-scripts">` — JANGAN eval() atau innerHTML langsung
- Input siswa (kode HTML/CSS) harus di-escape sebelum ditampilkan di mana pun
- Rate limiting pada semua AI endpoint — simpan `last_ai_request` per user di Redis
- Semua AI response harus di-cache jika input identik (hemat biaya API)
- Mobile-friendly minimal untuk tablet (min-width: 768px)
- Semua halaman harus bisa dibuka tanpa login untuk demo (mode guest dengan data contoh)

---

## MULAI SEKARANG

1. Baca `blueprint_webcraft_v3.md` sampai selesai
2. Analisis semua file proyek yang ada
3. Buat summary pemahaman kamu (fitur apa, arsitektur apa, apa yang akan dibangun)
4. Tunggu konfirmasi sebelum menghapus apapun
5. Setelah konfirmasi: hapus semua, mulai dari Prioritas 1

**Jangan mulai coding sebelum analisis selesai dan dipresentasikan.**
