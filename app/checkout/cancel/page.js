import Link from 'next/link'

export default function CancelPage() {
  return (
    <div style={{ textAlign: 'center', padding: '120px 24px' }}>
      <p style={{ fontSize: '64px', marginBottom: '24px' }}>↩️</p>
      <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '56px', marginBottom: '16px' }}>
        ORDER CANCELLED
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '32px' }}>
        You cancelled the payment. Your cart is still saved.
      </p>
      <Link href="/cart" style={{
        background: 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
        color: 'white',
        padding: '16px 40px',
        textDecoration: 'none',
        fontWeight: 700,
        fontSize: '14px',
        letterSpacing: '0.1em',
        borderRadius: '4px',
      }}>BACK TO CART</Link>
    </div>
  )
}