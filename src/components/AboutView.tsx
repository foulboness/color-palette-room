import React from 'react';
import { 
  Command, 
  Sparkles, 
  Sliders, 
  Layers, 
  Contrast, 
  Bookmark, 
  Keyboard, 
  Palette, 
  ShieldCheck,
  Compass
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const shortcuts = [
    { key: 'Space', desc: 'Generate new palette (keeping locked slots)' },
    { key: '1, 2, 3, 4, 5', desc: 'Toggle lock state for slot #1 through #5' },
    { key: 'E', desc: 'Open Export drawer (HEX, CSS, Tailwind, PNG)' },
    { key: 'S', desc: 'Save current palette to My Collection' },
    { key: 'C', desc: 'Copy full palette HEX sequence' },
    { key: 'P', desc: 'Toggle Live UI Preview Studio' },
    { key: 'Ctrl + Z', desc: 'Undo previous palette generation' },
    { key: 'Ctrl + Y', desc: 'Redo palette generation' },
  ];

  const colorTheories = [
    {
      title: 'ANALOGOUS HARMONY',
      formula: 'Hue θ ± 30°',
      desc: 'Adjacent colors on the color wheel creating serene, visually unified atmospheres commonly found in nature and calm editorial layouts.',
    },
    {
      title: 'COMPLEMENTARY TENSION',
      formula: 'Hue θ + 180°',
      desc: 'Opposing hues maximizing optical vibration and dynamic focal points, ideal for high-conversion CTAs and cyber aesthetics.',
    },
    {
      title: 'TRIADIC EQUILIBRIUM',
      formula: 'Hue θ + 120°, + 240°',
      desc: 'Three equidistant hues offering chromatic balance and vibrant expression without chaotic sensory overload.',
    },
    {
      title: 'PERCEPTUAL LUMINANCE',
      formula: '0.2126R + 0.7152G + 0.0722B',
      desc: 'Human eye sensitivity weighs green dramatically higher than blue. PALETTE ROOM calculates true relative luminance for WCAG compliance.',
    },
  ];

  return (
    <div id="about-view" className="space-y-6">
      {/* Manifesto Banner */}
      <div className="bg-[#0b0c14] border border-white/[0.08] rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Compass className="w-3.5 h-3.5" />
            STUDIO MANIFESTO // SYSTEM SPECIFICATION
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-none">
            PALETTE ROOM
          </h2>

          <p className="text-sm sm:text-base font-light text-zinc-300 leading-relaxed">
            PALETTE ROOM is a dark minimalist creative color laboratory designed for digital artists, software designers, and brand architects. We combine mathematical color spaces, perceptual luminance curves, and subgenre curation into a responsive, tactical design instrument.
          </p>
        </div>
      </div>

      {/* Grid: Keyboard Shortcuts & Color Theory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Keyboard Shortcuts Table */}
        <div className="lg:col-span-6 bg-[#0d0e16] border border-white/[0.08] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-cyan-400" />
            <h3 className="font-display font-bold text-sm tracking-wide text-white">
              KEYBOARD SHORTCUTS
            </h3>
          </div>

          <div className="space-y-2">
            {shortcuts.map((sc, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs font-mono"
              >
                <span className="text-zinc-400">{sc.desc}</span>
                <kbd className="px-2 py-1 rounded bg-black/60 border border-white/20 text-white font-bold text-[11px] shadow-xs">
                  {sc.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Color Theory Card */}
        <div className="lg:col-span-6 bg-[#0d0e16] border border-white/[0.08] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-purple-400" />
            <h3 className="font-display font-bold text-sm tracking-wide text-white">
              HARMONY ENGINE PRINCIPLES
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {colorTheories.map((th, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1.5"
              >
                <span className="text-[11px] font-mono font-bold text-white block">
                  {th.title}
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20 inline-block">
                  {th.formula}
                </span>
                <p className="text-[11px] font-light text-zinc-400 leading-relaxed">
                  {th.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Principles & Standards Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-white/[0.03] to-transparent border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>ZERO EXTERNAL TRACKING • LOCAL STORAGE PERSISTENCE • WCAG 2.1 VERIFIED</span>
        </div>
        <span className="text-zinc-500">VERSION 2.4.0 (2026)</span>
      </div>
    </div>
  );
};
