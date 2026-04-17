'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart()
  const router = useRouter()

  if (cartItems.length === 0) return (
    <div style={{ textAlign: 'center', padding: '120px 24px' }}>
      <p style={{ fontSize: '64px', marginBottom: '24px' }}>🛒</p>
      <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '48px', marginBottom: '16px' }}>YOUR CART IS EMPTY</h2>
      <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Looks like you haven't added anything yet.</p>
      <Link href="/products" style={{
        background: 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
        color: 'white',
        padding: '16px 40px',
        textDecoration: 'none',
        fontWeight: 700,
        fontSize: '14px',
        letterSpacing: '0.1em',
        borderRadius: '4px',
      }}>SHOP NOW</Link>
    </div>
  )

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>

      <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 8vw, 80px)', marginBottom: '48px', lineHeight: '0.9' }}>
        YOUR CART <span style={{ color: 'var(--muted)', fontSize: '40px' }}>({totalItems})</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr min(360px, 100%)', gap: '40px', alignItems: 'start' }}>

        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cartItems.map(item => (
            <div key={`${item.id}-${item.size}`} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '20px',
              display: 'grid',
              gridTemplateColumns: '80px 1fr auto',
              gap: '20px',
              alignItems: 'center',
            }}>

{/* Product Image */}
<div style={{
  width: '80px',
  height: '80px',
  background: '#1a1a2e',
  borderRadius: '6px',
  border: '1px solid var(--border)',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}}>
  <img 
    src={item.image} 
    alt={item.name} 
    style={{ 
      width: '100%', 
      height: '100%', 
      objectFit: 'cover' // This ensures the T-shirt fills the square nicely
    }} 
    onError={(e) => { e.target.src = 'https://via.placeholder.com/80?text=Shirt' }}
  />
</div>

              {/* Details */}
              <div>
                <h3 style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '20px',
                  margin: '0 0 4px',
                }}>{item.name}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', margin: '0 0 12px' }}>
                  Size: {item.size}
                </p>

                {/* Quantity */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                    style={{
                      width: '32px', height: '32px',
                      background: 'var(--border)',
                      border: 'none', borderRadius: '4px',
                      color: 'var(--text)', fontSize: '18px',
                      cursor: 'pointer', fontWeight: 700,
                    }}>−</button>
                  <span style={{ fontWeight: 700, fontSize: '16px', minWidth: '20px', textAlign: 'center' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                    style={{
                      width: '32px', height: '32px',
                      background: 'var(--border)',
                      border: 'none', borderRadius: '4px',
                      color: 'var(--text)', fontSize: '18px',
                      cursor: 'pointer', fontWeight: 700,
                    }}>+</button>
                </div>
              </div>

              {/* Price + Remove */}
              <div style={{ textAlign: 'right' }}>
                <p style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '24px',
                  color: 'var(--cyan)',
                  margin: '0 0 8px',
                }}>৳{item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  style={{
                    background: 'none', border: 'none',
                    color: 'var(--muted)', fontSize: '12px',
                    cursor: 'pointer', letterSpacing: '0.05em',
                  }}>REMOVE</button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '28px',
          position: 'sticky',
          top: '80px',
        }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', marginBottom: '24px' }}>
            ORDER SUMMARY
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '14px' }}>
              <span>Subtotal ({totalItems} items)</span>
              <span>৳{totalPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '14px' }}>
              <span>Delivery</span>
              <span style={{ color: totalPrice >= 3000 ? '#22c55e' : 'var(--muted)' }}>
                {totalPrice >= 3000 ? 'FREE' : '৳80'}
              </span>
            </div>
            {totalPrice < 3000 && (
              <p style={{ color: 'var(--cyan)', fontSize: '12px' }}>
                Add ৳{3000 - totalPrice} more for free delivery!
              </p>
            )}
          </div>

          <div style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}>
            <span style={{ fontWeight: 700, fontSize: '16px' }}>TOTAL</span>
            <span style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '28px',
              color: 'var(--cyan)',
            }}>৳{totalPrice >= 3000 ? totalPrice : totalPrice + 80}</span>
          </div>

          <button
            onClick={() => router.push('/checkout')}
            style={{
              width: '100%',
              padding: '18px',
              background: 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
              color: 'white',
              border: 'none',
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '0.1em',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '12px',
            }}
          >PROCEED TO CHECKOUT</button>

          <Link href="/products" style={{
            display: 'block',
            textAlign: 'center',
            color: 'var(--muted)',
            fontSize: '13px',
            textDecoration: 'none',
          }}>← Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}