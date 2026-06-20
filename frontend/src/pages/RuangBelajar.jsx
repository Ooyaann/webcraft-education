import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import api from '../services/api';

export default function RuangBelajar() {
  const navigate = useNavigate();
  const { user, setActiveRoom, resetWorkspace } = useStore();
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  
  // Form states
  const [roomCode, setRoomCode] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/rooms');
      setRooms(res.data || []);
    } catch (err) {
      console.error("Error fetching classrooms:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    if (roomCode.length !== 6) return;

    setIsSubmitLoading(true);
    setErrorMsg('');

    try {
      const res = await api.post('/rooms/join', {
        code: roomCode.toUpperCase()
      });

      // Clear workspace to start fresh in the new class
      resetWorkspace();
      setActiveRoom(res.data);
      setRoomCode('');
      
      // Refresh list
      await fetchRooms();
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err.response?.data?.detail || 
        "Gagal bergabung ke kelas. Pastikan kode kelas benar dan kelas masih aktif."
      );
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;

    setIsSubmitLoading(true);
    setErrorMsg('');

    try {
      await api.post('/rooms', {
        name: newRoomName
      });

      setNewRoomName('');
      setShowCreateModal(false);
      
      // Refresh list
      await fetchRooms();
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err.response?.data?.detail || 
        "Gagal membuat kelas baru."
      );
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleOpenRoom = (room) => {
    setActiveRoom(room);
    navigate(`/ruang-belajar/${room.id}`);
  };

  if (!user) {
    return (
      <div className="w-full px-6 py-12 flex flex-col items-center justify-center max-w-lg mx-auto">
        <div className="neo-card p-8 text-center border-4 border-[#0F172A] shadow-[6px_6px_0px_#0F172A] w-full">
          <i className="ti ti-lock text-5xl text-blue-600 mb-4" />
          <h2 className="font-fredoka text-xl font-bold mb-2">Akses Terkunci</h2>
          <p className="font-nunito text-xs text-slate-500 font-bold mb-6">
            Silakan masuk ke akun kelas Anda terlebih dahulu untuk mengakses fitur Ruang Belajar!
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2.5 bg-[#FACC15] text-[#0F172A] border-2 border-[#0F172A] font-fredoka text-xs font-bold rounded-xl shadow-[3px_3px_0px_#0F172A] hover:-translate-y-0.5 active:translate-y-[0.5px] cursor-pointer transition-all"
          >
            Masuk Sekarang
          </button>
        </div>
      </div>
    );
  }

  const isTeacher = user.role === 'guru';

  return (
    <div className="w-full px-4 md:px-6 py-8 text-left max-w-5xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="border-b-2 border-dashed border-slate-350 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-fredoka text-2xl md:text-3xl font-bold text-[#0F172A] flex items-center gap-2">
            <i className="ti ti-school text-blue-600" />
            Ruang Belajar
          </h2>
          <p className="font-nunito text-xs text-slate-500 font-bold mt-1">
            {isTeacher 
              ? 'Kelola ruang kelas, buat kode pendaftaran kelas, dan susun aktivitas pembelajaran.' 
              : 'Daftar ruang kelas yang diikuti. Gabung kelas baru menggunakan kode dari Guru.'}
          </p>
        </div>
        
        {isTeacher && (
          <button
            onClick={() => {
              setErrorMsg('');
              setShowCreateModal(true);
            }}
            className="px-5 py-2.5 bg-blue-600 text-white border-2 border-[#0F172A] shadow-[3px_3px_0px_#0F172A] font-fredoka text-xs font-bold rounded-xl hover:-translate-y-0.5 active:translate-y-[0.5px] cursor-pointer transition-all flex items-center gap-1.5 shrink-0"
          >
            <i className="ti ti-plus" />
            Buat Kelas Baru
          </button>
        )}
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border-2 border-red-500 rounded-xl text-xs font-nunito font-bold text-red-700 flex items-center gap-2">
          <i className="ti ti-alert-triangle text-base shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Classroom Join Gate (Student Only) */}
      {!isTeacher && (
        <section className="neo-section bg-white border-4 border-[#0F172A] p-6 rounded-[24px] shadow-[6px_6px_0px_#0F172A]">
          <h3 className="font-fredoka text-lg font-bold text-[#0F172A] mb-3 flex items-center gap-1.5">
            <i className="ti ti-user-plus text-emerald-600" />
            Gabung Kelas Baru
          </h3>
          <form onSubmit={handleJoinRoom} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="Masukkan 6-digit kode kelas (contoh: IPA7A1)"
              maxLength={6}
              className="flex-1 neo-input text-xs"
              required
              disabled={isSubmitLoading}
            />
            <button
              type="submit"
              disabled={roomCode.length !== 6 || isSubmitLoading}
              className={`px-6 py-3 rounded-xl border-2 border-[#0F172A] shadow-[3px_3px_0px_#0F172A] font-fredoka text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                roomCode.length !== 6 || isSubmitLoading
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-[#FACC15] text-[#0F172A] hover:-translate-y-0.5 active:translate-y-[0.5px] cursor-pointer'
              }`}
            >
              {isSubmitLoading ? (
                <>
                  <i className="ti ti-loader animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <i className="ti ti-login-2" />
                  Gabung Sekarang
                </>
              )}
            </button>
          </form>
        </section>
      )}

      {/* Classrooms List */}
      <section className="neo-section flex flex-col gap-4">
        <h3 className="font-fredoka text-lg font-bold text-[#0F172A]">
          {isTeacher ? 'Kelas yang Anda Kelola' : 'Daftar Kelas yang Diikuti'}
        </h3>

        {isLoading ? (
          <div className="neo-card p-12 text-center border-2 border-slate-200">
            <i className="ti ti-loader animate-spin text-3xl text-blue-600 mb-2" />
            <p className="font-nunito text-xs text-slate-500 font-bold">Membuat sambungan ke server...</p>
          </div>
        ) : rooms.length === 0 ? (
          <div className="neo-card p-12 text-center border-4 border-[#0F172A] shadow-[6px_6px_0px_#0F172A] bg-slate-50">
            <i className="ti ti-folder-off text-4xl text-slate-400 mb-2" />
            <h4 className="font-fredoka text-base font-bold text-slate-800">Belum Ada Kelas</h4>
            <p className="font-nunito text-xs text-slate-500 font-bold">
              {isTeacher 
                ? 'Klik tombol "Buat Kelas Baru" di atas untuk memulai pembelajaran!'
                : 'Hubungi guru Anda untuk mendapatkan kode kelas 6-digit dan gabung di sini!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div 
                key={room.id}
                className="neo-card p-5 border-4 border-[#0F172A] shadow-[6px_6px_0px_#0F172A] bg-white flex flex-col justify-between hover:-translate-y-0.5 transition-all text-left min-h-[160px] gap-4"
              >
                <div>
                  <h4 className="font-fredoka text-base md:text-lg font-bold text-[#0F172A] mb-1">{room.name}</h4>
                  <p className="font-nunito text-[10px] text-slate-500 font-bold">
                    KODE KELAS:{' '}
                    <span className="text-blue-600 font-fredoka font-bold text-xs tracking-wider">
                      {room.code}
                    </span>
                  </p>
                </div>
                
                <button
                  onClick={() => handleOpenRoom(room)}
                  className="w-full py-2 bg-blue-600 text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] font-fredoka text-xs font-bold rounded-lg hover:-translate-y-0.5 active:translate-y-[0.5px] cursor-pointer transition-all flex items-center justify-center gap-1"
                >
                  <i className="ti ti-door-enter text-sm" />
                  Buka Kelas
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Teacher Create Room Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border-4 border-[#0F172A] rounded-2xl shadow-[8px_8px_0px_#0F172A] overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center border-b-4 border-[#0F172A]">
              <h3 className="font-fredoka text-lg font-bold flex items-center gap-1.5">
                <i className="ti ti-plus" />
                Buat Kelas Baru
              </h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-white hover:text-slate-200 cursor-pointer"
              >
                <i className="ti ti-x text-lg" />
              </button>
            </div>
            
            <form onSubmit={handleCreateRoom} className="p-6 flex flex-col gap-4">
              <div className="text-left">
                <label className="font-fredoka font-bold text-slate-700 text-xs mb-1.5 block">Nama Kelas / Ruangan</label>
                <input
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder="contoh: Kelas 7A - SMP Negeri Semarang"
                  className="w-full neo-input text-xs"
                  required
                  disabled={isSubmitLoading}
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border-2 border-[#0F172A] bg-white text-slate-700 font-nunito font-bold rounded-xl hover:-translate-y-0.5 cursor-pointer text-xs"
                  disabled={isSubmitLoading}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!newRoomName.trim() || isSubmitLoading}
                  className="px-4 py-2 bg-blue-600 text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] font-fredoka font-bold rounded-xl hover:-translate-y-0.5 cursor-pointer text-xs"
                >
                  {isSubmitLoading ? 'Membuat...' : 'Buat Kelas'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
