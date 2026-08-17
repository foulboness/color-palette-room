import React, { useState } from 'react';
import { ColorItem } from '../types';
import { formatExport, downloadPalettePNG } from '../utils/colorUtils';
import { X, Copy, Check, Download, FileCode, Image as ImageIcon, Sparkles } from 'lucide-react';

interface ExportModalProps {
  colors: ColorItem[];
  paletteName?: string;
  isOpen: boolean;
  onClose: () => void;
  onCopy: (text: string, label: string) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  colors,
  paletteName = 'PALETTE ROOM',
  isOpen,
  onClose,
  onCopy,
}) => {
  const [format, setFormat] = useState<'hex' | 'css' | 'tailwind' | 'json' | 'svg' | 'array'>('hex');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const hexList = colors.map((c) => c.hex);
  const exportCode = formatExport(hexList, format);

  const handleCopyCode = () => {
    onCopy(exportCode, `Export (${format.toUpperCase()})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownloadPNG = () => {
    downloadPalettePNG(hexList, paletteName);
  };

  const handleDownloadSVG = () => {
    const svgContent = formatExport(hexList, 'svg');
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${paletteName.toLowerCase().replace(/\s+/g, '-')}-palette.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="export-modal"
        className="w-full max-w-xl bg-[#0e0f17] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#090a10]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400" />
            <h3 className="font-display font-bold text-sm tracking-wide text-white">
              EXPORT COLOR PALETTE
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          {/* Visual Swatch Preview */}
          <div className="h-16 rounded-xl overflow-hidden flex border border-white/15 shadow-inner">
            {colors.map((c, i) => (
              <div
                key={i}
                style={{ backgroundColor: c.hex }}
                className="flex-1 h-full flex flex-col justify-end p-1 font-mono text-[9px] font-bold text-center"
                style-prop={{ color: c.isDark ? '#fff' : '#000' }}
              >
                <span className="bg-black/40 px-1 py-0.2 rounded text-white text-[8px] sm:text-[10px]">
                  {c.hex}
                </span>
              </div>
            ))}
          </div>

          {/* Format Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs font-mono">
            {[
              { id: 'hex', label: 'HEX List' },
              { id: 'css', label: 'CSS Variables' },
              { id: 'tailwind', label: 'Tailwind Config' },
              { id: 'json', label: 'JSON Data' },
              { id: 'svg', label: 'SVG Swatch' },
              { id: 'array', label: 'JS Array' },
            ].map((fmt) => (
              <button
                key={fmt.id}
                onClick={() => setFormat(fmt.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-colors font-semibold ${
                  format === fmt.id
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {fmt.label}
              </button>
            ))}
          </div>

          {/* Code Viewer */}
          <div className="relative">
            <pre className="p-4 rounded-xl bg-black/70 border border-white/10 text-xs font-mono text-cyan-300 overflow-x-auto max-h-56 select-all">
              <code>{exportCode}</code>
            </pre>

            <button
              onClick={handleCopyCode}
              className="absolute top-2.5 right-2.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-1.5 backdrop-blur-xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>

          {/* Graphic Export Options */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <span className="text-[11px] font-mono text-zinc-400 block">
              GRAPHIC & CARD EXPORT
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownloadPNG}
                className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                <span>DOWNLOAD PNG CARD</span>
              </button>

              <button
                onClick={handleDownloadSVG}
                className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FileCode className="w-4 h-4 text-amber-400" />
                <span>DOWNLOAD SVG</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-white/10 bg-[#090a10]">
          <span className="text-xs font-mono text-zinc-500">
            {colors.length} COLORS READY
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              CLOSE
            </button>

            <button
              onClick={handleCopyCode}
              className="px-5 py-2 rounded-lg bg-white text-black font-display font-bold text-xs tracking-wide flex items-center gap-1.5 hover:bg-zinc-200 transition-all shadow-md cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>COPY FORMAT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
