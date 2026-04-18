// Configuration for all products
const GLOBAL_SIZES = ['M', 'L', 'XL'];

export const products = [
  
  // --- 1. BLACK PRINTED DESIGNS (9 items) ---
  ...Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    name: `Black Graphic Tee Vol. ${i + 1}`,
    price: 400, // Updated Price
    category: 'printed',
    colors: ['Black'],
    sizes: GLOBAL_SIZES,
    image: `/products/black-design${i + 1}.png`,
    description: 'Fabricon heavyweight cotton with custom print.',
  })),

  // --- 2. WHITE PRINTED DESIGNS (8 items) ---
  ...Array.from({ length: 8 }, (_, i) => ({
    id: i + 10,
    name: `White Graphic Tee Vol. ${i + 1}`,
    price: 400, // Updated Price
    category: 'printed',
    colors: ['Off White'],
    sizes: GLOBAL_SIZES,
    image: `/products/white-design${i + 1}.png`,
  })),

  // --- 3. RED PRINTED DESIGNS (5 items) ---
  ...Array.from({ length: 5 }, (_, i) => ({
    id: i + 18,
    name: `Red Graphic Tee Vol. ${i + 1}`,
    price: 400, // Updated Price
    category: 'printed',
    colors: ['Red'],
    sizes: GLOBAL_SIZES,
    image: `/products/red-design${i + 1}.png`,
  })),

  // --- 4. NAVY & BROWN PRINTED (3 items) ---
  {
    id: 23,
    name: 'Navy Graphic Tee Vol. 1',
    price: 400, // Updated Price
    category: 'printed',
    colors: ['Navy Blue'],
    sizes: GLOBAL_SIZES,
    image: '/products/navy-blue-design1.png'
  },
  {
    id: 24,
    name: 'Navy Graphic Tee Vol. 2',
    price: 400, // Updated Price
    category: 'printed',
    colors: ['Navy Blue'],
    sizes: GLOBAL_SIZES,
    image: '/products/navy-blue-design2.png'
  },
  {
    id: 25,
    name: 'Brown Graphic Tee Vol. 1',
    price: 400, // Updated Price
    category: 'printed',
    colors: ['Dark Brown'],
    sizes: GLOBAL_SIZES,
    image: '/products/brown-design1.png'
  },

  // --- 5. SOLID ESSENTIALS (5 items) ---
  {
    id: 101,
    name: 'Essential Blank Black',
    price: 250, // Updated Price
    category: 'solid',
    colors: ['Black'],
    sizes: GLOBAL_SIZES,
    image: '/products/solid-black.png',
  },
  {
    id: 102,
    name: 'Essential Blank Off-White',
    price: 250, // Updated Price
    category: 'solid',
    colors: ['Off White'],
    sizes: GLOBAL_SIZES,
    image: '/products/solid-white.png',
  },
  {
    id: 103,
    name: 'Essential Blank Dark Brown',
    price: 250, // Updated Price
    category: 'solid',
    colors: ['Dark Brown'],
    sizes: GLOBAL_SIZES,
    image: '/products/solid-brown.png'
  },
  {
    id: 104,
    name: 'Essential Blank Navy Blue',
    price: 250, // Updated Price
    category: 'solid',
    colors: ['Navy Blue'],
    sizes: GLOBAL_SIZES,
    image: '/products/solid-navy.png'
  },
  {
    id: 105,
    name: 'Essential Blank Red',
    price: 250, // Updated Price
    category: 'solid',
    colors: ['Red'],
    sizes: GLOBAL_SIZES,
    image: '/products/solid-red.png'
  }
];