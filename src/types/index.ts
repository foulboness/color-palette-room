export type HarmonyType =
  | 'analogous'
  | 'complementary'
  | 'triadic'
  | 'tetradic'
  | 'split-complementary'
  | 'monochromatic'
  | 'compound'
  | 'procedural'
  | 'neon'
  | 'pastel'
  | 'dark-synth'
  | 'earthy';

export type CategoryType =
  | 'all'
  | 'Cyberpunk'
  | 'Gothic'
  | 'Pastel'
  | 'Kawaii'
  | 'Y2K'
  | 'Nature'
  | 'Midnight'
  | 'Experimental'
  | 'Neon Noir'
  | 'Dreamcore'
  | 'Victorian Night'
  | 'Acid Dream'
  | 'Brutalist'
  | 'Bauhaus'
  | 'Editorial';

export interface ColorItem {
  id: string;
  hex: string;
  locked: boolean;
  name: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  hsv: { h: number; s: number; v: number };
  luminance: number;
  isDark: boolean;
}

export interface Palette {
  id: string;
  name: string;
  description?: string;
  category: CategoryType | string;
  colors: string[];
  tags: string[];
  createdAt: number;
  isFavorite?: boolean;
  author?: string;
}

export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hsv' | 'cmyk';

export type ViewTab = 'lab' | 'explore' | 'collection' | 'contrast' | 'about';

export interface ContrastResult {
  ratio: number;
  scoreAANormal: boolean;
  scoreAALarge: boolean;
  scoreAAANormal: boolean;
  scoreAAALarge: boolean;
  ratingText: 'Fail' | 'AA Large' | 'AA' | 'AAA';
}

export interface HarmonyColorGroup {
  type: HarmonyType;
  label: string;
  colors: string[];
}
