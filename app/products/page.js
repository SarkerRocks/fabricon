'use client'

import { useState } from 'react'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'

const categories = ['all', 'printed', 'solid']
const colors = ['All Colors', 'Black', 'White', 'Navy Blue', 'Brown', 'Red']

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeColor, setActiveColor] = useState('All Colors')

  const filtered = products.filter(p => {
    const matchCategory = activeCategory === 'all' || p.category === activeCategory
    const matchColor = activeColor === 'All Colors' || p.color === activeColor
    return matchCategory && matchColor
  })

  const btnStyle = (active) => ({
    padding: '10px 24px',
    border: '1px solid',
    borderColor: active ? '#4F6FFF' : 'var(--border)',
    background: active ? 'linear-gradient(90deg, #4F6FFF, #B44FFF)' : 'transparent',
    color: 'var(--text)', fontWeight: 700, fontSize: '12px',
    letterSpacing: '0.1em', borderRadius: '4px', cursor: 'pointer', textTransform: 'uppercase',
  })

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ marginBottom: '48px' }}>
        <p style={{ color: 'var(--cyan)', fontSize: '13px', letterSpacing: '0.3em', fontWeight: 600, marginBottom: '12px' }}>THE COLLECTION</p>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 8vw, 96px)', margin: '0 0 24px', lineHeight: '0.9' }}>ALL DROPS</h1>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={btnStyle(activeCategory === cat)}>
              {cat === 'all' ? 'All' : cat === 'printed' ? 'Printed Tees' : 'Solid Tees'}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {colors.map(color => (
            <button key={color} onClick={() => setActiveColor(color)} style={{ ...btnStyle(activeColor === color), padding: '8px 18px', fontSize: '11px' }}>
              {color}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
          <p style={{ fontSize: '48px', marginBottom: '16px' }}>👕</p>
          <p style={{ fontSize: '18px' }}>No products found.</p>
        </div>
      )}
    </div>
  )
}