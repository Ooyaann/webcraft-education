import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { aiService } from '../../services/aiService';
import api from '../../services/api';

export default function CTJourneyModal({ isOpen, onClose }) {
  const { ctJourneyAnswers, setCtJourneyAnswers, setCtPreScore, activeLevelConfig } = useStore();
  const [currentStep, setCurrentStep] = useState(1); // 1: Decomposition, 2: Abstraction, 3: Pattern, 4: Algorithm, 5: Summary
  const [sessionId, setSessionId] = useState(null);
  
  // Local state for forms
  const [decompInput, setDecompInput] = useState('');
  const [decompChips, setDecompChips] = useState([]);
  const [selectedAbstract, setSelectedAbstract] = useState([]);
  const [chipCategories, setChipCategories] = useState({});
  const [steps, setSteps] = useState([]);

  // Dynamically initialize chips and steps based on active level title
  React.useEffect(() => {
    if (activeLevelConfig) {
      const title = (activeLevelConfig.judul || '').toLowerCase();
      if (title.includes('profil') || title.includes('kartu') || title.includes('easy-1')) {
        setDecompChips(['Wadah body', 'Judul Profil', 'Paragraf Perkenalan', 'Foto Diri', 'Desain Kartu']);
        setSteps([
          'Membuat wadah utama body',
          'Menambahkan judul utama h1 berisi nama profil',
          'Menyisipkan paragraf p untuk perkenalan diri',
          'Menyisipkan gambar foto profil menggunakan img',
          'Menambahkan style CSS untuk warna latar belakang kartu'
        ]);
      } else if (title.includes('musik') || title.includes('galeri') || title.includes('easy-2')) {
        setDecompChips(['Wadah body', 'Kotak pembungkus div', 'Judul Musik H2', 'Daftar Lagu', 'Desain Album']);
        setSteps([
          'Membuat wadah utama body',
          'Menambahkan kotak pembungkus div di dalam body',
          'Menyisipkan judul sedang h2 tentang musik favorit',
          'Menyusun daftar lagu-lagu kesukaan',
          'Menghias tata letak galeri dengan CSS'
        ]);
      } else {
        setDecompChips(['Wadah body', 'Judul Halaman', 'Teks Konten', 'Daftar Item', 'Style CSS']);
        setSteps([
          'Membuat wadah utama body',
          'Menambahkan judul utama halaman',
          'Menyisipkan konten utama',
          'Menyusun daftar item pendukung',
          'Menambahkan style hiasan CSS'
        ]);
      }
    }
  }, [activeLevelConfig]);

  // Auto-classify chips on load or when chips are added
  React.useEffect(() => {
    const initial = { ...chipCategories };
    decompChips.forEach(chip => {
      if (!initial[chip]) {
        const lower = chip.toLowerCase();
        if (lower.includes('judul') || lower.includes('penjelasan') || lower.includes('teks') || lower.includes('deskripsi') || lower.includes('paragraf') || lower.includes('list') || lower.includes('item')) {
          initial[chip] = 'Teks';
        } else if (lower.includes('gambar') || lower.includes('foto') || lower.includes('ilustrasi') || lower.includes('visual') || lower.includes('logo') || lower.includes('img') || lower.includes('diri')) {
          initial[chip] = 'Visual';
        } else if (lower.includes('style') || lower.includes('warna') || lower.includes('hiasan') || lower.includes('font') || lower.includes('css') || lower.includes('penghias') || lower.includes('desain')) {
          initial[chip] = 'Style';
        } else {
          initial[chip] = 'Teks';
        }
      }
    });
    setChipCategories(initial);
  }, [decompChips]);

  const [aiFeedback, setAiFeedback] = useState('');
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [accumulatedScores, setAccumulatedScores] = useState({
    decomposition: 0,
    abstraction: 0,
    pattern: 0,
    algorithm: 0
  });

  if (!isOpen) return null;

  const challengeContext = {
    title: activeLevelConfig?.judul || "Misi Coding Web",
    description: activeLevelConfig?.misi || "Selesaikan tantangan coding web ini menggunakan Computational Thinking."
  };

  const handleAddChip = (e) => {
    e.preventDefault();
    if (decompInput.trim() && !decompChips.includes(decompInput.trim())) {
      setDecompChips([...decompChips, decompInput.trim()]);
      setDecompInput('');
    }
  };

  const handleRemoveChip = (index) => {
    setDecompChips(decompChips.filter((_, i) => i !== index));
  };

  const handleToggleAbstract = (chip) => {
    if (selectedAbstract.includes(chip)) {
      setSelectedAbstract(selectedAbstract.filter(c => c !== chip));
    } else {
      if (selectedAbstract.length < 3) {
        setSelectedAbstract([...selectedAbstract, chip]);
      }
    }
  };

  const moveStep = (index, direction) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= steps.length) return;
    const newSteps = [...steps];
    const temp = newSteps[index];
    newSteps[index] = newSteps[nextIndex];
    newSteps[nextIndex] = temp;
    setSteps(newSteps);
  };

  const handleAnalyzeStep = async () => {
    setIsLoadingFeedback(true);
    setAiFeedback('');
    
    let answerText = '';
    let stepName = '';
    
    if (currentStep === 1) {
      stepName = 'decomposition';
      answerText = `Saya memecah web menjadi: ${decompChips.join(', ')}`;
    } else if (currentStep === 2) {
      stepName = 'abstraction';
      answerText = `Tiga bagian terpenting: ${selectedAbstract.join(', ')}`;
    } else if (currentStep === 3) {
      stepName = 'pattern';
      answerText = `Pengelompokan elemen: ${JSON.stringify(chipCategories)}`;
    } else if (currentStep === 4) {
      stepName = 'algorithm';
      answerText = `Urutan langkah pembuatan: ${steps.join(' -> ')}`;
    }

    try {
      const result = await aiService.analyzeCTStep(
        stepName,
        `Tantangan: ${challengeContext.title}. Evaluasi jawaban siswa untuk langkah ${stepName}.`,
        answerText,
        challengeContext
      );

      setAiFeedback(result.feedback);
      setAccumulatedScores(prev => ({
        ...prev,
        [stepName]: result.ct_score_delta
      }));
      
      // Store in Zustand
      let answerData = decompChips;
      if (currentStep === 2) answerData = selectedAbstract;
      if (currentStep === 3) answerData = chipCategories;
      if (currentStep === 4) answerData = steps;
      setCtJourneyAnswers(stepName, answerData);

      // Persist CT step to database if authenticated
      const token = localStorage.getItem('webcraft_token');
      if (token) {
        try {
          const saveRes = await api.post('/ct-journey/session', {
            session_id: sessionId,
            task_id: 'easy-1',
            step: stepName,
            answer: answerText
          });
          if (saveRes.data?.session_id) {
            setSessionId(saveRes.data.session_id);
          }
        } catch (saveErr) {
          console.error("Gagal menyimpan progress CT Journey ke database:", saveErr);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingFeedback(false);
    }
  };

  const calculateLocalScore = (stepName, data) => {
    const textKws = ["judul", "h1", "h2", "paragraf", "p", "teks", "tulisan", "deskripsi", "nama", "lirik", "lagu", "keterampilan", "halaman", "item", "list", "li", "ul"];
    const visualKws = ["foto", "gambar", "img", "ilustrasi", "visual", "logo", "ikon", "video"];
    const styleKws = ["desain", "warna", "style", "css", "hiasan", "tampilan", "font", "background"];
    const webKws = ["body", "wadah", "div", "kontainer", "pembungkus", "button", "tombol", "kreatif"];
    const allValidKws = [...textKws, ...visualKws, ...styleKws, ...webKws];

    if (stepName === 'decomposition') {
      const items = data || [];
      if (items.length < 3) return 65;
      const words = items.join(" ").toLowerCase();
      const hasRelevant = allValidKws.some(kw => words.includes(kw));
      if (!hasRelevant) return 60;
      return Math.min(98, 85 + (items.length - 3) * 4);
    }
    
    if (stepName === 'abstraction') {
      const items = data || [];
      let styleCount = 0;
      items.forEach(item => {
        const itemLower = item.toLowerCase();
        if (styleKws.some(kw => itemLower.includes(kw))) styleCount++;
      });
      if (styleCount >= 2) return 70;
      return 92;
    }
    
    if (stepName === 'pattern') {
      const categories = data || {};
      let miscategorizedCount = 0;
      Object.keys(categories).forEach(name => {
        const nameLower = name.toLowerCase();
        const cat = categories[name];
        if (cat === "Teks") {
          if (visualKws.some(kw => nameLower.includes(kw)) && !textKws.some(kw => nameLower.includes(kw))) miscategorizedCount++;
          else if (styleKws.some(kw => nameLower.includes(kw)) && !textKws.some(kw => nameLower.includes(kw))) miscategorizedCount++;
        } else if (cat === "Visual") {
          if (textKws.some(kw => nameLower.includes(kw)) && !visualKws.some(kw => nameLower.includes(kw))) miscategorizedCount++;
          else if (styleKws.some(kw => nameLower.includes(kw)) && !visualKws.some(kw => nameLower.includes(kw))) miscategorizedCount++;
        } else if (cat === "Style") {
          if (textKws.some(kw => nameLower.includes(kw)) && !styleKws.some(kw => nameLower.includes(kw))) miscategorizedCount++;
          else if (visualKws.some(kw => nameLower.includes(kw)) && !styleKws.some(kw => nameLower.includes(kw))) miscategorizedCount++;
        }
      });
      if (miscategorizedCount > 0) return 72;
      return 95;
    }
    
    if (stepName === 'algorithm') {
      const stepsList = data || [];
      if (stepsList.length === 0) return 60;
      const firstStep = stepsList[0].toLowerCase();
      const lastStep = stepsList[stepsList.length - 1].toLowerCase();
      const hasBodyFirst = firstStep.includes("body") || firstStep.includes("wadah") || firstStep.includes("utama");
      const hasStyleLast = lastStep.includes("style") || lastStep.includes("css") || lastStep.includes("hiasan") || lastStep.includes("menghias");
      
      if (!hasBodyFirst) return 70;
      if (!hasStyleLast && stepsList.slice(0, -1).some(s => s.toLowerCase().includes("style") || s.toLowerCase().includes("css"))) return 75;
      return 95;
    }
    
    return 85;
  };

  const handleNext = () => {
    // Save current step data to Zustand and Database if not already done
    let stepName = '';
    let answerData = null;
    let answerText = '';
    
    if (currentStep === 1) {
      stepName = 'decomposition';
      answerData = decompChips;
      answerText = `Saya memecah web menjadi: ${decompChips.join(', ')}`;
    } else if (currentStep === 2) {
      stepName = 'abstraction';
      answerData = selectedAbstract;
      answerText = `Tiga bagian terpenting: ${selectedAbstract.join(', ')}`;
    } else if (currentStep === 3) {
      stepName = 'pattern';
      answerData = chipCategories;
      answerText = `Pengelompokan elemen: ${JSON.stringify(chipCategories)}`;
    } else if (currentStep === 4) {
      stepName = 'algorithm';
      answerData = steps;
      answerText = `Urutan langkah pembuatan: ${steps.join(' -> ')}`;
    }

    if (stepName) {
      setCtJourneyAnswers(stepName, answerData);
      
      // Calculate local score dynamically if not reviewed by AI yet
      const localScore = calculateLocalScore(stepName, answerData);
      setAccumulatedScores(prev => ({
        ...prev,
        [stepName]: prev[stepName] || localScore
      }));
      
      // Background database sync
      const token = localStorage.getItem('webcraft_token');
      if (token) {
        api.post('/ct-journey/session', {
          session_id: sessionId,
          task_id: activeLevelConfig?.id || 'easy-1',
          step: stepName,
          answer: answerText
        }).then(saveRes => {
          if (saveRes.data?.session_id) {
            setSessionId(saveRes.data.session_id);
          }
        }).catch(err => console.error("Gagal menyimpan progress CT Journey:", err));
      }
    }

    setAiFeedback('');
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate composite score
      const finalPreScore = {
        decomposition: accumulatedScores.decomposition || 85,
        pattern_recognition: accumulatedScores.pattern || 80,
        abstraction: accumulatedScores.abstraction || 88,
        algorithm_design: accumulatedScores.algorithm || 85
      };
      setCtPreScore(finalPreScore);
      onClose(); // Close modal and open workspace
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setAiFeedback('');
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 1 && (!decompChips || decompChips.length === 0)) return true;
    if (currentStep === 2 && (!selectedAbstract || selectedAbstract.length === 0)) return true;
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-3xl bg-white border-4 border-[#0F172A] rounded-[24px] shadow-[8px_8px_0px_#0F172A] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center rounded-t-[18px] border-b-4 border-[#0F172A]">
          <div className="flex items-center gap-2">
            <i className="ti ti-brain text-xl font-bold" />
            <h3 className="font-fredoka text-xl font-bold">CT Journey - Fase Investigasi</h3>
          </div>
          <div className="font-nunito font-bold text-xs bg-black/20 px-2.5 py-1 rounded border border-[#0F172A]/20">
            LEVEL: {challengeContext.title}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-50 border-b-4 border-[#0F172A] p-3 flex justify-between items-center text-xs font-nunito font-semibold overflow-x-auto gap-2">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded border ${currentStep === 1 ? 'bg-blue-150 text-blue-700 border-blue-200' : 'border-transparent text-slate-500'}`}>
            <span>1. Dekomposisi</span>
          </div>
          <i className="ti ti-chevron-right text-slate-400 font-bold" />
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded border ${currentStep === 2 ? 'bg-blue-150 text-blue-700 border-blue-200' : 'border-transparent text-slate-500'}`}>
            <span>2. Abstraksi</span>
          </div>
          <i className="ti ti-chevron-right text-slate-400 font-bold" />
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded border ${currentStep === 3 ? 'bg-blue-150 text-blue-700 border-blue-200' : 'border-transparent text-slate-500'}`}>
            <span>3. Pola</span>
          </div>
          <i className="ti ti-chevron-right text-slate-400 font-bold" />
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded border ${currentStep === 4 ? 'bg-blue-150 text-blue-700 border-blue-200' : 'border-transparent text-slate-500'}`}>
            <span>4. Algoritma</span>
          </div>
          <i className="ti ti-chevron-right text-slate-400 font-bold" />
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded border ${currentStep === 5 ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'border-transparent text-slate-500'}`}>
            <span>5. Ringkasan</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-4 text-left">
          {currentStep === 1 && (
            <div className="flex flex-col gap-3">
              <h4 className="font-fredoka text-xl font-bold text-[#0F172A]">Fase 1: Dekomposisi (Decomposition)</h4>
              <p className="font-nunito text-xs text-slate-600 font-bold leading-relaxed">
                Dekomposisi adalah memecah masalah besar menjadi bagian-bagian kecil yang lebih mudah dikelola. 
                <strong> Menurut Anda, bagian/elemen apa saja yang harus ada di halaman web "{challengeContext.title}" ini?</strong> Tambahkan bagian-bagian tersebut di bawah!
              </p>
              
              <form onSubmit={handleAddChip} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Contoh: Wadah body, Judul profil, Paragraf perkenalan..."
                  value={decompInput}
                  onChange={(e) => setDecompInput(e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-50 border-2 border-[#0F172A] rounded-xl font-nunito font-semibold text-xs focus:outline-none focus:translate-x-0.5 focus:shadow-[1px_1px_0px_#0F172A] transition-all"
                />
                <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-nunito font-bold rounded-xl border-2 border-[#0F172A] shadow-[2.5px_2.5px_0px_#0F172A] hover:-translate-y-0.5 active:translate-y-[0.5px] transition-colors cursor-pointer text-xs">
                  Tambah
                </button>
              </form>

              <div className="flex flex-wrap gap-2 py-2">
                {decompChips.map((chip, idx) => (
                  <span 
                    key={idx}
                    className="flex items-center gap-1.5 bg-amber-50 text-amber-700 border-2 border-[#0F172A] px-3 py-1.5 rounded-lg font-nunito text-xs font-bold shadow-[2px_2px_0px_#0F172A]"
                  >
                    {chip}
                    <button type="button" onClick={() => handleRemoveChip(idx)} className="text-amber-600 hover:text-red-500 cursor-pointer transition-colors flex items-center">
                      <i className="ti ti-x text-xs font-bold" />
                    </button>
                  </span>
                ))}
                {decompChips.length === 0 && (
                  <p className="text-slate-400 font-nunito font-bold text-xs">Belum ada bagian yang ditambahkan.</p>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex flex-col gap-3">
              <h4 className="font-fredoka text-xl font-bold text-[#0F172A]">Fase 2: Abstraksi (Abstraction)</h4>
              <p className="font-nunito text-xs text-slate-600 font-bold leading-relaxed">
                Abstraksi adalah menyaring informasi yang tidak penting dan memfokuskan diri pada hal-hal yang krusial.
                <strong> Pilih tepat 3 bagian yang PALING penting untuk dibuat terlebih dahulu agar halaman web berfungsi dasar:</strong>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
                {decompChips.map((chip, idx) => {
                  const isSelected = selectedAbstract.includes(chip);
                  return (
                    <div
                      key={idx}
                      onClick={() => handleToggleAbstract(chip)}
                      className={`flex items-center gap-3 p-3 border-2 border-[#0F172A] rounded-xl cursor-pointer transition-all shadow-[2px_2px_0px_#0F172A] ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-600' 
                          : 'bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-5 h-5 border-2 border-[#0F172A] rounded flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-600' : 'bg-white'}`}>
                        {isSelected && <i className="ti ti-check text-white text-xs font-bold" />}
                      </div>
                      <span className="font-nunito text-xs font-bold text-slate-700">{chip}</span>
                    </div>
                  );
                })}
              </div>
              <p className="font-nunito text-[11px] text-slate-400 font-bold">Terpilih: {selectedAbstract.length}/3 bagian utama.</p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex flex-col gap-3">
              <h4 className="font-fredoka text-xl font-bold text-[#0F172A]">Fase 3: Pengenalan Pola (Pattern Recognition)</h4>
              <p className="font-nunito text-xs text-slate-600 font-bold leading-relaxed">
                Pengenalan pola adalah mencari kesamaan di antara bagian-bagian web untuk memecahkannya secara kolektif.
                <strong> Kelompokkan setiap elemen web yang Anda dekomposisikan ke dalam kategori yang tepat di bawah ini:</strong>
              </p>

              {/* Categorization controls */}
              <div className="flex flex-col gap-2 max-h-52 overflow-y-auto p-2 border-2 border-[#0F172A] rounded-xl bg-slate-50">
                {decompChips.map(chip => (
                  <div key={chip} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border-2 border-[#0F172A] p-2 rounded-lg gap-2 shadow-sm">
                    <span className="font-nunito text-xs font-bold text-slate-700">{chip}</span>
                    <div className="flex gap-1.5">
                      {['Teks', 'Visual', 'Style'].map(cat => {
                        const isCurrent = chipCategories[chip] === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setChipCategories(prev => ({ ...prev, [chip]: cat }))}
                            className={`px-3 py-1 border text-[10px] font-nunito font-bold rounded-lg cursor-pointer transition-all ${
                              isCurrent 
                                ? cat === 'Teks' ? 'bg-emerald-500 border-emerald-600 text-white shadow-sm' : cat === 'Visual' ? 'bg-pink-500 border-pink-600 text-white shadow-sm' : 'bg-amber-500 border-amber-600 text-white shadow-sm'
                                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Group Buckets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                {['Teks', 'Visual', 'Style'].map(cat => {
                  const itemsInCat = decompChips.filter(chip => chipCategories[chip] === cat);
                  return (
                    <div key={cat} className="border-2 border-[#0F172A] rounded-xl p-3 bg-white shadow-[2px_2px_0px_#0F172A]">
                      <h5 className={`font-nunito font-bold text-xs mb-2 uppercase tracking-wide flex items-center gap-1.5 ${
                        cat === 'Teks' ? 'text-emerald-600' : cat === 'Visual' ? 'text-pink-600' : 'text-amber-600'
                      }`}>
                        <i className={`ti ${cat === 'Teks' ? 'ti-text-size' : cat === 'Visual' ? 'ti-photo' : 'ti-palette'} text-base`} />
                        {cat}
                      </h5>
                      <div className="flex flex-col gap-2 min-h-[50px] bg-slate-50 border border-dashed border-slate-200 rounded-lg p-2">
                        {itemsInCat.map(item => (
                          <span key={item} className="bg-white border border-slate-200 px-2 py-1 rounded font-nunito text-[10px] font-bold text-slate-700 text-center block leading-tight shadow-sm">
                            {item}
                          </span>
                        ))}
                        {itemsInCat.length === 0 && (
                          <span className="text-[10px] text-slate-400 font-nunito font-bold italic text-center py-3">Kosong</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="flex flex-col gap-3">
              <h4 className="font-fredoka text-xl font-bold text-[#0F172A]">Fase 4: Desain Algoritma (Algorithmic Thinking)</h4>
              <p className="font-nunito text-xs text-slate-600 font-bold leading-relaxed">
                Algoritma adalah merancang langkah-langkah logis berurutan untuk menyelesaikan masalah.
                <strong> Urutkan langkah pembuatan kode halaman web ini dari langkah pertama (atas) sampai langkah terakhir (bawah):</strong>
              </p>

              <div className="flex flex-col gap-2.5 py-2">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white border-2 border-[#0F172A] px-4 py-3 rounded-xl shadow-[3px_3px_0px_#0F172A] transition-all">
                    <span className="font-nunito text-xs font-bold text-blue-600 bg-blue-50 border border-[#0F172A] w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-nunito text-xs font-bold text-slate-700 flex-1">{step}</span>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => moveStep(idx, -1)} 
                        disabled={idx === 0}
                        className={`p-1 rounded hover:bg-gray-100 cursor-pointer ${idx === 0 && 'opacity-30 cursor-not-allowed'}`}
                      >
                        <i className="ti ti-arrow-up text-base font-bold" />
                      </button>
                      <button 
                        onClick={() => moveStep(idx, 1)} 
                        disabled={idx === steps.length - 1}
                        className={`p-1 rounded hover:bg-gray-100 cursor-pointer ${idx === steps.length - 1 && 'opacity-30 cursor-not-allowed'}`}
                      >
                        <i className="ti ti-arrow-down text-base font-bold" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="flex flex-col gap-3">
              <h4 className="font-fredoka text-xl font-bold text-[#0F172A]">Fase 5: Ringkasan Analisis & Rencana Kerja</h4>
              <p className="font-nunito text-xs text-slate-600 font-bold leading-relaxed">
                Rencana investigasi pilar berpikir komputasional Anda sebelum memulai coding:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 text-center">
                <div className="bg-blue-50 border-2 border-[#0F172A] rounded-xl p-4 shadow-[3px_3px_0px_#0F172A]">
                  <p className="font-nunito text-[10px] font-bold text-blue-600 uppercase">Dekomposisi</p>
                  <p className="font-fredoka text-2xl font-bold text-slate-800 mt-1">{accumulatedScores.decomposition || 85}</p>
                </div>
                <div className="bg-pink-50 border-2 border-[#0F172A] rounded-xl p-4 shadow-[3px_3px_0px_#0F172A]">
                  <p className="font-nunito text-[10px] font-bold text-pink-600 uppercase">Abstraksi</p>
                  <p className="font-fredoka text-2xl font-bold text-slate-800 mt-1">{accumulatedScores.abstraction || 88}</p>
                </div>
                <div className="bg-amber-50 border-2 border-[#0F172A] rounded-xl p-4 shadow-[3px_3px_0px_#0F172A]">
                  <p className="font-nunito text-[10px] font-bold text-amber-600 uppercase">Pengenalan Pola</p>
                  <p className="font-fredoka text-2xl font-bold text-slate-800 mt-1">{accumulatedScores.pattern || 80}</p>
                </div>
                <div className="bg-emerald-50 border-2 border-[#0F172A] rounded-xl p-4 shadow-[3px_3px_0px_#0F172A]">
                  <p className="font-nunito text-[10px] font-bold text-emerald-600 uppercase">Desain Algoritma</p>
                  <p className="font-fredoka text-2xl font-bold text-slate-800 mt-1">{accumulatedScores.algorithm || 85}</p>
                </div>
              </div>

              <div className="border-2 border-indigo-200 bg-indigo-50/50 p-4 rounded-xl text-left mt-2">
                <h5 className="font-nunito font-bold text-indigo-900 mb-2 flex items-center gap-1.5">
                  <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold border border-indigo-200 flex items-center gap-1">
                    <i className="ti ti-sparkles" />
                    AI
                  </span>
                  Rangkuman Aturan Validasi Coding Misi:
                </h5>
                <ul className="font-nunito text-xs text-slate-700 font-semibold list-disc pl-5 space-y-1.5">
                  {activeLevelConfig?.validator_rules && activeLevelConfig.validator_rules.length > 0 ? (
                    activeLevelConfig.validator_rules.map((rule, idx) => (
                      <li key={idx}>{rule.error_message || rule.message || "Penuhi kriteria struktur kode web."}</li>
                    ))
                  ) : (
                    <>
                      <li>Buat wadah utama berupa tag <code className="bg-white border border-slate-200 px-1 py-0.5 rounded text-pink-600 font-bold">&lt;body&gt;</code>.</li>
                      <li>Masukkan judul utama <code className="bg-white border border-slate-200 px-1 py-0.5 rounded text-pink-600 font-bold">&lt;h1&gt;</code>.</li>
                      <li>Tambahkan paragraf penjelasan <code className="bg-white border border-slate-200 px-1 py-0.5 rounded text-pink-600 font-bold">&lt;p&gt;</code> di dalam body.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* AI feedback section */}
          {aiFeedback && (
            <div className="mt-4 border-2 border-indigo-200 bg-indigo-50/50 p-4 rounded-xl flex items-start gap-3 shadow-sm">
              <div className="bg-indigo-100 border border-indigo-200 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                <i className="ti ti-robot" />
              </div>
              <div className="text-left">
                <p className="font-fredoka text-xs font-bold text-indigo-900 flex items-center gap-1">
                  AI Tutor CT Review
                </p>
                <p className="font-nunito text-xs text-slate-750 font-semibold leading-relaxed mt-1">{aiFeedback}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t-4 border-[#0F172A] px-6 py-4 flex justify-between items-center bg-slate-50 rounded-b-[18px]">
          <button
            onClick={onClose}
            className="px-5 py-2 border-2 border-[#0F172A] bg-white hover:bg-slate-50 text-slate-700 font-nunito font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-[2px_2px_0px_#0F172A]"
          >
            Batal
          </button>
          
          <div className="flex gap-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2 bg-white border-2 border-[#0F172A] text-slate-700 font-nunito font-bold rounded-xl text-xs shadow-[2.5px_2.5px_0px_#0F172A] hover:bg-slate-50 cursor-pointer transition-all hover:-translate-y-0.5 active:translate-y-[0.5px]"
              >
                Kembali
              </button>
            )}
            
            {currentStep < 5 && (
              <button
                onClick={handleAnalyzeStep}
                disabled={isLoadingFeedback || isNextDisabled()}
                className={`px-5 py-2 bg-white border-2 border-[#0F172A] text-[#0F172A] font-nunito font-bold rounded-xl text-xs shadow-[2.5px_2.5px_0px_#0F172A] hover:bg-slate-50 cursor-pointer transition-all hover:-translate-y-0.5 active:translate-y-[0.5px] ${
                  (isLoadingFeedback || isNextDisabled()) ? 'opacity-50 cursor-not-allowed hover:bg-white shadow-none transform-none' : ''
                }`}
              >
                {isLoadingFeedback ? 'Menganalisis...' : 'Minta Review AI'}
              </button>
            )}
            
            <button
              onClick={handleNext}
              disabled={isNextDisabled()}
              className={`px-6 py-2 bg-blue-600 text-white border-2 border-[#0F172A] shadow-[2.5px_2.5px_0px_#0F172A] font-nunito font-bold rounded-xl text-xs hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-[0.5px] cursor-pointer transition-all ${
                isNextDisabled() ? 'opacity-50 cursor-not-allowed hover:bg-blue-600 shadow-none transform-none' : ''
              }`}
            >
              {currentStep === 5 ? 'Mulai Coding!' : 'Lanjutkan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
