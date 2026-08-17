import React, { useState } from 'react';
import { ColorItem } from '../types';
import { checkContrast } from '../utils/colorUtils';
import chroma from 'chroma-js';
import { 
  Contrast, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sparkles, 
  ArrowRightLeft,
  Copy,
  Check
} from 'lucide-react';

interface ContrastStudioProps {
  colors: ColorItem[];
  onUpdateColorHex?: (index: number, newHex: string) => void;
  onCopyText: (text: string, label: string) => void;
}

export const ContrastStudio: React.FC<ContrastStudioProps> = ({
  colors,
  onUpdateColorHex,
  onCopyText,
}) => {
  const [bgIndex, setBgIndex] = useState<number>(0);
  const [fgIndex, setFgIndex] = useState<number>(colors.length - 1);

  const safeBgIndex = Math.min(bgIndex, colors.length - 1);
  const safeFgIndex = Math.min(fgIndex, colors.length - 1);

  const bgColor = colors[safeBgIndex]?.hex || '#08080a';
  const fgColor = colors[safeFgIndex]?.hex || '#ffffff';

  const contrastResult = checkContrast(fgColor, bgColor);

  // Calculate suggested adjustment if contrast is below 4.5
  const getAutoTunedSuggestion = () => {
    if (contrastResult.ratio >= 7.0) return null;
    try {
      const bgLum = chroma(bgColor).luminance();
      const fgChroma = chroma(fgColor);
      let tunedHex = fgColor;

      if (bgLum < 0.5) {
        // Dark background -> lighten foreground until >= 4.5 or 7.0
        let target = fgChroma;
        while (chroma.contrast(target.hex(), bgColor) < 4.5 && target.luminance() < 0.95) {
          target = target.brighten(0.3);
        }
        tunedHex = target.hex().toUpperCase();
      } else {
        // Light background -> darken foreground until >= 4.5
        let target = fgChroma;
        while (chroma.contrast(target.hex(), bgColor) < 4.5 && target.luminance() > 0.05) {
          target = target.darken(0.3);
        }
        tunedHex = target.hex().toUpperCase();
      }

      const tunedRatio = Number(chroma.contrast(tunedHex, bgColor).toFixed(2));
      return { hex: tunedHex, ratio: tunedRatio };
    } catch {
      return null;
    }
  };

  const autoTune = getAutoTunedSuggestion();

  return (
    <div id="contrast-studio" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0b0c14] border border-white/[0.08] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Contrast className="w-3.5 h-3.5" />
            ACCESSIBILITY LAB // WCAG 2.1 CONTRAST COMPLIANCE
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            CONTRAST CHECKER
          </h2>
          <p className="text-sm font-light text-zinc-400">
            Verify readability and compliance for digital interfaces across normal text, large headings, and interactive elements.
          </p>
        </div>
      </div>

      {/* Main Interactive Pair Tester */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Swatch Selectors & Scorecard */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0d0e16] border border-white/[0.08] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 font-semibold">PAIRWISE SELECTOR</span>
              <button
                onClick={() => {
                  setBgIndex(safeFgIndex);
                  setFgIndex(safeBgIndex);
                }}
                className="p-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 flex items-center gap-1 text-xs font-mono transition-colors"
                title="Swap Foreground & Background"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>SWAP</span>
              </button>
            </div>

            {/* Background Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                <span>BACKGROUND COLOR</span>
                <span className="font-bold text-white">{bgColor}</span>
              </label>
              <div className="grid grid-cols-5 sm:grid-cols-8 gap-1.5">
                {colors.map((c, i) => (
                  <button
                    key={c.id || i}
                    onClick={() => setBgIndex(i)}
                    style={{ backgroundColor: c.hex }}
                    className={`h-10 rounded-lg border transition-all ${
                      safeBgIndex === i
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-105 border-white'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Foreground Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                <span>FOREGROUND (TEXT) COLOR</span>
                <span className="font-bold text-white">{fgColor}</span>
              </label>
              <div className="grid grid-cols-5 sm:grid-cols-8 gap-1.5">
                {colors.map((c, i) => (
                  <button
                    key={c.id || i}
                    onClick={() => setFgIndex(i)}
                    style={{ backgroundColor: c.hex }}
                    className={`h-10 rounded-lg border transition-all ${
                      safeFgIndex === i
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-105 border-white'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Contrast Ratio Hero Metric */}
            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block">CONTRAST RATIO</span>
                <span className="text-3xl sm:text-4xl font-mono font-extrabold text-white">
                  {contrastResult.ratio} : 1
                </span>
              </div>

              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold ${
                    contrastResult.ratio >= 7.0
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : contrastResult.ratio >= 4.5
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      : contrastResult.ratio >= 3.0
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  {contrastResult.ratingText}
                </span>
              </div>
            </div>

            {/* WCAG Compliance Badges Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
              {/* AA Normal */}
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-zinc-300">AA Normal</p>
                  <p className="text-[10px] text-zinc-400">Min 4.5:1</p>
                </div>
                {contrastResult.scoreAANormal ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400" />
                )}
              </div>

              {/* AA Large */}
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-zinc-300">AA Large (18pt+)</p>
                  <p className="text-[10px] text-zinc-400">Min 3.0:1</p>
                </div>
                {contrastResult.scoreAALarge ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400" />
                )}
              </div>

              {/* AAA Normal */}
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-zinc-300">AAA Normal</p>
                  <p className="text-[10px] text-zinc-400">Min 7.0:1</p>
                </div>
                {contrastResult.scoreAAANormal ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400" />
                )}
              </div>

              {/* AAA Large */}
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-zinc-300">AAA Large</p>
                  <p className="text-[10px] text-zinc-400">Min 4.5:1</p>
                </div>
                {contrastResult.scoreAAALarge ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400" />
                )}
              </div>
            </div>

            {/* Smart Auto-Tuner Suggestion */}
            {autoTune && autoTune.hex !== fgColor && (
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-purple-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="font-semibold">CONTRAST AUTO-TUNE SUGGESTION</span>
                </div>
                <p className="text-[11px] font-mono text-zinc-300">
                  Shift text to <strong className="text-white">{autoTune.hex}</strong> for improved <strong className="text-emerald-400">{autoTune.ratio}:1</strong> ratio.
                </p>
                {onUpdateColorHex && (
                  <button
                    onClick={() => onUpdateColorHex(safeFgIndex, autoTune.hex)}
                    className="px-3 py-1.5 rounded-lg bg-purple-500 text-white text-xs font-mono font-semibold hover:bg-purple-600 transition-colors w-full"
                  >
                    Apply Adjusted Color to Slot #{safeFgIndex + 1}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Live Typography Simulation */}
        <div className="lg:col-span-7 space-y-4">
          <div 
            className="rounded-2xl p-6 sm:p-8 border transition-colors shadow-2xl flex flex-col justify-between min-h-[380px]"
            style={{ 
              backgroundColor: bgColor, 
              color: fgColor, 
              borderColor: `${fgColor}25` 
            }}
          >
            <div className="space-y-4">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border uppercase" style={{ borderColor: `${fgColor}40` }}>
                TYPOGRAPHY SIMULATION
              </span>

              <h2 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight leading-tight">
                Refined visual hierarchy begins with mathematical contrast.
              </h2>

              <p className="text-sm sm:text-base font-light opacity-90 leading-relaxed max-w-xl">
                When designing dark mode software interfaces, maintaining WCAG AA minimums (4.5:1) ensures that key content remains legible under varying ambient light conditions and across diverse screen panels.
              </p>
            </div>

            <div className="pt-6 border-t flex flex-wrap items-center justify-between gap-4" style={{ borderColor: `${fgColor}20` }}>
              <div className="flex items-center gap-3">
                <button
                  className="px-4 py-2 rounded-lg text-xs font-mono font-bold transition-transform active:scale-95 shadow-md"
                  style={{ 
                    backgroundColor: fgColor, 
                    color: bgColor 
                  }}
                >
                  Primary Action
                </button>

                <button
                  className="px-4 py-2 rounded-lg text-xs font-mono font-medium border"
                  style={{ borderColor: `${fgColor}40` }}
                >
                  Outlined Element
                </button>
              </div>

              <span className="text-xs font-mono opacity-60">
                BG: {bgColor} / FG: {fgColor}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Combinatorial Matrix for all colors */}
      <div className="bg-[#0d0e16] border border-white/[0.08] rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-sm tracking-wide text-white">
              PALETTE CONTRAST MATRIX
            </h3>
            <p className="text-xs font-mono text-zinc-400">
              Cross-examination of every color as background (Rows) vs foreground (Columns).
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse text-xs font-mono">
            <thead>
              <tr>
                <th className="p-2 text-zinc-500 font-normal">BG \ FG</th>
                {colors.map((c, i) => (
                  <th key={i} className="p-2">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: c.hex }} />
                      <span className="text-[10px] text-zinc-400">#{i + 1}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {colors.map((rowColor, rIdx) => (
                <tr key={rIdx} className="border-t border-white/[0.04]">
                  <td className="p-2 text-left font-semibold text-zinc-400 flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded" style={{ backgroundColor: rowColor.hex }} />
                    <span>#{rIdx + 1}</span>
                  </td>
                  {colors.map((colColor, cIdx) => {
                    const ratio = Number(chroma.contrast(colColor.hex, rowColor.hex).toFixed(1));
                    const isPass = ratio >= 4.5;
                    const isPassLarge = ratio >= 3.0;

                    return (
                      <td key={cIdx} className="p-2">
                        <button
                          onClick={() => {
                            setBgIndex(rIdx);
                            setFgIndex(cIdx);
                          }}
                          className={`w-full py-1.5 px-1 rounded transition-all ${
                            isPass
                              ? 'bg-emerald-500/15 text-emerald-300 font-bold'
                              : isPassLarge
                              ? 'bg-amber-500/15 text-amber-300'
                              : 'bg-rose-500/10 text-rose-400/80'
                          }`}
                        >
                          {ratio}:1
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
