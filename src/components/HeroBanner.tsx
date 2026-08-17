import React from 'react';
import { Sparkles, Lock, Sliders, BookmarkPlus, Download, Command } from 'lucide-react';

interface HeroBannerProps {
  onGenerate: () => void;
  onOpenSave: () => void;
  onOpenExport: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onGenerate,
  onOpenSave,
  onOpenExport,
}) => {
  return (
    <section className="relative pt-6 pb-4 border-b border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-white/[0.04] to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          {/* Main Title & Slogan */}
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              DIGITAL COLOR LABORATORY // HARMONY ENGINE V2.4
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-none">
              PALETTE ROOM
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 font-light italic tracking-wide">
              “Explore color. Build combinations. Find your visual language.”
            </p>
          </div>

          {/* Quick Laboratory Capabilities Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-white">GENERATE</span>
              <span className="text-[10px] text-zinc-400 bg-white/10 px-1 py-0.5 rounded">SPACE</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-zinc-300">
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-semibold text-white">LOCK</span>
              <span className="text-[10px] text-zinc-400 bg-white/10 px-1 py-0.5 rounded">1-8</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-zinc-300">
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-semibold text-white">EDIT</span>
            </div>

            <button
              onClick={onOpenSave}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <BookmarkPlus className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold">SAVE</span>
              <span className="text-[10px] text-zinc-400 bg-white/10 px-1 py-0.5 rounded">S</span>
            </button>

            <button
              onClick={onOpenExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold">EXPORT</span>
              <span className="text-[10px] text-zinc-400 bg-white/10 px-1 py-0.5 rounded">E</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
