import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import WebCraftLogo from '../components/common/WebCraftLogo';


export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('siswa'); // 'siswa' or 'guru'
  const [nisnNip, setNisnNip] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !nisnNip) return;

    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
        role,
        nisn_nip: nisnNip
      });

      setSuccessMsg('Pendaftaran berhasil! Dialihkan ke halaman masuk dalam 2 detik...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err.response?.data?.detail || 
        "Pendaftaran gagal. Pastikan email belum terdaftar dan periksa input Anda."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[90vh] py-8 px-4 flex items-center justify-center max-w-[1100px] mx-auto relative z-10 neo-section">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Visual branding and details */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 md:p-8 bg-gradient-to-br from-[#10B981] to-teal-700 text-white rounded-3xl border-4 border-[#0F172A] shadow-[8px_8px_0px_#0F172A] text-left relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-10 -mb-10 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <WebCraftLogo className="w-10 h-10" />
              <span className="font-fredoka text-xl font-black text-white tracking-wide">WebCraft</span>
            </div>
            
            <h2 className="font-fredoka text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              Bergabung di Kelas Belajar WebCraft
            </h2>
            <p className="font-nunito text-xs text-emerald-100 font-bold leading-relaxed mb-8">
              Akses materi pembelajaran coding web berbasis computational thinking. Mari daftarkan akun baru Anda sesuai dengan peran Anda di sekolah!
            </p>
          </div>
        </div>

        {/* Right Column: Register Form */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="w-full neo-card bg-white flex flex-col p-6 md:p-8 border-4 border-[#0F172A] shadow-[8px_8px_0px_#0F172A]">
            <h3 className="font-fredoka text-2xl font-bold text-[#0F172A] flex items-center justify-center gap-2 mb-6 border-b-2 border-dashed border-[#0F172A] pb-3">
              <i className="ti ti-user-plus text-2xl text-emerald-600 font-bold" />
              Formulir Pendaftaran
            </h3>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border-2 border-red-500 rounded-xl text-xs font-nunito font-bold text-red-700 flex items-center gap-2">
                <i className="ti ti-alert-triangle text-base shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border-2 border-emerald-500 rounded-xl text-xs font-nunito font-bold text-emerald-700 flex items-center gap-2 animate-pulse">
                <i className="ti ti-circle-check text-base shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div className="text-left">
                <label className="font-fredoka font-bold text-[#0F172A] text-sm mb-1.5 block">Nama Lengkap</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">
                    <i className="ti ti-user text-lg" />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama lengkap Anda..."
                    className="w-full neo-input pl-10 text-sm"
                    disabled={isLoading || successMsg}
                    required
                  />
                </div>
              </div>

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
                    placeholder="contoh: budi@siswa.com"
                    className="w-full neo-input pl-10 text-sm"
                    disabled={isLoading || successMsg}
                    required
                  />
                </div>
              </div>

              <div className="text-left">
                <label className="font-fredoka font-bold text-[#0F172A] text-sm mb-1.5 block">Kata Sandi</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">
                    <i className="ti ti-lock text-lg" />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Buat kata sandi Anda..."
                    className="w-full neo-input pl-10 text-sm"
                    disabled={isLoading || successMsg}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-left">
                  <label className="font-fredoka font-bold text-[#0F172A] text-sm mb-1.5 block">Peran Kelas</label>
                  <div className="relative select-none">
                    <div
                      onClick={() => !(isLoading || successMsg) && setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                      className={`w-full font-nunito font-bold p-2.5 bg-white border-2 border-[#0F172A] shadow-[3px_3px_0px_#0F172A] rounded-xl transition-all text-sm cursor-pointer flex justify-between items-center ${
                        isLoading || successMsg ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <span>{role === 'siswa' ? 'Siswa' : 'Guru'}</span>
                      <i className={`ti ti-chevron-down text-base font-bold transition-transform duration-200 ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {isRoleDropdownOpen && (
                      <>
                        {/* Overlay to close on click outside */}
                        <div className="fixed inset-0 z-40" onClick={() => setIsRoleDropdownOpen(false)} />
                        <div className="absolute left-0 right-0 top-full mt-2 bg-white border-2 border-[#0F172A] shadow-[4px_4px_0px_#0F172A] rounded-xl z-50 overflow-hidden flex flex-col">
                          <button
                            type="button"
                            onClick={() => {
                              setRole('siswa');
                              setNisnNip('');
                              setIsRoleDropdownOpen(false);
                            }}
                            className={`px-3.5 py-2.5 text-left font-nunito font-bold text-xs border-b border-dashed border-slate-100 transition-colors cursor-pointer w-full hover:bg-slate-100 ${
                              role === 'siswa' ? 'bg-emerald-50 text-emerald-700' : 'text-[#0F172A]'
                            }`}
                          >
                            Siswa
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setRole('guru');
                              setNisnNip('');
                              setIsRoleDropdownOpen(false);
                            }}
                            className={`px-3.5 py-2.5 text-left font-nunito font-bold text-xs transition-colors cursor-pointer w-full hover:bg-slate-100 ${
                              role === 'guru' ? 'bg-emerald-50 text-emerald-700' : 'text-[#0F172A]'
                            }`}
                          >
                            Guru
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-left">
                  <label className="font-fredoka font-bold text-[#0F172A] text-sm mb-1.5 block">
                    {role === 'siswa' ? 'NISN Siswa' : 'NIP Guru'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-400">
                      <i className="ti ti-id text-lg" />
                    </span>
                    <input
                      type="text"
                      value={nisnNip}
                      onChange={(e) => setNisnNip(e.target.value)}
                      placeholder={role === 'siswa' ? "10 digit NISN" : "18 digit NIP"}
                      className="w-full neo-input pl-10 text-sm"
                      disabled={isLoading || successMsg}
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || successMsg}
                className={`w-full py-3 rounded-xl font-fredoka text-base font-bold flex items-center justify-center gap-2 transition-all border-2 border-[#0F172A] shadow-[4px_4px_0px_#0F172A] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#0F172A] active:translate-y-[2px] active:shadow-[1px_1px_0px_#0F172A] mt-2 ${
                  isLoading || successMsg
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : 'bg-[#10B981] text-white cursor-pointer'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <i className="ti ti-loader animate-spin text-lg" />
                    Mendaftarkan...
                  </span>
                ) : (
                  <>
                    <i className="ti ti-user-plus text-lg" />
                    Daftar Akun
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="font-nunito text-xs text-slate-600 font-bold">
                Sudah memiliki akun?{' '}
                <span 
                  onClick={() => navigate('/login')}
                  className="text-blue-600 hover:underline cursor-pointer font-bold"
                >
                  Masuk di sini
                </span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
