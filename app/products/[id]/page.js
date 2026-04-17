'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { products } from '@/data/products'
import { useCart } from '@/context/CartContext'

export default function ProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const { addToCart } = useCart()

  const [selectedSize, setSelectedSize] = useState(null)
  const [added, setAdded] = useState(false)

  const product = products.find(p => p.id === Number(id))

  function handleAddToCart() {
    if (!selectedSize) {
      alert('Please select a size first!')
      return
    }
    addToCart(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (!product) return (
    <div style={{ textAlign: 'center', padding: '120px 24px', color: 'var(--muted)' }}>
      <p style={{ fontSize: '48px' }}>👕</p>
      <p style={{ fontSize: '24px' }}>Product not found.</p>
    </div>
  )

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '60px',
        alignItems: 'start',
      }}>

        {/* Image */}
        <div style={{
          aspectRatio: '1',
          background: '#1a1a2e',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {product.badge && (
            <span style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
              color: 'white',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              padding: '6px 14px',
              borderRadius: '2px',
              zIndex: 1,
            }}>{product.badge}</span>
          )}
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
            onError={(e) => { e.target.style.display = 'none' }}
          />
        </div>

        {/* Info */}
        <div>
          <p style={{ color: 'var(--cyan)', fontSize: '12px', letterSpacing: '0.3em', fontWeight: 600, marginBottom: '12px' }}>
            {product.category?.toUpperCase()} TEE
          </p>

          <h1 style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(40px, 6vw, 64px)',
            lineHeight: '0.95',
            marginBottom: '16px',
          }}>{product.name}</h1>

          <p style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '40px',
            color: 'var(--cyan)',
            marginBottom: '24px',
          }}>৳{product.price}</p>

          <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7', marginBottom: '32px' }}>
            {product.description}
          </p>

          {/* Colors */}
          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '12px' }}>COLORS</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {product.colors.map(color => (
                <span key={color} style={{
                  border: '1px solid var(--border)',
                  padding: '6px 16px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  color: 'var(--muted)',
                }}>{color}</span>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '12px' }}>SELECT SIZE</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: '52px',
                    height: '52px',
                    border: '1px solid',
                    borderColor: selectedSize === size ? '#4F6FFF' : 'var(--border)',
                    background: selectedSize === size ? 'linear-gradient(90deg, #4F6FFF, #B44FFF)' : 'transparent',
                    color: 'var(--text)',
                    fontWeight: 700,
                    fontSize: '13px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >{size}</button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handleAddToCart}
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '18px 32px',
                background: added ? '#22c55e' : 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
                color: 'white',
                border: 'none',
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '0.1em',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
            >
              {added ? '✓ ADDED TO CART' : 'ADD TO CART'}
            </button>

            <button
              onClick={() => {
                if (!selectedSize) { alert('Please select a size first!'); return }
                addToCart(product, selectedSize)
                router.push('/cart')
              }}
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '18px 32px',
                background: 'transparent',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '0.1em',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              BUY NOW
            </button>
          </div>

          {/* Trust badges */}
          <div style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
          }}>
            {['🔒 Secure Checkout', '🚚 Free delivery over ৳3000', '↩️ Easy returns'].map(badge => (
              <span key={badge} style={{ color: 'var(--muted)', fontSize: '13px' }}>{badge}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}