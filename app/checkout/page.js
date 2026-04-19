'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

const PAYMENT_NUMBERS = [
  { number: '01868714617', label: 'Number 1' },
  { number: '01758911597', label: 'Number 2' },
]

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart()
  const router = useRouter()

  const [location, setLocation] = useState('inside')
  const deliveryCharge = location === 'inside' ? 70 : 130
  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', city: 'Dhaka', trxId: '', paymentNumber: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) router.push('/cart')
  }, [cartItems, router, orderPlaced])

  if (cartItems.length === 0 && !orderPlaced) return null

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handlePlaceOrder() {
    if (!form.name || !form.phone || !form.address || !form.trxId || !form.paymentNumber) {
      setError('Please fill in all required fields including the Transaction ID and which number you sent to.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form, cartItems, totalPrice, deliveryCharge, location,
          grandTotal: totalPrice + deliveryCharge,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setOrderPlaced(true)
        clearCart()
        sessionStorage.setItem('lastOrder', JSON.stringify({
          form, cartItems, totalPrice, deliveryCharge,
          grandTotal: totalPrice + deliveryCharge, location,
        }))
        router.push('/checkout/success')
      } else {
        setError('Something went wrong. Please try again or contact us on Facebook.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: 'var(--bg)', border: '1px solid var(--border)',
    borderRadius: '4px', color: 'var(--text)', fontSize: '15px',
    outline: 'none', boxSizing: 'border-box',
  }

  const labelStyle = {
    display: 'block', fontSize: '12px', fontWeight: 700,
    letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--muted)',
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
      <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 8vw, 80px)', marginBottom: '8px', lineHeight: '0.9' }}>
        CHECKOUT
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: '48px', fontSize: '14px' }}>
        Cash on Delivery available — delivery charge paid upfront via bKash/Nagad.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* STEP 1 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px' }}>
            <p style={{ color: 'var(--cyan)', fontSize: '11px', letterSpacing: '0.2em', fontWeight: 700, marginBottom: '8px' }}>STEP 1</p>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', marginBottom: '16px' }}>SELECT YOUR LOCATION</h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[['inside', 'Inside Dhaka', '৳70'], ['outside', 'Outside Dhaka', '৳130']].map(([val, label, charge]) => (
                <button key={val} onClick={() => setLocation(val)} style={{
                  flex: 1, padding: '16px', border: '2px solid',
                  borderColor: location === val ? '#4F6FFF' : 'var(--border)',
                  background: location === val ? 'rgba(79,111,255,0.1)' : 'transparent',
                  color: 'var(--text)', borderRadius: '6px', cursor: 'pointer', textAlign: 'center',
                }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{label}</div>
                  <div style={{ color: 'var(--cyan)', fontSize: '22px', fontFamily: 'Bebas Neue, sans-serif' }}>{charge}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '11px' }}>delivery charge</div>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2 */}
          <div style={{ background: 'rgba(79,111,255,0.06)', border: '1px solid rgba(79,111,255,0.25)', borderRadius: '8px', padding: '24px' }}>
            <p style={{ color: 'var(--cyan)', fontSize: '11px', letterSpacing: '0.2em', fontWeight: 700, marginBottom: '8px' }}>STEP 2</p>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', marginBottom: '12px' }}>PAY DELIVERY CHARGE UPFRONT</h2>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>
              Send <strong style={{ color: 'var(--text)' }}>৳{deliveryCharge}</strong> to either number below via <strong style={{ color: 'var(--text)' }}>bKash or Nagad</strong> (Send Money). Product price is paid cash on delivery.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {PAYMENT_NUMBERS.map(({ number, label }) => (
                <div key={number} style={{ background: 'var(--surface)', padding: '14px 18px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ color: 'var(--muted)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '2px' }}>bKash / Nagad — {label}</div>
                    <div style={{ color: 'var(--text)', fontWeight: 700, fontSize: '18px', letterSpacing: '0.05em' }}>{number}</div>
                  </div>
                  <button onClick={() => navigator.clipboard.writeText(number)} style={{ background: 'var(--border)', border: 'none', color: 'var(--muted)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}>COPY</button>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>WHICH NUMBER DID YOU SEND TO? *</label>
              <select name="paymentNumber" value={form.paymentNumber} onChange={handleChange} style={inputStyle}>
                <option value="" style={{ background: 'var(--bg)' }}>— Select —</option>
                {PAYMENT_NUMBERS.map(({ number, label }) => (
                  <option key={number} value={number} style={{ background: 'var(--bg)' }}>{label} — {number}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>TRANSACTION ID (TrxID) *</label>
              <input name="trxId" value={form.trxId} onChange={handleChange} placeholder="e.g. 8FG3K2H1J9" style={{ ...inputStyle, border: '1px solid rgba(79,111,255,0.4)' }} />
              <p style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '6px' }}>Find this in your bKash/Nagad SMS after sending.</p>
            </div>
          </div>

          {/* STEP 3 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px' }}>
            <p style={{ color: 'var(--cyan)', fontSize: '11px', letterSpacing: '0.2em', fontWeight: 700, marginBottom: '8px' }}>STEP 3</p>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', marginBottom: '20px' }}>YOUR DELIVERY DETAILS</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>FULL NAME *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>PHONE NUMBER *</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="01XXXXXXXXX" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>EMAIL (optional)</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>FULL DELIVERY ADDRESS *</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="House no, Road, Area" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>CITY / DISTRICT</label>
                <select name="city" value={form.city} onChange={handleChange} style={inputStyle}>
                  {['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Mymensingh', 'Rangpur', 'Comilla', 'Narayanganj', 'Gazipur', 'Bogura', 'Jessore'].map(city => (
                    <option key={city} value={city} style={{ background: 'var(--bg)' }}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0 }}>
              💳 <strong style={{ color: 'var(--text)' }}>Card Payment Coming Soon</strong> — We're working on it!
            </p>
          </div>

          {error && (
            <p style={{ color: '#ef4444', fontSize: '14px', padding: '12px 16px', background: 'rgba(239,68,68,0.1)', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.3)' }}>
              ⚠️ {error}
            </p>
          )}
        </div>

        {/* RIGHT — Summary */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '28px', position: 'sticky', top: '80px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', marginBottom: '24px' }}>ORDER SUMMARY</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {cartItems.map(item => (
              <div key={`${item.id}-${item.size}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', gap: '12px' }}>
                <span style={{ color: 'var(--muted)' }}>{item.name} ({item.size}) × {item.quantity}</span>
                <span style={{ whiteSpace: 'nowrap' }}>৳{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '14px' }}>
              <span>Subtotal</span><span>৳{totalPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: 'var(--muted)' }}>Delivery ({location === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
              <span style={{ color: 'var(--cyan)' }}>৳{deliveryCharge} (paid via bKash/Nagad)</span>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700 }}>PAY ON DELIVERY</span>
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '32px', color: 'var(--cyan)' }}>৳{totalPrice}</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '12px', margin: '0 0 24px' }}>Delivery charge ৳{deliveryCharge} already paid upfront</p>
          </div>
          <button onClick={handlePlaceOrder} disabled={loading} style={{
            width: '100%', padding: '18px',
            background: loading ? 'var(--border)' : 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
            color: 'white', border: 'none', fontWeight: 700, fontSize: '15px',
            letterSpacing: '0.1em', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer',
          }}>
            {loading ? 'PLACING ORDER...' : 'PLACE ORDER →'}
          </button>
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <p style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '6px' }}>Need help? Contact us on</p>
            <a href="https://facebook.com/fabricon.online" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyan)', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
              facebook.com/fabricon.online
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}