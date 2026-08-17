import chroma from 'chroma-js';
import { ColorItem, ContrastResult, HarmonyType } from '../types';

// Curated poetic descriptor dictionary for color naming
const COLOR_NAMES_MAP: Record<string, string> = {
  '#000000': 'Absolute Void',
  '#08080a': 'Obsidian Matte',
  '#0d0e15': 'Abyssal Night',
  '#11121b': 'Carbon Dark',
  '#1a1b26': 'Tokyo Midnight',
  '#1e1e2e': 'Catppuccin Crust',
  '#2a2b3c': 'Deep Slate',
  '#ffffff': 'Pure Starlight',
  '#f8f9fa': 'Alabaster Dust',
  '#ededed': 'Chalk White',
  '#e2e8f0': 'Ghost Zinc',
  '#ff0055': 'Cyber Crimson',
  '#ff2a6d': 'Neon Glitch',
  '#05d9e8': 'Acid Cyan',
  '#005678': 'Deep Pacific',
  '#01012b': 'Hyper Abyss',
  '#ffe600': 'Volt Lemon',
  '#f9c80e': 'Supernova Amber',
  '#f86624': 'Molten Orange',
  '#ea3546': 'Laser Red',
  '#662e9b': 'Ultraviolet Void',
  '#43bccd': 'Electric Turquoise',
  '#a239ca': 'Arcane Purple',
  '#4717f6': 'Prism Cobalt',
  '#0e0b16': 'Dark Matter',
  '#e7dfdd': 'Ethereal Mist',
  '#2e0854': 'Victorian Velvet',
  '#590242': 'Cranberry Wine',
  '#840032': 'Gothic Rose',
  '#002642': 'Midnight Tempest',
  '#e5989b': 'Dusty Blossom',
  '#b5838d': 'Muted Orchid',
  '#6d6875': 'Smoky Amethyst',
  '#ffb4a2': 'Peach Whisper',
  '#ffcdb2': 'Warm Porcelain',
  '#39ff14': 'Radioactive Lime',
  '#00f5d4': 'Aqua Mirage',
  '#7b2cbf': 'Nebula Violet',
  '#f72585': 'Shocking Magenta',
  '#4cc9f0': 'Skyline Ice',
  '#2b2d42': 'Steel Indigo',
  '#8d99ae': 'Cool Pewter',
  '#edf2f4': 'Porcelain Grey',
  '#ef233c': 'Vivid Scarlet',
  '#d90429': 'Crimson Fury',
  '#264653': 'Deep Marine',
  '#2a9d8f': 'Persian Jade',
  '#e9c46a': 'Desert Gold',
  '#f4a261': 'Terracotta Sand',
  '#e76f51': 'Burnt Saffron',
  '#d8f3dc': 'Matcha Foam',
  '#b7e4c7': 'Pale Celadon',
  '#74c69d': 'Spring Clover',
  '#40916c': 'Deep Moss',
  '#1b4332': 'Ancient Forest',
  '#081c15': 'Forest Shadow',
};

// Poetic prefix/suffix for procedurally naming colors based on HSL
const HUE_NAMES = [
  'Crimson', 'Ruby', 'Scarlet', 'Coral', 'Amber', 'Tangerine', 'Gold', 
  'Citron', 'Lime', 'Emerald', 'Jade', 'Mint', 'Cyan', 'Turquoise', 
  'Cerulean', 'Cobalt', 'Sapphire', 'Indigo', 'Violet', 'Amethyst', 
  'Orchid', 'Magenta', 'Fuchsia', 'Rose'
];

export function getColorName(hex: string): string {
  const cleanHex = hex.toLowerCase();
  if (COLOR_NAMES_MAP[cleanHex]) {
    return COLOR_NAMES_MAP[cleanHex];
  }

  // Find closest exact match in our dictionary
  let minDistance = Infinity;
  let closestName = '';

  for (const [keyHex, name] of Object.entries(COLOR_NAMES_MAP)) {
    try {
      const dist = chroma.distance(cleanHex, keyHex, 'lab');
      if (dist < minDistance) {
        minDistance = dist;
        closestName = name;
      }
    } catch {
      // ignore invalid hex
    }
  }

  if (minDistance < 12 && closestName) {
    return closestName;
  }

  try {
    const c = chroma(hex);
    const [h, s, l] = c.hsl();
    const isGray = s < 0.12;

    if (l < 0.08) return 'Midnight Void';
    if (l > 0.94) return 'Ghost White';
    if (isGray) {
      if (l < 0.25) return 'Obsidian Carbon';
      if (l < 0.5) return 'Basalt Grey';
      if (l < 0.75) return 'Smoky Pewter';
      return 'Pale Platinum';
    }

    const hueIndex = Math.floor(((h || 0) % 360) / (360 / HUE_NAMES.length));
    const baseHue = HUE_NAMES[hueIndex] || 'Tone';

    let prefix = '';
    if (l < 0.2) prefix = 'Abyssal ';
    else if (l < 0.35) prefix = 'Deep ';
    else if (l > 0.8) prefix = 'Pastel ';
    else if (l > 0.65) prefix = 'Light ';
    else if (s > 0.8) prefix = 'Electric ';
    else if (s < 0.35) prefix = 'Muted ';
    else prefix = 'Vivid ';

    return `${prefix}${baseHue}`;
  } catch {
    return 'Chromatic Shimmer';
  }
}

export function createColorItem(hexInput: string, locked = false): ColorItem {
  const validHex = chroma.valid(hexInput) ? chroma(hexInput).hex() : '#000000';
  const c = chroma(validHex);
  const [r, g, b] = c.rgb();
  const [hRaw, sRaw, lRaw] = c.hsl();
  const [hsvH, hsvS, hsvV] = c.hsv();
  const lum = c.luminance();

  return {
    id: `c_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`,
    hex: validHex.toUpperCase(),
    locked,
    name: getColorName(validHex),
    rgb: { r, g, b },
    hsl: { 
      h: Math.round(isNaN(hRaw) ? 0 : hRaw), 
      s: Math.round(sRaw * 100), 
      l: Math.round(lRaw * 100) 
    },
    hsv: { 
      h: Math.round(isNaN(hsvH) ? 0 : hsvH), 
      s: Math.round(hsvS * 100), 
      v: Math.round(hsvV * 100) 
    },
    luminance: Number(lum.toFixed(3)),
    isDark: lum < 0.45,
  };
}

export function generateRandomHex(): string {
  return chroma.random().hex().toUpperCase();
}

/**
 * Procedurally generate a balanced, visually engaging palette of N colors
 * keeping locked colors intact and harmonizing unlocked colors.
 */
export function generateSmartPalette(
  currentColors: ColorItem[],
  targetCount = 5,
  harmony: HarmonyType = 'procedural'
): ColorItem[] {
  const lockedItems = currentColors.filter(c => c.locked);
  const result: ColorItem[] = [];

  // Base reference color from first locked item or a newly randomized rich color
  let baseColorHex: string;
  if (lockedItems.length > 0) {
    baseColorHex = lockedItems[0].hex;
  } else {
    // Generate a vibrant base color
    baseColorHex = chroma.random().saturate(0.5).hex();
  }

  const baseChroma = chroma(baseColorHex);
  const [baseH, baseS, baseL] = baseChroma.hsl();
  const actualH = isNaN(baseH) ? Math.random() * 360 : baseH;

  // Generate harmonized raw colors according to mode
  const generatedHexes: string[] = [];

  switch (harmony) {
    case 'analogous': {
      const step = 28;
      for (let i = 0; i < targetCount; i++) {
        const h = (actualH + (i - Math.floor(targetCount / 2)) * step + 360) % 360;
        const l = Math.min(0.85, Math.max(0.18, 0.2 + (i / (targetCount - 1)) * 0.6));
        generatedHexes.push(chroma.hsl(h, Math.max(0.45, baseS), l).hex());
      }
      break;
    }
    case 'complementary': {
      const compH = (actualH + 180) % 360;
      for (let i = 0; i < targetCount; i++) {
        const useComp = i >= Math.ceil(targetCount / 2);
        const h = useComp ? compH : actualH;
        const l = 0.15 + (i / (targetCount - 1)) * 0.7;
        const s = useComp ? Math.min(0.95, baseS + 0.1) : baseS;
        generatedHexes.push(chroma.hsl(h, Math.max(0.3, s), l).hex());
      }
      break;
    }
    case 'triadic': {
      const angles = [0, 120, 240, 60, 180, 300, 30, 210];
      for (let i = 0; i < targetCount; i++) {
        const h = (actualH + (angles[i % angles.length])) % 360;
        const l = 0.22 + ((i * 1.618) % 1) * 0.6;
        generatedHexes.push(chroma.hsl(h, Math.min(0.9, Math.max(0.4, baseS)), l).hex());
      }
      break;
    }
    case 'tetradic': {
      const angles = [0, 90, 180, 270, 45, 135, 225, 315];
      for (let i = 0; i < targetCount; i++) {
        const h = (actualH + angles[i % angles.length]) % 360;
        const l = 0.2 + (i % 3) * 0.25;
        generatedHexes.push(chroma.hsl(h, Math.max(0.5, baseS), l).hex());
      }
      break;
    }
    case 'monochromatic': {
      for (let i = 0; i < targetCount; i++) {
        const l = 0.12 + (i / (targetCount - 1)) * 0.78;
        const s = Math.max(0.2, baseS - (i * 0.05));
        generatedHexes.push(chroma.hsl(actualH, s, l).hex());
      }
      break;
    }
    case 'neon': {
      const neonHues = [(actualH) % 360, (actualH + 60) % 360, (actualH + 150) % 360, (actualH + 210) % 360, (actualH + 300) % 360];
      for (let i = 0; i < targetCount; i++) {
        const h = neonHues[i % neonHues.length];
        const l = i === 0 ? 0.08 : (0.55 + (i * 0.08));
        const s = i === 0 ? 0.3 : 0.95;
        generatedHexes.push(chroma.hsl(h, s, Math.min(0.85, l)).hex());
      }
      break;
    }
    case 'pastel': {
      for (let i = 0; i < targetCount; i++) {
        const h = (actualH + i * (360 / targetCount)) % 360;
        generatedHexes.push(chroma.hsl(h, 0.55, 0.82).hex());
      }
      break;
    }
    case 'dark-synth': {
      const synthColors = [
        chroma.hsl(actualH, 0.4, 0.08).hex(),
        chroma.hsl((actualH + 40) % 360, 0.9, 0.45).hex(),
        chroma.hsl((actualH + 180) % 360, 0.95, 0.55).hex(),
        chroma.hsl((actualH + 290) % 360, 0.85, 0.6).hex(),
        chroma.hsl((actualH + 120) % 360, 0.3, 0.9).hex(),
      ];
      for (let i = 0; i < targetCount; i++) {
        generatedHexes.push(synthColors[i % synthColors.length]);
      }
      break;
    }
    case 'earthy': {
      const earthHues = [25, 40, 75, 110, 15, 55];
      for (let i = 0; i < targetCount; i++) {
        const h = earthHues[i % earthHues.length];
        const s = 0.3 + (i * 0.08);
        const l = 0.2 + (i / targetCount) * 0.55;
        generatedHexes.push(chroma.hsl(h, s, l).hex());
      }
      break;
    }
    case 'procedural':
    default: {
      // Natural aesthetic curve: 1 dark anchor, 1-2 vibrant mids, 1 high accent, 1 soft/light tint
      const moodHues = [actualH, (actualH + 35) % 360, (actualH + 175) % 360, (actualH + 215) % 360, (actualH + 290) % 360];
      
      for (let i = 0; i < targetCount; i++) {
        const h = moodHues[i % moodHues.length];
        let l: number;
        let s: number;

        if (i === 0) {
          l = Math.random() * 0.12 + 0.08; // deep dark anchor
          s = 0.25 + Math.random() * 0.3;
        } else if (i === targetCount - 1) {
          l = 0.82 + Math.random() * 0.12; // light tint
          s = 0.2 + Math.random() * 0.3;
        } else if (i === 1) {
          l = 0.45 + Math.random() * 0.18; // vibrant hero
          s = 0.75 + Math.random() * 0.2;
        } else {
          l = 0.3 + Math.random() * 0.4;
          s = 0.5 + Math.random() * 0.35;
        }
        generatedHexes.push(chroma.hsl(h, Math.min(1, Math.max(0.1, s)), l).hex());
      }
      break;
    }
  }

  // Merge with existing locked slots or create new
  for (let i = 0; i < targetCount; i++) {
    const existing = currentColors[i];
    if (existing && existing.locked) {
      result.push(existing);
    } else {
      const hex = generatedHexes[i] || generateRandomHex();
      result.push(createColorItem(hex, false));
    }
  }

  return result;
}

/**
 * Calculate WCAG contrast ratio and AA/AAA standards
 */
export function checkContrast(fgHex: string, bgHex: string): ContrastResult {
  try {
    const ratio = chroma.contrast(fgHex, bgHex);
    const roundedRatio = Number(ratio.toFixed(2));
    const scoreAANormal = ratio >= 4.5;
    const scoreAALarge = ratio >= 3.0;
    const scoreAAANormal = ratio >= 7.0;
    const scoreAAALarge = ratio >= 4.5;

    let ratingText: 'Fail' | 'AA Large' | 'AA' | 'AAA' = 'Fail';
    if (ratio >= 7.0) ratingText = 'AAA';
    else if (ratio >= 4.5) ratingText = 'AA';
    else if (ratio >= 3.0) ratingText = 'AA Large';

    return {
      ratio: roundedRatio,
      scoreAANormal,
      scoreAALarge,
      scoreAAANormal,
      scoreAAALarge,
      ratingText,
    };
  } catch {
    return {
      ratio: 1,
      scoreAANormal: false,
      scoreAALarge: false,
      scoreAAANormal: false,
      scoreAAALarge: false,
      ratingText: 'Fail',
    };
  }
}

/**
 * Generate 10-step Shading & Tinting ramp for any color
 */
export function generateShadesAndTints(hex: string): string[] {
  try {
    return chroma
      .scale(['#000000', hex, '#ffffff'])
      .mode('lab')
      .colors(11)
      .slice(1, 10);
  } catch {
    return [hex];
  }
}

/**
 * Generate standard color harmonies for a single color
 */
export function getHarmoniesForColor(hex: string) {
  try {
    const c = chroma(hex);
    const [h, s, l] = c.hsl();
    const safeH = isNaN(h) ? 0 : h;

    return {
      complementary: [hex, chroma.hsl((safeH + 180) % 360, s, l).hex().toUpperCase()],
      analogous: [
        chroma.hsl((safeH - 30 + 360) % 360, s, l).hex().toUpperCase(),
        hex,
        chroma.hsl((safeH + 30) % 360, s, l).hex().toUpperCase(),
      ],
      triadic: [
        hex,
        chroma.hsl((safeH + 120) % 360, s, l).hex().toUpperCase(),
        chroma.hsl((safeH + 240) % 360, s, l).hex().toUpperCase(),
      ],
      splitComplementary: [
        hex,
        chroma.hsl((safeH + 150) % 360, s, l).hex().toUpperCase(),
        chroma.hsl((safeH + 210) % 360, s, l).hex().toUpperCase(),
      ],
      tetradic: [
        hex,
        chroma.hsl((safeH + 90) % 360, s, l).hex().toUpperCase(),
        chroma.hsl((safeH + 180) % 360, s, l).hex().toUpperCase(),
        chroma.hsl((safeH + 270) % 360, s, l).hex().toUpperCase(),
      ],
    };
  } catch {
    return null;
  }
}

/**
 * Format exports in various developer & designer outputs
 */
export function formatExport(colors: string[], format: 'hex' | 'css' | 'tailwind' | 'json' | 'svg' | 'array'): string {
  switch (format) {
    case 'hex':
      return colors.join(', ');
    case 'array':
      return JSON.stringify(colors, null, 2);
    case 'css':
      return `:root {\n${colors.map((c, i) => `  --color-palette-${i + 1}: ${c};`).join('\n')}\n}`;
    case 'tailwind': {
      const obj: Record<string, string> = {};
      colors.forEach((c, i) => {
        obj[`brand-${(i + 1) * 100}`] = c;
      });
      return `module.exports = {\n  theme: {\n    extend: {\n      colors: ${JSON.stringify(obj, null, 8).replace(/^ {8}/gm, '        ')}\n    }\n  }\n};`;
    }
    case 'json': {
      const data = colors.map((hex, i) => {
        const c = chroma(hex);
        return {
          slot: i + 1,
          hex,
          name: getColorName(hex),
          rgb: c.rgb(),
          hsl: c.hsl().map(v => Math.round(v)),
          luminance: Number(c.luminance().toFixed(3)),
        };
      });
      return JSON.stringify(data, null, 2);
    }
    case 'svg': {
      const width = 800;
      const height = 200;
      const colWidth = width / colors.length;
      const rects = colors
        .map((c, i) => {
          const lum = chroma(c).luminance();
          const textColor = lum > 0.45 ? '#000000' : '#ffffff';
          return `
    <g transform="translate(${i * colWidth}, 0)">
      <rect width="${colWidth}" height="${height}" fill="${c}" />
      <text x="${colWidth / 2}" y="${height - 24}" font-family="monospace" font-size="14" font-weight="bold" fill="${textColor}" text-anchor="middle">${c}</text>
    </g>`;
        })
        .join('');
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">\n  <rect width="${width}" height="${height}" fill="#08080a" />${rects}\n</svg>`;
    }
    default:
      return colors.join(', ');
  }
}

/**
 * Render and download a crisp, studio-grade PNG swatch card on HTML5 Canvas
 */
export function downloadPalettePNG(colors: string[], paletteTitle = 'PALETTE ROOM') {
  const canvas = document.createElement('canvas');
  const width = 1200;
  const height = 630;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background
  ctx.fillStyle = '#070709';
  ctx.fillRect(0, 0, width, height);

  // Top header banner
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px Syne, sans-serif';
  ctx.fillText('PALETTE ROOM', 60, 60);

  ctx.fillStyle = '#888899';
  ctx.font = '14px JetBrains Mono, monospace';
  ctx.fillText(`DIGITAL COLOR LABORATORY // ${paletteTitle.toUpperCase()}`, 60, 85);
  ctx.fillText(`${colors.length} COLOR HARMONY`, width - 200, 60);

  // Divider line
  ctx.strokeStyle = '#22222a';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, 110);
  ctx.lineTo(width - 60, 110);
  ctx.stroke();

  // Swatch boxes
  const swatchY = 140;
  const swatchHeight = 400;
  const swatchAreaWidth = width - 120;
  const swatchWidth = swatchAreaWidth / colors.length;

  colors.forEach((hex, i) => {
    const x = 60 + i * swatchWidth;
    
    // Fill color swatch
    ctx.fillStyle = hex;
    ctx.fillRect(x, swatchY, swatchWidth, swatchHeight);

    // Color details inside swatch bottom
    const lum = chroma(hex).luminance();
    const textColor = lum > 0.45 ? '#000000' : '#ffffff';
    const subTextColor = lum > 0.45 ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)';

    ctx.fillStyle = textColor;
    ctx.font = 'bold 18px JetBrains Mono, monospace';
    ctx.fillText(hex, x + 20, swatchY + swatchHeight - 60);

    ctx.fillStyle = subTextColor;
    ctx.font = '13px JetBrains Mono, monospace';
    const name = getColorName(hex);
    ctx.fillText(name.length > 18 ? name.substring(0, 16) + '…' : name, x + 20, swatchY + swatchHeight - 35);
    ctx.fillText(`LUM: ${Math.round(lum * 100)}%`, x + 20, swatchY + swatchHeight - 16);
  });

  // Footer
  ctx.fillStyle = '#444455';
  ctx.font = '12px JetBrains Mono, monospace';
  ctx.fillText('PALETTE ROOM — Color Exploration Studio', 60, height - 30);
  ctx.fillText(new Date().toLocaleDateString(), width - 140, height - 30);

  // Trigger download
  const link = document.createElement('a');
  link.download = `${paletteTitle.toLowerCase().replace(/\s+/g, '-')}-palette.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
