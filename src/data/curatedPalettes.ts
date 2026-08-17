import { Palette } from '../types';

export const CURATED_PALETTES: Palette[] = [
  // CYBERPUNK
  {
    id: 'cyber-01',
    name: 'Neo Shinjuku 2099',
    description: 'High-voltage electric magenta and deep acid cyan cutting through obsidian concrete.',
    category: 'Cyberpunk',
    colors: ['#08080C', '#FF0055', '#05D9E8', '#FFE600', '#1F1A3A'],
    tags: ['Cyberpunk', 'High Contrast', 'Neon', 'Sci-Fi'],
    createdAt: 1700000001,
  },
  {
    id: 'cyber-02',
    name: 'Ghost in Circuit',
    description: 'Ultraviolet glitch glow with synthetic phosphor accents.',
    category: 'Cyberpunk',
    colors: ['#0A0915', '#7928CA', '#FF0080', '#00DFD8', '#F5F5F7'],
    tags: ['Cyberpunk', 'Glitch', 'Futurism', 'Synthetics'],
    createdAt: 1700000002,
  },
  {
    id: 'cyber-03',
    name: 'Matrix Relay',
    description: 'Monochrome terminal slate electrified with phosphor greens and radar amber.',
    category: 'Cyberpunk',
    colors: ['#030907', '#0F2D20', '#10B981', '#34D399', '#A7F3D0'],
    tags: ['Cyberpunk', 'Terminal', 'Matrix', 'Monochrome'],
    createdAt: 1700000003,
  },

  // NEON NOIR
  {
    id: 'neon-noir-01',
    name: 'Neon Noir Detective',
    description: 'Rain-soaked asphalt, flickering tungsten diner signs, and cold police siren reflections.',
    category: 'Neon Noir',
    colors: ['#0B0C10', '#1F2833', '#C5C6C7', '#66FCF1', '#45A29E'],
    tags: ['Neon Noir', 'Experimental', 'Atmospheric', 'Moody'],
    createdAt: 1700000004,
  },
  {
    id: 'neon-noir-02',
    name: 'Midnight Boulevard',
    description: 'Deep violet shadows pierced by searing magenta streetlight beams.',
    category: 'Neon Noir',
    colors: ['#05050A', '#1C0A35', '#570861', '#E01A4F', '#F15946'],
    tags: ['Neon Noir', 'Synthwave', 'Midnight', 'Cinematic'],
    createdAt: 1700000005,
  },

  // DREAMCORE
  {
    id: 'dreamcore-01',
    name: 'Liminal Meadow',
    description: 'Surreal hazy purples, twilight lavender, and uncanny nostalgia warmth.',
    category: 'Dreamcore',
    colors: ['#2B2A4C', '#EA906C', '#EEE4B1', '#B3A492', '#E4DCCF'],
    tags: ['Dreamcore', 'Surreal', 'Liminal', 'Nostalgia'],
    createdAt: 1700000006,
  },
  {
    id: 'dreamcore-02',
    name: 'Ethereal Reverie',
    description: 'Drifting cloud pinks, faded sky cyan, and surrealist daydream luminescence.',
    category: 'Dreamcore',
    colors: ['#171228', '#5E548E', '#9F86C0', '#BE95C4', '#E0B1CB'],
    tags: ['Dreamcore', 'Experimental', 'Ethereal', 'Soft'],
    createdAt: 1700000007,
  },

  // VICTORIAN NIGHT
  {
    id: 'victorian-01',
    name: 'Crimson Parlour',
    description: 'Heavy burgundy damask, tarnished gold fixtures, and deep oil-lamp mahogany.',
    category: 'Victorian Night',
    colors: ['#120B0E', '#3D0C11', '#780016', '#C7923E', '#E8D5B5'],
    tags: ['Victorian Night', 'Gothic', 'Luxury', 'Warm'],
    createdAt: 1700000008,
  },
  {
    id: 'victorian-02',
    name: 'Midnight Séance',
    description: 'Velvet indigo, antique brass, faded parchment, and obsidian lace.',
    category: 'Victorian Night',
    colors: ['#0D0C1D', '#161B33', '#474973', '#A69CAC', '#F1DAC4'],
    tags: ['Victorian Night', 'Mystery', 'Historical', 'Baroque'],
    createdAt: 1700000009,
  },

  // ACID DREAM
  {
    id: 'acid-01',
    name: 'Acid Dream Voltage',
    description: 'Intense fluorescent lime, hyper-saturated ultraviolet, and electric hyper-yellow.',
    category: 'Acid Dream',
    colors: ['#0F051D', '#7B2CBF', '#FF007F', '#CCFF00', '#00F0FF'],
    tags: ['Acid Dream', 'Experimental', 'High Energy', 'Rave'],
    createdAt: 1700000010,
  },
  {
    id: 'acid-02',
    name: 'Toxic Sorbet',
    description: 'Clashing radioactive chartreuse against molten tangerine and ozone lilac.',
    category: 'Acid Dream',
    colors: ['#08040C', '#240046', '#9D4EDD', '#FF9E00', '#70E000'],
    tags: ['Acid Dream', 'Psychedelic', 'Bold', 'Contrast'],
    createdAt: 1700000011,
  },

  // GOTHIC
  {
    id: 'gothic-01',
    name: 'Cathedral Eclipse',
    description: 'Granite gargoyles, ironwork shadows, and deep dried-blood accents.',
    category: 'Gothic',
    colors: ['#050505', '#1A181B', '#3E2723', '#6A040F', '#9D0208'],
    tags: ['Gothic', 'Dark', 'Macabre', 'Minimal'],
    createdAt: 1700000012,
  },
  {
    id: 'gothic-02',
    name: 'Black Velvet & Silver',
    description: 'Cold metallic silver tones framed by deep nocturnal charcoal.',
    category: 'Gothic',
    colors: ['#0B0B0E', '#1A1B22', '#34384B', '#7A829E', '#E0E2EC'],
    tags: ['Gothic', 'Monochrome', 'Metallic', 'Sleek'],
    createdAt: 1700000013,
  },

  // Y2K
  {
    id: 'y2k-01',
    name: 'Millennium Cyber Gloss',
    description: 'Bubblegum chromatic pink, iridescent silver, and metallic translucent cyan.',
    category: 'Y2K',
    colors: ['#0E0B16', '#FF6B97', '#A06CD5', '#6247AA', '#00FFF0'],
    tags: ['Y2K', 'Retro Futurism', 'Glossy', 'Pop'],
    createdAt: 1700000014,
  },
  {
    id: 'y2k-02',
    name: 'Frosted MP3 Player',
    description: 'Translucent plastic lime, icy blue, and early 2000s chrome.',
    category: 'Y2K',
    colors: ['#121820', '#48CAE4', '#90E0EF', '#B5E48C', '#F72585'],
    tags: ['Y2K', 'Nostalgic', 'Digital', 'Vibrant'],
    createdAt: 1700000015,
  },

  // KAWAII
  {
    id: 'kawaii-01',
    name: 'Neo Tokyo Arcade',
    description: 'Sweet strawberry milk, pastel mint frosting, and soft mochi highlights.',
    category: 'Kawaii',
    colors: ['#1A1423', '#FF99C8', '#FCF6BD', '#D0F4DE', '#A9DEF9'],
    tags: ['Kawaii', 'Pastel', 'Playful', 'Soft'],
    createdAt: 1700000016,
  },
  {
    id: 'kawaii-02',
    name: 'Sakura Cloud Confection',
    description: 'Blossom pinks and confectionery lavenders layered over rich dark plum.',
    category: 'Kawaii',
    colors: ['#231942', '#5E548E', '#9F86C0', '#F7CAD0', '#FF85A1'],
    tags: ['Kawaii', 'Sweet', 'Floral', 'Japanese'],
    createdAt: 1700000017,
  },

  // PASTEL
  {
    id: 'pastel-01',
    name: 'Nordic Morning Mist',
    description: 'Chilled eucalyptus, pale sage, dusty quartz, and chalk ceramic.',
    category: 'Pastel',
    colors: ['#191D24', '#A8DADC', '#E29578', '#FFDDD2', '#83C5BE'],
    tags: ['Pastel', 'Minimalist', 'Calm', 'Interior'],
    createdAt: 1700000018,
  },
  {
    id: 'pastel-02',
    name: 'Sunset Gelato',
    description: 'Creamy pistachio, blood orange foam, and whipped lilac marshmallow.',
    category: 'Pastel',
    colors: ['#16161A', '#F6BD60', '#F7EDE2', '#F5CAC3', '#84A59D'],
    tags: ['Pastel', 'Warm', 'Soft UI', 'Organic'],
    createdAt: 1700000019,
  },

  // MIDNIGHT
  {
    id: 'midnight-01',
    name: 'Deep Oceanic Trench',
    description: 'Bioluminescent deep-sea cyans hovering in pitch-black saltwater depths.',
    category: 'Midnight',
    colors: ['#03071E', '#0A1128', '#001F54', '#034078', '#1282A2'],
    tags: ['Midnight', 'Deep', 'Underwater', 'Tech'],
    createdAt: 1700000020,
  },
  {
    id: 'midnight-02',
    name: 'Northern Aurora 3AM',
    description: 'Emerald cosmic curtain stretching over frozen dark arctic tundra.',
    category: 'Midnight',
    colors: ['#050811', '#0B1D28', '#10393B', '#1D7874', '#6EE7B7'],
    tags: ['Midnight', 'Nature', 'Aurora', 'Celestial'],
    createdAt: 1700000021,
  },

  // NATURE
  {
    id: 'nature-01',
    name: 'Kyoto Moss Garden',
    description: 'Ancient rain-drenched cedar, velvet moss stones, and bamboo shoots.',
    category: 'Nature',
    colors: ['#0B130E', '#1B4332', '#2D6A4F', '#52B788', '#D8F3DC'],
    tags: ['Nature', 'Organic', 'Earthy', 'Zen'],
    createdAt: 1700000022,
  },
  {
    id: 'nature-02',
    name: 'Sonoran Desert Dusk',
    description: 'Terracotta canyons, baked clay, agave green, and desert sunset gold.',
    category: 'Nature',
    colors: ['#1C1412', '#7F4F24', '#936639', '#A68A56', '#DDB892'],
    tags: ['Nature', 'Desert', 'Warm Earth', 'Botanical'],
    createdAt: 1700000023,
  },

  // BRUTALIST & EDITORIAL
  {
    id: 'brutalist-01',
    name: 'Swiss Raw Concrete',
    description: 'Pure stark monochrome contrasted with razor-sharp international signal orange.',
    category: 'Brutalist',
    colors: ['#0A0A0C', '#222226', '#E63946', '#8D99AE', '#F8F9FA'],
    tags: ['Brutalist', 'Typography', 'Architecture', 'Sharp'],
    createdAt: 1700000024,
  },
  {
    id: 'editorial-01',
    name: 'High Fashion Monochrome',
    description: 'Subtle warm slate, alabaster cream, and rich espresso editorial tones.',
    category: 'Editorial',
    colors: ['#111111', '#2C2B2A', '#6B6864', '#B8B3AD', '#F5F2EB'],
    tags: ['Editorial', 'Luxury', 'Minimal', 'Sophisticated'],
    createdAt: 1700000025,
  },
  {
    id: 'bauhaus-01',
    name: 'Weimar Primary Studio',
    description: 'Pure geometric primaries balanced for modern dark software interfaces.',
    category: 'Bauhaus',
    colors: ['#0E0E12', '#22577A', '#38A3A5', '#57CC99', '#80ED99'],
    tags: ['Bauhaus', 'Design Theory', 'Geometric', 'Clean'],
    createdAt: 1700000026,
  },
];
