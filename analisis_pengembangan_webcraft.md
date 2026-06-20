# ANALISIS MENDALAM & BLUEPRINT PENGEMBANGAN WEBCRAFT
**Platform Pembelajaran Coding Berbasis STEAM + CBL untuk Siswa SMP**
*Dokumen Internal – Nayotama Aryaputra Santosa, 2026*

---

## DAFTAR ISI

1. [Audit Sistem Saat Ini](#1-audit-sistem-saat-ini)
2. [Visi Pengembangan](#2-visi-pengembangan)
3. [Desain Fitur Baru](#3-desain-fitur-baru)
   - 3.1 Autentikasi & Manajemen Peran
   - 3.2 Room System & Class Management
   - 3.3 Restrukturisasi Konten: Pertemuan + Project
   - 3.4 Dual Assessment System
   - 3.5 Pre-test & Post-test Engine
   - 3.6 Galeri Karya yang Diperkaya
4. [Integrasi AI yang Sesungguhnya](#4-integrasi-ai-yang-sesungguhnya)
5. [Arsitektur Teknis](#5-arsitektur-teknis)
6. [Roadmap Implementasi](#6-roadmap-implementasi)
7. [Matriks Risiko & Mitigasi](#7-matriks-risiko--mitigasi)
8. [Ringkasan Eksekutif](#8-ringkasan-eksekutif)

---

## 1. AUDIT SISTEM SAAT INI

### 1.1 Kekurangan Arsitektur & Teknis

| # | Temuan | Dampak | Prioritas |
|---|--------|--------|-----------|
| T1 | **Frontend-only, tanpa backend** — Seluruh logika ada di `script.js`, tidak ada server, tidak ada database. Data hilang saat tab di-refresh. | Tidak ada persistensi apapun: progress, karya, maupun nilai siswa tidak tersimpan. | 🔴 Kritis |
| T2 | **Auto-checker berbasis if-else rigid** — `firstChild.type === 'h1' && content === 'bumi'` hanya cocok satu skenario exact-match. | Siswa yang menulis "Bumi " (spasi) atau "BUMI" dinyatakan gagal meskipun logikanya benar. Tidak ada ruang kreatifitas. | 🔴 Kritis |
| T3 | **Tidak ada autentikasi** — Siapapun bisa mengakses semua konten tanpa login. | Tidak bisa membedakan guru/siswa, tidak ada personalisasi, tidak ada tracking per-pengguna. | 🔴 Kritis |
| T4 | **Galeri karya adalah HTML statis** — Dua kartu dummy hardcoded di HTML, tidak terhubung ke data nyata. | Fitur kolaborasi dan peer-review tidak berfungsi sama sekali. | 🟠 Tinggi |
| T5 | **Hanya 4 jenis blok** — `body`, `div`, `h1`, `p`. Tidak ada CSS, `img`, `a`, `ul/li`, `table`, dsb. | Siswa tidak bisa membangun halaman web yang bermakna setelah Level 1. | 🟠 Tinggi |
| T6 | **Tidak ada Undo/Redo** — Sekali blok dihapus, tidak bisa dikembalikan. | Menghambat eksplorasi. Siswa menjadi takut mencoba hal baru. | 🟡 Sedang |
| T7 | **Canvas menggunakan `innerHTML` untuk render** — Rentan terhadap XSS meskipun ada `escapeHTML()`. | Risiko keamanan jika ada data yang diinjeksi dari sumber eksternal di masa depan. | 🟡 Sedang |
| T8 | **Tidak ada drag-and-drop** — Blok hanya bisa ditambah dengan klik. | Pengalaman kurang intuitif dan berbeda dari ekspektasi Scratch-like yang disebutkan di KTI. | 🟡 Sedang |

### 1.2 Kekurangan Pedagogis & Learning Design

| # | Temuan | Dampak | Prioritas |
|---|--------|--------|-----------|
| P1 | **Sistem Level tidak sesuai kurikulum sekolah** — Level gamifikasi tidak mencerminkan struktur KD/Pertemuan yang digunakan guru. | Guru kesulitan mengintegrasikan WebCraft dengan silabus semester. Platform tidak bisa dipakai dalam konteks pembelajaran formal. | 🔴 Kritis |
| P2 | **Hanya 1 tantangan yang ter-hardcode** — Satu misi `<body>` + `<h1>Bumi` + `<p>Planet`. | Tidak ada konten yang bisa diperluas. Guru tidak bisa menambahkan atau memodifikasi soal. | 🔴 Kritis |
| P3 | **Tidak ada sistem asesmen** — Tidak ada pre-test, post-test, penilaian formatif maupun sumatif. | Tidak bisa mengukur peningkatan Computational Thinking yang menjadi tujuan utama penelitian. | 🔴 Kritis |
| P4 | **Feedback tidak bermakna** — Modal "Luar Biasa!" atau "Hampir Benar!" tanpa penjelasan APA yang salah. | Siswa tidak belajar dari kesalahan. Bertentangan dengan prinsip CBL (Investigate – mencari solusi dari masalah). | 🟠 Tinggi |
| P5 | **Tidak ada diferensiasi peran guru-siswa** — Guru tidak bisa memonitor progress, memberi penilaian, atau menyesuaikan konten. | Guru menjadi penonton pasif, padahal peran guru sangat sentral dalam model CBL. | 🟠 Tinggi |
| P6 | **Challenge tidak kontekstual STEAM** — Misi "Bumi dan Planet" hanya label, tidak ada integrasi sains yang sesungguhnya. | Klaim STEAM Context menjadi dangkal. Tidak ada kaitan antara konteks sains dan keputusan coding yang dibuat siswa. | 🟡 Sedang |
| P7 | **Tidak ada tahap CBL yang terstruktur** — UI tidak membimbing siswa melalui fase Engage → Investigate → Act secara eksplisit. | Model CBL yang menjadi landasan teoritis KTI tidak tercermin dalam alur penggunaan platform. | 🟡 Sedang |

### 1.3 Kekurangan UX & Aksesibilitas

| # | Temuan | Dampak | Prioritas |
|---|--------|--------|-----------|
| U1 | **Tidak ada petunjuk/onboarding** — Pengguna baru langsung dihadapkan kanvas kosong tanpa panduan. | Siswa SMP yang baru mengenal coding akan langsung bingung dan menyerah. | 🟠 Tinggi |
| U2 | **Layout lebar minimum 1024px** — `meta viewport content="width=1024"` tidak responsif untuk tablet/mobile. | Aksesibilitas terbatas. Jika sekolah hanya punya tablet (umum di sekolah menengah), platform tidak bisa digunakan. | 🟠 Tinggi |
| U3 | **Tooltip hanya muncul di hover CSS** — Siswa di tablet layar sentuh tidak bisa melihat penjelasan blok. | Menghambat pemahaman mandiri siswa, terutama yang baru belajar. | 🟡 Sedang |

---

## 2. VISI PENGEMBANGAN

### Pernyataan Visi
> **WebCraft adalah platform pembelajaran coding web berbasis CBL untuk siswa SMP yang menyatukan pengalaman belajar terstruktur per-pertemuan, asesmen ganda (formatif otomatis + sumatif guru), galeri karya berbasis evaluasi transparan, dan AI tutor kontekstual — semuanya dalam satu ekosistem yang dapat dikelola guru.**

### Pilar Pengembangan

```
┌─────────────────────────────────────────────────────────────────────┐
│                    WEBCRAFT 2.0 – 4 PILAR                           │
├───────────────┬──────────────────┬──────────────┬───────────────────┤
│ 🏗️ STRUKTUR   │ 📊 ASESMEN        │ 🤖 AI         │ 👥 KOMUNITAS      │
│               │                  │              │                   │
│ Login & CRUD  │ Learning Score   │ AI Tutor     │ Galeri Karya      │
│ Room System   │ (Otomatis)       │ AI Reviewer  │ Peer Feedback     │
│ Pertemuan +   │ Project Score    │ AI Analytics │ Kompetisi Kelas   │
│ Project       │ (Guru)           │ AI Generator │                   │
│ Pre/Post Test │                  │              │                   │
└───────────────┴──────────────────┴──────────────┴───────────────────┘
```

---

## 3. DESAIN FITUR BARU

### 3.1 Autentikasi & Manajemen Peran

#### Dua Peran Utama

**GURU**
- Membuat dan mengelola room kelas
- CRUD konten pertemuan (materi + tantangan)
- CRUD soal pre-test & post-test
- Melihat dashboard progress seluruh siswa di roomnya
- Menilai project siswa
- Mempublikasikan karya ke Galeri

**SISWA**
- Login → bergabung ke room dengan kode unik
- Akses pertemuan yang dibuka guru
- Mengerjakan Learning Task dan Project Task
- Melihat Galeri Karya kelas
- Melihat nilai dan feedback miliknya sendiri

#### Alur Autentikasi

```
GURU:
Register (NIP/email) → Verifikasi → Buat Room → Bagikan Kode Room

SISWA:
Register (NISN/email) → Masukkan Kode Room → Masuk Dashboard Kelas
```

#### Catatan CRUD Penting
- **Guru TIDAK bisa mengubah data siswa lain** — hanya bisa menilai dan memberi feedback.
- **Siswa tidak bisa mengubah nilai** — submission bersifat final setelah di-submit.
- **Super-admin** (developer/admin sekolah) untuk manajemen akun guru.

---

### 3.2 Room System & Class Management

**Konsep:** Setiap guru membuat satu atau lebih room yang merepresentasikan satu kelas/rombel. Siswa bergabung dengan kode 6-digit unik.

```
Dashboard Guru:
┌────────────────────────────────────────────────────────────────┐
│  + Buat Room Baru                                              │
├─────────────────────┬──────────────────────────────────────────┤
│  Room: 7A-2026      │  Kode: WC-4X9K2M     [Salin Kode]       │
│  32 Siswa           │  Pertemuan aktif: 3                      │
│  Nilai rata-rata: 82│  [Kelola Pertemuan] [Lihat Progress]     │
├─────────────────────┼──────────────────────────────────────────┤
│  Room: 7B-2026      │  Kode: WC-8P3N7Q     [Salin Kode]       │
│  30 Siswa           │  Pertemuan aktif: 3                      │
│  Nilai rata-rata: 78│  [Kelola Pertemuan] [Lihat Progress]     │
└─────────────────────┴──────────────────────────────────────────┘
```

**Fitur Room:**
- Guru bisa mengontrol pertemuan mana yang "dibuka" (visible ke siswa)
- Guru bisa melihat berapa % siswa sudah menyelesaikan tiap pertemuan
- Siswa hanya melihat room-nya sendiri
- Satu siswa bisa di beberapa room (jika ada mata pelajaran lintas kelas)

---

### 3.3 Restrukturisasi Konten: Dari Level → Pertemuan + Project

#### Masalah Sistem Level Saat Ini
Sistem "Level 1, Level 2..." bersifat linear-gamifikatif dan tidak mencerminkan ritme pembelajaran riil sekolah (mingguan/tatap muka). Guru tidak bisa menyisipkan konten sesuai KD kurikulum.

#### Struktur Baru: Pertemuan + Project

```
Semester Gasal – Kelas 7
├── PRE-TEST (Awal Semester)
│
├── Pertemuan 1: Mengenal HTML – Struktur Bumi     [Materi + Learning Task]
├── Pertemuan 2: Elemen Teks & Heading              [Materi + Learning Task]
├── Pertemuan 3: List & Gambar                      [Materi + Learning Task]
├── Pertemuan 4: Hyperlink & Navigasi               [Materi + Learning Task]
│
├── 🎯 PROJECT 1: Buat website profil Planet        [Project Task + Penilaian Guru]
│
├── Pertemuan 5: Pengantar CSS – Warna & Font       [Materi + Learning Task]
├── Pertemuan 6: Box Model & Tata Letak             [Materi + Learning Task]
├── Pertemuan 7: Responsif Dasar                    [Materi + Learning Task]
│
├── 🎯 PROJECT 2: Redesign website Planet           [Project Task + Penilaian Guru]
│
└── POST-TEST (Akhir Semester)
```

#### Anatomi Satu Pertemuan (untuk Guru CRUD)

```json
{
  "pertemuan_id": "P001",
  "judul": "Mengenal HTML – Struktur Bumi",
  "kd": "Memahami konsep dasar struktur dokumen HTML",
  "konteks_steam": "Science – Lapisan-lapisan Bumi sebagai metafora nesting HTML",
  "fase_cbl": {
    "engage": {
      "big_idea": "Website dibangun dari elemen yang saling membungkus, seperti lapisan Bumi",
      "essential_question": "Bagaimana komputer tahu elemen mana yang 'di dalam' elemen lain?",
      "media": "Video/gambar lapisan Bumi (dapat diupload guru)"
    },
    "investigate": {
      "materi_url": "...",
      "guiding_questions": ["Apa itu tag HTML?", "Mengapa ada tag pembuka dan penutup?"]
    },
    "act": {
      "learning_tasks": [...]
    }
  }
}
```

**Keuntungan struktur ini:**
- Guru bisa mengedit `big_idea`, `essential_question`, dan media sesuai konteks kelasnya
- CBL terdokumentasi di dalam platform, bukan hanya di kertas KTI
- Konten dapat di-update tanpa mengubah kode aplikasi

---

### 3.4 Dual Assessment System

#### Assessment 1: Learning Score (Otomatis)

**Konsep:** Ini bukan sekadar "benar/salah". Sistem mengukur **proses berpikir** siswa, bukan hanya hasil akhir.

**Mekanisme Penilaian Proses:**

```
Learning Score = (Akurasi × 60%) + (Efisiensi × 40%)

Akurasi:
  - Jawaban akhir benar: 100%
  - Jawaban mendekati benar (minor error): 70%
  - Struktur benar tapi konten salah: 50%
  - Struktur salah: 0%

Efisiensi (Berapa banyak "Cek Logika" dilakukan?):
  - Submit pertama langsung benar: 100%
  - 2 kali submit: 85%
  - 3 kali submit: 70%
  - 4–5 kali: 50%
  - 6+ kali: 30% (tapi tetap dinilai, bukan 0!)
```

**Mengapa ini penting untuk CT?**

> Computational Thinking tidak hanya tentang hasil yang benar, tapi tentang kemampuan **dekomposisi masalah** (apakah siswa langsung mencoba bagian kecil terlebih dahulu?) dan **algorithmic thinking** (apakah ada pola sistematis dalam cara siswa mencoba?).

**Feedback Otomatis yang Bermakna (bukan sekadar if-else):**

Sistem harus bisa memberikan petunjuk bertahap:
- **Submit ke-1 salah:** "Sepertinya ada yang kurang. Coba perhatikan: apakah judul sudah masuk ke dalam wadah yang tepat?"
- **Submit ke-2 salah:** "Perhatikan indentasi di panel kode. Elemen yang ada di 'dalam' akan terlihat lebih menjorok ke kanan."
- **Submit ke-3 salah:** "Coba lihat contoh ini: [tampilkan hint struktur]"
- **Submit ke-4+:** AI Tutor otomatis aktif (lihat Bagian 4.1)

**Error Tracking yang Disimpan (untuk Analitik AI):**

```json
{
  "siswa_id": "S001",
  "pertemuan_id": "P001",
  "task_id": "T001",
  "attempts": [
    {
      "attempt_number": 1,
      "timestamp": "2026-09-01T08:15:00",
      "ast_snapshot": {...},
      "errors": ["h1_outside_body", "missing_p"],
      "score": null
    },
    {
      "attempt_number": 2,
      "timestamp": "2026-09-01T08:17:30",
      "ast_snapshot": {...},
      "errors": ["missing_p"],
      "score": null
    },
    {
      "attempt_number": 3,
      "timestamp": "2026-09-01T08:19:00",
      "ast_snapshot": {...},
      "errors": [],
      "final_score": 78,
      "learning_score_breakdown": {
        "accuracy": 100,
        "efficiency": 70
      }
    }
  ]
}
```

---

#### Assessment 2: Project Score (Penilaian Guru)

**Konsep:** Siswa diberikan **studi kasus** terbuka. Tidak ada "benar/salah" — penilaian bersifat holistik dan dilakukan guru.

**Alur Project:**

```
GURU membuat Project Task:
  - Judul studi kasus
  - Deskripsi konteks STEAM (misal: "Buat halaman web tentang daur air")
  - Kriteria minimum (misal: minimal ada 1 heading, 1 paragraf, 1 gambar)
  - Deadline
  - Bobot rubrik (guru bisa custom-kan)

SISWA mengerjakan:
  - Membuka project di workspace (kanvas bebas)
  - Tidak ada auto-checker
  - Submit kapan saja sebelum deadline
  - Setelah submit → status "Menunggu Penilaian"

GURU menilai:
  - Melihat karya siswa (kode + live preview)
  - AI memberikan saran skor awal (lihat Bagian 4.4)
  - Guru mengisi rubrik + komentar
  - Guru menentukan apakah karya ini "dipublikasikan" ke Galeri atau tidak
  - Nilai final dikirim ke siswa

SISWA menerima:
  - Skor final (angka)
  - Komentar guru
  - Jika dipublikasikan: karya tampil di Galeri Karya kelas
```

**Rubrik Default (bisa diedit guru):**

| Kriteria | Bobot | Deskripsi |
|----------|-------|-----------|
| Kelengkapan Struktur | 25% | Apakah semua elemen yang diminta ada? |
| Kebenaran Semantik | 25% | Apakah elemen digunakan sesuai fungsinya? |
| Kreativitas & Estetika | 25% | Apakah ada upaya desain yang personal? |
| Kompleksitas CT | 25% | Apakah ada nesting, list, atau elemen kompleks yang digunakan dengan benar? |

---

### 3.5 Pre-test & Post-test Engine

**Tujuan:** Mengukur peningkatan Computational Thinking secara empiris (menjawab keterbatasan penelitian di KTI yang hanya sampai Development).

**Format Soal yang Didukung:**

1. **Pilihan Ganda** — "Elemen HTML manakah yang digunakan untuk judul utama?"
2. **Analisis Kode** — Tampilkan potongan kode HTML, tanya "Apa yang salah dari kode ini?"
3. **Urutan Logika** — "Susun langkah-langkah berikut agar menghasilkan halaman yang benar" (drag-and-drop)
4. **Prediksi Output** — "Jika kode ini dijalankan, apa yang akan muncul di layar?"
5. **Identifikasi Error** — Highlight bagian kode yang salah

**Sinkronisasi Pre-test & Post-test:**
- Guru membuat bank soal
- Pre-test mengambil dari bank soal (acak atau manual)
- Post-test menggunakan soal yang **identik** dengan pre-test → delta skor menunjukkan peningkatan CT
- Laporan otomatis: grafik skor per-siswa, per-kelas, per-indikator CT

---

### 3.6 Galeri Karya yang Diperkaya

**Dari:** Daftar kartu statis hardcoded
**Menjadi:** Ruang evaluasi transparan berbasis karya nyata siswa

**Fungsi Galeri:**

| Untuk Siswa | Untuk Guru |
|-------------|------------|
| Melihat karya yang dipublikasikan | Kontrol penuh apa yang dipublikasikan |
| Memberi "Apresiasi" (like/bintang) | Melihat distribusi skor kelas |
| Membaca komentar guru pada karya orang lain | Filter karya per pertemuan/project |
| Terinspirasi dan termotivasi untuk improve | Gunakan karya terbaik sebagai contoh di kelas |
| Melihat nilai sendiri dan komentar guru | — |

**Transparansi yang Terkontrol:**
- Siswa **TIDAK** bisa melihat nilai siswa lain — hanya karya dan komentar kualitatif
- Guru memilih komentar mana yang publik dan mana yang privat
- Karya hanya tampil di room yang sama (tidak lintas sekolah kecuali ada fitur khusus)

**Dampak Psikologis yang Diinginkan:**
> Siswa melihat karya temannya bukan untuk membandingkan nilai, tapi untuk mendapatkan referensi teknis dan motivasi. Ini selaras dengan teori Zone of Proximal Development Vygotsky — belajar dari *near-peers* lebih efektif daripada belajar dari ahli.

---

## 4. INTEGRASI AI YANG SESUNGGUHNYA

> **Prinsip utama:** AI di WebCraft bukan chatbot dekoratif. AI harus **mengubah keputusan pedagogis** — baik bagi siswa (kapan mendapat hint, seberapa dalam) maupun guru (bagaimana memahami progress kelas secara holistik).

### 4.1 AI Contextual Tutor (In-Workspace)

**Bukan:** Chatbot generik yang bisa ditanya apa saja.
**Melainkan:** Tutor yang tahu persis siswa ini sedang di Pertemuan berapa, mengerjakan task apa, berapa kali sudah submit, dan kesalahan apa yang berulang — lalu merespons sesuai konteks itu.

**Cara Kerja:**

```
Input ke LLM (Claude/GPT-4):
- System prompt: "Kamu adalah tutor coding untuk siswa SMP. Gunakan metode
  Socratic — jangan langsung beri jawaban, tapi tuntun siswa untuk menemukan
  sendiri. Konteks: Siswa sedang di Pertemuan 1 (HTML Dasar). Target learning:
  siswa memahami konsep nesting/pembungkusan elemen."
  
- User context: {
    current_ast: "<body> berisi <h1>Bumi</h1>",
    target_ast: "<body> berisi <h1>Bumi</h1> dan <p>Planet</p>",
    attempt_count: 3,
    error_history: ["missing_p_inside_body"],
    student_message: "Kak aku udah bener kok tapi masih salah terus"
  }

Output AI yang diharapkan:
  "Hmm, seru nih! Aku lihat kamu sudah punya <h1>Bumi</h1> di dalam <body>. 
   Coba lihat lagi tantangannya — ada satu elemen lagi yang perlu masuk ke 
   dalam wadah <body>. Kira-kira elemen apa yang biasanya kita pakai untuk 
   menulis kalimat panjang atau penjelasan? 🤔"
```

**Kapan AI Tutor Aktif:**
- Otomatis muncul setelah attempt ke-4 (threshold dapat dikonfigurasi guru)
- Siswa bisa memanggil kapan saja dengan tombol "Minta Petunjuk"
- Setiap pesan AI disimpan di log → guru bisa lihat di mana siswa stuck

**Batasan Penting:**
- AI **tidak pernah** memberikan jawaban langsung (diatur via system prompt)
- AI tahu konteks pertemuan sehingga tidak memberikan hint yang melampaui materi
- Jika siswa bertanya di luar topik (misal: "cariin game"), AI redirect dengan sopan

---

### 4.2 AI Code Analyzer & CT Scorer

**Tujuan:** Menganalisis pola berpikir siswa, bukan hanya kebenaran kode.

**Input:** Seluruh riwayat AST snapshot dari satu session pengerjaan task.

**Output AI (untuk dashboard guru):**

```
Analisis CT Siswa: Andi Pratama – Pertemuan 1, Task 1

DEKOMPOSISI:
  Skor: 7/10 – Siswa mencoba menambahkan elemen satu per satu (baik),
  namun sempat menempatkan semua elemen di root level dulu sebelum
  memindahkannya ke dalam <body>. Ini menunjukkan pemahaman dekomposisi
  yang masih berkembang.

PENGENALAN POLA:
  Skor: 8/10 – Setelah error pertama, siswa langsung memperbaiki struktur
  yang sama tanpa mencoba hal random. Ada indikasi pengenalan pola nesting.

ABSTRAKSI:
  Skor: 6/10 – Siswa belum memisahkan konsep "wadah" dari "isi" secara
  konsisten. Masih mencampur aduk antara <div> dan <body> sebagai container.

ALGORITMA:
  Skor: 8/10 – Urutan penambahan blok menunjukkan pola yang sistematis
  (dari luar ke dalam).

REKOMENDASI:
  Fokuskan Pertemuan 2 pada perbedaan kontekstual antara <body> dan <div>
  agar abstraksi konsep "wadah" menjadi lebih jelas bagi Andi.
```

**Teknisnya:** Ini bukan sekedar scoring rubrik. AI membaca **pola temporal** dari snapshot AST:
- Apakah siswa memulai dari struktur terluar dulu? (top-down decomposition ✓)
- Apakah ada pola "coba-hapus-coba lagi"? (trial and error — CT rendah)
- Apakah siswa menggunakan insert-zone dengan tepat? (memahami nesting ✓)

---

### 4.3 AI Challenge Generator (CBL-Aligned)

**Tujuan:** Guru tidak perlu membuat semua soal dari awal. AI bisa menghasilkan challenge baru berdasarkan materi dan konteks STEAM yang ditentukan guru.

**Alur:**

```
Guru membuka "Buat Tantangan Baru" →
  [Pilih Pertemuan: Pertemuan 3 – List & Gambar]
  [Pilih Konteks STEAM: Biology – Rantai Makanan]
  [Tingkat Kesulitan: Menengah]
  [Klik: Generate dengan AI]

AI menghasilkan:
  Big Idea: "Makhluk hidup di alam terhubung dalam rantai yang berurutan,
             sama seperti elemen HTML yang bersarang secara hierarkis"
  
  Essential Question: "Bagaimana kita bisa menampilkan urutan rantai makanan
                       (rumput → kelinci → serigala) menggunakan HTML?"
  
  The Challenge: "Buat halaman web 'Rantai Makanan Hutan Kalimantan' yang
                  menampilkan:
                  - Judul utama dengan <h1>
                  - Tiga organisme menggunakan <ul> dan <li>
                  - Setiap organisme punya deskripsi singkat menggunakan <p>
                  Pastikan semua elemen ada di dalam <body>!"
  
  Validator Otomatis (generated): {
    rules: [
      { type: "exists", selector: "body > h1" },
      { type: "count", selector: "body ul > li", min: 3 },
      { type: "exists", selector: "body p" }
    ]
  }
```

**Keunggulan:**
- Konteks STEAM menjadi **otentik** — bukan label tempelan
- Guru bisa edit hasil AI sebelum dipublikasikan
- Validator rules juga di-generate AI → auto-checker tidak lagi if-else rigid
- Setiap kelas bisa punya tantangan yang unik

---

### 4.4 AI-Assisted Grading (untuk Guru)

**Masalah yang diselesaikan:** Guru dengan 30+ siswa per kelas akan kelelahan menilai setiap project dari nol.

**Cara Kerja:**

```
Guru klik "Nilai Project" untuk satu siswa →
  Sistem menampilkan:
  [Live Preview karya siswa] | [Kode HTML/CSS] | [Saran Awal AI]

  === SARAN AWAL AI ===
  
  Analisis Otomatis:
  ✅ Struktur dasar lengkap: <html>, <head>, <body> ada
  ✅ Judul menggunakan <h1> (1 kali) – semantik benar
  ⚠️  Gambar (<img>) tidak memiliki atribut alt= – aksesibilitas kurang
  ✅ Menggunakan <ul> dan <li> untuk daftar – pola yang baik
  ✅ Ada upaya styling dengan CSS inline di 3 elemen
  
  Saran Skor Awal:
  - Kelengkapan Struktur: 85/100 (ada img tanpa alt)
  - Kebenaran Semantik: 90/100
  - Kreativitas: 75/100 (desain masih sederhana)
  - Kompleksitas CT: 80/100
  
  Saran Total: 82/100
  
  [Guru mengisi nilai akhir] [Guru mengisi komentar] [Simpan & Kirim ke Siswa]
```

**Penting:** AI hanya memberikan SARAN. Nilai final selalu di tangan guru. Ini menjaga integritas penilaian dan akuntabilitas guru.

---

### 4.5 AI Analytics Engine (untuk Guru)

**Tujuan:** Guru bisa memahami kondisi kelas secara holistik tanpa harus membaca tiap submission satu per satu.

**Fitur:**

**A. Dashboard Visual Kelas**
```
Pertemuan 1 – 7A – 32 Siswa

[============================] 87% selesai (28/32)
Rata-rata Learning Score: 74.2
Rata-rata Attempt: 2.8x

Top 3 Error Terbanyak:
1. "Elemen <h1> di luar <body>" – 18 siswa (56%)
2. "Isi teks tidak sesuai" – 12 siswa (38%)
3. "<body> dihapus" – 5 siswa (16%)

⚠️ REKOMENDASI: 56% siswa masih struggle dengan konsep nesting.
   Pertimbangkan untuk membuka sesi review 15 menit di awal Pertemuan 2
   khusus tentang hubungan parent-child elemen.
```

**B. Natural Language Query (Fitur Lanjutan)**
> Guru mengetik: *"Siapa siswa yang paling banyak butuh bantuan di minggu ini?"*
>
> AI menjawab: *"Berdasarkan data submission, 4 siswa membutuhkan perhatian ekstra: Budi (8 attempts, belum selesai), Sari (selesai tapi skor 41), ..."*

**C. Prediksi Risiko Ketertinggalan**
- AI mengidentifikasi siswa yang pola belajarnya (submission terlambat, attempt tinggi, engagement rendah) berisiko tidak tuntas semester
- Guru mendapat notifikasi dini

---

### 4.6 AI Plagiarism Detector (untuk Project)

**Masalah:** Dalam kelas, ada kemungkinan siswa saling menyalin kode project.

**Cara Kerja:**
- AST setiap project dikonversi ke "fingerprint struktur" (bukan teks, tapi pola hierarki elemen)
- AI membandingkan fingerprint antar siswa dalam satu kelas
- Jika kemiripan > threshold (misal 85%), guru mendapat notifikasi
- Guru tetap menentukan apakah ini plagiarisme atau kebetulan struktural

---

## 5. ARSITEKTUR TEKNIS

### 5.1 Stack Teknologi yang Direkomendasikan

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND                                │
│  React 18 + TypeScript                                      │
│  State: Zustand (ringan, cocok untuk AST management)        │
│  UI: Tailwind CSS + shadcn/ui                               │
│  Drag-Drop: @dnd-kit/core                                   │
│  Real-time preview: iframe sandboxed                        │
└─────────────────────────────────┬───────────────────────────┘
                                  │ HTTP / WebSocket
┌─────────────────────────────────▼───────────────────────────┐
│                     BACKEND                                 │
│  Node.js + Express (atau FastAPI Python)                    │
│  Auth: JWT + refresh token                                  │
│  WebSocket: Socket.io (untuk real-time preview sync)        │
│  Validation: Zod / Pydantic                                 │
└──────────────┬────────────────────────────┬─────────────────┘
               │                            │
┌──────────────▼────────────┐  ┌────────────▼─────────────────┐
│       DATABASE            │  │         AI LAYER             │
│  PostgreSQL               │  │  Anthropic Claude API        │
│  (users, rooms,           │  │  (Tutor, Analyzer,           │
│   submissions, scores)    │  │   Generator, Grading)        │
│                           │  │                              │
│  Redis                    │  │  Prompt management:          │
│  (session, cache,         │  │  LangChain / custom          │
│   real-time events)       │  │                              │
└───────────────────────────┘  └──────────────────────────────┘
```

### 5.2 Schema Database Utama

```sql
-- Core Tables
users (id, name, email, role [GURU/SISWA], created_at)
rooms (id, guru_id, name, code_6digit, is_active)
room_members (room_id, siswa_id, joined_at)

-- Content
pertemuan (id, room_id, judul, urutan, cbl_context_json, is_published)
learning_tasks (id, pertemuan_id, judul, validator_rules_json, max_score)
project_tasks (id, pertemuan_id, judul, studi_kasus, rubrik_json, deadline)

-- Assessment
pretest_posttest (id, room_id, type [PRE/POST], questions_json, created_by)
test_submissions (id, test_id, siswa_id, answers_json, score, submitted_at)

-- Submissions
learning_submissions (
  id, task_id, siswa_id, 
  ast_snapshots_json,   -- seluruh riwayat percobaan
  attempt_count,
  final_score, accuracy_score, efficiency_score,
  ct_analysis_json,     -- output AI analyzer
  submitted_at
)
project_submissions (
  id, task_id, siswa_id,
  final_ast_json,
  ai_suggestion_json,   -- output AI grading assistant
  teacher_score,
  teacher_comment,
  is_published_to_gallery,
  submitted_at, graded_at
)

-- Gallery
gallery_items (
  id, project_submission_id,
  published_at, appreciation_count
)
```

### 5.3 Prinsip Keamanan Kritis
- Input siswa (kode HTML/CSS) **tidak pernah** di-eval atau dieksekusi di server
- Live preview menggunakan `<iframe sandbox="allow-scripts">` yang terisolasi
- Seluruh API endpoint memerlukan JWT valid
- Rate limiting pada endpoint AI untuk mengontrol biaya

---

## 6. ROADMAP IMPLEMENTASI

### Phase 1: Foundation (Bulan 1–2)
**Target: Platform bisa login, punya room, dan konten bisa diakses**

- [ ] Setup backend (Node.js/FastAPI + PostgreSQL)
- [ ] Autentikasi (JWT, dua peran)
- [ ] CRUD Room & Kode Undangan
- [ ] CRUD Pertemuan (guru)
- [ ] Migrasi frontend: React + TypeScript
- [ ] Drag-and-drop untuk kanvas blok
- [ ] Simpan progress learning task ke database

### Phase 2: Assessment Engine (Bulan 3–4)
**Target: Dual assessment berjalan penuh**

- [ ] Learning Score otomatis (accuracy + efficiency)
- [ ] Validasi dinamis berbasis rules (bukan if-else hardcoded)
- [ ] Project Task + submission flow
- [ ] Rubrik penilaian guru (CRUD)
- [ ] Pre-test & Post-test engine (soal + penilaian)
- [ ] Galeri Karya dinamis dari database
- [ ] Notifikasi (siswa terima nilai, guru ada submission baru)

### Phase 3: AI Integration (Bulan 5–6)
**Target: AI terintegrasi di semua titik kritis**

- [ ] AI Contextual Tutor (in-workspace chatbot)
- [ ] AI Code Analyzer & CT Scorer (per submission)
- [ ] AI Challenge Generator (untuk guru saat buat task)
- [ ] AI Grading Assistant (saran skor project)
- [ ] AI Analytics Dashboard (overview kelas)
- [ ] Plagiarism detector (fingerprint-based)

### Phase 4: Refinement & Uji Coba (Bulan 7–8)
**Target: Siap untuk penelitian empiris**

- [ ] Responsif untuk tablet (min 768px)
- [ ] Onboarding interaktif untuk siswa baru
- [ ] Export laporan guru (PDF/Excel)
- [ ] Uji coba terbatas dengan sekolah mitra
- [ ] Perbaikan berdasarkan feedback
- [ ] Delta score pre-test vs post-test → validasi penelitian

---

## 7. MATRIKS RISIKO & MITIGASI

| Risiko | Probabilitas | Dampak | Mitigasi |
|--------|-------------|--------|----------|
| Biaya API AI tinggi | Tinggi | Tinggi | Rate limiting per siswa per hari; cache respons AI yang generik; fallback ke hint berbasis rules jika quota habis |
| Sekolah tidak punya internet stabil | Sedang | Tinggi | Service Worker untuk offline mode; simpan progress di localStorage sebagai fallback; core learning bisa offline |
| Guru tidak mau adopsi teknologi baru | Sedang | Tinggi | UI guru dibuat semirip mungkin dengan Google Classroom; onboarding video; template pertemuan siap pakai |
| AI tutor memberikan jawaban langsung (jailbreak siswa) | Sedang | Sedang | System prompt strict + evaluasi output sebelum dikirim ke siswa; batas karakter pesan siswa |
| Plagiarisme kode meningkat | Sedang | Sedang | AI plagiarism detector; desain studi kasus yang personal (nama/data siswa di-embed) |
| Data siswa minor (privasi) | Rendah | Tinggi | Tidak simpan foto, hanya NISN + nama; enkripsi data sensitif; compliance dengan kebijakan data pendidikan Indonesia |

---

## 8. RINGKASAN EKSEKUTIF

WebCraft versi saat ini adalah **proof-of-concept yang kuat** — Triple-View Interface adalah inovasi nyata, fondasi kode AST-based sudah benar secara konseptual, dan visi CBL+STEAM sangat relevan dengan kebutuhan pendidikan. Namun untuk menjadi platform pembelajaran yang sesungguhnya, diperlukan transformasi di tiga level:

**Level 1 — Infrastruktur (Non-Negotiable):**
Backend + autentikasi + persistensi data. Tanpa ini, seluruh fitur lain tidak bermakna karena tidak ada yang tersimpan.

**Level 2 — Pedagogis (Differentiator):**
Transformasi dari "level game" ke "pertemuan kurikulum" yang bisa dikelola guru, dual assessment yang mengukur proses (bukan hanya hasil), dan galeri karya sebagai alat evaluasi — inilah yang membedakan WebCraft dari Scratch atau platform coding generik.

**Level 3 — AI (Unfair Advantage):**
AI tutor kontekstual yang menerapkan metode Socratic, AI analyzer yang mengukur dimensi CT secara genuine, dan AI generator yang membuat konten CBL menjadi skalabel — inilah yang membuat WebCraft bukan sekadar tools, tapi *intelligent learning environment*.

Dengan roadmap 8 bulan ini, WebCraft bukan hanya layak sebagai **Tugas Akhir**, tapi berpotensi menjadi produk yang bisa didaftarkan ke Program Kompetisi Kampus Merdeka (PKKM) atau dikembangkan bersama Kemendikbud sebagai media pembelajaran resmi Informatika SMP.

---

*Dokumen ini dibuat berdasarkan analisis kode sumber (index.html, script.js, style.css), KTI "WebCraft: Inovasi Pembelajaran Coding Berbasis STEAM" (2026), dan saran pengembangan tim.*

*Versi 1.0 – Juni 2026*
