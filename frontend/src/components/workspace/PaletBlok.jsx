import React from 'react';
import { useStore } from '../../store/useStore';

const BLOCKS = [
  { type: 'body', name: 'Wadah Utama (body)', icon: 'ti-layout', category: 'container', color: 'bg-blue-600 text-white', desc: 'Wadah utama halaman web.' },
  { type: 'div', name: 'Kotak Wadah (div)', icon: 'ti-square', category: 'container', color: 'bg-blue-600 text-white', desc: 'Pembungkus untuk mengelompokkan elemen.' },
  { type: 'ul', name: 'Daftar List (ul)', icon: 'ti-list', category: 'container', color: 'bg-blue-600 text-white', desc: 'Wadah untuk daftar item.' },
  
  { type: 'h1', name: 'Judul Utama (h1)', icon: 'ti-heading', category: 'text', color: 'bg-emerald-600 text-white', desc: 'Teks judul terbesar.' },
  { type: 'p', name: 'Paragraf (p)', icon: 'ti-align-left', category: 'text', color: 'bg-emerald-600 text-white', desc: 'Teks penjelasan atau cerita.' },
  { type: 'li', name: 'Item List (li)', icon: 'ti-list-details', category: 'text', color: 'bg-emerald-600 text-white', desc: 'Satu item di dalam daftar list.' },
  
  { type: 'button', name: 'Tombol (button)', icon: 'ti-pointer', category: 'special', color: 'bg-pink-600 text-white', desc: 'Tombol interaktif.' },
  { type: 'img', name: 'Gambar (img)', icon: 'ti-photo', category: 'special', color: 'bg-pink-600 text-white', desc: 'Menampilkan berkas gambar.' },
  { type: 'style', name: 'Penghias (style)', icon: 'ti-brush', category: 'special', color: 'bg-yellow-500 text-[#0F172A]', desc: 'Mengatur warna & gaya CSS.' }
];

export default function PaletBlok() {
  const { addBlock, selectedContainerId, ast } = useStore();

  const handleAdd = (type) => {
    // Prevent adding multiple body-roots
    if (type === 'body' && ast.some(n => n.type === 'body')) {
      alert("Tag <body> utama sudah ada di workspace!");
      return;
    }
    
    addBlock(type, selectedContainerId);
  };

  return (
    <div className="bg-white p-4 flex flex-col gap-4 overflow-y-auto h-full text-left">
      <div>
        <h3 className="font-fredoka text-base font-bold text-[#0F172A] flex items-center gap-1.5 border-b-2 border-dashed border-slate-200 pb-2">
          <i className="ti ti-square-plus text-blue-600 text-lg" />
          Palet Blok HTML
        </h3>
        <p className="font-nunito text-[10px] text-slate-500 font-bold leading-normal mt-1">
          Klik elemen di bawah untuk memasukkannya ke dalam wadah terpilih.
        </p>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {/* Container Blocks */}
        <div>
          <h4 className="font-fredoka text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">1. Wadah (Containers)</h4>
          <div className="flex flex-col gap-2">
            {BLOCKS.filter(b => b.category === 'container').map(block => (
              <button
                key={block.type}
                onClick={() => handleAdd(block.type)}
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'copy';
                  e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'new', blockType: block.type }));
                }}
                className="w-full text-left p-2.5 bg-white border-2 border-[#0F172A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#0F172A] active:translate-y-[1px] active:shadow-[1px_1px_0px_#0F172A] rounded-xl flex items-center gap-2.5 transition-all cursor-grab active:cursor-grabbing shadow-[2px_2px_0px_#0F172A]"
              >
                <div className={`w-8 h-8 rounded-lg ${block.color} flex items-center justify-center border-2 border-[#0F172A] shrink-0`}>
                  <i className={`ti ${block.icon} text-base`} />
                </div>
                <div>
                  <p className="font-fredoka text-xs font-bold text-[#0F172A]">{block.name}</p>
                  <p className="font-nunito text-[9px] text-slate-400 font-bold leading-none mt-0.5">{block.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Text Blocks */}
        <div>
          <h4 className="font-fredoka text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">2. Konten Teks</h4>
          <div className="flex flex-col gap-2">
            {BLOCKS.filter(b => b.category === 'text').map(block => (
              <button
                key={block.type}
                onClick={() => handleAdd(block.type)}
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'copy';
                  e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'new', blockType: block.type }));
                }}
                className="w-full text-left p-2.5 bg-white border-2 border-[#0F172A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#0F172A] active:translate-y-[1px] active:shadow-[1px_1px_0px_#0F172A] rounded-xl flex items-center gap-2.5 transition-all cursor-grab active:cursor-grabbing shadow-[2px_2px_0px_#0F172A]"
              >
                <div className={`w-8 h-8 rounded-lg ${block.color} flex items-center justify-center border-2 border-[#0F172A] shrink-0`}>
                  <i className={`ti ${block.icon} text-base`} />
                </div>
                <div>
                  <p className="font-fredoka text-xs font-bold text-[#0F172A]">{block.name}</p>
                  <p className="font-nunito text-[9px] text-slate-400 font-bold leading-none mt-0.5">{block.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Specialized Blocks */}
        <div>
          <h4 className="font-fredoka text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">3. Media & Style</h4>
          <div className="flex flex-col gap-2">
            {BLOCKS.filter(b => b.category === 'special').map(block => (
              <button
                key={block.type}
                onClick={() => handleAdd(block.type)}
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'copy';
                  e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'new', blockType: block.type }));
                }}
                className="w-full text-left p-2.5 bg-white border-2 border-[#0F172A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#0F172A] active:translate-y-[1px] active:shadow-[1px_1px_0px_#0F172A] rounded-xl flex items-center gap-2.5 transition-all cursor-grab active:cursor-grabbing shadow-[2px_2px_0px_#0F172A]"
              >
                <div className={`w-8 h-8 rounded-lg ${block.color} flex items-center justify-center border-2 border-[#0F172A] shrink-0`}>
                  <i className={`ti ${block.icon} text-base`} />
                </div>
                <div>
                  <p className="font-fredoka text-xs font-bold text-[#0F172A]">{block.name}</p>
                  <p className="font-nunito text-[9px] text-slate-400 font-bold leading-none mt-0.5">{block.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
