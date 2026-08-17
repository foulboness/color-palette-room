import React, { useState } from 'react';
import { ColorItem, CategoryType } from '../types';
import { X, BookmarkPlus, Sparkles, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SavePaletteModalProps {
  colors: ColorItem[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (paletteData: { name: string; category: string; description?: string; tags: string[] }) => void;
}

export const SavePaletteModal: React.FC<SavePaletteModalProps> = ({
  colors,
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>('Experimental');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('dark, creative, ui');

  if (!isOpen) return null;

  const categories = [
    'Cyberpunk',
    'Neon Noir',
    'Dreamcore',
    'Acid Dream',
    'Victorian Night',
    'Gothic',
    'Y2K',
    'Kawaii',
    'Pastel',
    'Midnight',
    'Nature',
    'Brutalist',
    'Editorial',
    'Bauhaus',
    'Experimental',
  ];

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || `Studio Harmony #${Math.floor(Math.random() * 900 + 100)}`;
    const parsedTags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    onSave({
      name: finalName,
      category,
      description: description.trim(),
      tags: parsedTags.length > 0 ? parsedTags : [category, 'Custom'],
    });

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: colors.map((c) => c.hex),
      });
    } catch {
      // ignore
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="save-palette-modal"
        className="w-full max-w-lg bg-[#0e0f17] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#090a10]">
          <div className="flex items-center gap-2">
            <BookmarkPlus className="w-4 h-4 text-emerald-400" />
            <h3 className="font-display font-bold text-sm tracking-wide text-white">
              SAVE TO MY PALETTES
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSaveSubmit} className="p-5 space-y-4">
          {/* Swatch Preview */}
          <div className="h-12 rounded-xl overflow-hidden flex border border-white/10">
            {colors.map((c, i) => (
              <div key={i} style={{ backgroundColor: c.hex }} className="flex-1 h-full" />
            ))}
          </div>

          {/* Palette Name */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-zinc-400 block">
              PALETTE NAME *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Midnight Obsidian, Acid Dream V2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/40"
              autoFocus
            />
          </div>

          {/* Category Selector */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-zinc-400 block">
              CATEGORY / GENRE
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white/40 cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#12131c] text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-zinc-400 block">
              DESCRIPTION / NOTES (OPTIONAL)
            </label>
            <textarea
              rows={2}
              placeholder="Notes on usage, project pairings, or lighting atmosphere..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 resize-none"
            />
          </div>

          {/* Tags */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
              <Tag className="w-3 h-3 text-zinc-400" />
              <span>TAGS (COMMA SEPARATED)</span>
            </label>
            <input
              type="text"
              placeholder="dark, minimal, neon, ui"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/40"
            />
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              CANCEL
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-500 text-black font-display font-bold text-xs tracking-wide flex items-center gap-1.5 hover:bg-emerald-400 transition-all shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>SAVE TO VAULT</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
