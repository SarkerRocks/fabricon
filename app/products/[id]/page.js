'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { products } from '@/data/products'
import { useCart } from '@/context/CartContext'

export default function ProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const { addToCart } = useCart()

  // State for selections
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [added, setAdded] = useState(false)

  // Find product with safety check
  const product = id ? products.find(p => p.id === Number(id)) : null

  // Map your 5 specific colors to hex codes
  const colorMap = {
    'Black': '#171717',
    'Off White': '#FAF9F6',
    'Dark Brown': '#4A3728',
    'Navy Blue': '#1A2942',
    'Red': '#B91C1C'
  }

  function handleAddToCart() {
    if (!selectedSize || !selectedColor) {
      alert('Please select both Size and Color!')
      return
    }
    // Note: Ensure your CartContext is updated to accept the color parameter
    addToCart(product, selectedSize, selectedColor)
    
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (!product) return (
    <div style={{ textAlign: 'center', padding: '120px 24px', color: 'var(--muted)' }}>
      <p style={{ fontSize: '48px' }}>👕</p>
      <p style={{ fontSize: '24px', fontFamily: 'Bebas Neue, sans-serif' }}>Product not found.</p>
    </div>
  )

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '80px',
        alignItems: 'start',
      }}>

        {/* --- LEFT SIDE: IMAGE --- */}
        <div style={{
          aspectRatio: '4/5',
          background: '#1a1a2e',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {product.badge && (
            <span style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
              color: 'white',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              padding: '6px 16px',
              borderRadius: '2px',
              zIndex: 1,
            }}>{product.badge}</span>
          )}
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800?text=Fabricon+Streetwear' }}
          />
        </div>

        {/* --- RIGHT SIDE: INFO & ACTIONS --- */}
        <div>
          <p style={{ color: 'var(--cyan)', fontSize: '13px', letterSpacing: '0.3em', fontWeight: 600, marginBottom: '16px' }}>
            {product.category?.toUpperCase()} ARCHIVE
          </p>

          <h1 style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(44px, 6vw, 72px)',
            lineHeight: '0.9',
            marginBottom: '20px',
            letterSpacing: '0.02em'
          }}>{product.name}</h1>

          <p style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '44px',
            color: 'var(--text)',
            marginBottom: '32px',
          }}>৳{product.price}</p>

          <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: '1.8', marginBottom: '40px', maxWidth: '500px' }}>
            {product.description}
          </p>

          {/* COLOR SELECTOR (SWATCHES) */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '16px' }}>
              COLOR: <span style={{ color: 'var(--cyan)' }}>{selectedColor || 'SELECT'}</span>
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {product.colors?.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: colorMap[color] || '#ccc',
                    border: selectedColor === color ? '2px solid var(--cyan)' : '2px solid transparent',
                    outline: '1px solid var(--border)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    transform: selectedColor === color ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
              ))}
            </div>
          </div>

          {/* SIZE SELECTOR */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '16px' }}>SELECT SIZE</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {product.sizes?.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: '60px',
                    height: '50px',
                    border: '1px solid',
                    borderColor: selectedSize === size ? 'var(--cyan)' : 'var(--border)',
                    background: selectedSize === size ? 'rgba(79, 111, 255, 0.1)' : 'transparent',
                    color: selectedSize === size ? 'var(--cyan)' : 'var(--text)',
                    fontWeight: 700,
                    fontSize: '14px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={handleAddToCart}
              style={{
                flex: 2,
                minWidth: '240px',
                padding: '20px',
                background: added ? '#22c55e' : 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
                color: 'white',
                border: 'none',
                fontWeight: 800,
                fontSize: '14px',
                letterSpacing: '0.15em',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'transform 0.1s active',
              }}
            >
              {added ? '✓ ADDED TO CART' : 'ADD TO CART'}
            </button>

            <button
              onClick={() => {
                if (!selectedSize || !selectedColor) { alert('Select size & color'); return }
                addToCart(product, selectedSize, selectedColor)
                router.push('/cart')
              }}
              style={{
                flex: 1,
                padding: '20px',
                background: 'transparent',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                fontWeight: 800,
                fontSize: '14px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              BUY NOW
            </button>
          </div>

          {/* TRUST BADGES */}
          <div style={{
            marginTop: '48px',
            paddingTop: '32px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: '32px',
            flexWrap: 'wrap',
          }}>
            {['🔒 SECURE CHECKOUT', '🚚 FREE DHAKA SHIPPING', '↩️ 7-DAY EXCHANGE'].map(badge => (
              <span key={badge} style={{ color: 'var(--muted)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}>{badge}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}