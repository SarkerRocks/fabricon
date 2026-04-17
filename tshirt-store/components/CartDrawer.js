'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop / Overlay */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
        }}
      />

      {/* Drawer Panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100%',
        width: 'min(400px, 100%)',
        backgroundColor: 'var(--surface)',
        borderLeft: '1px solid var(--border)',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideIn 0.3s ease-out',
      }}>
        
        {/* Header */}
        <div style={{ 
          padding: '24px', 
          borderBottom: '1px solid var(--border)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', margin: 0 }}>YOUR CART</h2>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: '24px', cursor: 'pointer' }}
          >✕</button>
        </div>

        {/* Scrollable Items Section */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <p style={{ color: 'var(--muted)' }}>Your cart is empty.</p>
              <button 
                onClick={onClose}
                style={{ color: 'var(--cyan)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              >Start Shopping →</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '70px', height: '70px', backgroundColor: '#1a1a2e', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '24px' }}>👕</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 600 }}>{item.name}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 8px' }}>Size: {item.size}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} style={qtyBtnStyle}>-</button>
                      <span style={{ fontSize: '14px', fontWeight: 700 }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} style={qtyBtnStyle}>+</button>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 700, fontSize: '14px' }}>৳{item.price * item.quantity}</p>
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      style={{ background: 'none', border: 'none', color: '#ff4f4f', fontSize: '11px', cursor: 'pointer', padding: 0 }}
                    >REMOVE</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {cartItems.length > 0 && (
          <div style={{ padding: '24px', borderTop: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ color: 'var(--muted)' }}>Subtotal</span>
              <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--cyan)' }}>৳{totalPrice}</span>
            </div>
            <Link 
              href="/checkout" 
              onClick={onClose}
              style={{
                display: 'block',
                textAlign: 'center',
                background: 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
                color: 'white',
                padding: '16px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 700,
                letterSpacing: '0.1em'
              }}
            >
              CHECKOUT NOW
            </Link>
          </div>
        )}

        <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>
      </div>
    </>
  )
}

const qtyBtnStyle = {
  width: '24px',
  height: '24px',
  background: 'var(--border)',
  border: 'none',
  borderRadius: '4px',
  color: 'var(--text)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold'
}