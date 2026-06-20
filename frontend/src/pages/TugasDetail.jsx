import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import api from '../services/api';

export default function TugasDetail() {
  const { roomId, tugasId } = useParams(); // tugasId is the pertemuan_id
  const navigate = useNavigate();
  const { user } = useStore();
  const [pertemuan, setPertemuan] = useState(null);
  const [tasks, setTasks] = useState({ learning_tasks: [], project_tasks: [] });
  const [isLoading, setIsLoading] = useState(false);

  const isTeacher = user?.role === 'guru';

  useEffect(() => {
    setIsLoading(true);
    // Fetch meetings to find this one, and its tasks
    Promise.all([
      api.get(`/rooms/${roomId}/pertemuan`),
      api.get(`/pertemuan/${tugasId}/tasks`)
    ])
      .then(([pertRes, tasksRes]) => {
        const found = pertRes.data?.find(p => p.id === tugasId);
        setPertemuan(found || null);
        setTasks(tasksRes.data || { learning_tasks: [], project_tasks: [] });
      })
      .catch(err => console.error("Error loading task details:", err))
      .finally(() => setIsLoading(false));
  }, [roomId, tugasId]);

  const handleStartTask = () => {
    // Determine where to redirect
    const learningTaskId = tasks.learning_tasks[0]?.id;
    const projectTaskId = tasks.project_tasks[0]?.id;

    if (learningTaskId) {
      navigate(`/workspace/${learningTaskId}`);
    } else if (projectTaskId) {
      navigate(`/workspace/${projectTaskId}`);
    } else {
      alert("Tugas ini tidak memiliki modul coding yang aktif.");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full px-6 py-12 flex justify-center items-center">
        <div className="neo-card p-12 text-center max-w-sm">
          <i className="ti ti-loader animate-spin text-3xl text-blue-600 mb-2" />
          <p className="font-nunito text-xs text-slate-500 font-bold">Memuat detail pertemuan...</p>
        </div>
      </div>
    );
  }

  if (!pertemuan) {
    return (
      <div className="w-full px-6 py-12 flex justify-center items-center">
        <div className="neo-card p-8 text-center max-w-sm border-4 border-[#0F172A]">
          <i className="ti ti-alert-triangle text-4xl text-red-500 mb-2" />
          <h3 className="font-fredoka text-lg font-bold">Detail Tidak Ditemukan</h3>
          <p className="font-nunito text-xs text-slate-500 font-bold mt-1">
            Data pertemuan ini tidak dapat ditemukan di server.
          </p>
        </div>
      </div>
    );
  }

  // Extract CBL details
  const cbl = pertemuan.cbl_engage_json || {};
  const bigIdea = cbl.big_idea || 'Coding & Web';
  const essentialQuestion = cbl.essential_question || 'Pertanyaan esensial sedang disiapkan.';
  const challenge = cbl.challenge || 'Tantangan praktik pemrograman web sedang disiapkan.';

  return (
    <div className="w-full px-4 md:px-6 py-8 text-left max-w-4xl mx-auto flex flex-col gap-6">
      {/* Back Button */}
      <button 
        onClick={() => navigate(`/ruang-belajar/${roomId}`)}
        className="w-fit py-1.5 px-3 border-2 border-[#0F172A] bg-white text-slate-700 font-fredoka text-xs font-bold rounded-xl shadow-[2px_2px_0px_#0F172A] hover:-translate-y-0.5 active:translate-y-[0.5px] cursor-pointer transition-all flex items-center gap-1.5"
      >
        <i className="ti ti-arrow-left" />
        Kembali ke Alur Kelas
      </button>

      {/* CBL Engage Section */}
      <section className="neo-section bg-white border-4 border-[#0F172A] p-6 rounded-[24px] shadow-[6px_6px_0px_#0F172A] flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3">
          <span className="bg-[#FACC15] text-[#0F172A] border-2 border-[#0F172A] px-3.5 py-1 rounded-xl font-fredoka text-[10px] font-bold shadow-[2px_2px_0px_#0F172A] flex items-center gap-1">
            <i className="ti ti-bulb" />
            FASE ENGAGE (CBL)
          </span>
          <span className="font-fredoka text-xs text-slate-400 font-bold">
            Topik: {bigIdea}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pertanyaan Esensial (Essential Question)</span>
          <h3 className="font-fredoka text-lg md:text-xl font-bold text-slate-800 leading-tight">
            {essentialQuestion}
          </h3>
        </div>

        <div className="bg-blue-50 border-2 border-[#0F172A] p-4 rounded-xl shadow-[3px_3px_0px_#0F172A] mt-2">
          <span className="text-[9px] font-black text-blue-700 uppercase tracking-widest block mb-1">Tantangan Kelas (The Challenge)</span>
          <p className="font-nunito text-xs text-slate-800 font-semibold leading-relaxed">
            {challenge}
          </p>
        </div>
      </section>

      {/* Materials List Section */}
      {pertemuan.materi_list_json && pertemuan.materi_list_json.length > 0 && (
        <section className="neo-section bg-white border-4 border-[#0F172A] p-6 rounded-[24px] shadow-[6px_6px_0px_#0F172A] flex flex-col gap-4">
          <span className="w-fit bg-[#3B82F6] text-white border-2 border-[#0F172A] px-3.5 py-1 rounded-xl font-fredoka text-[10px] font-bold shadow-[2px_2px_0px_#0F172A] flex items-center gap-1">
            <i className="ti ti-file-text" />
            BAHAN AJAR & MATERI DOKUMEN
          </span>
          <div className="flex flex-col gap-3">
            <p className="font-nunito text-xs text-slate-500 font-bold">
              Pelajari materi atau unduh berkas panduan belajar berikut sebelum memulai praktik mandiri:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
              {pertemuan.materi_list_json.map((m, idx) => (
                <a 
                  key={idx}
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-[#0F172A] p-3 rounded-xl bg-slate-50 hover:bg-white hover:-translate-y-0.5 shadow-[2px_2px_0px_#0F172A] transition-all flex items-center justify-between text-xs font-nunito font-bold text-slate-800"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <i className="ti ti-file-symlink text-blue-600 text-lg" />
                    <span className="truncate">{m.title}</span>
                  </div>
                  <i className="ti ti-external-link text-slate-400 ml-2" />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fase Investigate Section */}
      <section className="neo-section bg-white border-4 border-[#0F172A] p-6 rounded-[24px] shadow-[6px_6px_0px_#0F172A] flex flex-col gap-4">
        <span className="w-fit bg-[#10B981] text-white border-2 border-[#0F172A] px-3.5 py-1 rounded-xl font-fredoka text-[10px] font-bold shadow-[2px_2px_0px_#0F172A] flex items-center gap-1">
          <i className="ti ti-search" />
          FASE INVESTIGATE
        </span>

        {/* Guiding questions list */}
        {pertemuan.guiding_questions_json && pertemuan.guiding_questions_json.length > 0 && (
          <div className="text-left flex flex-col gap-2.5">
            <h4 className="font-fredoka text-xs font-bold text-slate-800 uppercase tracking-wider">
              Pertanyaan Pemandu Belajar:
            </h4>
            <ul className="font-nunito text-xs text-slate-700 font-semibold space-y-2 list-disc pl-4">
              {pertemuan.guiding_questions_json.map((q, idx) => (
                <li key={idx} className="leading-relaxed">{q}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Reflection questions list */}
        {pertemuan.reflection_questions_json && pertemuan.reflection_questions_json.length > 0 && (
          <div className="text-left flex flex-col gap-2.5 mt-2 pt-4 border-t border-dashed border-slate-200">
            <h4 className="font-fredoka text-xs font-bold text-slate-800 uppercase tracking-wider">
              Pertanyaan Refleksi Pasca-Praktik:
            </h4>
            <ul className="font-nunito text-xs text-slate-500 font-semibold space-y-2 list-disc pl-4">
              {pertemuan.reflection_questions_json.map((q, idx) => (
                <li key={idx} className="leading-relaxed">{q}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Start Action Bar */}
      {isTeacher ? (
        <section className="neo-section neo-card p-5 border-4 border-[#0F172A] shadow-[6px_6px_0px_#0F172A] bg-blue-50/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-left">
            <h4 className="font-fredoka text-base font-bold text-[#0F172A]">Mode Fasilitator Kelas</h4>
            <p className="font-nunito text-[11px] text-slate-650 font-bold">
              Anda berada dalam mode fasilitator. Gunakan tombol di bawah untuk kembali mengelola parameter pertemuan ini di timeline kelas.
            </p>
          </div>

          <div className="flex gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => navigate(`/ruang-belajar/${roomId}`)}
              className="flex-grow px-5 py-2.5 bg-blue-600 text-white border-2 border-[#0F172A] shadow-[2.5px_2.5px_0px_#0F172A] font-fredoka text-xs font-bold rounded-xl hover:-translate-y-0.5 active:translate-y-[0.5px] cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              <i className="ti ti-settings" />
              Kelola Rencana & Pertemuan
            </button>
          </div>
        </section>

      ) : (
        <section className="neo-section neo-card p-5 border-4 border-[#0F172A] shadow-[6px_6px_0px_#0F172A] bg-[#EC4899]/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-left">
            <h4 className="font-fredoka text-base font-bold text-[#0F172A]">Sudah Siap Memulai Praktik?</h4>
            <p className="font-nunito text-[11px] text-slate-650 font-bold">
              Anda akan diarahkan melalui perencanaan berpikir komputasional (CT Journey) sebelum merakit kode.
            </p>
          </div>

          <button
            onClick={handleStartTask}
            className="px-6 py-3 bg-[#EC4899] text-white border-2 border-[#0F172A] shadow-[3px_3px_0px_#0F172A] font-fredoka text-sm font-bold rounded-xl hover:-translate-y-0.5 active:translate-y-[0.5px] cursor-pointer transition-all flex items-center gap-1.5 shrink-0"
          >
            <i className="ti ti-rocket" />
            Mulai Kerjakan Misi
          </button>
        </section>
      )}
    </div>
  );
}
