import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BerandaGuest() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-10 py-8 px-4 md:px-6 max-w-[1200px] mx-auto neo-page-enter">
      {/* Hero Section */}
      <section
        className="neo-stagger-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border-4 border-[#0F172A] p-6 md:p-10 rounded-[28px] shadow-[8px_8px_0px_#0F172A] relative z-10 overflow-hidden"
      >
        {/* Decorative shapes */}
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)' }}
        />
        <div
          className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #FACC15, #FDE68A)' }}
        />

        <div className="lg:col-span-7 flex flex-col items-start text-left gap-4 relative z-10">
          <div
            className="neo-badge-ai px-3 py-1.5 rounded-xl text-xs"
            style={{
              background: 'linear-gradient(135deg, #FACC15, #FDE68A)',
              color: '#0F172A',
              border: '2px solid #0F172A',
              boxShadow: '2px 2px 0px #0F172A',
              fontSize: '11px',
            }}
          >
            <i className="ti ti-sparkles text-sm" />
            DIDAMPINGI AI TUTOR PINTAR!
          </div>

          <h2 className="font-fredoka text-3xl md:text-[2.75rem] font-black text-[#0F172A] leading-[1.15]">
            Belajar Coding Web<br />
            dengan{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Challenge Based Learning
            </span>
            !
          </h2>

          <p className="font-nunito text-xs md:text-sm font-bold text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
            Platform belajar coding web interaktif untuk siswa SMP. Selesaikan tantangan, rakit blok HTML & CSS, dan dapatkan bimbingan AI Tutor yang melatih cara berpikir, bukan sekadar memberi jawaban!
          </p>

          <div className="flex flex-wrap gap-3 mt-1">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 rounded-xl border-2 border-[#0F172A] font-fredoka text-sm font-bold text-white flex items-center gap-2 hover:-translate-y-1 active:translate-y-[1px] transition-all cursor-pointer neo-hover-bounce"
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
                boxShadow: '4px 4px 0px #0F172A',
              }}
            >
              <i className="ti ti-rocket text-base" />
              Mulai Belajar Sekarang!
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="bg-white border-4 border-[#0F172A] p-5 rounded-[24px] shadow-[6px_6px_0px_#0F172A] rotate-2 hover:rotate-0 transition-transform duration-500 w-full max-w-sm neo-hover-bounce">
            <div
              className="w-full h-44 rounded-xl flex items-center justify-center text-white relative overflow-hidden mb-4 border-2 border-[#0F172A]"
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
              }}
            >
              <i className="ti ti-device-laptop text-7xl" />
              <div className="absolute top-3 right-3 bg-[#10B981] px-2.5 py-0.5 rounded-lg text-[10px] font-bold shadow-[2px_2px_0px_#0F172A] border-2 border-[#0F172A] text-white flex items-center gap-1">
                <i className="ti ti-eye text-xs" />
                Live Preview!
              </div>
              {/* Decorative code lines */}
              <div className="absolute bottom-3 left-3 flex flex-col gap-1 opacity-30">
                <div className="w-20 h-1.5 bg-white/80 rounded-full" />
                <div className="w-14 h-1.5 bg-white/60 rounded-full" />
                <div className="w-24 h-1.5 bg-white/40 rounded-full" />
              </div>
            </div>
            <h3 className="font-fredoka text-lg font-bold text-[#0F172A] mb-1.5 text-left">
              Area Kerja Interaktif
            </h3>
            <p className="font-nunito text-[11px] text-slate-600 font-bold leading-relaxed text-left">
              Tarik, lepas, dan susun blok kode di kanvas, lalu langsung lihat hasil halaman web secara real-time!
            </p>
          </div>
        </div>
      </section>

      {/* Two Types Section: Pembelajaran & Proyek */}
      <section className="neo-stagger-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pembelajaran Card */}
        <div className="bg-white border-4 border-[#0F172A] p-6 rounded-[24px] shadow-[6px_6px_0px_#0F172A] text-left flex flex-col gap-4 neo-hover-bounce relative overflow-hidden">
          <div
            className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)' }}
          />
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A]"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #93C5FD)' }}
          >
            <i className="ti ti-book text-white text-2xl" />
          </div>
          <div>
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-lg text-[9px] font-fredoka font-bold border border-blue-200">TIPE 1</span>
            <h3 className="font-fredoka text-xl font-bold text-[#0F172A] mt-2">Pembelajaran</h3>
            <p className="font-nunito text-xs text-slate-600 font-bold leading-relaxed mt-1">
              Langkah-langkah terpandu dalam mempelajari Coding Web (HTML & CSS). Penilaian dibantu oleh <strong className="text-blue-600">AI</strong> secara otomatis.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <div className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-1 rounded-lg text-[9px] font-fredoka font-bold border border-indigo-200">
              <i className="ti ti-sparkles text-xs" /> Koreksi AI
            </div>
            <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-[9px] font-fredoka font-bold border border-blue-200">
              <i className="ti ti-brain text-xs" /> Chatbot Tutor
            </div>
          </div>
        </div>

        {/* Proyek Card */}
        <div className="bg-white border-4 border-[#0F172A] p-6 rounded-[24px] shadow-[6px_6px_0px_#0F172A] text-left flex flex-col gap-4 neo-hover-bounce relative overflow-hidden">
          <div
            className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10"
            style={{ background: 'linear-gradient(135deg, #EC4899, #F9A8D4)' }}
          />
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A]"
            style={{ background: 'linear-gradient(135deg, #EC4899, #F9A8D4)' }}
          >
            <i className="ti ti-palette text-white text-2xl" />
          </div>
          <div>
            <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-lg text-[9px] font-fredoka font-bold border border-pink-200">TIPE 2</span>
            <h3 className="font-fredoka text-xl font-bold text-[#0F172A] mt-2">Proyek Kreatif</h3>
            <p className="font-nunito text-xs text-slate-600 font-bold leading-relaxed mt-1">
              Studi kasus untuk kreativitas siswa. Kamu bebas berkreasi dan hasilnya dinilai oleh <strong className="text-pink-600">Guru</strong>.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <div className="flex items-center gap-1 bg-pink-50 text-pink-700 px-2 py-1 rounded-lg text-[9px] font-fredoka font-bold border border-pink-200">
              <i className="ti ti-user-check text-xs" /> Dinilai Guru
            </div>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-lg text-[9px] font-fredoka font-bold border border-amber-200">
              <i className="ti ti-bulb text-xs" /> Kreativitas Bebas
            </div>
          </div>
        </div>
      </section>

      {/* AI Highlight — Simple */}
      <section className="neo-stagger-3 bg-white border-4 border-[#0F172A] p-6 md:p-8 rounded-[28px] shadow-[6px_6px_0px_#0F172A] text-left relative overflow-hidden">
        <div
          className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-5 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #6366F1, #A5B4FC)' }}
        />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-dashed border-slate-200 pb-5">
          <div>
            <div
              className="text-white border-2 border-[#0F172A] px-4 py-1 rounded-xl font-fredoka text-xs font-bold inline-flex items-center gap-1.5 mb-3"
              style={{
                background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
                boxShadow: '2px 2px 0px #0F172A',
              }}
            >
              <i className="ti ti-sparkles text-xs" />
              BANTUAN AI
            </div>
            <h3 className="font-fredoka text-2xl md:text-3xl font-bold text-[#0F172A]">
              AI sebagai Teman Belajar
            </h3>
            <p className="font-nunito text-xs md:text-sm text-slate-600 font-bold mt-1">
              AI tidak memberikan jawaban instan. AI menuntun kamu menemukan solusi sendiri!
            </p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2.5 bg-white border-2 border-[#0F172A] text-[#0F172A] shadow-[3px_3px_0px_#0F172A] rounded-xl font-fredoka text-xs font-bold flex items-center gap-1.5 hover:-translate-y-0.5 active:translate-y-[0.5px] cursor-pointer transition-all shrink-0"
          >
            <i className="ti ti-login text-sm" />
            Coba Sekarang
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {[
            {
              icon: 'ti-messages',
              title: 'AI Chatbot Tutor',
              desc: 'Membimbing langkah-langkah coding dengan pertanyaan pemandu yang melatih nalar dan logika berpikir.',
              color: '#6366F1',
              bg: 'rgba(99, 102, 241, 0.05)',
              border: 'rgba(99, 102, 241, 0.15)',
            },
            {
              icon: 'ti-code',
              title: 'AI Koreksi Kode',
              desc: 'Memeriksa dan memberikan umpan balik terhadap struktur HTML & CSS yang kamu buat secara real-time.',
              color: '#3B82F6',
              bg: 'rgba(59, 130, 246, 0.05)',
              border: 'rgba(59, 130, 246, 0.15)',
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl flex flex-col gap-3 hover:-translate-y-0.5 transition-all"
              style={{
                background: card.bg,
                border: `1px solid ${card.border}`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                style={{
                  background: `${card.color}15`,
                  color: card.color,
                  border: `1px solid ${card.border}`,
                }}
              >
                <i className={`ti ${card.icon} text-xl`} />
              </div>
              <h4 className="font-fredoka text-sm font-bold text-slate-800">
                {card.title}
              </h4>
              <p className="font-nunito text-[11px] text-slate-600 font-semibold leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
