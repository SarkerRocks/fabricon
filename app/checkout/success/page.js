'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SuccessPage() {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('lastOrder')
    if (saved) {
      setOrder(JSON.parse(saved))
      sessionStorage.removeItem('lastOrder')
    }
  }, [])

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '72px', marginBottom: '24px' }}>🎉</div>
      <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 8vw, 72px)', color: '#22c55e', marginBottom: '12px', lineHeight: '0.9' }}>
        ORDER PLACED!
      </h1>
      <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '40px', lineHeight: '1.6' }}>
        Thank you for shopping with Fabricon. We'll confirm your order shortly via phone.
      </p>

      {order && (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '28px', textAlign: 'left', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', marginBottom: '20px' }}>YOUR ORDER SUMMARY</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {order.cartItems.map(item => (
              <div key={`${item.id}-${item.size}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--muted)' }}>{item.name} ({item.size}) × {item.quantity}</span>
                <span>৳{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '14px' }}>
              <span>Subtotal</span><span>৳{order.totalPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '14px' }}>
              <span>Delivery ({order.location === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
              <span style={{ color: 'var(--cyan)' }}>৳{order.deliveryCharge} (paid)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '16px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
              <span>Cash on Delivery</span>
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', color: 'var(--cyan)' }}>৳{order.totalPrice}</span>
            </div>
          </div>
          <div style={{ background: 'var(--bg)', borderRadius: '6px', padding: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                ['Name', order.form.name],
                ['Phone', order.form.phone],
                ['Address', order.form.address],
                ['City', order.form.city],
                ['TrxID', order.form.trxId],
                ['Sent to', order.form.paymentNumber],
              ].map(([label, value]) => (
                <div key={label}>
                  <div style={{ color: 'var(--muted)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}>{label}</div>
                  <div style={{ color: 'var(--text)', fontSize: '14px', marginTop: '2px' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/products" style={{
          background: 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
          color: 'white', padding: '14px 32px',
          textDecoration: 'none', fontWeight: 700,
          fontSize: '14px', letterSpacing: '0.1em', borderRadius: '4px',
        }}>CONTINUE SHOPPING</Link>
        <a href="https://facebook.com/fabricon.online" target="_blank" rel="noopener noreferrer" style={{
          border: '1px solid var(--border)', color: 'var(--text)',
          padding: '14px 32px', textDecoration: 'none',
          fontWeight: 700, fontSize: '14px', letterSpacing: '0.1em', borderRadius: '4px',
        }}>CONTACT US</a>
      </div>
    </div>
  )
}