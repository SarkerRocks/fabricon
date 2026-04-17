'use client'

import Link from 'next/link'
import Image from 'next/image'


export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'border-color 0.2s, transform 0.2s',
        cursor: 'pointer',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#4F6FFF'
          e.currentTarget.style.transform = 'translateY(-4px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '1', background: '#1a1a2e' }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            onError={(e) => { e.target.style.display = 'none' }}
          />
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
            }}>{product.badge}</span>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '16px' }}>
          <h3 style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '20px',
            color: 'var(--text)',
            margin: '0 0 8px',
            letterSpacing: '0.05em',
          }}>{product.name}</h3>
          <p style={{ color: 'var(--muted)', fontSize: '13px', margin: '0 0 12px' }}>{product.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '22px',
              color: 'var(--cyan)',
            }}>৳{product.price}</span>
            <span style={{
              border: '1px solid var(--border)',
              color: 'var(--muted)',
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: '2px',
              letterSpacing: '0.05em',
            }}>VIEW</span>
          </div>
        </div>
      </div>
    </Link>
  )
}