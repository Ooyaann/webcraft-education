# Implementation Plan — WebCraft 2.0
**Revisi Total dari Proyek Django Sebelumnya**
*Nayotama Aryaputra Santosa — Juni 2026*
*Stack: Vite + React 18 + FastAPI + PostgreSQL*

---

## Daftar Isi

1. [Ringkasan Perubahan dari Versi Sebelumnya](#1-ringkasan-perubahan)
2. [Arsitektur & Stack Final](#2-arsitektur--stack-final)
3. [Struktur Folder Lengkap](#3-struktur-folder-lengkap)
4. [Fase 0 — Fondasi & Setup](#fase-0--fondasi--setup)
5. [Fase 1 — Autentikasi & Sidebar Navigation](#fase-1--autentikasi--sidebar-navigation)
6. [Fase 2 — Beranda per Role](#fase-2--beranda-per-role)
7. [Fase 3 — Ruang Belajar (Classroom System)](#fase-3--ruang-belajar-classroom-system)
8. [Fase 4 — Workspace (2-Panel + Switch)](#fase-4--workspace-2-panel--switch)
9. [Fase 5 — CT Journey Modal](#fase-5--ct-journey-modal)
10. [Fase 6 — Backend & Database](#fase-6--backend--database)
11. [Fase 7 — Assessment System](#fase-7--assessment-system)
12. [Fase 8 — Integrasi AI (3 Lapisan)](#fase-8--integrasi-ai-3-lapisan)
13. [Fase 9 — Galeri Karya](#fase-9--galeri-karya)
14. [Fase 10 — Perkembanganku (CT Map)](#fase-10--perkembanganku-ct-map)
15. [Fase 11 — Penilaian & Analitik Guru](#fase-11--penilaian--analitik-guru)
16. [Fase 12 — Asisten AI Guru](#fase-12--asisten-ai-guru)
17. [Database Schema Lengkap](#database-schema-lengkap)
18. [API Endpoint Lengkap](#api-endpoint-lengkap)
19. [Design System & Token](#design-system--token)
20. [Urutan Prioritas & Timeline](#urutan-prioritas--timeline)

---

## 1. Ringkasan Perubahan

Berikut adalah delta antara desain lama (blueprint v3) dengan desain final yang sudah direvisi berdasarkan diskusi. Setiap item perubahan ini harus direfleksikan ke kode.

### Perubahan Struktur Navigasi

| Lama (Blueprint v3) | Baru (Final) | Alasan |
|---|---|---|
| Navbar horizontal di atas | Sidebar kiri — pill/round icon, collapse/expand | Lebih dinamis, terkesan profesional, cocok untuk classroom app |
| Menu: Beranda, Ruang Belajar, Dashboard, Galeri, CT Map, Portfolio | Guest: 3 menu. Siswa: 5 menu. Guru: 5 menu | Disesuaikan per role, tidak ada menu generic |
| "Dashboard" untuk siswa | "Tugasku" (list tugas belum selesai dari semua room) | Dashboard terkesan seperti beranda duplikat |
| "Portfolio" sebagai menu terpisah | Dihapus — fungsinya overlap dengan Galeri Karya | Efisiensi, tidak redundant |
| "CT Map" — nama teknis | "Perkembanganku" — nama mudah dipahami siswa SMP | Aksesibilitas bahasa |
| Dashboard guru | Beranda guru (personalized) + menu "Penilaian & Analitik" terpisah | Guru butuh halaman kerja, bukan sekadar overview |

### Perubahan Ruang Belajar

| Lama | Baru | Alasan |
|---|---|---|
| Langsung ke triple-view interface | List room → list tugas → detail pertemuan → CT Journey → workspace | Alur seperti Google Classroom, lebih intuitif |
| "Level" 1, 2, 3 gamifikatif | Pre-test → Pertemuan 1..N → Project → Post-test berurutan | Sesuai ritme pembelajaran sekolah |
| Tidak ada kode kelas | Input kode 6-digit untuk join room | Seperti Google Classroom / Kahoot |
| Guru tidak bisa CRUD dari UI | CRUD penuh dari Ruang Belajar guru | Guru harus bisa kelola konten sendiri |

### Perubahan Workspace

| Lama | Baru | Alasan |
|---|---|---|
| Triple-view: Palet + Kanvas + Preview + Code (4 area) | 2 panel: Palet Blok (kiri) + Kanvas dengan switch card Preview/Code (kanan) | Lebih bersih, tidak overwhelming untuk siswa SMP |
| Emoji di UI | Icon Tabler outline saja | Kesan profesional |
| Triple assessment selalu visible | Assessment tersimpan di backend, tidak selalu ditampilkan di workspace | Tidak membebani siswa dengan angka terus |

### Perubahan Galeri Karya

| Lama | Baru | Alasan |
|---|---|---|
| 1 galeri global | 2 akses: (1) menu navbar = semua room + tag, (2) dalam room = karya room itu saja | Konteks lebih relevan per audience |
| Tidak ada tag room | Tag room + tanggal di setiap karya pada galeri global | Identifikasi konteks karya |

### Perubahan AI Integration

| Lama | Baru | Alasan |
|---|---|---|
| AI tersebar, tidak ada wow factor yang jelas | 3 lapisan terdefinisi: AI Tutor Siswa, AI Analitik CT, AI Asisten Guru | Setiap lapisan punya peran berbeda, mudah dikomunikasikan |
| Tidak ada strategi UI untuk tonjolkan AI | Badge "AI" kecil, animasi loading AI, warna berbeda output AI | AI terlihat dan terasa berguna di UI |
| AI Asisten Guru tersebar | Menu "Asisten AI" tersendiri di sidebar guru | Terpusat, mudah ditemukan |

---

## 2. Arsitektur & Stack Final

```
FRONTEND
  Framework    : React 18 + Vite 5
  Language     : JavaScript ES Modules
  State        : Zustand
  Styling      : Tailwind CSS + CSS Variables (neo-brutalism tokens)
  Drag & Drop  : @dnd-kit/core
  Charts       : Recharts (radar chart CT, line chart tren)
  HTTP         : Axios
  Routing      : React Router v6
  Icons        : Tabler Icons outline (ti-*)
  Fonts        : Fredoka (heading/display) + Nunito (body) — Google Fonts

BACKEND
  Framework    : FastAPI (Python 3.11+)
  Database     : PostgreSQL 15 + SQLAlchemy (async)
  Cache        : Redis 7
  Auth         : JWT (python-jose + passlib[bcrypt])
  AI           : Gemini API
  Validation   : Pydantic v2
  ASGI Server  : Uvicorn

DEPLOYMENT
  Frontend     : Vercel (auto-deploy dari GitHub)
  Backend      : Railway atau Render
  Database     : Supabase (PostgreSQL managed, free tier)
  Cache        : Upstash Redis (serverless, free tier)
```

---

## 3. Struktur Folder Lengkap

```
webcraft/
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── tailwind.config.js
│   │
│   └── src/
│       ├── main.jsx
│       ├── App.jsx                        ← routing utama + auth guard
│       │
│       ├── pages/
│       │   ├── Beranda.jsx                ← berbeda per role (guest/siswa/guru)
│       │   ├── RuangBelajar.jsx           ← list room + join dengan kode
│       │   ├── RoomDetail.jsx             ← list tugas dalam satu room
│       │   ├── TugasDetail.jsx            ← detail pertemuan/project/test
│       │   ├── Workspace.jsx              ← 2-panel workspace
│       │   ├── GaleriKarya.jsx            ← galeri global (semua room)
│       │   ├── Perkembanganku.jsx         ← CT Map + AI insight siswa
│       │   ├── Tugasku.jsx                ← list semua tugas belum selesai
│       │   ├── PenilaianAnalitik.jsx      ← rekap nilai + analitik guru
│       │   ├── AsistenAI.jsx              ← pusat AI tools guru
│       │   ├── Login.jsx
│       │   └── Register.jsx
│       │
│       ├── components/
│       │   │
│       │   ├── layout/
│       │   │   ├── Sidebar.jsx            ← sidebar kiri pill/round, collapse/expand
│       │   │   ├── SidebarItem.jsx        ← satu item menu di sidebar
│       │   │   └── PageWrapper.jsx        ← layout wrapper dengan sidebar
│       │   │
│       │   ├── workspace/
│       │   │   ├── PaletBlok.jsx          ← panel kiri: blok HTML drag source
│       │   │   ├── BlokItem.jsx           ← satu blok di palet (ti-* icon + label)
│       │   │   ├── Kanvas.jsx             ← panel kanan: area drop + switch card
│       │   │   ├── KanvasItem.jsx         ← satu node di kanvas (dapat nested)
│       │   │   ├── DropZone.jsx           ← area drop (flat + nested)
│       │   │   ├── PanelSwitch.jsx        ← card toggle: Live Preview / Live Code
│       │   │   ├── PreviewPanel.jsx       ← iframe sandboxed live preview
│       │   │   └── CodePanel.jsx          ← syntax highlighted code view
│       │   │
│       │   ├── ct-journey/
│       │   │   ├── CTJourneyModal.jsx     ← wrapper modal + step navigator
│       │   │   ├── JourneyStep.jsx        ← layout generic satu fase
│       │   │   ├── DekomposisiStep.jsx    ← chip input: list bagian website
│       │   │   ├── AbstraksiStep.jsx      ← pilih 3 dari hasil dekomposisi
│       │   │   ├── PatternStep.jsx        ← kelompokkan elemen mirip
│       │   │   └── AlgoritmaStep.jsx      ← urutkan langkah (draggable list)
│       │   │
│       │   ├── ai/
│       │   │   ├── AITutorBubble.jsx      ← chat bubble muncul di workspace
│       │   │   ├── AIBadge.jsx            ← badge kecil "AI" untuk tandai output AI
│       │   │   ├── AILoadingIndicator.jsx ← animasi saat AI sedang proses
│       │   │   ├── CTScoreRadar.jsx       ← Recharts radar chart 4 dimensi
│       │   │   ├── CTNarasi.jsx           ← narasi AI tentang profil CT siswa
│       │   │   └── InsightCard.jsx        ← kartu insight AI untuk guru
│       │   │
│       │   ├── classroom/
│       │   │   ├── RoomCard.jsx           ← kartu satu room
│       │   │   ├── JoinRoomModal.jsx      ← modal input kode 6-digit
│       │   │   ├── TugasCard.jsx          ← kartu satu tugas (pertemuan/project/test)
│       │   │   ├── TugasStatusBadge.jsx   ← badge: selesai/aktif/terkunci
│       │   │   ├── CBLEngageSection.jsx   ← Big Idea + Essential Question section
│       │   │   └── HeatmapGrid.jsx        ← visualisasi error kelas untuk guru
│       │   │
│       │   ├── assessment/
│       │   │   ├── RubrikForm.jsx         ← form penilaian guru + AI saran
│       │   │   ├── ScoreBreakdown.jsx     ← tampilkan 3 dimensi skor
│       │   │   ├── TestEngine.jsx         ← pre-test & post-test runner
│       │   │   └── TestEditor.jsx         ← editor soal untuk guru
│       │   │
│       │   └── gallery/
│       │       ├── KaryaCard.jsx          ← kartu satu karya (preview + info)
│       │       ├── KaryaPreviewMini.jsx   ← iframe mini live preview karya
│       │       └── CTBadge.jsx            ← badge CT achievement
│       │
│       ├── hooks/
│       │   ├── useAST.js                  ← semua operasi AST tree
│       │   ├── useAITutor.js              ← komunikasi AI tutor endpoint
│       │   ├── useCTScore.js              ← kalkulasi + cache CT score
│       │   ├── useAttemptTracker.js       ← rekam snapshot attempt
│       │   └── useAuth.js                 ← auth state + token refresh
│       │
│       ├── store/
│       │   ├── useWorkspaceStore.js       ← AST, attempt, CT journey state
│       │   ├── useAuthStore.js            ← user, role, token
│       │   └── useUIStore.js              ← sidebar open/close, modal state
│       │
│       ├── services/
│       │   ├── api.js                     ← Axios instance + interceptors + refresh
│       │   ├── aiService.js               ← wrapper semua AI API call
│       │   └── astUtils.js                ← toHTML, toCode, findNode, validate
│       │
│       └── styles/
│           ├── global.css                 ← CSS variables neo-brutalism tokens
│           └── sidebar.css                ← animasi sidebar collapse/expand
│
└── backend/
    ├── main.py
    ├── requirements.txt
    ├── .env.example
    │
    └── app/
        ├── routers/
        │   ├── auth.py                    ← register, login, refresh, logout
        │   ├── rooms.py                   ← CRUD room, join, list members
        │   ├── pertemuan.py               ← CRUD pertemuan + learning tasks
        │   ├── project.py                 ← CRUD project tasks + rubrik
        │   ├── submissions.py             ← submit, get, history attempt
        │   ├── ct_journey.py              ← simpan + analisis CT journey
        │   ├── gallery.py                 ← publish, list, apresiasi
        │   ├── test.py                    ← CRUD soal, submit jawaban test
        │   └── ai.py                      ← proxy semua AI endpoint
        │
        ├── models/                        ← SQLAlchemy ORM models
        │   ├── user.py
        │   ├── room.py
        │   ├── content.py                 ← pertemuan, tasks, rubrik
        │   ├── submission.py
        │   ├── gallery.py
        │   └── test.py
        │
        ├── schemas/                       ← Pydantic v2 request/response
        ├── services/
        │   ├── ai_service.py              ← Gemini API calls terpusat
        │   ├── ct_analyzer.py             ← CT scoring logic
        │   └── validator.py               ← dynamic AST validation
        │
        └── database.py                    ← async engine + session factory
```

---

## Fase 0 — Fondasi & Setup

**Target:** Semua tooling berjalan, tidak ada yang kosong.

### 0.1 Setup Frontend

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install zustand react-router-dom axios @dnd-kit/core @dnd-kit/sortable recharts
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 0.2 Tailwind Config — Neo-Brutalism Tokens

File `tailwind.config.js`:
```javascript
module.exports = {
  content: ['./src/**/*.{jsx,js}'],
  theme: {
    extend: {
      colors: {
        'wb-bg': '#E0F2FE',
        'wb-text': '#0F172A',
        'wb-blue': '#3B82F6',
        'wb-yellow': '#FACC15',
        'wb-green': '#10B981',
        'wb-pink': '#EC4899',
      },
      fontFamily: {
        display: ['Fredoka', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
    },
  },
}
```

### 0.3 CSS Variables Global

File `src/styles/global.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600&family=Nunito:wght@400;600;700&display=swap');

:root {
  --bg-color: #E0F2FE;
  --text-main: #0F172A;
  --game-blue: #3B82F6;
  --game-yellow: #FACC15;
  --game-green: #10B981;
  --game-pink: #EC4899;
  --border-thick: 4px solid #0F172A;
  --shadow-hard: 6px 6px 0px #0F172A;
  --sidebar-width-collapsed: 64px;
  --sidebar-width-expanded: 220px;
  --transition-sidebar: width 0.2s ease;
}

body {
  font-family: 'Nunito', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-main);
}

h1, h2, h3, .font-display {
  font-family: 'Fredoka', sans-serif;
}
```

### 0.4 Setup Backend

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install fastapi uvicorn[standard] sqlalchemy[asyncio] asyncpg pydantic[email] \
            python-jose[cryptography] passlib[bcrypt] anthropic redis python-dotenv
```

File `requirements.txt` — pin versi setelah install untuk reproducibility.

### 0.5 Vite Proxy Config

File `vite.config.js` — agar frontend bisa hit `/api` tanpa CORS saat development:
```javascript
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  }
}
```

---

## Fase 1 — Autentikasi & Sidebar Navigation

**Target:** Login/register berjalan, sidebar tampil sesuai role, routing terlindungi.

### 1.1 Auth Store (Zustand)

File `src/store/useAuthStore.js`:
```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(persist(
  (set, get) => ({
    user: null,           // { id, name, email, role: 'siswa'|'guru' }
    token: null,
    isAuthenticated: () => !!get().token,
    setAuth: (user, token) => set({ user, token }),
    clearAuth: () => set({ user: null, token: null }),
  }),
  { name: 'webcraft-auth' }
));
```

### 1.2 Axios Instance + Auto Refresh

File `src/services/api.js`:
```javascript
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  async err => {
    if (err.response?.status === 401) {
      useAuthStore.getState().clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
```

### 1.3 Auth Guard

File `src/components/AuthGuard.jsx`:
```jsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

// Komponen untuk route yang butuh login
export function RequireAuth({ children }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return children;
}

// Komponen untuk route yang butuh role tertentu
export function RequireRole({ role, children }) {
  const { user, isAuthenticated } = useAuthStore();
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to="/" replace />;
  return children;
}
```

### 1.4 Sidebar — Pill/Round, Collapse/Expand

Ini komponen paling penting untuk kesan visual. Sidebar berbentuk pill di kiri layar, collapse jadi ikon saja, expand saat hover atau toggle.

File `src/components/layout/Sidebar.jsx` — desain kunci:

```jsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

// Menu config per role
const menuConfig = {
  guest: [
    { to: '/', icon: 'ti-home', label: 'Beranda' },
    { to: '/ruang-belajar', icon: 'ti-school', label: 'Ruang Belajar' },
    { to: '/login', icon: 'ti-login', label: 'Masuk' },
  ],
  siswa: [
    { to: '/', icon: 'ti-home', label: 'Beranda' },
    { to: '/ruang-belajar', icon: 'ti-book', label: 'Ruang Belajar' },
    { to: '/galeri', icon: 'ti-palette', label: 'Galeri Karya' },
    { to: '/perkembanganku', icon: 'ti-chart-radar', label: 'Perkembanganku' },
    { to: '/tugasku', icon: 'ti-checklist', label: 'Tugasku' },
  ],
  guru: [
    { to: '/', icon: 'ti-home', label: 'Beranda' },
    { to: '/ruang-belajar', icon: 'ti-building-school', label: 'Ruang Belajar' },
    { to: '/galeri', icon: 'ti-photo', label: 'Galeri Karya' },
    { to: '/penilaian', icon: 'ti-chart-bar', label: 'Penilaian & Analitik' },
    { to: '/asisten-ai', icon: 'ti-robot', label: 'Asisten AI' },
  ],
};

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const { user } = useAuthStore();
  const role = user?.role ?? 'guest';
  const items = menuConfig[role];

  return (
    <aside
      style={{
        width: expanded ? 'var(--sidebar-width-expanded)' : 'var(--sidebar-width-collapsed)',
        transition: 'var(--transition-sidebar)',
      }}
      className="sidebar-pill"  // di sidebar.css: position fixed, rounded-full kiri
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Logo */}
      <div className="sidebar-logo">
        <i className="ti ti-code" style={{ fontSize: 24 }} aria-hidden />
        {expanded && <span className="sidebar-logo-text">WebCraft</span>}
      </div>

      <nav>
        {items.map(item => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) =>
            `sidebar-item ${isActive ? 'sidebar-item-active' : ''}`
          }>
            <i className={`ti ${item.icon}`} aria-hidden />
            {expanded && <span className="sidebar-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Profil di bawah */}
      {user && (
        <div className="sidebar-profile">
          <div className="sidebar-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          {expanded && <span className="sidebar-name">{user.name}</span>}
        </div>
      )}
    </aside>
  );
}
```

File `src/styles/sidebar.css` — CSS kritis:
```css
.sidebar-pill {
  position: fixed;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  background: var(--text-main);
  border-radius: 32px;
  padding: 16px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 100;
  overflow: hidden;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 20px;
  color: #9CA3AF;
  font-size: 14px;
  font-family: 'Nunito', sans-serif;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
  width: 100%;
}

.sidebar-item:hover {
  background: rgba(255,255,255,0.1);
  color: #F9FAFB;
}

.sidebar-item-active {
  background: var(--game-blue);
  color: white;
}

.sidebar-item i {
  font-size: 20px;
  flex-shrink: 0;
}

.sidebar-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--game-yellow);
  color: var(--text-main);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}
```

### 1.5 App Router

File `src/App.jsx`:
```jsx
import { Routes, Route } from 'react-router-dom';
import PageWrapper from './components/layout/PageWrapper';
import Beranda from './pages/Beranda';
import RuangBelajar from './pages/RuangBelajar';
import RoomDetail from './pages/RoomDetail';
import TugasDetail from './pages/TugasDetail';
import Workspace from './pages/Workspace';
import GaleriKarya from './pages/GaleriKarya';
import Perkembanganku from './pages/Perkembanganku';
import Tugasku from './pages/Tugasku';
import PenilaianAnalitik from './pages/PenilaianAnalitik';
import AsistenAI from './pages/AsistenAI';
import Login from './pages/Login';
import Register from './pages/Register';
import { RequireAuth, RequireRole } from './components/AuthGuard';

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Semua (guest juga bisa, tapi konten berbeda) */}
      <Route path="/" element={<PageWrapper><Beranda /></PageWrapper>} />
      <Route path="/ruang-belajar" element={<PageWrapper><RuangBelajar /></PageWrapper>} />

      {/* Siswa only */}
      <Route path="/ruang-belajar/:roomId" element={
        <RequireAuth><PageWrapper><RoomDetail /></PageWrapper></RequireAuth>
      }/>
      <Route path="/ruang-belajar/:roomId/tugas/:tugasId" element={
        <RequireAuth><PageWrapper><TugasDetail /></PageWrapper></RequireAuth>
      }/>
      <Route path="/workspace/:tugasId" element={
        <RequireAuth><Workspace /></RequireAuth>  // tanpa sidebar — full screen
      }/>
      <Route path="/galeri" element={<PageWrapper><GaleriKarya /></PageWrapper>} />
      <Route path="/perkembanganku" element={
        <RequireRole role="siswa"><PageWrapper><Perkembanganku /></PageWrapper></RequireRole>
      }/>
      <Route path="/tugasku" element={
        <RequireRole role="siswa"><PageWrapper><Tugasku /></PageWrapper></RequireRole>
      }/>

      {/* Guru only */}
      <Route path="/penilaian" element={
        <RequireRole role="guru"><PageWrapper><PenilaianAnalitik /></PageWrapper></RequireRole>
      }/>
      <Route path="/asisten-ai" element={
        <RequireRole role="guru"><PageWrapper><AsistenAI /></PageWrapper></RequireRole>
      }/>
    </Routes>
  );
}
```

### 1.6 Backend Auth Endpoints

File `backend/app/routers/auth.py`:

```python
POST /api/auth/register
  Body: { name, email, password, role, nisn_or_nip }
  Response: { user, access_token }

POST /api/auth/login
  Body: { email, password }
  Response: { user, access_token }

POST /api/auth/logout
  Header: Authorization Bearer
  Response: 204

GET /api/auth/me
  Header: Authorization Bearer
  Response: { id, name, email, role, created_at }
```

---

## Fase 2 — Beranda per Role

**Target:** Beranda menampilkan konten berbeda untuk Guest, Siswa, dan Guru. Tidak ada halaman yang sama persis.

### 2.1 Logika Role Detection

File `src/pages/Beranda.jsx` — gunakan conditional rendering berdasarkan role:

```jsx
import { useAuthStore } from '../store/useAuthStore';
import BerandaGuest from '../components/beranda/BerandaGuest';
import BerandaSiswa from '../components/beranda/BerandaSiswa';
import BerandaGuru from '../components/beranda/BerandaGuru';

export default function Beranda() {
  const { user } = useAuthStore();
  if (!user) return <BerandaGuest />;
  if (user.role === 'siswa') return <BerandaSiswa user={user} />;
  if (user.role === 'guru') return <BerandaGuru user={user} />;
}
```

### 2.2 BerandaGuest — Landing Page

Konten yang harus ada (fokus konversi):
- Hero section: tagline utama + CTA "Coba Sekarang" dan "Daftar Gratis"
- Demo workspace embedded (mode guest, tidak perlu login)
- Section: "Apa itu CT?" — penjelasan singkat 4 dimensi
- Section: Fitur unggulan — CT Journey, AI Tutor, Triple Assessment
- Section: Competitive advantage — tabel vs Scratch/Code.org/W3Schools
- Footer CTA

### 2.3 BerandaSiswa — Personalized Dashboard

Konten:
- Sapaan: "Selamat datang, [Nama]!"
- Widget: Ringkasan CT terbaru (mini radar chart 4 dimensi)
- Widget: 3 tugas terdekat yang belum selesai (card dengan deadline)
- Widget: Notifikasi — nilai baru masuk, feedback guru
- Widget: Room yang diikuti (card kecil per room + progress)
- CTA: "Lanjutkan belajar" → link ke tugas terakhir yang dikerjakan

### 2.4 BerandaGuru — Operational Dashboard

Konten:
- Sapaan + tanggal hari ini
- Widget: Ringkasan semua room (nama, jumlah siswa, % progress)
- Widget: Submission baru yang belum dinilai (kartu per submission)
- Widget: Siswa yang perlu perhatian (AI flag: tidak ada progress, banyak error)
- Widget: Notifikasi — siswa baru join, tugas deadline dekat
- CTA: "Buka kelas" → link ke room yang paling aktif

---

## Fase 3 — Ruang Belajar (Classroom System)

**Target:** Alur join room, browse tugas, dan masuk ke detail pertemuan berjalan penuh. Guru bisa CRUD semua konten dari sini.

### 3.1 Halaman Ruang Belajar — Siswa

**State awal:** Belum punya room.
- Tampilkan pesan "Kamu belum bergabung ke kelas manapun"
- Tombol "+ Gabung Kelas" → membuka `JoinRoomModal`

**State setelah join room:**
- List card room yang diikuti
- Tiap card: nama room, nama guru, jumlah tugas aktif, progress bar
- Klik card → masuk ke `RoomDetail`

**JoinRoomModal:**
```jsx
// Form input 6-digit kode kelas
// Validasi: hanya angka + huruf kapital
// Error state: "Kode tidak ditemukan" / "Kamu sudah terdaftar"
// Success: room langsung muncul di list
```

### 3.2 Halaman Room Detail — List Tugas

URL: `/ruang-belajar/:roomId`

Tampilan:
```
[Header: nama room + nama guru + kode WC-XXXXX]

[Daftar tugas berurutan vertikal:]
[ PRE-TEST ] ← badge biru "Wajib Pertama"
[ Pertemuan 1: Struktur Bumi ] ← badge hijau "Selesai"
[ Pertemuan 2: Elemen Teks ] ← badge kuning "Aktif" ← highlighted
[ Pertemuan 3: List & Gambar ] ← badge abu "Terkunci"
[ Project 1: Profil Planet ] ← badge oranye "Belum dibuka"
[ Pertemuan 4-7: ... ]
[ Project 2: ... ]
[ POST-TEST ] ← badge abu "Tersedia di akhir"
```

Keterangan status tiap tugas:
- `selesai`: hijau, bisa dibuka kembali untuk review
- `aktif`: kuning, bisa dikerjakan sekarang
- `terkunci`: abu, blur, tidak bisa diklik — guru belum buka
- `perlu dinilai`: ungu — sudah submit, menunggu guru
- `dinilai`: biru tua — nilai sudah masuk

### 3.3 Halaman Tugas Detail

URL: `/ruang-belajar/:roomId/tugas/:tugasId`

Konten (bisa berbeda-beda tergantung tipe tugas):

**Tipe: Pertemuan**
- Header CBL: Big Idea + Essential Question dalam card visual
- Materi: konten dari guru (teks, video embed, link)
- Challenge: deskripsi tugas
- Tombol "Mulai Kerjakan" → trigger CT Journey Modal → Workspace

**Tipe: Project**
- Deskripsi studi kasus (konteks STEAM)
- Rubrik penilaian (apa yang akan dinilai)
- Deadline
- Status karya (belum submit / menunggu penilaian / sudah dinilai)
- Jika sudah dinilai: tampilkan skor + komentar guru

**Tipe: Pre-test / Post-test**
- Instruksi singkat
- Tombol "Mulai Test" → masuk ke `TestEngine`

### 3.4 Ruang Belajar — Guru (CRUD Kompleks)

Ini halaman paling kompleks untuk guru. Struktur:

**Tab/Section 1: Room saya**
- List room yang dikelola guru
- Tombol "Buat Room Baru" → form: nama room, deskripsi
- Setelah buat: kode 6-digit auto-generated, bisa salin
- Tiap room card: nama, kode, jumlah siswa, tombol "Kelola"

**Tab/Section 2: Kelola Pertemuan** (setelah pilih room)
- List semua item (pre-test, pertemuan 1-N, project, post-test)
- Tombol "+ Tambah Pertemuan"
- Tombol "+ Tambah Project"
- Drag untuk reorder urutan
- Toggle buka/tutup tiap item
- Klik item → form edit detail

**Form Edit Pertemuan:**
```
Judul pertemuan *
Konteks STEAM (pilih: Sains/Matematika/Teknologi/Seni/...)
Big Idea *
Essential Question *
Materi (rich text / embed URL / upload file)
Deskripsi challenge *
Validator rules JSON (bisa pakai AI Generator untuk bantu)
Max attempt sebelum AI hint aktif (default: 4)
Pertanyaan refleksi (bisa tambah lebih dari 1)
Status: Tutup / Buka untuk siswa
```

**Form Edit Project:**
```
Judul project *
Studi kasus / deskripsi *
Deadline *
Rubrik penilaian (tabel: kriteria, bobot %, deskripsi)
  - Tambah/hapus baris rubrik
  - Tombol "Gunakan Template Default"
Status: Tutup / Buka
```

**Tab/Section 3: Pre-test & Post-test Editor**
- Buat bank soal
- 5 tipe soal: MCQ, analisis kode, urutan logika, prediksi output, identifikasi error
- AI bisa rekomendasikan soal berdasarkan materi yang sudah dibuat
- Preview soal sebelum publish
- Assign ke pre-test atau post-test

### 3.5 Backend — Room & Pertemuan

```python
# Rooms
GET    /api/rooms                    ← list room saya (guru: yang dibuat, siswa: yang diikuti)
POST   /api/rooms                    ← buat room baru (guru only)
GET    /api/rooms/:id                ← detail room
PUT    /api/rooms/:id                ← update room (guru only)
POST   /api/rooms/:id/join           ← join room dengan kode (siswa)
GET    /api/rooms/:id/members        ← list siswa di room (guru only)
GET    /api/rooms/:id/tugas          ← list semua tugas di room

# Pertemuan
POST   /api/rooms/:id/pertemuan      ← buat pertemuan baru
PUT    /api/pertemuan/:id            ← update pertemuan
DELETE /api/pertemuan/:id            ← hapus pertemuan
PATCH  /api/pertemuan/:id/status     ← buka/tutup { is_published: bool }
POST   /api/pertemuan/:id/reorder    ← ubah urutan

# Project Tasks
POST   /api/rooms/:id/project        ← buat project task
PUT    /api/project/:id              ← update project + rubrik
PATCH  /api/project/:id/status       ← buka/tutup
```

---

## Fase 4 — Workspace (2-Panel + Switch)

**Target:** Workspace berfungsi penuh dengan palet blok, kanvas drag-drop, dan switch antara Live Preview dan Live Code.

### 4.1 Layout Workspace

Workspace adalah halaman full-screen — tanpa sidebar, tanpa header standar. Hanya toolbar minimal di atas.

```
[Toolbar atas: judul tugas | attempt counter | tombol Cek Logika | tombol Selesai]
│
├── Panel Kiri (40%): PaletBlok
│   ├── Kategori blok (Struktur / Teks / Media / CSS)
│   └── List BlokItem yang bisa di-drag
│
└── Panel Kanan (60%): Kanvas + Switch
    ├── [Switch Card: "Kanvas" | "Live Preview" | "Kode HTML"]
    │                ↑ 3 tab, default "Kanvas"
    ├── Tab Kanvas: area drag-drop nested
    ├── Tab Live Preview: iframe sandboxed
    └── Tab Kode HTML: syntax highlighted, read-only (atau editable?)
```

**Catatan penting:** Switch menggunakan komponen card/tab kecil yang elegan, bukan tombol kasar. Icon Tabler untuk tiap tab:
- `ti-layout-kanban` untuk Kanvas
- `ti-eye` untuk Live Preview
- `ti-code` untuk Kode HTML

### 4.2 AST State di Zustand

File `src/store/useWorkspaceStore.js`:
```javascript
import { create } from 'zustand';

const useWorkspaceStore = create((set, get) => ({
  // Core workspace
  ast: [],
  selectedNodeId: null,
  activePanel: 'kanvas',   // 'kanvas' | 'preview' | 'code'

  // Attempt tracking
  attemptHistory: [],
  attemptCount: 0,

  // CT Journey
  ctJourneyAnswers: {
    dekomposisi: [],        // array string
    abstraksi: [],          // array string (subset dekomposisi)
    pattern: [],            // array of groups
    algoritma: [],          // array string (ordered)
  },
  ctJourneyCompleted: false,
  ctPreScore: null,

  // Session
  activeTugas: null,
  user: null,

  // Actions
  setActivePanel: (panel) => set({ activePanel: panel }),
  addBlock: (type, parentId) => { /* lihat detail useAST */ },
  removeBlock: (id) => { /* ... */ },
  moveBlock: (sourceId, targetId) => { /* ... */ },
  updateContent: (id, content) => { /* ... */ },
  recordAttempt: (errors) => {
    const snapshot = {
      attempt: get().attemptCount + 1,
      timestamp: Date.now(),
      ast: JSON.parse(JSON.stringify(get().ast)),
      errors,
    };
    set(s => ({
      attemptHistory: [...s.attemptHistory, snapshot],
      attemptCount: s.attemptCount + 1,
    }));
  },
  resetWorkspace: () => set({
    ast: [],
    selectedNodeId: null,
    attemptHistory: [],
    attemptCount: 0,
    ctJourneyAnswers: { dekomposisi: [], abstraksi: [], pattern: [], algoritma: [] },
    ctJourneyCompleted: false,
    ctPreScore: null,
  }),
}));
```

### 4.3 AST Utils

File `src/services/astUtils.js`:
```javascript
const CONTAINERS = new Set(['body', 'div', 'ul', 'ol', 'nav', 'section', 'header', 'footer']);
const VOID_ELEMENTS = new Set(['img', 'br', 'hr', 'input']);

// Serialize AST → string HTML (untuk preview)
export function astToHTML(nodes, depth = 0) {
  const indent = '  '.repeat(depth);
  return nodes.map(node => {
    if (node.type === 'style') return `${indent}<style>\n${node.content}\n${indent}</style>`;
    if (VOID_ELEMENTS.has(node.type)) return `${indent}<${node.type} ${attrsToStr(node.attrs)} />`;
    if (CONTAINERS.has(node.type)) {
      const inner = astToHTML(node.children || [], depth + 1);
      return `${indent}<${node.type}>\n${inner}\n${indent}</${node.type}>`;
    }
    return `${indent}<${node.type}>${escapeHTML(node.content || '')}</${node.type}>`;
  }).join('\n');
}

// Validate AST terhadap rules dari database
export function validateAST(ast, rules) {
  const errors = [];
  for (const rule of rules) {
    switch (rule.type) {
      case 'exists':
        if (!findInAST(ast, rule.selector)) errors.push(rule.error_message);
        break;
      case 'child_of':
        if (!isChildOf(ast, rule.parent, rule.child)) errors.push(rule.error_message);
        break;
      case 'content_match':
        if (!contentMatch(ast, rule.selector, rule.value, rule.case_insensitive)) errors.push(rule.error_message);
        break;
      case 'count':
        const count = countInAST(ast, rule.selector);
        if (count < (rule.min || 0)) errors.push(rule.error_message);
        break;
    }
  }
  return errors;   // array kosong = valid
}

// Helpers
function escapeHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function findInAST(nodes, selector) { /* rekursif cari node */ }
function isChildOf(nodes, parentType, childType) { /* cek apakah childType ada di dalam parentType */ }
// ... dll
```

### 4.4 Drag and Drop dengan @dnd-kit

Gunakan `@dnd-kit/core` dan `@dnd-kit/sortable`. Kunci implementasi:

```jsx
// PaletBlok.jsx — drag SOURCE
import { useDraggable } from '@dnd-kit/core';

function BlokItem({ type, icon, label }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { type: 'new-block', blockType: type },
  });
  return (
    <div ref={setNodeRef} {...listeners} {...attributes}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="blok-item"
    >
      <i className={`ti ${icon}`} />
      <span>{label}</span>
    </div>
  );
}

// Kanvas.jsx — DROP TARGET
import { DndContext, DragOverlay } from '@dnd-kit/core';

function Kanvas() {
  const { addBlock, moveBlock, ast } = useWorkspaceStore();

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;
    if (active.data.current.type === 'new-block') {
      // Drop dari palet → tambah blok baru
      addBlock(active.data.current.blockType, over.id);
    } else {
      // Reorder atau pindah parent
      moveBlock(active.id, over.id);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="kanvas-area">
        {ast.map(node => (
          <KanvasItem key={node.id} node={node} />
        ))}
        <DropZone id="kanvas-root" />
      </div>
    </DndContext>
  );
}
```

### 4.5 Live Preview — Iframe Sandboxed

```jsx
// PreviewPanel.jsx
function PreviewPanel() {
  const { ast } = useWorkspaceStore();
  const htmlContent = astToHTML(ast);

  const fullHTML = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8">
<style>body { font-family: sans-serif; padding: 16px; }</style>
</head>
<body>${htmlContent}</body>
</html>`;

  return (
    <iframe
      srcDoc={fullHTML}
      sandbox="allow-scripts"
      style={{ width: '100%', height: '100%', border: 'none' }}
      title="Live Preview"
    />
  );
}
```

**Penting:** `srcDoc` bukan `src` — ini aman. `sandbox="allow-scripts"` tapi tidak ada `allow-same-origin` → XSS tidak bisa escape.

### 4.6 Panel Switch Component

```jsx
// PanelSwitch.jsx
const tabs = [
  { id: 'kanvas', icon: 'ti-layout-kanban', label: 'Kanvas' },
  { id: 'preview', icon: 'ti-eye', label: 'Preview' },
  { id: 'code', icon: 'ti-code', label: 'HTML' },
];

export default function PanelSwitch() {
  const { activePanel, setActivePanel } = useWorkspaceStore();
  return (
    <div className="panel-switch">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActivePanel(tab.id)}
          className={`panel-switch-tab ${activePanel === tab.id ? 'active' : ''}`}
        >
          <i className={`ti ${tab.icon}`} aria-hidden />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
```

---

## Fase 5 — CT Journey Modal

**Target:** Modal 4 fase wajib sebelum workspace terbuka. Tidak bisa di-skip. Setiap fase dipandu AI.

### 5.1 Alur Modal

```
Siswa klik "Mulai Kerjakan"
  → cek: apakah CT Journey sudah selesai untuk tugas ini?
    → sudah: langsung buka workspace
    → belum: tampilkan CTJourneyModal
      → Fase 1: Dekomposisi
      → Fase 2: Abstraksi
      → Fase 3: Pattern Recognition
      → Fase 4: Algoritma
      → Summary AI
      → Tombol "Mulai Coding!" → workspace terbuka
```

### 5.2 CTJourneyModal

```jsx
// CTJourneyModal.jsx
const STEPS = ['dekomposisi', 'abstraksi', 'pattern', 'algoritma'];

export default function CTJourneyModal({ tugas, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const { ctJourneyAnswers, setCTAnswer } = useWorkspaceStore();

  async function handleStepComplete(stepData) {
    setIsLoadingAI(true);
    try {
      const feedback = await aiService.analyzeCTStep({
        step: STEPS[currentStep],
        student_answer: stepData,
        challenge_context: tugas.challenge_description,
      });
      setAiFeedback(feedback);
    } finally {
      setIsLoadingAI(false);
    }
  }

  function handleNext() {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1);
      setAiFeedback(null);
    } else {
      // Semua fase selesai
      onComplete(ctJourneyAnswers);
    }
  }

  const StepComponent = {
    dekomposisi: DekomposisiStep,
    abstraksi: AbstraksiStep,
    pattern: PatternStep,
    algoritma: AlgoritmaStep,
  }[STEPS[currentStep]];

  return (
    <div className="ct-journey-overlay">  {/* full screen modal */}
      <div className="ct-journey-modal">
        {/* Progress bar 4 langkah */}
        <StepProgressBar steps={STEPS} current={currentStep} />

        {/* Konten fase aktif */}
        <StepComponent
          tugas={tugas}
          previousAnswers={ctJourneyAnswers}
          onComplete={handleStepComplete}
        />

        {/* AI Feedback */}
        {isLoadingAI && <AILoadingIndicator />}
        {aiFeedback && (
          <div className="ai-feedback-card">
            <AIBadge />
            <p>{aiFeedback.message}</p>
            <button onClick={handleNext}>
              {currentStep < 3 ? 'Lanjut ke Fase Berikutnya' : 'Lihat Ringkasan'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

### 5.3 Detail Tiap Fase

**DekomposisiStep:**
- Pertanyaan AI: "Website [judul] ini terdiri dari bagian-bagian apa saja?"
- Input: chip input — siswa ketik lalu tekan Enter/tombol tambah, muncul sebagai chip
- Minimum 3 chip sebelum bisa submit
- AI evaluasi kelengkapan, beri feedback + badge "bagian yang terlewat"

**AbstraksiStep:**
- Tampilkan semua chip dari fase dekomposisi
- Siswa pilih tepat 3 yang paling penting (toggle select)
- AI evaluasi kualitas prioritisasi
- Feedback: "Pilihanmu sudah baik karena..."

**PatternStep:**
- Tampilkan chip dari fase dekomposisi (semua)
- Siswa drag chip ke grup-grup yang mereka buat sendiri
- Interface: kolom "Belum dikelompokkan" + tombol "+ Buat Grup Baru"
- AI evaluasi pola pengelompokan

**AlgoritmaStep:**
- Tampilkan hasil fase abstraksi + pattern sebagai list item
- Siswa drag untuk mengurutkan langkah dari pertama sampai terakhir
- Gunakan `@dnd-kit/sortable` untuk drag reorder
- AI evaluasi logika urutan

### 5.4 Backend CT Journey

```python
POST /api/ct-journey/start
  Body: { tugas_id }
  Response: { session_id, challenge_context }

POST /api/ct-journey/step
  Body: { session_id, step: 'dekomposisi'|'abstraksi'|'pattern'|'algoritma', answer }
  Response: { feedback, ct_delta, hint_for_next }

POST /api/ct-journey/complete
  Body: { session_id, all_answers }
  Response: { ct_pre_score: { dekomposisi, abstraksi, pattern, algoritma } }
```

---

## Fase 6 — Backend & Database

**Target:** Semua data tersimpan ke PostgreSQL, auth JWT berjalan, API siap dikonsumsi frontend.

### 6.1 FastAPI Main

File `backend/main.py`:
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, rooms, pertemuan, project, submissions, ct_journey, gallery, test, ai
from app.database import init_db

app = FastAPI(title="WebCraft API", version="2.0")

app.add_middleware(CORSMiddleware,
  allow_origins=["http://localhost:5173", "https://webcraft.vercel.app"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
  await init_db()

# Include routers
app.include_router(auth.router, prefix="/api/auth")
app.include_router(rooms.router, prefix="/api")
app.include_router(pertemuan.router, prefix="/api")
app.include_router(project.router, prefix="/api")
app.include_router(submissions.router, prefix="/api")
app.include_router(ct_journey.router, prefix="/api/ct-journey")
app.include_router(gallery.router, prefix="/api/gallery")
app.include_router(test.router, prefix="/api/test")
app.include_router(ai.router, prefix="/api/ai")
```

### 6.2 Async Database Setup

File `backend/app/database.py`:
```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
import os

DATABASE_URL = os.getenv("DATABASE_URL").replace("postgresql://", "postgresql+asyncpg://")

engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)

class Base(DeclarativeBase):
    pass

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
```

### 6.3 JWT Auth

```python
# app/services/auth_service.py
from jose import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"])

def create_access_token(user_id: str, role: str) -> str:
    payload = {
        "sub": str(user_id),
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=24),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme), db = Depends(get_db)):
    # decode token → return user object
    ...
```

---

## Fase 7 — Assessment System

**Target:** Process Score otomatis, rubrik guru untuk project, pre-test/post-test engine berjalan.

### 7.1 Process Score (Otomatis)

Dihitung di backend setelah siswa submit learning task:

```python
# app/services/ct_analyzer.py

def calculate_process_score(attempt_history: list) -> dict:
    attempt_count = len(attempt_history)
    final_attempt = attempt_history[-1]

    # Akurasi: apakah akhirnya benar?
    accuracy = 100 if not final_attempt['errors'] else (
        70 if len(final_attempt['errors']) <= 1 else
        50 if final_attempt.get('structure_ok') else 0
    )

    # Efisiensi: berapa banyak attempt?
    efficiency_map = {1: 100, 2: 85, 3: 70, 4: 55, 5: 40}
    efficiency = efficiency_map.get(attempt_count, 25)

    # Pola: apakah tiap attempt ada perbaikan?
    improvement_pattern = analyze_improvement_pattern(attempt_history)

    process_score = (accuracy * 0.6) + (efficiency * 0.4)

    return {
        "process_score": round(process_score),
        "accuracy": accuracy,
        "efficiency": efficiency,
        "improvement_pattern": improvement_pattern,  # 'systematic' | 'random' | 'single-shot'
        "attempt_count": attempt_count,
    }

def analyze_improvement_pattern(history: list) -> str:
    if len(history) == 1:
        return 'single-shot'
    deltas = []
    for i in range(1, len(history)):
        prev_errors = len(history[i-1]['errors'])
        curr_errors = len(history[i]['errors'])
        deltas.append(curr_errors - prev_errors)  # negatif = membaik
    # Jika setiap attempt error berkurang = systematic
    if all(d <= 0 for d in deltas):
        return 'systematic'
    return 'random'
```

### 7.2 Rubrik Penilaian Project (Guru)

Guru bisa CRUD rubrik per project. Default rubrik:
```json
[
  { "id": "r1", "kriteria": "Kelengkapan elemen", "bobot": 25, "deskripsi": "Semua elemen yang diminta ada" },
  { "id": "r2", "kriteria": "Kebenaran semantik", "bobot": 25, "deskripsi": "Elemen digunakan sesuai fungsi HTML" },
  { "id": "r3", "kriteria": "Kreativitas desain", "bobot": 25, "deskripsi": "Ada upaya estetika dan personal" },
  { "id": "r4", "kriteria": "Kompleksitas CT", "bobot": 25, "deskripsi": "Nesting, list, struktur kompleks digunakan benar" }
]
```

Guru input skor 0-100 per kriteria, weighted average = nilai final.

### 7.3 Test Engine

```jsx
// TestEngine.jsx — runner untuk pre/post test

const QUESTION_TYPES = {
  mcq: MCQQuestion,          // pilihan ganda
  code_analysis: CodeAnalysis, // tampilkan kode, tanya kesalahannya
  sequence: SequenceQuestion,  // drag untuk urutkan langkah
  predict_output: PredictOutput, // apa output kode ini?
  error_identify: ErrorIdentify, // highlight bagian kode yang salah
};

export default function TestEngine({ test }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  async function submitTest() {
    const result = await api.post(`/api/test/${test.id}/submit`, { answers });
    setSubmitted(true);
    // Tampilkan skor + review jawaban
  }

  const question = test.questions[currentQ];
  const QuestionComponent = QUESTION_TYPES[question.type];

  return (
    <div className="test-engine">
      <TestProgressBar total={test.questions.length} current={currentQ} />
      <QuestionComponent
        question={question}
        onAnswer={(ans) => setAnswers(a => ({ ...a, [question.id]: ans }))}
      />
      <button onClick={() => currentQ < test.questions.length - 1
        ? setCurrentQ(q => q + 1)
        : submitTest()
      }>
        {currentQ < test.questions.length - 1 ? 'Lanjut' : 'Selesaikan Test'}
      </button>
    </div>
  );
}
```

---

## Fase 8 — Integrasi AI (3 Lapisan)

**Target:** Tiga lapisan AI yang berbeda peran, masing-masing terlihat jelas di UI.

### 8.1 AI Service — Backend Proxy

**Semua panggilan ke Gemini harus melalui backend.** Jangan pernah expose API key ke frontend.

File `backend/app/services/ai_service.py`:
```python
import google.generativeai as genai
import os
from functools import lru_cache

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

async def call_gemini(system_prompt: str, user_message: str, max_tokens: int = 500) -> str:
    message = client.models.generate_content(
        model="gemini-3.5-flash",
        max_tokens=max_tokens,
        system=system_prompt,
        messages=[{"role": "user", "content": user_message}]
    )
    return message.content[0].text
```

File `backend/app/routers/ai.py` — semua endpoint AI:

### 8.2 Lapisan 1 — AI Tutor Siswa

**Endpoint:**
```python
POST /api/ai/tutor
  Body: {
    current_ast: {...},
    target_rules: [...],     # validator rules dari tugas
    attempt_history: [...],  # semua snapshot sebelumnya
    student_message: "...",  # pertanyaan siswa
    lesson_context: {
      pertemuan_judul: "...",
      materi_topik: "...",
      attempt_count: 4,
    }
  }
  Response: { hint: "...", should_show_example: bool }
```

**System Prompt AI Tutor:**
```python
TUTOR_SYSTEM_PROMPT = """
Kamu adalah tutor coding Web untuk siswa SMP kelas 7 Indonesia.
Metode wajib: Socratic — JANGAN pernah memberikan jawaban langsung.
Selalu balik tanya untuk menuntun siswa menemukan sendiri.

Aturan:
- Gunakan Bahasa Indonesia yang ramah dan encouraging
- Tidak boleh menyebut jawaban spesifik (nama tag, struktur exact)
- Maksimal 3 kalimat per respons — singkat dan fokus
- Mulai dengan mengakui apa yang sudah benar dari siswa
- Tanya satu pertanyaan penuntun di akhir

Konteks: Siswa sedang di pertemuan {pertemuan_judul}, topik {materi_topik}.
Ini adalah attempt ke-{attempt_count} siswa.
"""
```

**Frontend — AITutorBubble:**
```jsx
// AITutorBubble.jsx
export default function AITutorBubble() {
  const { attemptCount, ast, activeTugas } = useWorkspaceStore();
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Auto-show setelah attempt ke-4
  useEffect(() => {
    if (attemptCount >= 4) setVisible(true);
  }, [attemptCount]);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(m => [...m, { role: 'user', content: userMsg }]);

    const response = await aiService.getTutorHint({
      current_ast: ast,
      student_message: userMsg,
      attempt_history: /* dari store */,
      lesson_context: activeTugas,
    });

    setMessages(m => [...m, { role: 'ai', content: response.hint }]);
  }

  if (!visible) return (
    // Tombol kecil di pojok kanan bawah workspace
    <button className="ai-tutor-trigger" onClick={() => setVisible(true)}>
      <AIBadge />
      <i className="ti ti-robot" />
      <span>Minta Petunjuk</span>
    </button>
  );

  return (
    <div className="ai-tutor-bubble">
      <div className="ai-tutor-header">
        <AIBadge />
        <span>AI Tutor</span>
        <button onClick={() => setVisible(false)}><i className="ti ti-x" /></button>
      </div>
      <div className="ai-tutor-messages">
        {messages.map((m, i) => (
          <div key={i} className={`message message-${m.role}`}>{m.content}</div>
        ))}
      </div>
      <div className="ai-tutor-input">
        <input value={input} onChange={e => setInput(e.target.value)}
          placeholder="Tanya AI tutor..." onKeyDown={e => e.key === 'Enter' && sendMessage()} />
        <button onClick={sendMessage}><i className="ti ti-send" /></button>
      </div>
    </div>
  );
}
```

### 8.3 Lapisan 2 — AI Analitik CT (Otomatis)

**Endpoint:**
```python
POST /api/ai/analyze-ct
  Body: {
    ct_journey_answers: { dekomposisi, abstraksi, pattern, algoritma },
    attempt_history: [...],
    reflection_answers: [...],
    challenge_context: "..."
  }
  Response: {
    scores: { dekomposisi: 78, abstraksi: 88, pattern: 62, algoritma: 72 },
    narrative: "Kamu menunjukkan kemampuan abstraksi yang sangat baik...",
    strengths: ["abstraksi", "dekomposisi"],
    areas_to_improve: ["pattern_recognition"],
    recommendations: ["Coba latihan mengelompokkan elemen HTML yang mirip..."]
  }
```

**Digunakan di dua tempat:**
1. Setelah siswa submit learning task → tersimpan ke DB, tampil di "Perkembanganku"
2. Di menu "Perkembanganku" → narasi AI + radar chart + rekomendasi personal

### 8.4 Lapisan 3 — AI Asisten Guru

**4 sub-fitur di menu "Asisten AI":**

```python
# Insight Kelas
POST /api/ai/class-insights
  Body: { room_id, pertemuan_id? }
  Response: {
    error_heatmap: [{ error_type, count, percentage }],
    struggling_students: [{ name, issue, recommendation }],
    class_ct_average: { dekomposisi, abstraksi, pattern, algoritma },
    pedagogy_recommendation: "78% siswa masih struggle dengan nesting..."
  }

# Generator Konten
POST /api/ai/generate-challenge
  Body: { pertemuan_judul, steam_context, difficulty, target_elements: ["h1", "p", "ul"] }
  Response: {
    big_idea: "...",
    essential_question: "...",
    challenge_description: "...",
    validator_rules: [{ type, selector, error_message }],
    reflection_questions: ["..."]
  }

# Asisten Penilaian
POST /api/ai/suggest-score
  Body: { submission_ast, rubrik, challenge_context }
  Response: {
    suggested_scores: { r1: 85, r2: 90, r3: 70, r4: 80 },
    analysis: "Elemen lengkap, semantik tepat, kreativitas masih dasar...",
    flags: ["img tanpa atribut alt", "tidak ada CSS"]
  }

# Rekomendasi Soal
POST /api/ai/suggest-test-questions
  Body: { materi_pertemuan, question_types: ["mcq", "sequence"], count: 5 }
  Response: { questions: [{ type, question, options?, correct_answer, explanation }] }
```

**UI Asisten AI — halaman guru:**
```
[Tab: Insight Kelas | Generator Konten | Asisten Penilaian | Rekomendasi Soal]

Tab "Insight Kelas":
  Pilih room → pilih pertemuan (opsional) → klik "Analisis Kelas"
  → tampil: heatmap error, list siswa bermasalah, CT rata-rata, rekomendasi

Tab "Generator Konten":
  Form: judul pertemuan, konteks STEAM, tingkat kesulitan, elemen target
  → klik "Generate" → tampil hasil → guru edit → tombol "Simpan ke Pertemuan"

Tab "Asisten Penilaian":
  Pilih submission project → tampil preview karya + kode
  → tombol "Analisis dengan AI" → tampil saran skor per rubrik
  → guru bisa ubah skor → submit nilai

Tab "Rekomendasi Soal":
  Pilih pertemuan sebagai konteks → pilih tipe soal → jumlah soal
  → Generate → review + edit → tambahkan ke bank soal
```

### 8.5 AIBadge + AILoadingIndicator

```jsx
// AIBadge.jsx — komponen kecil untuk tandai output AI di UI
export function AIBadge() {
  return (
    <span className="ai-badge">
      <i className="ti ti-sparkles" style={{ fontSize: 12 }} aria-hidden />
      AI
    </span>
  );
}

// CSS:
// .ai-badge { background: #EEF2FF; color: #4F46E5; border-radius: 12px;
//             padding: 2px 8px; font-size: 11px; font-weight: 600; }

// AILoadingIndicator.jsx
export function AILoadingIndicator() {
  return (
    <div className="ai-loading">
      <AIBadge />
      <span>AI sedang menganalisis</span>
      <div className="ai-loading-dots">
        <span /><span /><span />  {/* animasi CSS 3 titik */}
      </div>
    </div>
  );
}
```

---

## Fase 9 — Galeri Karya

**Target:** 2 titik akses galeri. Karya ditampilkan dengan preview mini, tag, dan CT badge. Nilai tidak terlihat oleh sesama siswa.

### 9.1 Galeri Global (dari Navbar)

URL: `/galeri`

Konten:
- Filter: semua room / pilih room tertentu + filter per pertemuan/project
- Sort: terbaru / paling diapresiasi
- Grid karya: tiap KaryaCard berisi:
  - Preview mini iframe (thumbnail dari HTML karya)
  - Nama siswa + avatar initial
  - Tag room (badge berwarna per room)
  - Tanggal dibuat
  - CT Badge (achievement badge: "Decomposition Expert", dll)
  - Komentar publik dari guru
  - Tombol Apresiasi (ti-heart) + jumlah
- Siswa tidak melihat nilai — hanya komentar kualitatif

### 9.2 Galeri dalam Room

Di halaman `RoomDetail`, ada section "Galeri Kelas" di bawah list tugas. Isinya hanya karya dari room tersebut, tanpa filter.

### 9.3 KaryaPreviewMini

```jsx
// KaryaPreviewMini.jsx — iframe mini
export default function KaryaPreviewMini({ astJson }) {
  const html = astToHTML(JSON.parse(astJson));
  const fullHTML = `<!DOCTYPE html><html><body style="transform:scale(0.35);transform-origin:top left;width:280%;pointer-events:none;">${html}</body></html>`;
  return (
    <div style={{ width: '100%', height: 160, overflow: 'hidden', borderRadius: 8 }}>
      <iframe srcDoc={fullHTML} sandbox="" style={{ width: '100%', height: 450, border: 'none' }} />
    </div>
  );
}
```

### 9.4 Guru — Kontrol Galeri

Di halaman "Galeri Karya" guru:
- Tab "Perlu Dinilai": karya yang sudah submit tapi belum ada nilai
- Tab "Sudah Dinilai": karya yang sudah dinilai, belum/sudah dipublish
- Tab "Publik di Galeri": yang sudah terlihat siswa

Per karya guru bisa:
- Klik "Nilai" → masuk halaman penilaian dengan AI saran skor
- Toggle "Tampilkan di Galeri" on/off
- Edit komentar publik (yang terlihat siswa lain)
- Hapus dari galeri

---

## Fase 10 — Perkembanganku (CT Map)

**Target:** Halaman siswa yang menampilkan profil CT dengan radar chart, tren, badge, dan narasi AI yang actionable.

### 10.1 Struktur Halaman

```
[Header: "Perkembanganku — [Nama Siswa]"]

[Kartu besar: Profil CT saat ini]
  ├── Radar chart 4 dimensi (Recharts)
  ├── 4 angka: Dekomposisi 78 | Abstraksi 88 | Pattern 62 | Algoritma 72
  └── AI Badge + Narasi AI (1-2 paragraf tentang profil CT siswa)

[Kartu: Tren per Pertemuan]
  └── Line chart: sumbu X = pertemuan 1..N, sumbu Y = CT composite score

[Grid: Badge yang Diraih]
  ├── Decomposition Expert (kalau Dekomposisi > 85)
  ├── Pattern Master (kalau Pattern > 85)
  ├── Consistent Learner (kalau selalu submit sebelum deadline)
  └── ... dst

[Kartu: Rekomendasi AI]
  ├── "Fokus latihan minggu ini: Pattern Recognition"
  └── "Coba tantangan: mengelompokkan elemen HTML dari contoh website nyata"
```

### 10.2 Radar Chart — Recharts

```jsx
// CTScoreRadar.jsx
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function CTScoreRadar({ scores }) {
  const data = [
    { subject: 'Dekomposisi', value: scores.dekomposisi, fullMark: 100 },
    { subject: 'Abstraksi', value: scores.abstraksi, fullMark: 100 },
    { subject: 'Pattern', value: scores.pattern, fullMark: 100 },
    { subject: 'Algoritma', value: scores.algoritma, fullMark: 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" tick={{ fontFamily: 'Nunito', fontSize: 13 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
        <Radar
          name="CT Score"
          dataKey="value"
          stroke="#3B82F6"
          fill="#3B82F6"
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
```

### 10.3 Narasi AI Personal

```python
POST /api/ai/ct-narrative
  Body: { siswa_id, latest_ct_scores, score_history, badge_count }
  Response: {
    narrative: "Kamu memiliki kemampuan abstraksi yang sangat baik — kamu bisa dengan tepat mengidentifikasi mana bagian yang paling penting dari sebuah halaman web. Namun, pattern recognition masih jadi area yang bisa kamu kembangkan lebih lanjut...",
    tip: "Coba perhatikan elemen yang berulang di halaman web yang sering kamu kunjungi.",
    next_focus: "pattern_recognition"
  }
```

---

## Fase 11 — Penilaian & Analitik Guru

**Target:** Satu halaman yang menggabungkan rekap nilai semua siswa dan grafik performa kelas.

### 11.1 Struktur Halaman

```
[Pilih Room] dropdown

[4 Metric Cards: Total Siswa | Rata-rata Nilai | % Selesai | CT Composite Rata-rata]

[Tab: Nilai Siswa | Analitik Kelas | CT Kelas]

Tab "Nilai Siswa":
  Tabel: nama siswa | learning score | project score | CT score | status
  Filter: per pertemuan/project
  Klik baris siswa → detail lengkap dengan histori attempt

Tab "Analitik Kelas":
  Bar chart: distribusi nilai (berapa siswa dapat 90+, 80-89, dst)
  Line chart: rata-rata kelas per pertemuan (progress kelas dari waktu ke waktu)
  Heatmap grid: error yang paling sering per pertemuan

Tab "CT Kelas":
  Radar chart rata-rata CT seluruh kelas
  List per siswa: mini radar chart kecil-kecil dalam grid
  Highlight: siswa dengan CT terluar rendah di satu dimensi
```

### 11.2 Heatmap Grid Component

```jsx
// HeatmapGrid.jsx
export default function HeatmapGrid({ errorData }) {
  // errorData: [{ pertemuan, error_type, count, percentage }]
  const maxPct = Math.max(...errorData.map(d => d.percentage));

  return (
    <div className="heatmap-container">
      <h3>Error Terbanyak per Pertemuan</h3>
      {errorData.map(item => (
        <div key={item.error_type} className="heatmap-row">
          <span className="heatmap-label">{item.error_type}</span>
          <div className="heatmap-bar" style={{
            width: `${(item.percentage / maxPct) * 100}%`,
            background: `rgba(239, 68, 68, ${item.percentage / 100})`,
          }} />
          <span className="heatmap-count">{item.percentage}% siswa</span>
        </div>
      ))}
    </div>
  );
}
```

---

## Fase 12 — Asisten AI Guru

Sudah dijelaskan detail di Fase 8.4. Tambahan teknis:

### 12.1 Rate Limiting AI Endpoint

Gunakan Redis untuk rate limit:
```python
# Maksimal 20 request AI per guru per jam
# Tersimpan di Redis: key = f"ai_rate:{user_id}", TTL = 3600

async def check_ai_rate_limit(user_id: str, redis_client):
    key = f"ai_rate:{user_id}"
    count = await redis_client.incr(key)
    if count == 1:
        await redis_client.expire(key, 3600)
    if count > 20:
        raise HTTPException(status_code=429, detail="Limit AI tercapai. Coba lagi dalam 1 jam.")
```

### 12.2 Cache AI Response

```python
# Cache response AI yang identik untuk hemat biaya
import hashlib, json

async def get_cached_or_call(prompt_hash: str, call_fn, redis_client):
    cached = await redis_client.get(f"ai_cache:{prompt_hash}")
    if cached:
        return json.loads(cached)
    result = await call_fn()
    await redis_client.setex(f"ai_cache:{prompt_hash}", 3600, json.dumps(result))
    return result
```

---

## Database Schema Lengkap

```sql
-- USERS & AUTH
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(10) NOT NULL CHECK (role IN ('siswa', 'guru')),
  nisn_or_nip VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROOMS
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guru_id UUID REFERENCES users(id),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  code VARCHAR(6) UNIQUE NOT NULL,  -- auto-generated, e.g. "4X9K2M"
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE room_members (
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  siswa_id UUID REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (room_id, siswa_id)
);

-- CURRICULUM CONTENT
CREATE TABLE pertemuan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  urutan INT NOT NULL,
  tipe VARCHAR(20) NOT NULL CHECK (tipe IN ('pretest', 'pertemuan', 'project', 'posttest')),
  judul VARCHAR(200) NOT NULL,
  is_published BOOLEAN DEFAULT false,

  -- CBL Context (hanya untuk tipe 'pertemuan')
  big_idea TEXT,
  essential_question TEXT,
  steam_context VARCHAR(100),    -- 'Sains - Tata Surya', dll
  materi_content TEXT,           -- bisa HTML atau markdown
  challenge_description TEXT,
  validator_rules_json JSONB,    -- [{ type, selector, error_message }]
  max_attempts_before_ai INT DEFAULT 4,
  reflection_questions_json JSONB,  -- ["Bagian mana yang tersulit?", ...]

  -- Project (hanya untuk tipe 'project')
  studi_kasus TEXT,
  deadline TIMESTAMPTZ,
  rubrik_json JSONB,             -- [{ id, kriteria, bobot, deskripsi }]

  -- Test (hanya untuk tipe 'pretest'/'posttest')
  questions_json JSONB,          -- [{ id, type, question, options, correct }]

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CT JOURNEY
CREATE TABLE ct_journey_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  siswa_id UUID REFERENCES users(id),
  pertemuan_id UUID REFERENCES pertemuan(id),
  challenge_context TEXT,
  dekomposisi_answer JSONB,       -- ["Judul halaman", "Paragraf penjelasan", ...]
  abstraksi_answer JSONB,         -- ["Judul halaman", "Gambar", "Deskripsi"] -- 3 item
  pattern_answer JSONB,           -- [{ group_name, items: [...] }]
  algoritma_answer JSONB,         -- ["Buat struktur body", "Tambah heading", ...]
  ct_pre_score JSONB,             -- { dekomposisi: 78, abstraksi: 88, pattern: 62, algoritma: 72 }
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- LEARNING SUBMISSIONS (untuk pertemuan biasa)
CREATE TABLE learning_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pertemuan_id UUID REFERENCES pertemuan(id),
  siswa_id UUID REFERENCES users(id),
  ct_session_id UUID REFERENCES ct_journey_sessions(id),
  ast_snapshots_json JSONB,       -- [{ attempt, timestamp, ast, errors, delta }]
  attempt_count INT DEFAULT 0,
  final_ast_json JSONB,
  process_score INT,
  accuracy_score INT,
  efficiency_score INT,
  improvement_pattern VARCHAR(20),
  reflection_answers_json JSONB,
  ct_post_score JSONB,            -- { dekomposisi, abstraksi, pattern, algoritma }
  ai_tutor_log_json JSONB,        -- riwayat percakapan dengan AI tutor
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (pertemuan_id, siswa_id)
);

-- PROJECT SUBMISSIONS
CREATE TABLE project_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pertemuan_id UUID REFERENCES pertemuan(id),
  siswa_id UUID REFERENCES users(id),
  ct_session_id UUID REFERENCES ct_journey_sessions(id),
  final_ast_json JSONB,
  ai_suggestion_json JSONB,       -- { suggested_scores, analysis, flags }
  rubrik_scores_json JSONB,       -- { r1: 85, r2: 90, r3: 70, r4: 80 }
  teacher_score INT,
  teacher_comment TEXT,
  teacher_comment_public TEXT,    -- yang ditampilkan di galeri
  is_published_to_gallery BOOLEAN DEFAULT false,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  graded_at TIMESTAMPTZ,
  UNIQUE (pertemuan_id, siswa_id)
);

-- CT SCORES (computed, disimpan per pertemuan untuk tren)
CREATE TABLE ct_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  siswa_id UUID REFERENCES users(id),
  pertemuan_id UUID REFERENCES pertemuan(id),
  room_id UUID REFERENCES rooms(id),
  dekomposisi INT,
  abstraksi INT,
  pattern_recognition INT,
  algoritma INT,
  composite_score INT,            -- rata-rata keempat dimensi
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- TEST SUBMISSIONS
CREATE TABLE test_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pertemuan_id UUID REFERENCES pertemuan(id),
  siswa_id UUID REFERENCES users(id),
  answers_json JSONB,
  score INT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (pertemuan_id, siswa_id)
);

-- GALLERY
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_submission_id UUID REFERENCES project_submissions(id),
  room_id UUID REFERENCES rooms(id),
  published_at TIMESTAMPTZ DEFAULT NOW(),
  appreciation_count INT DEFAULT 0
);

CREATE TABLE gallery_appreciations (
  gallery_item_id UUID REFERENCES gallery_items(id),
  siswa_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (gallery_item_id, siswa_id)
);
```

---

## API Endpoint Lengkap

```
AUTH
  POST   /api/auth/register
  POST   /api/auth/login
  POST   /api/auth/logout
  GET    /api/auth/me

ROOMS
  GET    /api/rooms                         ← list room saya
  POST   /api/rooms                         ← buat room (guru)
  GET    /api/rooms/:id                     ← detail room
  PUT    /api/rooms/:id                     ← update room (guru)
  POST   /api/rooms/join                    ← join room dengan kode (siswa)
  GET    /api/rooms/:id/members             ← list siswa (guru)
  GET    /api/rooms/:id/tugas               ← list semua item tugas di room

PERTEMUAN & CONTENT
  POST   /api/rooms/:roomId/pertemuan       ← buat item baru (guru)
  GET    /api/pertemuan/:id                 ← detail item
  PUT    /api/pertemuan/:id                 ← update (guru)
  DELETE /api/pertemuan/:id                 ← hapus (guru)
  PATCH  /api/pertemuan/:id/publish         ← buka/tutup { is_published }
  POST   /api/pertemuan/:id/reorder         ← ubah urutan { new_order }

CT JOURNEY
  POST   /api/ct-journey/start              ← mulai sesi
  POST   /api/ct-journey/step               ← submit satu fase + dapat AI feedback
  POST   /api/ct-journey/complete           ← selesaikan + hitung CT pre-score
  GET    /api/ct-journey/:pertemuanId/me    ← cek apakah sudah pernah selesai

SUBMISSIONS
  POST   /api/submissions/learning          ← submit learning task
  POST   /api/submissions/learning/attempt  ← rekam attempt baru
  GET    /api/submissions/learning/:id      ← lihat submission saya
  POST   /api/submissions/project           ← submit project task
  GET    /api/submissions/project/:id       ← lihat submission + status penilaian
  GET    /api/submissions/room/:roomId      ← semua submission di room (guru)
  PUT    /api/submissions/project/:id/grade ← input nilai project (guru)

TEST
  POST   /api/test/:id/submit               ← submit jawaban test
  GET    /api/test/:id/result               ← lihat hasil test

GALLERY
  GET    /api/gallery                       ← semua galeri publik (filter: room_id)
  GET    /api/gallery/room/:roomId          ← galeri satu room
  POST   /api/gallery/:itemId/appreciate    ← toggle apresiasi
  PATCH  /api/gallery/:itemId/publish       ← publish/unpublish (guru)

CT SCORES
  GET    /api/ct-scores/me                  ← semua CT score saya (untuk radar + tren)
  GET    /api/ct-scores/room/:roomId        ← CT score semua siswa (guru, untuk analitik)

AI PROXY
  POST   /api/ai/tutor                      ← AI tutor hint
  POST   /api/ai/ct-journey-step            ← analisis jawaban CT journey
  POST   /api/ai/ct-narrative               ← narasi personal CT siswa
  POST   /api/ai/class-insights             ← insight kelas untuk guru
  POST   /api/ai/generate-challenge         ← generate konten pertemuan
  POST   /api/ai/suggest-score              ← saran skor project
  POST   /api/ai/suggest-test-questions     ← rekomendasi soal test
```

---

## Design System & Token

### CSS Variables Lengkap

```css
:root {
  /* Neo-brutalism core */
  --bg-color: #E0F2FE;
  --text-main: #0F172A;
  --border-thick: 4px solid #0F172A;
  --shadow-hard: 6px 6px 0px #0F172A;
  --shadow-hard-sm: 3px 3px 0px #0F172A;

  /* Brand colors */
  --game-blue: #3B82F6;
  --game-yellow: #FACC15;
  --game-green: #10B981;
  --game-pink: #EC4899;
  --game-purple: #7C3AED;
  --game-orange: #F97316;

  /* AI-specific */
  --ai-color: #4F46E5;
  --ai-bg: #EEF2FF;
  --ai-border: #A5B4FC;

  /* Status */
  --status-selesai: #10B981;
  --status-aktif: #F59E0B;
  --status-terkunci: #9CA3AF;
  --status-dinilai: #3B82F6;

  /* Sidebar */
  --sidebar-bg: #0F172A;
  --sidebar-width-collapsed: 64px;
  --sidebar-width-expanded: 220px;
  --sidebar-transition: width 0.2s ease;

  /* Typography */
  --font-display: 'Fredoka', sans-serif;
  --font-body: 'Nunito', sans-serif;
  --font-mono: 'Fira Code', 'Courier New', monospace;

  /* Workspace */
  --palet-width: 40%;
  --kanvas-width: 60%;
  --blok-border: 3px solid #0F172A;
  --blok-shadow: 3px 3px 0px #0F172A;
  --blok-radius: 8px;
}
```

### Blok HTML di Palet

| Tipe Blok | Icon Tabler | Label | Warna |
|---|---|---|---|
| `body` | `ti-layout` | Wadah Utama | Biru |
| `div` | `ti-square` | Kotak Grup | Abu |
| `h1` | `ti-heading` | Judul Besar | Hijau |
| `h2` | `ti-heading` | Judul Sedang | Hijau |
| `p` | `ti-align-left` | Paragraf | Hijau |
| `ul` | `ti-list` | Daftar Poin | Oranye |
| `li` | `ti-list-details` | Item Daftar | Oranye |
| `img` | `ti-photo` | Gambar | Pink |
| `a` | `ti-link` | Tautan | Biru |
| `button` | `ti-pointer` | Tombol | Kuning |
| `style` | `ti-brush` | CSS Style | Ungu |

---

## Urutan Prioritas & Timeline

### Minggu 1-2: Fondasi (Fase 0-1)
- Setup Vite + React + Zustand + Tailwind
- Sidebar pill/round sesuai desain
- Auth (register, login, routing by role)
- Beranda guest (landing page)
- Deploy frontend ke Vercel (shell kosong)

### Minggu 3-4: Classroom Core (Fase 2-3)
- Beranda per role (siswa + guru)
- Ruang Belajar: join room + list room
- Room Detail: list tugas berurutan
- Tugas Detail: detail pertemuan
- Backend: auth + rooms + pertemuan API
- Database setup di Supabase

### Minggu 5-6: Workspace (Fase 4-5)
- Palet Blok + Kanvas drag-drop
- Panel switch (kanvas / preview / code)
- AST state + astUtils
- CT Journey Modal (4 fase, tanpa AI dulu)
- Bug fixes dari sistem lama:
  - Canvas reset saat ganti tugas
  - CSS blok tampil block bukan inline-block
  - Tidak ada konflik definisi fungsi mulaiLevel

### Minggu 7-8: Assessment + Galeri (Fase 6-7-9)
- Backend: submissions API + process score
- Submit learning task + tracking attempt
- Rubrik guru + penilaian project
- Test engine (pre-test / post-test)
- Galeri karya (2 titik akses)
- KaryaPreviewMini

### Minggu 9-10: AI Integration (Fase 8)
- Backend AI proxy (semua endpoint)
- AI Tutor di workspace (lapisan 1)
- AI CT Journey feedback (saat fase berlangsung)
- AI Narasi di Perkembanganku (lapisan 2)
- AI Asisten Guru — 4 sub-fitur (lapisan 3)
- Rate limiting + caching Redis

### Minggu 11-12: Analytics + Polish (Fase 10-11-12)
- Perkembanganku: radar chart + tren + badge
- Penilaian & Analitik: tabel + grafik + heatmap
- Tugasku: list lintas room
- Notifikasi
- Responsif untuk tablet (min 768px)
- Onboarding singkat untuk siswa baru

### Checklist Bug Fixes dari Versi Lama

- [ ] Konflik definisi `mulaiLevel` antara inline script dan JS file — hapus semua versi Django, tulis ulang
- [ ] Canvas tidak reset saat ganti tugas — tambahkan `resetWorkspace()` di `useEffect` ketika `tugasId` berubah
- [ ] Blok CSS muncul `inline-block` — set type 'style' selalu render sebagai `display: block` full-width
- [ ] Auto-checker terlalu rigid (`firstChild.type === 'h1'`) — ganti dengan dynamic validator rules JSON
- [ ] Galeri hardcoded — hapus semua, ambil dari API
- [ ] `innerHTML` untuk render canvas — ganti total dengan React DOM dan `srcDoc` untuk preview

---

*Implementation Plan v1.0 — WebCraft 2.0*
*Nayotama Aryaputra Santosa — Juni 2026*
*Berdasarkan Blueprint v3 + revisi diskusi desain*
