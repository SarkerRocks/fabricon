'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const deliveryCharge = totalPrice >= 3000 ? 0 : 80

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: 'Dhaka',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (cartItems.length === 0) {
    router.push('/cart')
    return null
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleCheckout() {
    if (!form.name || !form.email || !form.phone || !form.address) {
      setError('Please fill in all fields.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/payment/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems,
          totalPrice,
          deliveryCharge,
          customerInfo: form,
        }),
      })
      const data = await res.json()
      if (data.url) {
        clearCart()
        window.location.href = data.url
      } else {
        setError('Payment failed to initialize. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    color: 'var(--text)',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    marginBottom: '8px',
    color: 'var(--muted)',
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
      <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 8vw, 80px)', marginBottom: '48px', lineHeight: '0.9' }}>
        CHECKOUT
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr min(400px, 100%)', gap: '40px', alignItems: 'start' }}>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '28px',
          }}>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', marginBottom: '24px' }}>
              DELIVERY INFORMATION
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>FULL NAME</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>EMAIL</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>PHONE NUMBER</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="01XXXXXXXXX" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>DELIVERY ADDRESS</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="House, Road, Area" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>CITY</label>
                <select name="city" value={form.city} onChange={handleChange} style={inputStyle}>
                  {['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Mymensingh', 'Rangpur'].map(city => (
                    <option key={city} value={city} style={{ background: 'var(--bg)' }}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {error && (
            <p style={{ color: '#ef4444', fontSize: '14px', padding: '12px 16px', background: 'rgba(239,68,68,0.1)', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.3)' }}>
              {error}
            </p>
          )}
        </div>

        {/* Summary */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '28px',
          position: 'sticky',
          top: '80px',
        }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', marginBottom: '24px' }}>
            ORDER SUMMARY
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {cartItems.map(item => (
              <div key={`${item.id}-${item.size}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--muted)' }}>{item.name} ({item.size}) × {item.quantity}</span>
                <span>৳{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '14px' }}>
              <span>Subtotal</span><span>৳{totalPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '14px' }}>
              <span>Delivery</span>
              <span style={{ color: deliveryCharge === 0 ? '#22c55e' : 'var(--text)' }}>
                {deliveryCharge === 0 ? 'FREE' : `৳${deliveryCharge}`}
              </span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', marginBottom: '28px' }}>
            <span style={{ fontWeight: 700 }}>TOTAL</span>
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: 'var(--cyan)' }}>
              ৳{totalPrice + deliveryCharge}
            </span>
          </div>

          {/* Payment methods */}
          <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '10px' }}>
              ACCEPTED PAYMENTS
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['bKash', 'Nagad', 'Rocket', 'VISA', 'Mastercard'].map(method => (
                <span key={method} style={{
                  padding: '4px 10px',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--muted)',
                }}>{method}</span>
              ))}
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            style={{
              width: '100%',
              padding: '18px',
              background: loading ? 'var(--border)' : 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
              color: 'white',
              border: 'none',
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '0.1em',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'REDIRECTING TO PAYMENT...' : 'PAY NOW →'}
          </button>

          <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '12px', marginTop: '12px' }}>
            🔒 Secured by SSLCommerz
          </p>
        </div>
      </div>
    </div>
  )
}