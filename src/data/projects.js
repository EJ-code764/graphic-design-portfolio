// Add or remove objects in this array to update the gallery.
// One card = one project; each project can have MULTIPLE images.
// DEMO examples below are fictional: replace them with your own designs.
// Image paths are relative to public/, e.g. '/projects/my-project/cover.webp'.
export const projects = [

  {
    id: 'medical-training-promo-01',
    title: 'Medical Training Promotional Poster',
    category: 'Promotional Design',
    year: '2026',
    summary: 'Promotional poster showcasing medical training courses with organized layouts, clear typography, and engaging visuals.',
    cover: '/projects/5.png',
    images: [
      '/projects/5.png', '/projects/6.png'
    ],
    featured: true,
    demo: false,
    beforeAfter: null,
  },

  {
    id: 'pastors-appreciation-01',
    title: "Pastor's Appreciation Sticker",
    category: 'Sticker Design',
    year: '2026',
    summary: 'A floral-themed appreciation sticker featuring elegant typography and soft purple tones to honor pastors.',
    cover: '/projects/Sticker01.png',
    images: [
      '/projects/Sticker01.png'
    ],
    featured: true,
    demo: false,
    beforeAfter: null,
  },

  {
    id: 'coffee-campaign', title: 'Coffee House Campaign', category: 'Social Media', year: '2026',
    summary: 'A cohesive promotional set for a coffee brand.',
    cover: '/projects/coffee1.png',
    images: ['/projects/coffee1.png', '/projects/coffee2.png', '/projects/matcha1.png'],
    featured: true, demo: true,
    // Optional before-and-after image pair. Omit or set to null if not needed.
    beforeAfter: null,
  },
  {
    id: 'solis-branding', title: 'Solis Brand Identity', category: 'Branding', year: '2026',
    summary: 'A simple, modern visual identity concept.',
    cover: '/projects/solis-brand.svg',
    images: ['/projects/solis-brand.svg', '/projects/solis-stationery.svg'],
    featured: true, demo: true, beforeAfter: null,
  },
  {
    id: 'creative-festival', title: 'Creative Festival Poster', category: 'Posters', year: '2026',
    summary: 'Bold type and energetic color for an event.',
    cover: '/projects/festival-poster.svg',
    images: ['/projects/festival-poster.svg'],
    featured: false, demo: true,
    beforeAfter: { before: '/projects/festival-before.svg', after: '/projects/festival-poster.svg' },
  },
  {
    id: 'pitch-deck', title: 'Pitch Deck Concepts', category: 'Presentations', year: '2026',
    summary: 'Clarity-first slides for a modern business.',
    cover: '/projects/pitch-slide.svg',
    images: ['/projects/pitch-slide.svg', '/projects/pitch-slide-2.svg'],
    featured: false, demo: true, beforeAfter: null,
  },
  {
    id: 'glow-launch', title: 'Glow Product Launch', category: 'Social Media', year: '2026',
    summary: 'Minimal visuals for a product introduction.',
    cover: '/projects/glow-poster.svg',
    images: ['/projects/glow-poster.svg'],
    featured: false, demo: true, beforeAfter: null,
  },
  {
    id: 'type-study', title: 'Typography Exploration', category: 'Posters', year: '2026',
    summary: 'An editorial poster focused on hierarchy.',
    cover: '/projects/type-poster.svg',
    images: ['/projects/type-poster.svg'],
    featured: false, demo: true, beforeAfter: null,
  },
];
