import React from 'react';
import { ViewTab } from '../types';
import { Palette } from 'lucide-react';

interface HeaderProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  savedCount: number;
  activeColorCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  activeColorCount,
}) => {
  const navItems: { id: ViewTab; label: string }[] = [
    { id: 'lab', label: 'LAB' },
    { id: 'explore', label: 'EXPLORE' },
    { id: 'collection', label: 'COLLECTION' },
    { id: 'contrast', label: 'CONTRAST' },
    { id: 'about', label: 'ABOUT' },
  ];

  return (
    <>
      {/* Top Header: Clean Brand & Studio Info */}
      <header id="main-header" className="sticky top-0 z-30 w-full border-b border-white/[0.08] bg-[#070709]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <div 
            onClick={() => setActiveTab('lab')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
            role="button"
            tabIndex={0}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center p-1.5 shadow-inner group-hover:border-white/40 transition-colors">
              <Palette className="w-full h-full text-white/90" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold tracking-wider text-base sm:text-lg text-white group-hover:text-white/90">
                  PALETTE ROOM
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono tracking-widest bg-white/10 text-white/70 border border-white/10">
                  STUDIO
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-mono text-zinc-400 hidden sm:block tracking-tight">
                COLOR EXPLORATION LAB
              </p>
            </div>
          </div>

          {/* Right Status Badge */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden sm:inline text-zinc-400">ACTIVE:</span>
              <span className="font-bold text-white uppercase">{activeTab}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Clean Single-Row Bottom Menu Bar with Pure Page Names */}
      <nav 
        id="bottom-menu-bar"
        className="fixed z-40 bottom-0 left-0 right-0 md:bottom-5 md:left-1/2 md:-translate-x-1/2 md:w-auto md:max-w-xl md:rounded-2xl bg-[#090a10]/95 md:bg-[#0c0d16]/95 backdrop-blur-xl border-t md:border border-white/10 md:border-white/15 px-1.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between md:justify-center md:gap-1.5 shadow-[0_-10px_30px_rgba(0,0,0,0.6)] md:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)] transition-all"
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex items-center justify-center flex-1 md:flex-initial px-2 sm:px-3.5 md:px-4 py-2 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-mono tracking-wider transition-all cursor-pointer select-none ${
                isActive
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <span className="truncate whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

