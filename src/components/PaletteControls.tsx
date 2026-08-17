import React from 'react';
import { HarmonyType } from '../types';
import { 
  Sparkles, 
  Lock, 
  Unlock, 
  Undo2, 
  Redo2, 
  BookmarkPlus, 
  Download, 
  Eye, 
  SlidersHorizontal,
  Plus,
  Minus,
  RefreshCw,
  Share2
} from 'lucide-react';

interface PaletteControlsProps {
  onGenerate: () => void;
  harmony: HarmonyType;
  onSelectHarmony: (harmony: HarmonyType) => void;
  onLockAll: () => void;
  onUnlockAll: () => void;
  allLocked: boolean;
  colorCount: number;
  onColorCountChange: (count: number) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onOpenSave: () => void;
  onOpenExport: () => void;
  showUIPreview: boolean;
  onToggleUIPreview: () => void;
}

export const PaletteControls: React.FC<PaletteControlsProps> = ({
  onGenerate,
  harmony,
  onSelectHarmony,
  onLockAll,
  onUnlockAll,
  allLocked,
  colorCount,
  onColorCountChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onOpenSave,
  onOpenExport,
  showUIPreview,
  onToggleUIPreview,
}) => {
  const harmonyOptions: { id: HarmonyType; label: string }[] = [
    { id: 'procedural', label: 'Balanced' },
    { id: 'analogous', label: 'Analogous' },
    { id: 'complementary', label: 'Complementary' },
    { id: 'triadic', label: 'Triadic' },
    { id: 'tetradic', label: 'Tetradic' },
    { id: 'monochromatic', label: 'Monochrome' },
    { id: 'neon', label: 'Neon Cyber' },
    { id: 'dark-synth', label: 'Dark Synth' },
    { id: 'pastel', label: 'Pastel' },
    { id: 'earthy', label: 'Earthy' },
  ];

  return (
    <div id="palette-controls" className="w-full bg-[#0d0e15] border border-white/[0.08] rounded-xl p-3 sm:p-4 space-y-2.5 sm:space-y-3 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3">
        {/* Top / Left Side: Generate Button & Presets */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
          {/* Main Big Generate Button */}
          <button
            id="btn-generate-palette"
            onClick={onGenerate}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-white text-black font-display font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-zinc-200 active:scale-98 transition-all shadow-lg cursor-pointer select-none"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>GENERATE</span>
            <span className="text-[10px] font-mono font-normal bg-black/10 text-black px-1.5 py-0.5 rounded border border-black/10 hidden sm:inline">
              SPACE
            </span>
          </button>

          {/* Harmony Mode Dropdown / Selector */}
          <div className="flex-1 sm:flex-initial flex items-center justify-between sm:justify-start gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg px-2.5 py-1.5 min-w-[130px]">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400 hidden sm:inline">HARMONY:</span>
            </div>
            <select
              value={harmony}
              onChange={(e) => onSelectHarmony(e.target.value as HarmonyType)}
              className="bg-transparent text-xs font-mono text-white focus:outline-none cursor-pointer pr-1"
            >
              {harmonyOptions.map((opt) => (
                <option key={opt.id} value={opt.id} className="bg-[#12131c] text-white">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Lock / Unlock All Toggle */}
          <button
            onClick={allLocked ? onUnlockAll : onLockAll}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer shrink-0"
            title={allLocked ? 'Unlock all colors' : 'Lock all colors'}
          >
            {allLocked ? <Unlock className="w-3.5 h-3.5 text-amber-400" /> : <Lock className="w-3.5 h-3.5 text-zinc-400" />}
            <span className="text-[11px] sm:text-xs">{allLocked ? 'UNLOCK ALL' : 'LOCK ALL'}</span>
          </button>

          {/* Color Slots Count Selector (3-8) */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-1.5 sm:px-2 py-1 shrink-0">
            <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400 mr-0.5 hidden sm:inline">SLOTS:</span>
            <button
              onClick={() => onColorCountChange(Math.max(3, colorCount - 1))}
              disabled={colorCount <= 3}
              className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-mono font-bold text-white px-1 sm:px-1.5">{colorCount}</span>
            <button
              onClick={() => onColorCountChange(Math.min(8, colorCount + 1))}
              disabled={colorCount >= 8}
              className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Bottom / Right Side: History, Save, Export, UI Preview */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
          {/* Undo / Redo */}
          <div className="flex items-center rounded-lg bg-white/[0.04] border border-white/[0.08] p-0.5 shrink-0">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title="Undo palette (Ctrl+Z)"
            >
              <Undo2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title="Redo palette (Ctrl+Y)"
            >
              <Redo2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* UI Preview Studio Toggle */}
          <button
            onClick={onToggleUIPreview}
            className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-mono flex items-center gap-1 sm:gap-1.5 border transition-all cursor-pointer ${
              showUIPreview
                ? 'bg-purple-600/20 text-purple-300 border-purple-500/40 ring-1 ring-purple-500/30'
                : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border-white/[0.08]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>PREVIEW</span>
          </button>

          {/* Save to Collection */}
          <button
            onClick={onOpenSave}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] sm:text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer"
          >
            <BookmarkPlus className="w-3.5 h-3.5 text-emerald-400" />
            <span>SAVE</span>
          </button>

          {/* Export Modal */}
          <button
            onClick={onOpenExport}
            className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-[11px] sm:text-xs font-mono font-semibold text-white flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>EXPORT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
