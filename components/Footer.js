import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      marginTop: '80px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px 32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
      }}>

        {/* Brand */}
        <div>
          <h3 style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '28px',
            background: 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '12px',
          }}>FABRICON</h3>
          <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6' }}>
            Street. Culture. Style.<br />
            Made in Dhaka, worn everywhere.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 style={{ color: 'var(--text)', marginBottom: '16px', fontSize: '13px', letterSpacing: '0.1em' }}>SHOP</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/products" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>All Products</Link>
            <Link href="/products?category=graphic" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>Graphic Tees</Link>
            <Link href="/products?category=blank" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>Blank Tees</Link>
            <Link href="/products?category=logo" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>Logo Tees</Link>
          </div>
        </div>

        {/* Help */}
        <div>
          <h4 style={{ color: 'var(--text)', marginBottom: '16px', fontSize: '13px', letterSpacing: '0.1em' }}>HELP</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/sizing" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>Size Guide</Link>
            <Link href="/shipping" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>Shipping Info</Link>
            <Link href="/returns" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>Returns</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: 'var(--text)', marginBottom: '16px', fontSize: '13px', letterSpacing: '0.1em' }}>CONTACT</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>Dhaka, Bangladesh</p>
            <a href="mailto:hello@fabricon.com.bd" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>hello@fabricon.com.bd</a>
            <a href="https://facebook.com/fabricon.online" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>
  facebook.com/fabricon.online
</a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '16px 24px',
        textAlign: 'center',
        color: 'var(--muted)',
        fontSize: '13px',
      }}>
        © 2026 Fabricon. All rights reserved. | Payments secured by SSLCommerz
      </div>
    </footer>
  )
}