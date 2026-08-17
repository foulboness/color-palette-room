import React, { useState } from 'react';
import { ColorItem } from '../types';
import { 
  Laptop, 
  Smartphone, 
  Sparkles, 
  Layers, 
  ArrowUpRight, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  Activity, 
  ShieldCheck,
  Copy,
  Check,
  CreditCard,
  Send,
  Download,
  ArrowDownLeft,
  RefreshCw,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Heart,
  Music,
  Share2,
  Sliders,
  Wallet,
  Home,
  Compass,
  User,
  Radio,
  BarChart3,
  Bell,
  Search,
  ChevronRight,
  Wifi,
  Battery
} from 'lucide-react';
import chroma from 'chroma-js';

interface UIPreviewStudioProps {
  colors: ColorItem[];
  onCopyColor: (text: string, label: string) => void;
}

export const UIPreviewStudio: React.FC<UIPreviewStudioProps> = ({
  colors,
  onCopyColor,
}) => {
  const [previewMode, setPreviewMode] = useState<'saas' | 'mobile' | 'poster' | 'gradients' | 'colorblind'>('mobile');
  const [colorBlindFilter, setColorBlindFilter] = useState<'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia'>('normal');
  const [mobileAppScreen, setMobileAppScreen] = useState<'wallet' | 'player' | 'store'>('wallet');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Assign semantic roles from the palette
  const hexList = colors.map((c) => c.hex);
  const bgDark = hexList[0] || '#0d0e15';
  const accent1 = hexList[1] || '#ff0055';
  const accent2 = hexList[2] || '#05d9e8';
  const accent3 = hexList[3] || '#ffe600';
  const accent4 = hexList[4] || '#8a2be2';
  const textLight = hexList[hexList.length - 1] || '#ffffff';

  // Determine smart foreground colors for contrast
  const isBgDarkLuminance = chroma(bgDark).luminance() < 0.2;
  const cardBg = isBgDarkLuminance ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.05)';
  const cardBorder = isBgDarkLuminance ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)';
  const phoneBodyText = isBgDarkLuminance ? '#ffffff' : '#090a0f';
  const phoneMutedText = isBgDarkLuminance ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.6)';

  // Gradient CSS strings
  const linearGrad = `linear-gradient(135deg, ${hexList.join(', ')})`;
  const radialGrad = `radial-gradient(circle at 30% 30%, ${hexList[1] || '#ff0055'}, ${hexList[0] || '#08080a'})`;
  const meshGrad = `linear-gradient(45deg, ${accent1} 0%, transparent 70%), linear-gradient(135deg, ${accent2} 10%, transparent 80%), linear-gradient(225deg, ${accent3} 10%, ${bgDark} 90%)`;

  // Color blindness simulation filter style
  const getColorBlindFilter = () => {
    switch (colorBlindFilter) {
      case 'protanopia':
        return 'url(#protanopia-filter)';
      case 'deuteranopia':
        return 'url(#deuteranopia-filter)';
      case 'tritanopia':
        return 'url(#tritanopia-filter)';
      case 'achromatopsia':
        return 'grayscale(100%)';
      default:
        return 'none';
    }
  };

  return (
    <div id="ui-preview-studio" className="w-full bg-[#090a10] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4 sm:space-y-5 shadow-2xl">
      {/* SVG Filters for Color Blindness Simulation */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="protanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.567, 0.433, 0, 0, 0
                      0.558, 0.442, 0, 0, 0
                      0, 0.242, 0.758, 0, 0
                      0, 0, 0, 1, 0"
            />
          </filter>
          <filter id="deuteranopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.625, 0.375, 0, 0, 0
                      0.7, 0.3, 0, 0, 0
                      0, 0.3, 0.7, 0, 0
                      0, 0, 0, 1, 0"
            />
          </filter>
          <filter id="tritanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.95, 0.05, 0, 0, 0
                      0, 0.433, 0.567, 0, 0
                      0, 0.475, 0.525, 0, 0
                      0, 0, 0, 1, 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <h3 className="font-display font-bold text-sm tracking-wider text-white">
            LIVE INTERFACE SIMULATION
          </h3>
          <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
            // REAL-TIME PALETTE APPLICATION
          </span>
        </div>

        {/* Mode Menu Bar */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <button
            onClick={() => setPreviewMode('mobile')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
              previewMode === 'mobile'
                ? 'bg-white text-black font-semibold shadow-xs'
                : 'bg-white/[0.04] text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>MOBILE APP</span>
          </button>

          <button
            onClick={() => setPreviewMode('saas')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
              previewMode === 'saas'
                ? 'bg-white text-black font-semibold shadow-xs'
                : 'bg-white/[0.04] text-zinc-400 hover:text-white'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>SAAS DESKTOP</span>
          </button>

          <button
            onClick={() => setPreviewMode('poster')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
              previewMode === 'poster'
                ? 'bg-white text-black font-semibold shadow-xs'
                : 'bg-white/[0.04] text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>POSTER / BRAND</span>
          </button>

          <button
            onClick={() => setPreviewMode('gradients')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
              previewMode === 'gradients'
                ? 'bg-white text-black font-semibold shadow-xs'
                : 'bg-white/[0.04] text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>GRADIENTS</span>
          </button>

          <button
            onClick={() => setPreviewMode('colorblind')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
              previewMode === 'colorblind'
                ? 'bg-white text-black font-semibold shadow-xs'
                : 'bg-white/[0.04] text-zinc-400 hover:text-white'
            }`}
          >
            <span>ACCESSIBILITY</span>
          </button>
        </div>
      </div>

      {/* Preview Canvas Stage */}
      <div 
        className="w-full rounded-xl overflow-hidden transition-all duration-300 relative"
        style={{ filter: getColorBlindFilter() }}
      >
        {/* 1. MOBILE APP VIEW - ULTRA CLEAN & NEAT PHONE MOCKUP */}
        {previewMode === 'mobile' && (
          <div className="py-2 sm:py-6 flex flex-col items-center justify-center space-y-4">
            {/* Screen Prototype Selector Pills */}
            <div className="flex items-center justify-center gap-1.5 p-1 bg-black/40 border border-white/10 rounded-full text-xs font-mono">
              <button
                onClick={() => setMobileAppScreen('wallet')}
                className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 text-[11px] font-semibold ${
                  mobileAppScreen === 'wallet'
                    ? 'bg-white text-black font-bold shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Wallet className="w-3 h-3" />
                <span>Neobank Card</span>
              </button>
              <button
                onClick={() => setMobileAppScreen('player')}
                className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 text-[11px] font-semibold ${
                  mobileAppScreen === 'player'
                    ? 'bg-white text-black font-bold shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Music className="w-3 h-3" />
                <span>Audio Player</span>
              </button>
              <button
                onClick={() => setMobileAppScreen('store')}
                className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 text-[11px] font-semibold ${
                  mobileAppScreen === 'store'
                    ? 'bg-white text-black font-bold shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Studio Store</span>
              </button>
            </div>

            {/* Sleek Realistic Smartphone Frame */}
            <div className="relative w-full max-w-[340px] sm:max-w-[360px] mx-auto">
              {/* Outer Titanium Chassis & Edge Glow */}
              <div 
                className="relative rounded-[42px] p-3 border-[6px] border-[#181926] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.12)] bg-[#07080d]"
              >
                {/* Physical Bezel Volume / Power accents (visual only) */}
                <div className="absolute -left-[9px] top-24 w-[3px] h-9 bg-zinc-700 rounded-l-xs" />
                <div className="absolute -left-[9px] top-36 w-[3px] h-9 bg-zinc-700 rounded-l-xs" />
                <div className="absolute -right-[9px] top-28 w-[3px] h-12 bg-zinc-700 rounded-r-xs" />

                {/* Inner Screen Display */}
                <div 
                  className="w-full rounded-[32px] overflow-hidden flex flex-col justify-between select-none relative transition-colors duration-300 min-h-[580px]"
                  style={{ 
                    backgroundColor: bgDark, 
                    color: phoneBodyText 
                  }}
                >
                  {/* Dynamic Island & Phone Status Bar */}
                  <div className="pt-2.5 px-5 pb-1 flex items-center justify-between z-20">
                    <span className="text-[11px] font-mono font-bold tracking-tight" style={{ color: phoneBodyText }}>
                      9:41
                    </span>

                    {/* Centered Dynamic Island Pill */}
                    <div className="w-22 h-4.5 bg-black rounded-full flex items-center justify-end px-1.5 gap-1 border border-white/10 shadow-inner">
                      <div className="w-2 h-2 rounded-full bg-emerald-400/80 animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-zinc-800 border border-zinc-700" />
                    </div>

                    <div className="flex items-center gap-1.5 opacity-90" style={{ color: phoneBodyText }}>
                      <Wifi className="w-3 h-3" />
                      <span className="text-[10px] font-mono font-bold">5G</span>
                      <div className="w-4 h-2 rounded-xs border border-current flex items-center p-0.5">
                        <div className="w-full h-full bg-current rounded-2xs" />
                      </div>
                    </div>
                  </div>

                  {/* SCREEN 1: NEOBANK & WALLET */}
                  {mobileAppScreen === 'wallet' && (
                    <div className="px-4 py-3 space-y-4 flex-1 flex flex-col justify-between">
                      {/* Top Bar with Avatar */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center font-display font-extrabold text-xs shadow-md ring-2 ring-white/20"
                            style={{ 
                              backgroundColor: accent1, 
                              color: chroma(accent1).luminance() > 0.45 ? '#000000' : '#ffffff' 
                            }}
                          >
                            PR
                          </div>
                          <div>
                            <p className="text-[10px] font-mono font-medium" style={{ color: phoneMutedText }}>
                              WORKSPACE VAULT
                            </p>
                            <p className="text-xs font-bold tracking-tight">
                              Studio Alpha #04
                            </p>
                          </div>
                        </div>

                        <button 
                          className="w-7 h-7 rounded-full flex items-center justify-center border transition-colors"
                          style={{ borderColor: cardBorder, backgroundColor: cardBg }}
                        >
                          <Bell className="w-3.5 h-3.5" style={{ color: phoneBodyText }} />
                        </button>
                      </div>

                      {/* Main Dynamic Virtual Card */}
                      <div 
                        className="p-4 rounded-2xl relative overflow-hidden shadow-lg border space-y-3"
                        style={{ 
                          background: `linear-gradient(135deg, ${accent1} 0%, ${chroma(accent1).darken(1.2).hex()} 100%)`,
                          borderColor: 'rgba(255,255,255,0.2)',
                          color: chroma(accent1).luminance() > 0.45 ? '#000000' : '#ffffff'
                        }}
                      >
                        {/* Card Top: Chip & Network */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-4.5 rounded-xs bg-amber-300/80 border border-amber-400/50 shadow-inner" />
                            <span className="text-[9px] font-mono tracking-widest uppercase opacity-80">
                              DEBIT NFC
                            </span>
                          </div>
                          <span className="font-display font-black text-xs tracking-wider opacity-90">
                            AETHER
                          </span>
                        </div>

                        {/* Balance */}
                        <div className="space-y-0.5 pt-1">
                          <p className="text-[10px] font-mono tracking-wider opacity-80">TOTAL LIQUIDITY</p>
                          <div className="flex items-baseline justify-between">
                            <p className="text-2xl font-display font-extrabold tracking-tight">
                              $84,290.50
                            </p>
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/20 text-white backdrop-blur-xs flex items-center gap-0.5">
                              <TrendingUp className="w-2.5 h-2.5" /> +14.2%
                            </span>
                          </div>
                        </div>

                        {/* Card Number Mask */}
                        <div className="flex items-center justify-between pt-1 font-mono text-[11px] tracking-widest opacity-90">
                          <span>•••• 4092</span>
                          <span className="text-[10px]">08/29</span>
                        </div>
                      </div>

                      {/* Quick Action Matrix */}
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { label: 'Send', icon: <Send className="w-3.5 h-3.5" />, bg: accent2 },
                          { label: 'Receive', icon: <ArrowDownLeft className="w-3.5 h-3.5" />, bg: accent3 },
                          { label: 'Swap', icon: <RefreshCw className="w-3.5 h-3.5" />, bg: accent1 },
                          { label: 'Analytics', icon: <BarChart3 className="w-3.5 h-3.5" />, bg: accent4 },
                        ].map((act, i) => (
                          <div key={i} className="flex flex-col items-center gap-1">
                            <button
                              className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md active:scale-95 transition-transform"
                              style={{ 
                                backgroundColor: act.bg,
                                color: chroma(act.bg).luminance() > 0.45 ? '#000000' : '#ffffff'
                              }}
                            >
                              {act.icon}
                            </button>
                            <span className="text-[10px] font-mono font-semibold" style={{ color: phoneMutedText }}>
                              {act.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Recent Operations Activity */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-[10px] font-mono px-0.5">
                          <span className="font-bold tracking-wider opacity-80" style={{ color: phoneMutedText }}>
                            RECENT OPERATIONS
                          </span>
                          <span style={{ color: accent2 }} className="font-semibold cursor-pointer">
                            View All
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          {[
                            { name: 'Tokyo Neural Cluster', tag: 'Infrastructure', val: '+$3,400', col: accent2 },
                            { name: 'Cyber Mesh Bandwidth', tag: 'Subscription', val: '-$120', col: accent1 },
                            { name: 'Algorithmic Yield', tag: 'Staking', val: '+$890', col: accent3 },
                          ].map((tx, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 rounded-xl border flex items-center justify-between transition-colors"
                              style={{ backgroundColor: cardBg, borderColor: cardBorder }}
                            >
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-2 h-2 rounded-full shrink-0"
                                  style={{ backgroundColor: tx.col }}
                                />
                                <div>
                                  <p className="text-xs font-bold font-mono leading-tight">{tx.name}</p>
                                  <p className="text-[9px] font-mono" style={{ color: phoneMutedText }}>{tx.tag}</p>
                                </div>
                              </div>
                              <span className="text-xs font-mono font-bold" style={{ color: tx.col }}>
                                {tx.val}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 2: MINIMALIST AUDIO PLAYER */}
                  {mobileAppScreen === 'player' && (
                    <div className="px-4 py-3 space-y-4 flex-1 flex flex-col justify-between">
                      {/* Player Top Navigation */}
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[10px] font-bold tracking-widest uppercase opacity-75" style={{ color: phoneMutedText }}>
                          NOW STREAMING
                        </span>
                        <div className="flex items-center gap-1.5">
                          <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                          <span className="text-[10px] font-bold" style={{ color: accent2 }}>96kHz FLAC</span>
                        </div>
                      </div>

                      {/* Album Art Canvas with Palette Gradient */}
                      <div 
                        className="w-full aspect-square rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden shadow-2xl border"
                        style={{ 
                          background: `linear-gradient(135deg, ${accent1} 0%, ${accent2} 50%, ${bgDark} 100%)`,
                          borderColor: cardBorder
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-black/50 text-white backdrop-blur-md">
                            SYNTH LAB
                          </span>
                          <Heart className="w-4 h-4 text-white fill-white/80" />
                        </div>

                        {/* Animated waveform bars */}
                        <div className="flex items-end justify-center gap-1 h-12 py-1">
                          {[40, 75, 100, 60, 90, 45, 80, 95, 70, 50, 85, 30].map((h, i) => (
                            <div 
                              key={i} 
                              className="w-1.5 rounded-full bg-white/90 shadow-xs transition-all duration-300"
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>

                        <div>
                          <p className="text-white font-display font-black text-lg tracking-tight leading-none drop-shadow-md">
                            Chromatic Echoes
                          </p>
                          <p className="text-white/80 text-[11px] font-mono drop-shadow-xs">
                            Aether Studio • Night Drive
                          </p>
                        </div>
                      </div>

                      {/* Scrubber Slider */}
                      <div className="space-y-1">
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative">
                          <div 
                            className="h-full rounded-full"
                            style={{ 
                              width: '64%', 
                              backgroundColor: accent2 
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] font-mono" style={{ color: phoneMutedText }}>
                          <span>02:44</span>
                          <span>04:18</span>
                        </div>
                      </div>

                      {/* Playback Controls */}
                      <div className="flex items-center justify-center gap-6 pt-1">
                        <button 
                          className="p-2 rounded-full hover:bg-white/10 transition-colors"
                          style={{ color: phoneBodyText }}
                        >
                          <SkipBack className="w-5 h-5" />
                        </button>

                        <button 
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-13 h-13 rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-all"
                          style={{ 
                            backgroundColor: accent1, 
                            color: chroma(accent1).luminance() > 0.45 ? '#000000' : '#ffffff' 
                          }}
                        >
                          {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                        </button>

                        <button 
                          className="p-2 rounded-full hover:bg-white/10 transition-colors"
                          style={{ color: phoneBodyText }}
                        >
                          <SkipForward className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 3: CREATIVE STUDIO STORE CARD */}
                  {mobileAppScreen === 'store' && (
                    <div className="px-4 py-3 space-y-3 flex-1 flex flex-col justify-between">
                      {/* Search Bar */}
                      <div 
                        className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-mono"
                        style={{ backgroundColor: cardBg, borderColor: cardBorder }}
                      >
                        <Search className="w-3.5 h-3.5" style={{ color: phoneMutedText }} />
                        <span style={{ color: phoneMutedText }}>Search color objects...</span>
                      </div>

                      {/* Featured Product Hero */}
                      <div 
                        className="p-3.5 rounded-2xl border space-y-2 relative overflow-hidden shadow-md"
                        style={{ backgroundColor: cardBg, borderColor: cardBorder }}
                      >
                        <div 
                          className="h-28 rounded-xl flex items-center justify-center font-display font-black text-2xl relative overflow-hidden"
                          style={{ 
                            background: `linear-gradient(45deg, ${accent1}, ${accent2})`,
                            color: '#ffffff' 
                          }}
                        >
                          <span className="drop-shadow-md">OBSIDIAN 01</span>
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white font-mono text-[9px] font-bold">
                            LIMITED
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <div>
                            <p className="text-xs font-bold font-mono">Analog Color Synth</p>
                            <p className="text-[10px] font-mono" style={{ color: phoneMutedText }}>Spatial sound & light module</p>
                          </div>
                          <span className="text-sm font-mono font-bold" style={{ color: accent3 }}>
                            $349
                          </span>
                        </div>

                        <button
                          className="w-full py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-md"
                          style={{ 
                            backgroundColor: accent1, 
                            color: chroma(accent1).luminance() > 0.45 ? '#000000' : '#ffffff' 
                          }}
                        >
                          Add to Collection
                        </button>
                      </div>

                      {/* Color Palette Swatch Strips */}
                      <div className="space-y-1">
                        <p className="text-[10px] font-mono font-bold opacity-75" style={{ color: phoneMutedText }}>
                          PALETTE SPECIFICATION
                        </p>
                        <div className="flex h-7 rounded-lg overflow-hidden border" style={{ borderColor: cardBorder }}>
                          {hexList.map((hx, idx) => (
                            <div key={idx} className="flex-1 h-full" style={{ backgroundColor: hx }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Realistic Mobile Bottom Navigation Bar */}
                  <div 
                    className="px-4 py-2 border-t flex items-center justify-around z-20"
                    style={{ 
                      borderColor: cardBorder, 
                      backgroundColor: isBgDarkLuminance ? 'rgba(10, 11, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)'
                    }}
                  >
                    {[
                      { id: 'home', icon: <Home className="w-4 h-4" />, active: mobileAppScreen === 'wallet' },
                      { id: 'compass', icon: <Compass className="w-4 h-4" />, active: mobileAppScreen === 'store' },
                      { id: 'music', icon: <Music className="w-4 h-4" />, active: mobileAppScreen === 'player' },
                      { id: 'user', icon: <User className="w-4 h-4" />, active: false },
                    ].map((btn, bIdx) => (
                      <div key={bIdx} className="flex flex-col items-center gap-0.5">
                        <div 
                          className="p-1.5 rounded-lg transition-colors"
                          style={{ 
                            color: btn.active ? accent1 : phoneMutedText,
                            backgroundColor: btn.active ? `${accent1}15` : 'transparent'
                          }}
                        >
                          {btn.icon}
                        </div>
                        {btn.active && (
                          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: accent1 }} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Home Indicator Swipe Bar */}
                  <div className="pb-1.5 pt-0.5 flex justify-center">
                    <div 
                      className="w-28 h-1 rounded-full opacity-40"
                      style={{ backgroundColor: phoneBodyText }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-label */}
            <p className="text-[11px] font-mono text-zinc-400 text-center">
              Mobile frame automatically maps dynamic luminance, contrast, and visual hierarchy from your active palette.
            </p>
          </div>
        )}

        {/* 2. SAAS DESKTOP VIEW */}
        {previewMode === 'saas' && (
          <div 
            className="p-6 sm:p-8 rounded-xl border border-white/10 space-y-6 transition-colors shadow-2xl"
            style={{ backgroundColor: bgDark, color: textLight }}
          >
            {/* Top Mockup Navbar */}
            <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: `${textLight}20` }}>
              <div className="flex items-center gap-3">
                <div 
                  className="w-7 h-7 rounded-md flex items-center justify-center font-display font-extrabold text-xs"
                  style={{ backgroundColor: accent1, color: chroma(accent1).luminance() > 0.45 ? '#000000' : '#ffffff' }}
                >
                  PR
                </div>
                <span className="font-display font-bold text-sm tracking-wide">
                  AetherOS Cloud
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono opacity-70 hidden sm:inline">SYSTEM STATUS: OPTIMAL</span>
                <button
                  className="px-3.5 py-1.5 rounded-md text-xs font-mono font-semibold transition-transform active:scale-95 shadow-md"
                  style={{ 
                    backgroundColor: accent2, 
                    color: chroma(accent2).luminance() > 0.45 ? '#000000' : '#ffffff' 
                  }}
                >
                  Deploy Node
                </button>
              </div>
            </div>

            {/* Hero Banner Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div 
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border"
                  style={{ 
                    backgroundColor: `${accent1}15`, 
                    borderColor: `${accent1}40`,
                    color: accent1 
                  }}
                >
                  <Star className="w-3 h-3" />
                  <span>SYNAPSE ENGINE V4 ACTIVE</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight leading-tight">
                  High-Performance Neural Infrastructure.
                </h2>

                <p className="text-sm font-light opacity-80 leading-relaxed max-w-lg">
                  Next-generation computational color matrices engineered for latency-sensitive visual intelligence platforms.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    className="px-5 py-2.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg hover:opacity-90 transition-opacity"
                    style={{ 
                      backgroundColor: accent1, 
                      color: chroma(accent1).luminance() > 0.45 ? '#000000' : '#ffffff' 
                    }}
                  >
                    <span>Launch Terminal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    className="px-4 py-2.5 rounded-lg text-xs font-mono font-semibold border hover:bg-white/5 transition-colors"
                    style={{ borderColor: `${textLight}30` }}
                  >
                    View Metrics
                  </button>
                </div>
              </div>

              {/* Mock Dashboard Cards */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                <div 
                  className="p-4 rounded-xl border space-y-2"
                  style={{ backgroundColor: `${bgDark === '#ffffff' ? '#f0f0f0' : '#ffffff10'}`, borderColor: `${textLight}20` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono opacity-70">THROUGHPUT</span>
                    <TrendingUp className="w-3.5 h-3.5" style={{ color: accent2 }} />
                  </div>
                  <p className="text-2xl font-mono font-bold" style={{ color: accent2 }}>
                    99.98%
                  </p>
                  <p className="text-[10px] font-mono opacity-60">+4.2% from baseline</p>
                </div>

                <div 
                  className="p-4 rounded-xl border space-y-2"
                  style={{ backgroundColor: `${bgDark === '#ffffff' ? '#f0f0f0' : '#ffffff10'}`, borderColor: `${textLight}20` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono opacity-70">LATENCY</span>
                    <Activity className="w-3.5 h-3.5" style={{ color: accent3 }} />
                  </div>
                  <p className="text-2xl font-mono font-bold" style={{ color: accent3 }}>
                    1.4ms
                  </p>
                  <p className="text-[10px] font-mono opacity-60">Edge synced</p>
                </div>

                <div 
                  className="col-span-2 p-4 rounded-xl border flex items-center justify-between"
                  style={{ 
                    backgroundColor: `${accent1}10`, 
                    borderColor: `${accent1}30` 
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4" style={{ color: accent1 }} />
                    <div>
                      <p className="text-xs font-mono font-bold">End-to-End Encryption</p>
                      <p className="text-[10px] font-mono opacity-70">Quantum-resistant token exchange</p>
                    </div>
                  </div>
                  <span 
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: accent1, color: chroma(accent1).luminance() > 0.45 ? '#000' : '#fff' }}
                  >
                    SECURED
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. POSTER / BRAND VIEW */}
        {previewMode === 'poster' && (
          <div 
            className="p-8 sm:p-12 rounded-xl border relative overflow-hidden flex flex-col justify-between min-h-[360px]"
            style={{ 
              backgroundColor: bgDark, 
              color: textLight, 
              borderColor: `${textLight}20` 
            }}
          >
            {/* Ambient background glow circle */}
            <div 
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl opacity-40 pointer-events-none"
              style={{ backgroundColor: accent1 }}
            />
            <div 
              className="absolute -left-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ backgroundColor: accent2 }}
            />

            <div className="relative z-10 flex justify-between items-start">
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase opacity-70 block mb-1">
                  EXHIBITION POSTER NO. 84
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border" style={{ borderColor: accent3, color: accent3 }}>
                  LIMITED PRESS
                </span>
              </div>
              <span className="font-display font-extrabold text-3xl opacity-40">2026</span>
            </div>

            <div className="relative z-10 my-8 space-y-2">
              <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tighter leading-none">
                CHROMATIC <br />
                <span style={{ color: accent1 }}>LABORATORY</span>
              </h1>
              <p className="text-xs sm:text-sm font-mono max-w-md opacity-80 pt-2">
                A study on nocturnal contrast, procedural harmonies, and spatial color balance.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t" style={{ borderColor: `${textLight}20` }}>
              <div className="flex gap-2">
                {hexList.map((hx, i) => (
                  <div 
                    key={i} 
                    className="w-5 h-5 rounded-full border border-white/20" 
                    style={{ backgroundColor: hx }} 
                    title={hx}
                  />
                ))}
              </div>
              <span className="text-[11px] font-mono opacity-70">
                PALETTE ROOM • STUDIO CURATION
              </span>
            </div>
          </div>
        )}

        {/* 4. GRADIENTS VIEW */}
        {previewMode === 'gradients' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Linear Gradient */}
            <div 
              className="h-44 rounded-xl p-4 flex flex-col justify-between border border-white/20 shadow-lg relative group"
              style={{ background: linearGrad }}
            >
              <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-black/60 text-white backdrop-blur-xs w-fit">
                LINEAR 135°
              </span>
              <button
                onClick={() => onCopyColor(linearGrad, 'CSS LINEAR GRADIENT')}
                className="self-end px-3 py-1 rounded-md bg-black/70 hover:bg-black text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>Copy CSS</span>
              </button>
            </div>

            {/* Mesh Gradient */}
            <div 
              className="h-44 rounded-xl p-4 flex flex-col justify-between border border-white/20 shadow-lg relative group"
              style={{ background: meshGrad }}
            >
              <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-black/60 text-white backdrop-blur-xs w-fit">
                MULTI-STOP MESH
              </span>
              <button
                onClick={() => onCopyColor(meshGrad, 'CSS MESH GRADIENT')}
                className="self-end px-3 py-1 rounded-md bg-black/70 hover:bg-black text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>Copy CSS</span>
              </button>
            </div>

            {/* Radial Gradient */}
            <div 
              className="h-44 rounded-xl p-4 flex flex-col justify-between border border-white/20 shadow-lg relative group"
              style={{ background: radialGrad }}
            >
              <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-black/60 text-white backdrop-blur-xs w-fit">
                RADIAL DEPTH
              </span>
              <button
                onClick={() => onCopyColor(radialGrad, 'CSS RADIAL GRADIENT')}
                className="self-end px-3 py-1 rounded-md bg-black/70 hover:bg-black text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>Copy CSS</span>
              </button>
            </div>

            {/* Staggered Swatch Strip */}
            <div className="h-44 rounded-xl p-4 bg-[#11121c] border border-white/10 flex flex-col justify-between">
              <span className="text-xs font-mono text-zinc-400">
                ACTIVE PALETTE RAMPS
              </span>
              <div className="flex h-14 rounded-lg overflow-hidden border border-white/15">
                {hexList.map((hx, idx) => (
                  <div 
                    key={idx} 
                    className="flex-1 h-full flex items-center justify-center font-mono text-[10px] font-bold"
                    style={{ 
                      backgroundColor: hx, 
                      color: chroma(hx).luminance() > 0.45 ? '#000' : '#fff' 
                    }}
                  >
                    {hx}
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-mono text-zinc-500">
                All CSS gradients dynamically calculated from current laboratory slots.
              </p>
            </div>
          </div>
        )}

        {/* 5. COLOR BLINDNESS SIMULATOR VIEW */}
        {previewMode === 'colorblind' && (
          <div className="space-y-4 p-4 sm:p-5 bg-[#0f1019] border border-white/10 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-display font-bold text-white">
                  COLOR VISION DEFICIENCY SIMULATOR
                </h4>
                <p className="text-xs font-mono text-zinc-400">
                  Test how your palette is perceived by people with various forms of color vision deficiency.
                </p>
              </div>

              {/* Filter Selector */}
              <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                {[
                  { id: 'normal', label: 'Normal' },
                  { id: 'protanopia', label: 'Protanopia' },
                  { id: 'deuteranopia', label: 'Deuteranopia' },
                  { id: 'tritanopia', label: 'Tritanopia' },
                  { id: 'achromatopsia', label: 'Achromatopsia' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setColorBlindFilter(f.id as any)}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      colorBlindFilter === f.id
                        ? 'bg-cyan-500 text-black font-bold shadow-xs'
                        : 'bg-white/[0.06] text-zinc-300 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Swatch in Simulator */}
            <div className="flex h-20 sm:h-24 rounded-xl overflow-hidden border border-white/20">
              {colors.map((c, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center justify-center font-mono text-[11px] sm:text-xs font-bold"
                  style={{
                    backgroundColor: c.hex,
                    color: c.isDark ? '#fff' : '#000',
                  }}
                >
                  <span>{c.hex}</span>
                  <span className="text-[9px] sm:text-[10px] opacity-75 hidden sm:inline">{c.name}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] font-mono text-zinc-400">
              Active simulation filter: <span className="text-cyan-300 font-semibold">{colorBlindFilter.toUpperCase()}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
