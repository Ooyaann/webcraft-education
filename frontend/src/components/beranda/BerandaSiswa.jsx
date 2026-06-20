import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import api from '../../services/api';

export default function BerandaSiswa({ user }) {
  const navigate = useNavigate();
  const { activeRoom } = useStore();
  const [tasks, setTasks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [projectSubmissions, setProjectSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch submissions for stats
    api.get('/submissions/learning/me')
      .then((res) => setSubmissions(res.data || []))
      .catch(() => {});

    api.get('/submissions/project/me')
      .then((res) => setProjectSubmissions(res.data || []))
      .catch(() => {});

    // Fetch student's class assignments if connected to a room
    if (activeRoom) {
      setIsLoading(true);
      api.get(`/rooms/${activeRoom.id}/pertemuan`)
        .then((res) => setTasks(res.data || []))
        .catch((err) => console.error('Error loading tasks:', err))
        .finally(() => setIsLoading(false));
    }
  }, [activeRoom]);

  const activeTasks = tasks.filter((t) => t.is_published).slice(0, 3);

  // Find real teacher feedback from project or learning submissions
  const latestFeedback = useMemo(() => {
    const gradedProjects = projectSubmissions.filter(s => s.teacher_comment && s.teacher_comment.trim() !== '');
    if (gradedProjects.length > 0) {
      const latestProj = gradedProjects[gradedProjects.length - 1];
      return {
        author: 'Guru Kelas',
        text: latestProj.teacher_comment,
        score: latestProj.teacher_score,
        task: latestProj.task_title
      };
    }
    return null;
  }, [projectSubmissions]);

  return (
    <div className="w-full flex flex-col gap-6 py-8 px-4 md:px-6 text-left max-w-[1200px] mx-auto neo-page-enter">
      {/* Welcome Banner — minimal & animated */}
      <section className="neo-stagger-1 bg-white border-4 border-[#0F172A] p-6 rounded-[24px] shadow-[6px_6px_0px_#0F172A] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
        <div
          className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)' }}
        />
        <div className="relative z-10">
          <h2 className="font-fredoka text-2xl md:text-3xl font-bold text-[#0F172A] mb-1">
            Selamat Datang, {user.name ? user.name.replace(/\s*\((Siswa|Guru)\)/i, '') : ''}!
          </h2>
          <p className="font-nunito text-xs text-slate-600 font-bold">
            Siap lanjutkan tantangan coding hari ini?
          </p>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-[#0F172A] px-5 py-3 rounded-2xl shadow-[4px_4px_0px_#0F172A] shrink-0">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A]">
            <i className="ti ti-user-check text-lg" />
          </div>
          <div className="text-left">
            <span className="font-nunito text-[10px] font-black text-slate-400 uppercase tracking-widest block leading-none mb-1">
              Peran Pengguna
            </span>
            <span className="font-fredoka text-base font-bold text-[#0F172A] tracking-tight capitalize leading-none block">
              {user.role} WebCraft
            </span>
          </div>
        </div>
      </section>

      {/* Classroom Announcement Board */}
      {activeRoom?.announcement && (
        <section className="neo-stagger-2 bg-amber-50 border-4 border-[#0F172A] p-5 rounded-[24px] shadow-[6px_6px_0px_#0F172A] text-left flex flex-col gap-2 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-amber-200/30 rounded-full blur-xl -mr-6 -mt-6 pointer-events-none" />
          <h3 className="font-fredoka text-sm font-bold text-amber-900 flex items-center gap-1.5 z-10">
            <i className="ti ti-bell-ringing text-lg animate-bounce" />
            Pengumuman Kelas Baru
          </h3>
          <p className="font-nunito text-xs text-slate-700 font-semibold leading-relaxed z-10 whitespace-pre-line">
            {activeRoom.announcement}
          </p>
        </section>
      )}

      {/* Quick Navigation Cards — animated bouncy */}
      <section className="neo-stagger-3 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: 'ti-school',
            label: 'Ruang Belajar',
            desc: 'Buka kelas',
            color: '#3B82F6',
            bg: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
            to: '/ruang-belajar',
          },
          {
            icon: 'ti-photo-heart',
            label: 'Galeri Karya',
            desc: 'Lihat karya',
            color: '#EC4899',
            bg: 'linear-gradient(135deg, #FDF2F8, #FCE7F3)',
            to: '/galeri',
          },
          {
            icon: 'ti-checklist',
            label: 'Tugasku',
            desc: 'Cek tugas',
            color: '#10B981',
            bg: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
            to: '/tugasku',
          },
          {
            icon: 'ti-circle-check',
            label: 'Misi Dikirim',
            desc: `${submissions.length + projectSubmissions.length} misi`,
            color: '#F59E0B',
            bg: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
            to: null,
          },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => item.to && navigate(item.to)}
            className={`bg-white border-2 border-[#0F172A] p-4 rounded-2xl shadow-[3px_3px_0px_#0F172A] text-center neo-hover-bounce flex flex-col items-center gap-2 ${item.to ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center border"
              style={{
                background: item.bg,
                color: item.color,
                borderColor: `${item.color}30`,
              }}
            >
              <i className={`ti ${item.icon} text-xl`} />
            </div>
            <div>
              <p className="font-fredoka text-xs font-bold text-[#0F172A]">
                {item.label}
              </p>
              <p className="font-nunito text-[9px] text-slate-500 font-bold">
                {item.desc}
              </p>
            </div>
          </button>
        ))}
      </section>

      {/* Grid: Active Missions + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Active Missions */}
        <div className="lg:col-span-7 neo-stagger-4 bg-white border-4 border-[#0F172A] p-6 rounded-[24px] shadow-[6px_6px_0px_#0F172A]">
          <h3 className="font-fredoka text-base font-bold text-[#0F172A] mb-4 flex items-center gap-2 border-b-2 border-dashed border-slate-200 pb-3">
            <i className="ti ti-checklist text-[#EC4899] text-lg" />
            Misi Aktif Kelas
          </h3>

          {isLoading ? (
            <div className="py-6 text-center">
              <div className="neo-spinner mx-auto mb-2" />
              <p className="font-nunito text-xs text-slate-500 font-bold">
                Memuat tugas...
              </p>
            </div>
          ) : !activeRoom ? (
            <div className="text-center py-6">
              <p className="font-nunito text-xs text-slate-500 font-bold mb-4">
                Belum bergabung ke kelas manapun.
              </p>
              <button
                onClick={() => navigate('/ruang-belajar')}
                className="px-4 py-2 border-2 border-[#0F172A] font-fredoka text-xs font-bold rounded-xl shadow-[3px_3px_0px_#0F172A] hover:-translate-y-0.5 active:translate-y-[0.5px] cursor-pointer transition-all"
                style={{
                  background: 'linear-gradient(135deg, #FACC15, #FDE68A)',
                  color: '#0F172A',
                }}
              >
                Gabung Kelas
              </button>
            </div>
          ) : activeTasks.length === 0 ? (
            <p className="font-nunito text-xs text-slate-500 font-bold text-center py-6">
              Tidak ada tugas aktif saat ini.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {activeTasks.map((t) => (
                <div
                  key={t.id}
                  className="border-2 border-[#0F172A] p-3 rounded-xl flex justify-between items-center bg-slate-50 shadow-[2px_2px_0px_#0F172A] hover:-translate-y-0.5 transition-all"
                >
                  <div className="text-left min-w-0">
                    <h4 className="font-fredoka text-xs font-bold text-[#0F172A] truncate">
                      {t.judul}
                    </h4>
                    <p className="font-nunito text-[9px] text-slate-500 font-bold mt-0.5 uppercase">
                      {t.tipe === 'project' ? 'Proyek Kreatif' : 'Pembelajaran'}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/ruang-belajar/${activeRoom.id}/tugas/${t.id}`)}
                    className="px-3 py-1 bg-[#3B82F6] text-white border-2 border-[#0F172A] shadow-[1.5px_1.5px_0px_#0F172A] font-fredoka text-[10px] font-bold rounded-lg hover:-translate-y-0.5 active:translate-y-[0.5px] cursor-pointer transition-all shrink-0 ml-2"
                  >
                    Buka
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifications from Teacher */}
        <div className="lg:col-span-5 neo-stagger-5 bg-white border-4 border-[#0F172A] p-6 rounded-[24px] shadow-[6px_6px_0px_#0F172A]">
          <h3 className="font-fredoka text-base font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <i className="ti ti-bell text-amber-500 text-lg" />
            Notifikasi dari Guru
          </h3>

          <div className="flex flex-col gap-3">
            {!latestFeedback ? (
              <div className="border border-slate-200 border-dashed p-4 rounded-xl text-center bg-slate-50 text-slate-500 font-nunito text-xs font-bold">
                Belum ada umpan balik dari Guru kelas.
              </div>
            ) : (
              <div className="border border-slate-200 p-3 rounded-xl bg-slate-50 text-xs font-nunito font-bold flex flex-col gap-1.5 text-left">
                <div className="flex justify-between items-center">
                  <span className="font-fredoka text-slate-800">
                    {latestFeedback.author}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[8px] border border-blue-200">
                    {latestFeedback.task}
                  </span>
                </div>
                <p className="text-slate-600 font-semibold leading-relaxed">
                  "{latestFeedback.text}"
                </p>
                {latestFeedback.score && (
                  <div className="text-[9px] text-slate-400 font-bold mt-1 text-right">
                    Skor: <span className="text-blue-600 font-fredoka text-xs">{latestFeedback.score}/100</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
