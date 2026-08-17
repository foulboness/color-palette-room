import React, { useState, useMemo } from 'react';
import { Palette, CategoryType } from '../types';
import { CURATED_PALETTES } from '../data/curatedPalettes';
import { 
  Sparkles, 
  Search, 
  BookmarkPlus, 
  Copy, 
  ArrowRight, 
  Check, 
  Heart,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import chroma from 'chroma-js';

interface ExploreViewProps {
  onLoadPalette: (palette: Palette) => void;
  onSaveToCollection: (palette: Palette) => void;
  onCopyText: (text: string, label: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onLoadPalette,
  onSaveToCollection,
  onCopyText,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(new Set());

  const categories = [
    'all',
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
  ];

  const filteredPalettes = useMemo(() => {
    return CURATED_PALETTES.filter((p) => {
      const matchCategory =
        selectedCategory === 'all' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase() ||
        p.tags.some((t) => t.toLowerCase() === selectedCategory.toLowerCase());

      const matchSearch =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.colors.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyPalette = (palette: Palette) => {
    const text = palette.colors.join(', ');
    onCopyText(text, `PALETTE "${palette.name}"`);
    setCopiedId(palette.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoritedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div id="explore-view" className="space-y-6">
      {/* Explore Hero Banner */}
      <div className="bg-[#0b0c14] border border-white/[0.08] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Flame className="w-3.5 h-3.5" />
            CURATED ARCHIVE // 26 SPECIALIZED HARMONIES
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            EXPLORE PALETTES
          </h2>
          <p className="text-sm font-light text-zinc-400 leading-relaxed">
            Browse handcrafted thematic palettes engineered across subgenres: Cyberpunk, Neon Noir, Dreamcore, Acid Dream, Victorian Night, and beyond.
          </p>
        </div>

        {/* Search Input */}
        <div className="mt-6 max-w-md relative z-10">
          <div className="flex items-center gap-2 bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 focus-within:border-white/40 shadow-inner">
            <Search className="w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by theme, keyword (e.g. Neon, Gothic, Rose), or HEX..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-mono text-white placeholder-zinc-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-mono text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Menu Bar */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/[0.02] border border-white/[0.08] rounded-xl">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all uppercase cursor-pointer ${
                isSelected
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPalettes.map((palette) => {
          const isFavorited = favoritedIds.has(palette.id);
          const isCopied = copiedId === palette.id;

          return (
            <div
              key={palette.id}
              id={`curated-card-${palette.id}`}
              className="bg-[#0d0e16] border border-white/[0.08] hover:border-white/20 rounded-2xl p-5 space-y-4 transition-all duration-200 hover:shadow-2xl flex flex-col justify-between group"
            >
              {/* Top: Category Tag & Name */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold tracking-wider px-2 py-0.5 rounded bg-white/[0.06] text-zinc-300 border border-white/[0.08] uppercase">
                    {palette.category}
                  </span>

                  <button
                    onClick={(e) => toggleFavorite(palette.id, e)}
                    className={`p-1.5 rounded-md transition-colors ${
                      isFavorited ? 'text-rose-500 bg-rose-500/10' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                    title="Favorite palette"
                  >
                    <Heart className="w-3.5 h-3.5" fill={isFavorited ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                  {palette.name}
                </h3>

                {palette.description && (
                  <p className="text-xs font-light text-zinc-400 line-clamp-2 leading-relaxed">
                    {palette.description}
                  </p>
                )}
              </div>

              {/* Swatch Strip */}
              <div className="h-16 rounded-xl overflow-hidden flex border border-white/10 shadow-inner">
                {palette.colors.map((hex, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: hex }}
                    title={`${hex}`}
                    className="flex-1 h-full flex items-end justify-center pb-1 group/swatch hover:flex-[1.5] transition-all cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCopyText(hex, hex);
                    }}
                  >
                    <span className="text-[9px] font-mono font-bold px-1 rounded bg-black/50 text-white opacity-0 group-hover/swatch:opacity-100 transition-opacity">
                      {hex}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tags & Action Buttons */}
              <div className="space-y-3 pt-1">
                <div className="flex flex-wrap gap-1">
                  {palette.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-zinc-400 bg-white/[0.02] px-2 py-0.5 rounded border border-white/[0.04]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyPalette(palette)}
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors"
                      title="Copy all HEX values"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => onSaveToCollection(palette)}
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors"
                      title="Save to My Palettes"
                    >
                      <BookmarkPlus className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                  </div>

                  <button
                    onClick={() => onLoadPalette(palette)}
                    className="px-3.5 py-1.5 rounded-lg bg-white text-black font-bold flex items-center gap-1 hover:bg-zinc-200 transition-all cursor-pointer text-xs"
                  >
                    <span>LOAD IN LAB</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPalettes.length === 0 && (
        <div className="text-center py-16 bg-[#0c0d15] border border-white/[0.08] rounded-2xl space-y-3">
          <p className="text-sm font-mono text-zinc-400">
            NO CURATED PALETTES MATCHING "{searchQuery}"
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-lg bg-white/10 text-xs font-mono text-white hover:bg-white/20 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
