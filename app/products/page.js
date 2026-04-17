'use client'

import { useState } from 'react'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'

const categories = ['all', 'graphic', 'blank', 'logo']

export default function ProductsPage() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all' ? products : products.filter(p => p.category === active)

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <p style={{ color: 'var(--cyan)', fontSize: '13px', letterSpacing: '0.3em', fontWeight: 600, marginBottom: '12px' }}>
          THE COLLECTION
        </p>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 8vw, 96px)', margin: '0 0 24px', lineHeight: '0.9' }}>
          ALL DROPS
        </h1>

        {/* Filter buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: '10px 24px',
                border: '1px solid',
                borderColor: active === cat ? '#4F6FFF' : 'var(--border)',
                background: active === cat ? 'linear-gradient(90deg, #4F6FFF, #B44FFF)' : 'transparent',
                color: 'var(--text)',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '0.1em',
                borderRadius: '4px',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              {cat === 'all' ? 'All' : cat === 'graphic' ? 'Graphic Tees' : cat === 'blank' ? 'Blank Tees' : 'Logo Tees'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
      }}>
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
          <p style={{ fontSize: '48px', marginBottom: '16px' }}>👕</p>
          <p style={{ fontSize: '18px' }}>No products in this category yet.</p>
        </div>
      )}

    </div>
  )
}