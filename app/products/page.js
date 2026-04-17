'use client'

import { useState } from 'react'
import { products } from '@/data/products'
import Link from 'next/link'

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  // Filter products based on the active tab
  const filteredProducts = products.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  // Global color map to show swatches on the cards
  const colorMap = {
    'Black': '#171717',
    'Off White': '#FAF9F6',
    'Dark Brown': '#4A3728',
    'Navy Blue': '#1A2942',
    'Red': '#B91C1C'
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
      
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ 
          fontFamily: 'Bebas Neue, sans-serif', 
          fontSize: 'clamp(48px, 8vw, 80px)', 
          lineHeight: '0.9',
          marginBottom: '16px'
        }}>
          {activeCategory === 'all' ? 'ALL ARCHIVES' : 
           activeCategory === 'printed' ? 'GRAPHIC TEES' : 'THE ESSENTIALS'}
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
          Showing {filteredProducts.length} items
        </p>
      </div>

      {/* Category Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '32px', 
        marginBottom: '48px', 
        borderBottom: '1px solid var(--border)', 
        paddingBottom: '16px',
        overflowX: 'auto', // Allows scrolling on small mobile screens
        whiteSpace: 'nowrap'
      }}>
        {['all', 'printed', 'solid'].map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: activeCategory === cat ? 'var(--cyan)' : 'var(--muted)', 
              fontWeight: 700, 
              fontSize: '14px',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              textTransform: 'uppercase',
              position: 'relative',
              padding: '0 0 8px 0'
            }}
          >
            {cat === 'all' ? 'All Designs' : cat}
            {/* Active Tab Underline indicator */}
            {activeCategory === cat && (
              <span style={{
                position: 'absolute',
                bottom: '-17px',
                left: 0,
                width: '100%',
                height: '2px',
                background: 'var(--cyan)'
              }} />
            )}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '40px' 
      }}>
        {filteredProducts.map(product => (
          <Link 
            href={`/products/${product.id}`} 
            key={product.id}
            style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}
          >
            {/* Image Container */}
            <div style={{
              aspectRatio: '4/5', // Taller aspect ratio looks better for apparel
              background: '#1a1a2e',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Product Badge */}
              {product.badge && (
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  padding: '4px 10px',
                  borderRadius: '2px',
                  zIndex: 1,
                }}>{product.badge}</span>
              )}
              
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Fabricon' }}
              />
            </div>

            {/* Product Details */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ 
                  fontFamily: 'Bebas Neue, sans-serif', 
                  fontSize: '24px', 
                  margin: '0 0 4px 0',
                  letterSpacing: '0.05em'
                }}>{product.name}</h2>
                <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0 }}>
                  {product.category.toUpperCase()}
                </p>
              </div>
              <p style={{ 
                fontFamily: 'Bebas Neue, sans-serif', 
                fontSize: '22px', 
                color: 'var(--cyan)', 
                margin: 0 
              }}>৳{product.price}</p>
            </div>

            {/* Mini Color Swatches */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '16px' }}>
              {product.colors?.map(color => (
                <div 
                  key={color} 
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: colorMap[color],
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                  title={color}
                />
              ))}
            </div>
            
          </Link>
        ))}
      </div>

    </div>
  )
}