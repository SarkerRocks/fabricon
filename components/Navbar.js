'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import CartDrawer from './CartDrawer' // 1. Import the new Drawer

export default function Navbar() {
  const { totalItems } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false) // 2. State to control drawer

  return (
    <>
      <nav style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <Image src="/logo.jpg" alt="Fabricon" width={40} height={40} style={{ borderRadius: '6px' }} />
            <span style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '24px',
              letterSpacing: '0.1em',
              background: 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>FABRICON</span>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 600, fontSize: '14px', letterSpacing: '0.05em' }}>HOME</Link>
            <Link href="/products" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 600, fontSize: '14px', letterSpacing: '0.05em' }}>SHOP</Link>
            
            {/* 3. CART Trigger (Changed from Link to a clickable div) */}
            <div 
              onClick={() => setIsCartOpen(true)}
              style={{ 
                color: 'var(--text)', 
                cursor: 'pointer', 
                fontWeight: 600, 
                fontSize: '14px', 
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              CART {totalItems > 0 && (
                <span style={{
                  background: 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 7px',
                  fontSize: '11px',
                  marginLeft: '4px',
                }}>{totalItems}</span>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: '24px', cursor: 'pointer', display: 'none' }}
            className="mobile-menu-btn"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            background: 'var(--surface)',
            borderTop: '1px solid var(--border)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <Link href="/" onClick={() => setMenuOpen(false)} style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 600 }}>HOME</Link>
            <Link href="/products" onClick={() => setMenuOpen(false)} style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 600 }}>SHOP</Link>
            <div 
              onClick={() => {
                setMenuOpen(false);
                setIsCartOpen(true);
              }} 
              style={{ color: 'var(--text)', fontWeight: 600, cursor: 'pointer' }}
            >
              CART {totalItems > 0 && `(${totalItems})`}
            </div>
          </div>
        )}

        <style>{`
          @media (max-width: 640px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-btn { display: block !important; }
          }
        `}</style>
      </nav>

      {/* 4. The Cart Drawer Component */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}