import React, { useState } from 'react';
import { ColorItem, ColorFormat } from '../types';
import { 
  Lock, 
  Unlock, 
  Copy, 
  Sliders, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Check, 
  Eye, 
  Hash,
  MoveHorizontal
} from 'lucide-react';
import { generateShadesAndTints } from '../utils/colorUtils';

interface PaletteBarProps {
  colors: ColorItem[];
  onToggleLock: (index: number) => void;
  onColorChange: (index: number, newHex: string) => void;
  onOpenEditor: (index: number) => void;
  onMoveColor: (fromIndex: number, toIndex: number) => void;
  onCopyColor: (text: string, format: string) => void;
  activeFormat: ColorFormat;
  setActiveFormat: (format: ColorFormat) => void;
}

export const PaletteBar: React.FC<PaletteBarProps> = ({
  colors,
  onToggleLock,
  onColorChange,
  onOpenEditor,
  onMoveColor,
  onCopyColor,
  activeFormat,
  setActiveFormat,
}) => {
  const [activeShadeIndex, setActiveShadeIndex] = useState<number | null>(null);
  const [copiedSlot, setCopiedSlot] = useState<number | null>(null);

  const handleCopySlot = (index: number, item: ColorItem) => {
    let textToCopy = item.hex;
    if (activeFormat === 'rgb') {
      textToCopy = `rgb(${item.rgb.r}, ${item.rgb.g}, ${item.rgb.b})`;
    } else if (activeFormat === 'hsl') {
      textToCopy = `hsl(${item.hsl.h}, ${item.hsl.s}%, ${item.hsl.l}%)`;
    } else if (activeFormat === 'hsv') {
      textToCopy = `hsv(${item.hsv.h}, ${item.hsv.s}%, ${item.hsv.v}%)`;
    }

    onCopyColor(textToCopy, activeFormat.toUpperCase());
    setCopiedSlot(index);
    setTimeout(() => setCopiedSlot(null), 1400);
  };

  return (
    <div className="w-full space-y-3">
      {/* Format Selector Bar & Tips */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-400">FORMAT:</span>
          {(['hex', 'rgb', 'hsl', 'hsv'] as ColorFormat[]).map((fmt) => (
            <button
              key={fmt}
              onClick={() => setActiveFormat(fmt)}
              className={`px-2 py-1 rounded transition-colors uppercase text-[11px] font-semibold ${
                activeFormat === fmt
                  ? 'bg-white text-black font-bold'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
          <span className="hidden sm:inline">Click swatch to copy • Press Space to regenerate unlocked</span>
          <span className="text-zinc-300 font-semibold">{colors.length} SLOTS</span>
        </div>
      </div>

      {/* Main Interactive Swatches Grid / Strip */}
      <div 
        id="palette-swatch-container"
        className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#090a0f] flex flex-col md:flex-row min-h-[500px] md:h-[420px] transition-all duration-300 relative"
      >
        {colors.map((item, index) => {
          const isDark = item.isDark;
          const textColor = isDark ? 'text-white' : 'text-zinc-950';
          const subTextColor = isDark ? 'text-white/70' : 'text-zinc-950/70';
          const borderClass = isDark ? 'border-white/15' : 'border-black/15';
          const isCopied = copiedSlot === index;
          const isShadesOpen = activeShadeIndex === index;
          const shades = generateShadesAndTints(item.hex);

          return (
            <div
              key={item.id || index}
              id={`color-slot-${index}`}
              className="relative flex-1 min-h-[96px] md:min-h-0 flex flex-col justify-between p-3.5 sm:p-5 transition-all duration-300 group cursor-pointer select-none"
              style={{ backgroundColor: item.hex }}
              onClick={(e) => {
                // Ignore clicks on control buttons
                if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('input')) {
                  return;
                }
                handleCopySlot(index, item);
              }}
            >
              {/* Top Slot Controls: Index, Lock, Move, Edit */}
              <div className="flex items-center justify-between z-10">
                {/* Slot index & lock indicator */}
                <div className="flex items-center gap-1.5">
                  <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/25 backdrop-blur-sm ${textColor}`}>
                    #{index + 1}
                  </span>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLock(index);
                    }}
                    title={item.locked ? 'Unlock color (Key ' + (index + 1) + ')' : 'Lock color (Key ' + (index + 1) + ')'}
                    className={`p-1.5 rounded-md transition-all ${
                      item.locked 
                        ? 'bg-black/60 text-amber-400 ring-1 ring-amber-400/50' 
                        : 'bg-black/20 hover:bg-black/40 text-white/80 opacity-60 group-hover:opacity-100'
                    }`}
                  >
                    {item.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Quick actions (Reorder, Shades, Edit) */}
                <div className="flex items-center gap-1 opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  {/* Move Left */}
                  {index > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveColor(index, index - 1);
                      }}
                      title="Move color left"
                      className="p-1.5 rounded-md bg-black/30 hover:bg-black/60 text-white transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Move Right */}
                  {index < colors.length - 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveColor(index, index + 1);
                      }}
                      title="Move color right"
                      className="p-1.5 rounded-md bg-black/30 hover:bg-black/60 text-white transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Shades Drawer Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveShadeIndex(isShadesOpen ? null : index);
                    }}
                    title="View shades and tints"
                    className={`p-1.5 rounded-md transition-colors ${
                      isShadesOpen ? 'bg-black/70 text-white ring-1 ring-white/40' : 'bg-black/30 hover:bg-black/60 text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                  </button>

                  {/* Color Editor Modal Trigger */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenEditor(index);
                    }}
                    title="Open precision color editor"
                    className="p-1.5 rounded-md bg-black/30 hover:bg-black/60 text-white transition-colors"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Center Copied Notification Overlay */}
              {isCopied && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 rounded-full bg-black/80 text-white border border-white/20 text-xs font-mono flex items-center gap-1.5 shadow-xl">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>COPIED {activeFormat.toUpperCase()}</span>
                  </div>
                </div>
              )}

              {/* Shades & Tints Dropdown / Strip */}
              {isShadesOpen && (
                <div 
                  className="absolute left-2 right-2 top-14 z-30 p-2 rounded-xl bg-black/90 backdrop-blur-md border border-white/20 shadow-2xl space-y-1.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-300 px-1">
                    <span>SHADES & TINTS</span>
                    <button 
                      onClick={() => setActiveShadeIndex(null)}
                      className="text-zinc-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-9 gap-1 h-8 rounded-lg overflow-hidden">
                    {shades.map((shadeHex, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => {
                          onColorChange(index, shadeHex);
                          setActiveShadeIndex(null);
                        }}
                        style={{ backgroundColor: shadeHex }}
                        title={`Select shade ${shadeHex}`}
                        className="w-full h-full hover:scale-110 transition-transform rounded-xs border border-white/10"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Color Typography & Data */}
              <div className={`space-y-1.5 z-10 ${textColor}`}>
                {/* Poetic Name */}
                <p className={`text-xs font-mono font-medium truncate max-w-full ${subTextColor}`}>
                  {item.name}
                </p>

                {/* Primary Code Display */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg sm:text-xl font-bold tracking-tight">
                    {activeFormat === 'hex' && item.hex}
                    {activeFormat === 'rgb' && `${item.rgb.r}, ${item.rgb.g}, ${item.rgb.b}`}
                    {activeFormat === 'hsl' && `${item.hsl.h}°, ${item.hsl.s}%, ${item.hsl.l}%`}
                    {activeFormat === 'hsv' && `${item.hsv.h}°, ${item.hsv.s}%, ${item.hsv.v}%`}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopySlot(index, item);
                    }}
                    title="Copy color code"
                    className={`p-1 rounded bg-black/20 hover:bg-black/40 transition-colors opacity-80 group-hover:opacity-100 ${textColor}`}
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Secondary Meta (Luminance & RGB) */}
                <div className={`flex items-center justify-between text-[11px] font-mono pt-1 border-t ${borderClass} ${subTextColor}`}>
                  <span>LUM: {Math.round(item.luminance * 100)}%</span>
                  <span>{activeFormat === 'hex' ? `RGB(${item.rgb.r},${item.rgb.g},${item.rgb.b})` : item.hex}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
