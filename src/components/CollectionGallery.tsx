import React, { useState } from 'react';
import { Palette } from '../types';
import { 
  Bookmark, 
  Trash2, 
  Copy, 
  ArrowRight, 
  Edit3, 
  CopyPlus, 
  Download, 
  Upload, 
  Check, 
  Plus, 
  Sparkles,
  Search
} from 'lucide-react';

interface CollectionGalleryProps {
  savedPalettes: Palette[];
  onLoadPalette: (palette: Palette) => void;
  onDeletePalette: (id: string) => void;
  onDuplicatePalette: (palette: Palette) => void;
  onRenamePalette: (id: string, newName: string) => void;
  onImportPalettes: (palettes: Palette[]) => void;
  onCopyText: (text: string, label: string) => void;
  onNavigateToLab: () => void;
}

export const CollectionGallery: React.FC<CollectionGalleryProps> = ({
  savedPalettes,
  onLoadPalette,
  onDeletePalette,
  onDuplicatePalette,
  onRenamePalette,
  onImportPalettes,
  onCopyText,
  onNavigateToLab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = savedPalettes.filter((p) => {
    return (
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.colors.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleStartRename = (palette: Palette) => {
    setEditingId(palette.id);
    setEditingName(palette.name);
  };

  const handleSaveRename = (id: string) => {
    if (editingName.trim()) {
      onRenamePalette(id, editingName.trim());
    }
    setEditingId(null);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedPalettes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `palette-room-collection-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            onImportPalettes(parsed);
          }
        } catch (err) {
          alert('Invalid JSON file format.');
        }
      };
    }
  };

  return (
    <div id="collection-view" className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-[#0b0c14] border border-white/[0.08] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Bookmark className="w-3.5 h-3.5" />
              LOCAL VAULT // {savedPalettes.length} SAVED COMBINATIONS
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              MY PALETTES
            </h2>
            <p className="text-sm font-light text-zinc-400">
              Persistent collection stored in your browser's local sandbox. Rename, duplicate, backup, and restore anytime.
            </p>
          </div>

          {/* Backup / Restore Controls */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <button
              onClick={handleExportJSON}
              disabled={savedPalettes.length === 0}
              className="px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-30 border border-white/[0.08] text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>EXPORT BACKUP</span>
            </button>

            <label className="px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>IMPORT JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Search Bar */}
        {savedPalettes.length > 0 && (
          <div className="mt-6 max-w-md">
            <div className="flex items-center gap-2 bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 focus-within:border-white/40">
              <Search className="w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search saved palettes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs font-mono text-white placeholder-zinc-500 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Grid of Saved Palettes */}
      {savedPalettes.length === 0 ? (
        <div className="text-center py-20 bg-[#0c0d15] border border-white/[0.08] rounded-2xl p-8 space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto text-zinc-500">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-display font-bold text-white">
              YOUR VAULT IS CURRENTLY EMPTY
            </h3>
            <p className="text-xs font-mono text-zinc-400">
              Generate harmonies in the Lab and press "Save to Collection" or explore curated packs.
            </p>
          </div>
          <button
            onClick={onNavigateToLab}
            className="px-5 py-2.5 rounded-lg bg-white text-black font-display font-bold text-xs tracking-wide flex items-center gap-1.5 mx-auto hover:bg-zinc-200 transition-all cursor-pointer shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>OPEN STUDIO LAB</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((palette) => {
            const isEditing = editingId === palette.id;
            const isCopied = copiedId === palette.id;

            return (
              <div
                key={palette.id}
                id={`collection-card-${palette.id}`}
                className="bg-[#0d0e16] border border-white/[0.08] hover:border-white/20 rounded-2xl p-5 space-y-4 transition-all duration-200 hover:shadow-2xl flex flex-col justify-between group"
              >
                {/* Header: Title / Rename Field & Meta */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span>
                      {new Date(palette.createdAt).toLocaleDateString()}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-white/[0.06] text-zinc-300">
                      {palette.category || 'Custom'}
                    </span>
                  </div>

                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(palette.id)}
                        className="w-full bg-black/60 border border-white/30 rounded px-2 py-1 text-sm font-display text-white focus:outline-none"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveRename(palette.id)}
                        className="p-1 rounded bg-white text-black text-xs font-bold"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                        {palette.name}
                      </h3>
                      <button
                        onClick={() => handleStartRename(palette)}
                        className="p-1 rounded text-zinc-500 hover:text-white transition-colors"
                        title="Rename palette"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Swatch Strip */}
                <div className="h-16 rounded-xl overflow-hidden flex border border-white/10 shadow-inner">
                  {palette.colors.map((hex, i) => (
                    <div
                      key={i}
                      style={{ backgroundColor: hex }}
                      title={hex}
                      className="flex-1 h-full flex items-end justify-center pb-1 group/swatch hover:flex-[1.5] transition-all cursor-pointer"
                      onClick={() => onCopyText(hex, hex)}
                    >
                      <span className="text-[9px] font-mono font-bold px-1 rounded bg-black/50 text-white opacity-0 group-hover/swatch:opacity-100 transition-opacity">
                        {hex}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    {/* Copy all hexes */}
                    <button
                      onClick={() => {
                        onCopyText(palette.colors.join(', '), `PALETTE "${palette.name}"`);
                        setCopiedId(palette.id);
                        setTimeout(() => setCopiedId(null), 1400);
                      }}
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors"
                      title="Copy all HEX"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    {/* Duplicate */}
                    <button
                      onClick={() => onDuplicatePalette(palette)}
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors"
                      title="Duplicate palette"
                    >
                      <CopyPlus className="w-3.5 h-3.5 text-cyan-400" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => onDeletePalette(palette.id)}
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition-colors"
                      title="Delete from collection"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
            );
          })}
        </div>
      )}
    </div>
  );
};
