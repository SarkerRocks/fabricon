// Configuration for all products
const GLOBAL_SIZES = ['M', 'L', 'XL'];

export const products = [
  
  // --- 1. BLACK PRINTED DESIGNS (9 items) ---
  ...Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    name: `Black Graphic Tee Vol. ${i + 1}`,
    price: 400,
    category: 'printed',
    colors: ['Black'],
    sizes: GLOBAL_SIZES,
    image: `/products/black-design${i + 1}.png`,
    description: 'Fabricon heavyweight 240GSM cotton with custom high-density print.',
    badge: i === 0 ? 'NEW DROP' : null
  })),

  // --- 2. WHITE PRINTED DESIGNS (8 items) ---
  ...Array.from({ length: 8 }, (_, i) => ({
    id: i + 10, // Starts ID from 10
    name: `White Graphic Tee Vol. ${i + 1}`,
    price: 400,
    category: 'printed',
    colors: ['Off White'],
    sizes: GLOBAL_SIZES,
    image: `/products/white-design${i + 1}.png`,
    description: 'Signature off-white base with durable graphic application.',
  })),

  // --- 3. RED PRINTED DESIGNS (5 items) ---
  ...Array.from({ length: 5 }, (_, i) => ({
    id: i + 18, // Starts ID from 18
    name: `Red Graphic Tee Vol. ${i + 1}`,
    price: 400,
    category: 'printed',
    colors: ['Red'],
    sizes: GLOBAL_SIZES,
    image: `/products/red-design${i + 1}.png`,
    description: 'Vibrant crimson wash with custom streetwear graphics.',
  })),

  // --- 4. NAVY & BROWN PRINTED (3 items) ---
  {
    id: 23,
    name: 'Navy Graphic Tee Vol. 1',
    price: 400,
    category: 'printed',
    colors: ['Navy Blue'],
    sizes: GLOBAL_SIZES,
    image: '/products/navy-blue-design1.png'
  },
  {
    id: 24,
    name: 'Navy Graphic Tee Vol. 2',
    price: 400,
    category: 'printed',
    colors: ['Navy Blue'],
    sizes: GLOBAL_SIZES,
    image: '/products/navy-blue-design2.png'
  },
  {
    id: 25,
    name: 'Brown Graphic Tee Vol. 1',
    price: 400,
    category: 'printed',
    colors: ['Dark Brown'],
    sizes: GLOBAL_SIZES,
    image: '/products/brown-design1.png'
  },

  // --- 5. SOLID ESSENTIALS (5 items) ---
  // These use the specific 'solid' category for your shop filter
  {
    id: 101,
    name: 'Essential Blank Black',
    price: 250,
    category: 'solid',
    colors: ['Black'],
    sizes: GLOBAL_SIZES,
    image: '/products/solid-black.png',
    description: 'The foundation of any wardrobe. 100% Cotton blank.',
    badge: 'STAPLE'
  },
  {
    id: 102,
    name: 'Essential Blank Off-White',
    price: 250,
    category: 'solid',
    colors: ['Off White'],
    sizes: GLOBAL_SIZES,
    image: '/products/solid-white.png',
    badge: 'STAPLE'
  },
  {
    id: 103,
    name: 'Essential Blank Dark Brown',
    price: 250,
    category: 'solid',
    colors: ['Dark Brown'],
    sizes: GLOBAL_SIZES,
    image: '/products/solid-brown.png'
  },
  {
    id: 104,
    name: 'Essential Blank Navy Blue',
    price: 250,
    category: 'solid',
    colors: ['Navy Blue'],
    sizes: GLOBAL_SIZES,
    image: '/products/solid-navy.png'
  },
  {
    id: 105,
    name: 'Essential Blank Red',
    price: 250,
    category: 'solid',
    colors: ['Red'],
    sizes: GLOBAL_SIZES,
    image: '/products/solid-red.png'
  }
];