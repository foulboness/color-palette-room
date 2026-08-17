import React, { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import { ColorItem } from '../types';
import { 
  getColorName, 
  generateShadesAndTints, 
  getHarmoniesForColor, 
  checkContrast 
} from '../utils/colorUtils';
import { X, Check, Copy, Sliders, Sparkles, RefreshCw } from 'lucide-react';

interface ColorEditorModalProps {
  colorItem: ColorItem | null;
  slotIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSaveColor: (slotIndex: number, newHex: string) => void;
  onApplyFullPalette?: (newColors: string[]) => void;
  onCopy: (text: string) => void;
}

export const ColorEditorModal: React.FC<ColorEditorModalProps> = ({
  colorItem,
  slotIndex,
  isOpen,
  onClose,
  onSaveColor,
  onApplyFullPalette,
  onCopy,
}) => {
  const [currentHex, setCurrentHex] = useState('#ffffff');
  const [hexInput, setHexInput] = useState('FFFFFF');
  const [r, setR] = useState(255);
  const [g, setG] = useState(255);
  const [b, setB] = useState(255);
  const [h, setH] = useState(0);
  const [s, setS] = useState(100);
  const [l, setL] = useState(50);
  const [activeSubTab, setActiveSubTab] = useState<'sliders' | 'harmonies' | 'shades'>('sliders');

  useEffect(() => {
    if (colorItem) {
      updateAllFromHex(colorItem.hex);
    }
  }, [colorItem, isOpen]);

  const updateAllFromHex = (hex: string) => {
    if (!chroma.valid(hex)) return;
    const c = chroma(hex);
    const validHex = c.hex().toUpperCase();
    setCurrentHex(validHex);
    setHexInput(validHex.replace('#', ''));
    
    const [rgbR, rgbG, rgbB] = c.rgb();
    setR(rgbR);
    setG(rgbG);
    setB(rgbB);

    const [hslH, hslS, hslL] = c.hsl();
    setH(Math.round(isNaN(hslH) ? 0 : hslH));
    setS(Math.round(hslS * 100));
    setL(Math.round(hslL * 100));
  };

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setHexInput(val);
    const cleanHex = val.startsWith('#') ? val : `#${val}`;
    if (chroma.valid(cleanHex) && (cleanHex.length === 4 || cleanHex.length === 7)) {
      updateAllFromHex(cleanHex);
    }
  };

  const handleRgbChange = (newR: number, newG: number, newB: number) => {
    try {
      const c = chroma(newR, newG, newB);
      updateAllFromHex(c.hex());
    } catch {
      // ignore
    }
  };

  const handleHslChange = (newH: number, newS: number, newL: number) => {
    try {
      const c = chroma.hsl(newH, newS / 100, newL / 100);
      updateAllFromHex(c.hex());
    } catch {
      // ignore
    }
  };

  if (!isOpen || !colorItem) return null;

  const colorName = getColorName(currentHex);
  const shades = generateShadesAndTints(currentHex);
  const harmonies = getHarmoniesForColor(currentHex);
  const contrastOnBlack = checkContrast(currentHex, '#000000');
  const contrastOnWhite = checkContrast(currentHex, '#ffffff');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="color-editor-modal"
        className="w-full max-w-xl bg-[#0e0f17] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#090a10]">
          <div className="flex items-center gap-2.5">
            <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: currentHex }} />
            <div>
              <h3 className="font-display font-bold text-sm tracking-wide text-white">
                COLOR STUDIO EDITOR
              </h3>
              <p className="text-[11px] font-mono text-zinc-400">
                SLOT #{slotIndex + 1} • {colorName}
              </p>
            </div>
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
          {/* Main Color Swatch & HEX Field */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch">
            {/* Big Swatch Box */}
            <div 
              className="flex-1 min-h-[110px] rounded-xl border border-white/15 p-4 flex flex-col justify-between shadow-inner relative group"
              style={{ backgroundColor: currentHex }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-black/40 text-white backdrop-blur-xs">
                  {currentHex}
                </span>
                <button
                  onClick={() => onCopy(currentHex)}
                  className="p-1 rounded bg-black/30 hover:bg-black/60 text-white text-xs transition-colors"
                  title="Copy Hex"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <p className="text-sm font-display font-extrabold text-white drop-shadow-md">
                  {colorName}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-white/80">
                  <span>vs Black: {contrastOnBlack.ratio}:1</span>
                  <span>•</span>
                  <span>vs White: {contrastOnWhite.ratio}:1</span>
                </div>
              </div>
            </div>

            {/* Direct HEX Input & Quick Native Picker */}
            <div className="sm:w-52 flex flex-col justify-between gap-2 p-3 bg-white/[0.03] border border-white/[0.08] rounded-xl">
              <div>
                <label className="text-[10px] font-mono text-zinc-400 block mb-1">
                  HEX CODE
                </label>
                <div className="flex items-center gap-1.5 bg-black/40 border border-white/15 rounded-lg px-2.5 py-1.5 focus-within:border-white/40">
                  <span className="text-xs font-mono text-zinc-400">#</span>
                  <input
                    type="text"
                    value={hexInput}
                    maxLength={6}
                    onChange={handleHexInputChange}
                    className="w-full bg-transparent font-mono text-sm text-white focus:outline-none uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 block mb-1">
                  COLOR PICKER
                </label>
                <input
                  type="color"
                  value={currentHex}
                  onChange={(e) => updateAllFromHex(e.target.value)}
                  className="w-full h-8 rounded-lg cursor-pointer bg-black/40 border border-white/15 p-0.5"
                />
              </div>
            </div>
          </div>

          {/* Sub-tab Navigation */}
          <div className="flex border-b border-white/10 gap-2 text-xs font-mono">
            <button
              onClick={() => setActiveSubTab('sliders')}
              className={`pb-2 px-2 font-semibold border-b-2 transition-all ${
                activeSubTab === 'sliders'
                  ? 'text-white border-white'
                  : 'text-zinc-400 border-transparent hover:text-zinc-200'
              }`}
            >
              HSL & RGB SLIDERS
            </button>
            <button
              onClick={() => setActiveSubTab('harmonies')}
              className={`pb-2 px-2 font-semibold border-b-2 transition-all ${
                activeSubTab === 'harmonies'
                  ? 'text-white border-white'
                  : 'text-zinc-400 border-transparent hover:text-zinc-200'
              }`}
            >
              COLOR HARMONIES
            </button>
            <button
              onClick={() => setActiveSubTab('shades')}
              className={`pb-2 px-2 font-semibold border-b-2 transition-all ${
                activeSubTab === 'shades'
                  ? 'text-white border-white'
                  : 'text-zinc-400 border-transparent hover:text-zinc-200'
              }`}
            >
              SHADES & TINTS
            </button>
          </div>

          {/* Sliders View */}
          {activeSubTab === 'sliders' && (
            <div className="space-y-4">
              {/* HSL Controls */}
              <div className="p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-3">
                <span className="text-[11px] font-mono text-zinc-300 font-semibold block">
                  HSL CHANNELS
                </span>

                {/* Hue */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>HUE</span>
                    <span>{h}°</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={h}
                    onChange={(e) => handleHslChange(Number(e.target.value), s, l)}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background:
                        'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
                    }}
                  />
                </div>

                {/* Saturation */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>SATURATION</span>
                    <span>{s}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={s}
                    onChange={(e) => handleHslChange(h, Number(e.target.value), l)}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-zinc-700 accent-white"
                  />
                </div>

                {/* Lightness */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>LIGHTNESS</span>
                    <span>{l}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={l}
                    onChange={(e) => handleHslChange(h, s, Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-zinc-700 accent-white"
                  />
                </div>
              </div>

              {/* RGB Controls */}
              <div className="p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-3">
                <span className="text-[11px] font-mono text-zinc-300 font-semibold block">
                  RGB CHANNELS
                </span>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-rose-400">
                      <span>RED</span>
                      <span>{r}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={255}
                      value={r}
                      onChange={(e) => handleRgbChange(Number(e.target.value), g, b)}
                      className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-zinc-700 accent-rose-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-emerald-400">
                      <span>GREEN</span>
                      <span>{g}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={255}
                      value={g}
                      onChange={(e) => handleRgbChange(r, Number(e.target.value), b)}
                      className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-zinc-700 accent-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-sky-400">
                      <span>BLUE</span>
                      <span>{b}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={255}
                      value={b}
                      onChange={(e) => handleRgbChange(r, g, Number(e.target.value))}
                      className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-zinc-700 accent-sky-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Harmonies View */}
          {activeSubTab === 'harmonies' && harmonies && (
            <div className="space-y-3">
              {Object.entries(harmonies).map(([key, list]) => {
                const label = key.replace(/([A-Z])/g, ' $1').toUpperCase();
                return (
                  <div key={key} className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-400 font-semibold tracking-wider">
                        {label}
                      </span>
                      {onApplyFullPalette && (
                        <button
                          onClick={() => {
                            // Expand harmony to 5 colors if shorter
                            const full = [...list];
                            while (full.length < 5) {
                              full.push(chroma(full[full.length - 1]).darken(0.6).hex());
                            }
                            onApplyFullPalette(full.slice(0, 5));
                            onClose();
                          }}
                          className="text-[10px] font-mono text-zinc-400 hover:text-white flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          Apply as full palette
                        </button>
                      )}
                    </div>

                    <div className="flex gap-2 h-10">
                      {list.map((hHex, idx) => (
                        <button
                          key={idx}
                          onClick={() => updateAllFromHex(hHex)}
                          style={{ backgroundColor: hHex }}
                          title={`Select ${hHex}`}
                          className="flex-1 rounded-lg border border-white/10 hover:scale-105 transition-transform flex items-center justify-center group"
                        >
                          <span className="text-[9px] font-mono font-bold px-1 rounded bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            {hHex}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Shades View */}
          {activeSubTab === 'shades' && (
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-zinc-400">
                10-STEP CHROMATIC LUMINANCE SCALE (DARK TO LIGHT)
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {shades.map((shadeHex, i) => (
                  <button
                    key={i}
                    onClick={() => updateAllFromHex(shadeHex)}
                    className="p-2 rounded-xl border border-white/10 hover:scale-105 transition-transform flex flex-col gap-1.5 items-center"
                    style={{ backgroundColor: shadeHex }}
                  >
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/50 text-white">
                      {shadeHex}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-white/10 bg-[#090a10]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            CANCEL
          </button>

          <button
            onClick={() => {
              onSaveColor(slotIndex, currentHex);
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-white text-black font-display font-bold text-xs tracking-wide flex items-center gap-1.5 hover:bg-zinc-200 transition-all shadow-md cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>APPLY TO SLOT #{slotIndex + 1}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
