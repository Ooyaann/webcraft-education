import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import api from '../services/api';
import WebCraftLogo from '../components/common/WebCraftLogo';


export default function Login() {
  const navigate = useNavigate();
  const { setUser, setActiveRoom, resetWorkspace } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });

      const { access_token, user: userData } = response.data;
      localStorage.setItem('webcraft_token', access_token);

      // Clean workspace to prevent state leakage
      resetWorkspace();

      setUser({
        id: userData.id,
        name: userData.name,
        role: userData.role,
        email: userData.email
      });

      // Fetch actual classrooms joined by the student dynamically
      if (userData.role === 'siswa') {
        try {
          const roomsRes = await api.get('/rooms');
          const list = roomsRes.data || [];
          if (list.length > 0) {
            setActiveRoom(list[0]);
          } else {
            setActiveRoom(null);
          }
        } catch (e) {
          console.error("Gagal memuat kelas siswa:", e);
          setActiveRoom(null);
        }
      } else {
        setActiveRoom(null);
      }

      navigate('/');
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err.response?.data?.detail || 
        "Gagal masuk. Periksa kembali alamat email dan kata sandi Anda."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (demoEmail, demoPw) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const response = await api.post('/auth/login', {
        email: demoEmail,
        password: demoPw
      });

      const { access_token, user: userData } = response.data;
      localStorage.setItem('webcraft_token', access_token);
      resetWorkspace();
      setUser({
        id: userData.id,
        name: userData.name,
        role: userData.role,
        email: userData.email
      });

      if (userData.role === 'siswa') {
        try {
          const roomsRes = await api.get('/rooms');
          const list = roomsRes.data || [];
          if (list.length > 0) {
            setActiveRoom(list[0]);
          } else {
            setActiveRoom(null);
          }
        } catch (e) {
          console.error("Gagal memuat kelas siswa:", e);
          setActiveRoom(null);
        }
      } else {
        setActiveRoom(null);
      }

      navigate('/');
    } catch (err) {
      console.error(err);
      setErrorMsg("Gagal melakukan login demo cepat.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[90vh] py-8 px-4 flex items-center justify-center max-w-[1100px] mx-auto relative z-10 neo-section">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Visual branding and details */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 md:p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl border-4 border-[#0F172A] shadow-[8px_8px_0px_#0F172A] text-left relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-10 -mb-10 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <WebCraftLogo className="w-10 h-10" />
              <span className="font-fredoka text-xl font-black text-white tracking-wide">WebCraft</span>
            </div>
            
            <h2 className="font-fredoka text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              Belajar Berpikir Komputasional & Coding Web
            </h2>
            <p className="font-nunito text-xs text-blue-100 font-bold leading-relaxed mb-8">
              Platform pembelajaran Computational Thinking berbasis Web yang mengintegrasikan AI Asisten Siswa dan visualisasi interaktif untuk siswa.
            </p>
          </div>
        </div>

        {/* Right Column: Login Form */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="w-full neo-card bg-white flex flex-col p-6 md:p-8 border-4 border-[#0F172A] shadow-[8px_8px_0px_#0F172A]">
            <h3 className="font-fredoka text-2xl font-bold text-[#0F172A] flex items-center justify-center gap-2 mb-6 border-b-2 border-dashed border-[#0F172A] pb-3">
              <i className="ti ti-login text-2xl text-blue-600 font-bold" />
              Masuk ke Platform
            </h3>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border-2 border-red-500 rounded-xl text-xs font-nunito font-bold text-red-700 flex items-center gap-2">
                <i className="ti ti-alert-triangle text-base shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="text-left">
                <label className="font-fredoka font-bold text-[#0F172A] text-sm mb-1.5 block">Alamat Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">
                    <i className="ti ti-mail text-lg" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contoh: andi@siswa.com"
                    className="w-full neo-input pl-10 text-sm"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="text-left mb-2">
                <label className="font-fredoka font-bold text-[#0F172A] text-sm mb-1.5 block">Kata Sandi</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">
                    <i className="ti ti-lock text-lg" />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi Anda..."
                    className="w-full neo-input pl-10 text-sm"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!email || !password || isLoading}
                className={`w-full py-3 rounded-xl font-fredoka text-base font-bold flex items-center justify-center gap-2 transition-all border-2 border-[#0F172A] shadow-[4px_4px_0px_#0F172A] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#0F172A] active:translate-y-[2px] active:shadow-[1px_1px_0px_#0F172A] ${
                  isLoading
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : 'bg-[#FACC15] text-[#0F172A] cursor-pointer'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <i className="ti ti-loader animate-spin text-lg" />
                    Mengecek Data...
                  </span>
                ) : (
                  <>
                    <i className="ti ti-login text-lg" />
                    Masuk Sekarang
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="font-nunito text-xs text-slate-600 font-bold">
                Belum punya akun kelas?{' '}
                <span 
                  onClick={() => navigate('/register')}
                  className="text-blue-600 hover:underline cursor-pointer font-bold animate-pulse"
                >
                  Daftar di sini
                </span>
              </p>
            </div>

            {/* Demo Fast Logins Section */}
            <div className="mt-6 pt-5 border-t-2 border-dashed border-[#0F172A] text-left">
              <p className="font-fredoka font-bold text-slate-700 text-xs mb-3 flex items-center gap-1">
                <i className="ti ti-bolt text-amber-500 text-base" />
                Akses Cepat Uji Coba Lomba (Demo):
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleQuickLogin('andi@siswa.com', 'siswa123')}
                  disabled={isLoading}
                  className="w-full py-2 px-3 bg-blue-100 hover:bg-blue-200 text-blue-800 font-fredoka font-bold text-xs rounded-xl border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] hover:-translate-y-0.5 active:translate-y-[0.5px] cursor-pointer flex justify-between items-center transition-all"
                >
                  <span className="flex items-center gap-1.5">
                    <i className="ti ti-user text-sm" />
                    Siswa: Andi
                  </span>
                  <span className="bg-blue-200/50 px-2 py-0.5 rounded text-[10px] border border-[#0F172A]/10">andi@siswa.com</span>
                </button>

                <button
                  onClick={() => handleQuickLogin('budi@guru.com', 'guru123')}
                  disabled={isLoading}
                  className="w-full py-2 px-3 bg-pink-100 hover:bg-pink-200 text-pink-800 font-fredoka font-bold text-xs rounded-xl border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] hover:-translate-y-0.5 active:translate-y-[0.5px] cursor-pointer flex justify-between items-center transition-all"
                >
                  <span className="flex items-center gap-1.5">
                    <i className="ti ti-school text-sm" />
                    Guru: Pak Budi
                  </span>
                  <span className="bg-pink-200/50 px-2 py-0.5 rounded text-[10px] border border-[#0F172A]/10">budi@guru.com</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
