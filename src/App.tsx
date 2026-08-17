import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ColorItem, 
  Palette, 
  HarmonyType, 
  ViewTab, 
  ColorFormat 
} from './types';
import { 
  createColorItem, 
  generateSmartPalette, 
  getColorName 
} from './utils/colorUtils';
import { CURATED_PALETTES } from './data/curatedPalettes';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { PaletteBar } from './components/PaletteBar';
import { PaletteControls } from './components/PaletteControls';
import { UIPreviewStudio } from './components/UIPreviewStudio';
import { ExploreView } from './components/ExploreView';
import { CollectionGallery } from './components/CollectionGallery';
import { ContrastStudio } from './components/ContrastStudio';
import { AboutView } from './components/AboutView';
import { ColorEditorModal } from './components/ColorEditorModal';
import { ExportModal } from './components/ExportModal';
import { SavePaletteModal } from './components/SavePaletteModal';
import { ToastContainer, ToastMessage } from './components/Toast';

const STORAGE_KEY = 'palette_room_saved_palettes_v2';

// Starter default palette: Neo Shinjuku 2099
const INITIAL_COLORS_HEX = ['#08080C', '#FF0055', '#05D9E8', '#FFE600', '#1F1A3A'];

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('lab');
  const [colorCount, setColorCount] = useState<number>(5);
  const [harmony, setHarmony] = useState<HarmonyType>('procedural');
  const [activeFormat, setActiveFormat] = useState<ColorFormat>('hex');
  const [showUIPreview, setShowUIPreview] = useState<boolean>(true);

  // Core Palette State
  const [colors, setColors] = useState<ColorItem[]>(() => {
    return INITIAL_COLORS_HEX.map((hex) => createColorItem(hex, false));
  });

  // History Stack for Undo/Redo
  const [history, setHistory] = useState<ColorItem[][]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Saved Palettes in LocalStorage
  const [savedPalettes, setSavedPalettes] = useState<Palette[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    // Seed with 3 curated starter favorites
    return CURATED_PALETTES.slice(0, 3).map((p) => ({ ...p, isFavorite: true }));
  });

  // Modals state
  const [editingSlotIndex, setEditingSlotIndex] = useState<number | null>(null);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isSaveOpen, setIsSaveOpen] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Push to history when color state changes from generator or user actions
  const pushHistory = (newColors: ColorItem[]) => {
    setHistory((prev) => {
      const slice = prev.slice(0, historyIndex + 1);
      return [...slice, newColors].slice(-30);
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 29));
  };

  // Sync saved palettes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPalettes));
    } catch {
      // ignore
    }
  }, [savedPalettes]);

  // Generate new palette action
  const handleGenerate = useCallback(() => {
    const nextColors = generateSmartPalette(colors, colorCount, harmony);
    pushHistory(nextColors);
    setColors(nextColors);
  }, [colors, colorCount, harmony, historyIndex]);

  // Toggle lock on single slot
  const handleToggleLock = useCallback((index: number) => {
    setColors((prev) => {
      const next = [...prev];
      if (next[index]) {
        next[index] = { ...next[index], locked: !next[index].locked };
      }
      return next;
    });
  }, []);

  // Update color hex on a single slot
  const handleColorChange = useCallback((index: number, newHex: string) => {
    setColors((prev) => {
      const next = [...prev];
      if (next[index]) {
        next[index] = createColorItem(newHex, next[index].locked);
      }
      pushHistory(next);
      return next;
    });
  }, [historyIndex]);

  // Lock All / Unlock All
  const allLocked = colors.every((c) => c.locked);
  const handleLockAll = () => {
    setColors((prev) => prev.map((c) => ({ ...c, locked: true })));
    addToast('LOCKED ALL SLOTS', 'Colors will remain fixed during generation', 'info');
  };
  const handleUnlockAll = () => {
    setColors((prev) => prev.map((c) => ({ ...c, locked: false })));
    addToast('UNLOCKED ALL SLOTS', 'All slots ready for generation', 'info');
  };

  // Move color slot (Reorder)
  const handleMoveColor = (fromIndex: number, toIndex: number) => {
    setColors((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      pushHistory(next);
      return next;
    });
  };

  // Change slot count (3 to 8)
  const handleColorCountChange = (newCount: number) => {
    setColorCount(newCount);
    if (newCount > colors.length) {
      // Add extra harmonized slots
      const expanded = generateSmartPalette(colors, newCount, harmony);
      setColors(expanded);
      pushHistory(expanded);
    } else if (newCount < colors.length) {
      // Trim to count
      const trimmed = colors.slice(0, newCount);
      setColors(trimmed);
      pushHistory(trimmed);
    }
  };

  // Undo / Redo
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleUndo = () => {
    if (canUndo) {
      const prevColors = history[historyIndex - 1];
      if (prevColors) {
        setHistoryIndex(historyIndex - 1);
        setColors(prevColors);
        setColorCount(prevColors.length);
      }
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      const nextColors = history[historyIndex + 1];
      if (nextColors) {
        setHistoryIndex(historyIndex + 1);
        setColors(nextColors);
        setColorCount(nextColors.length);
      }
    }
  };

  // Load palette from Curated Explore or Collection into Lab
  const handleLoadPalette = (palette: Palette) => {
    const loadedColors = palette.colors.map((hex) => createColorItem(hex, false));
    setColorCount(loadedColors.length);
    setColors(loadedColors);
    pushHistory(loadedColors);
    setActiveTab('lab');
    addToast(`LOADED "${palette.name}"`, `${palette.colors.length} colors loaded into Studio Lab`);
  };

  // Save palette into My Collection
  const handleSaveToCollection = (paletteData: { name: string; category: string; description?: string; tags: string[] }) => {
    const newPalette: Palette = {
      id: `p_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
      name: paletteData.name,
      category: paletteData.category,
      description: paletteData.description,
      colors: colors.map((c) => c.hex),
      tags: paletteData.tags,
      createdAt: Date.now(),
      isFavorite: true,
    };
    setSavedPalettes((prev) => [newPalette, ...prev]);
    addToast('SAVED TO COLLECTION', `"${newPalette.name}" is now stored in your local vault`);
  };

  // Save an existing curated palette into collection
  const handleSaveCuratedToCollection = (palette: Palette) => {
    if (savedPalettes.some((p) => p.id === palette.id)) {
      addToast('ALREADY IN COLLECTION', `"${palette.name}" is already saved`, 'info');
      return;
    }
    const newEntry: Palette = {
      ...palette,
      id: `p_${Date.now().toString(36)}`,
      createdAt: Date.now(),
      isFavorite: true,
    };
    setSavedPalettes((prev) => [newEntry, ...prev]);
    addToast('SAVED TO COLLECTION', `"${palette.name}" added to your local vault`);
  };

  // Collection operations
  const handleDeletePalette = (id: string) => {
    setSavedPalettes((prev) => prev.filter((p) => p.id !== id));
    addToast('DELETED PALETTE', 'Removed from local collection', 'info');
  };

  const handleDuplicatePalette = (palette: Palette) => {
    const dup: Palette = {
      ...palette,
      id: `p_${Date.now().toString(36)}`,
      name: `${palette.name} (Copy)`,
      createdAt: Date.now(),
    };
    setSavedPalettes((prev) => [dup, ...prev]);
    addToast('DUPLICATED PALETTE', `Created copy of "${palette.name}"`);
  };

  const handleRenamePalette = (id: string, newName: string) => {
    setSavedPalettes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: newName } : p))
    );
    addToast('RENAMED PALETTE', `Updated to "${newName}"`);
  };

  const handleImportPalettes = (imported: Palette[]) => {
    setSavedPalettes((prev) => [...imported, ...prev]);
    addToast('IMPORTED COLLECTION', `Added ${imported.length} palettes from backup`);
  };

  // Generic copy helper
  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast(`COPIED ${label.toUpperCase()}`, text);
  };

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger if typing in an input or textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable
      ) {
        return;
      }

      // Space -> Generate
      if (e.code === 'Space') {
        e.preventDefault();
        if (activeTab === 'lab') {
          handleGenerate();
        }
      }

      // Number keys 1-8 -> Toggle lock for slot
      if (['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8'].includes(e.code)) {
        const slotIdx = parseInt(e.key, 10) - 1;
        if (slotIdx >= 0 && slotIdx < colors.length) {
          e.preventDefault();
          handleToggleLock(slotIdx);
        }
      }

      // E -> Export
      if (e.key === 'e' || e.key === 'E') {
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          setIsExportOpen(true);
        }
      }

      // S -> Save
      if (e.key === 's' || e.key === 'S') {
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          setIsSaveOpen(true);
        }
      }

      // C -> Copy Palette HEX
      if (e.key === 'c' || e.key === 'C') {
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          handleCopyText(colors.map((c) => c.hex).join(', '), 'PALETTE HEX SEQUENCE');
        }
      }

      // P -> Toggle UI Preview
      if (e.key === 'p' || e.key === 'P') {
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          setShowUIPreview((prev) => !prev);
        }
      }

      // Undo / Redo (Ctrl+Z, Ctrl+Y, Cmd+Z, Cmd+Shift+Z)
      if ((e.metaKey || e.ctrlKey) && (e.key === 'z' || e.key === 'Z')) {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || e.key === 'Y')) {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, colors, handleGenerate, handleToggleLock, handleUndo, handleRedo]);

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col selection:bg-white/20 selection:text-white bg-lab-grid">
      {/* Studio Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedPalettes.length}
        activeColorCount={colors.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 md:pb-24 space-y-6">
        {/* TAB 1: LAB (GENERATOR, PALETTE BAR, CONTROLS, UI PREVIEW) */}
        {activeTab === 'lab' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Hero Studio Banner */}
            <HeroBanner
              onGenerate={handleGenerate}
              onOpenSave={() => setIsSaveOpen(true)}
              onOpenExport={() => setIsExportOpen(true)}
            />

            {/* Central Interactive Palette Bar */}
            <PaletteBar
              colors={colors}
              onToggleLock={handleToggleLock}
              onColorChange={handleColorChange}
              onOpenEditor={(idx) => setEditingSlotIndex(idx)}
              onMoveColor={handleMoveColor}
              onCopyColor={(val, fmt) => handleCopyText(val, fmt)}
              activeFormat={activeFormat}
              setActiveFormat={setActiveFormat}
            />

            {/* Primary Palette Controls */}
            <PaletteControls
              onGenerate={handleGenerate}
              harmony={harmony}
              onSelectHarmony={setHarmony}
              onLockAll={handleLockAll}
              onUnlockAll={handleUnlockAll}
              allLocked={allLocked}
              colorCount={colorCount}
              onColorCountChange={handleColorCountChange}
              canUndo={canUndo}
              canRedo={canRedo}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onOpenSave={() => setIsSaveOpen(true)}
              onOpenExport={() => setIsExportOpen(true)}
              showUIPreview={showUIPreview}
              onToggleUIPreview={() => setShowUIPreview((prev) => !prev)}
            />

            {/* Live Interactive UI Preview Stage */}
            {showUIPreview && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-200">
                <UIPreviewStudio
                  colors={colors}
                  onCopyColor={(val, label) => handleCopyText(val, label)}
                />
              </div>
            )}
          </div>
        )}

        {/* TAB 2: EXPLORE (CURATED THEMES & SUBGENRES) */}
        {activeTab === 'explore' && (
          <div className="animate-in fade-in duration-200">
            <ExploreView
              onLoadPalette={handleLoadPalette}
              onSaveToCollection={handleSaveCuratedToCollection}
              onCopyText={handleCopyText}
            />
          </div>
        )}

        {/* TAB 3: COLLECTION (SAVED PALETTES VAULT) */}
        {activeTab === 'collection' && (
          <div className="animate-in fade-in duration-200">
            <CollectionGallery
              savedPalettes={savedPalettes}
              onLoadPalette={handleLoadPalette}
              onDeletePalette={handleDeletePalette}
              onDuplicatePalette={handleDuplicatePalette}
              onRenamePalette={handleRenamePalette}
              onImportPalettes={handleImportPalettes}
              onCopyText={handleCopyText}
              onNavigateToLab={() => setActiveTab('lab')}
            />
          </div>
        )}

        {/* TAB 4: CONTRAST (ACCESSIBILITY CHECKER & MATRIX) */}
        {activeTab === 'contrast' && (
          <div className="animate-in fade-in duration-200">
            <ContrastStudio
              colors={colors}
              onUpdateColorHex={handleColorChange}
              onCopyText={handleCopyText}
            />
          </div>
        )}

        {/* TAB 5: ABOUT (MANIFESTO & KEYBOARD SHORTCUTS) */}
        {activeTab === 'about' && (
          <div className="animate-in fade-in duration-200">
            <AboutView />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer id="app-footer" className="border-t border-white/[0.08] bg-[#060609] py-8 pb-28 md:pb-24 text-xs font-mono text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-display font-extrabold tracking-wider text-sm text-white">PALETTE ROOM</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400 text-[11px]">COLOR LABORATORY</span>
            </div>
          </div>
      
          <div className="pt-3 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-400">
            <p>Designed for digital art directors, UI engineers, and brand identity designers.</p>
            <p className="text-zinc-400 font-mono">v1.0 • Architecture</p>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Precision Color Tuning Modal */}
      {editingSlotIndex !== null && (
        <ColorEditorModal
          colorItem={colors[editingSlotIndex] || null}
          slotIndex={editingSlotIndex}
          isOpen={editingSlotIndex !== null}
          onClose={() => setEditingSlotIndex(null)}
          onSaveColor={handleColorChange}
          onApplyFullPalette={(newHarmonies) => {
            const newItems = newHarmonies.map((hx) => createColorItem(hx, false));
            setColorCount(newItems.length);
            setColors(newItems);
            pushHistory(newItems);
            addToast('APPLIED HARMONY PALETTE', `${newItems.length} slots generated`);
          }}
          onCopy={(val) => handleCopyText(val, val)}
        />
      )}

      {/* 2. Export Modal */}
      <ExportModal
        colors={colors}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        onCopy={handleCopyText}
      />

      {/* 3. Save to Collection Modal */}
      <SavePaletteModal
        colors={colors}
        isOpen={isSaveOpen}
        onClose={() => setIsSaveOpen(false)}
        onSave={handleSaveToCollection}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
