'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function SuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div style={{ textAlign: 'center', padding: '120px 24px' }}>
      <p style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</p>
      <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '56px', marginBottom: '16px', color: '#22c55e' }}>
        ORDER CONFIRMED!
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
        Thanks for shopping with Fabricon. You'll receive a confirmation shortly.
      </p>
      <Link href="/products" style={{
        background: 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
        color: 'white',
        padding: '16px 40px',
        textDecoration: 'none',
        fontWeight: 700,
        fontSize: '14px',
        letterSpacing: '0.1em',
        borderRadius: '4px',
      }}>KEEP SHOPPING</Link>
    </div>
  )
}
