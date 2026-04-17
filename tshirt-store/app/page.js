import Link from 'next/link'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'

export default function HomePage() {
  const featured = products.slice(0, 3)

  return (
    <div>

      {/* HERO */}
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,111,255,0.15) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />

        <p style={{
          color: 'var(--cyan)',
          fontSize: '13px',
          letterSpacing: '0.3em',
          fontWeight: 600,
          marginBottom: '24px',
        }}>DHAKA STREETWEAR — NEW DROP 2026</p>

        <h1 style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 'clamp(64px, 12vw, 160px)',
          lineHeight: '0.9',
          marginBottom: '32px',
          background: 'linear-gradient(135deg, #ffffff 0%, #4F6FFF 50%, #B44FFF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          WEAR THE<br />CULTURE
        </h1>

        <p style={{
          color: 'var(--muted)',
          fontSize: '18px',
          maxWidth: '480px',
          lineHeight: '1.6',
          marginBottom: '40px',
        }}>
          Premium streetwear built for the streets of Dhaka.
          Limited drops. Zero compromises.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/products" style={{
            background: 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
            color: 'white',
            padding: '16px 40px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '14px',
            letterSpacing: '0.1em',
            borderRadius: '4px',
          }}>
            SHOP NOW
          </Link>
          <Link href="/products?category=graphic" style={{
            border: '1px solid var(--border)',
            color: 'var(--text)',
            padding: '16px 40px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '14px',
            letterSpacing: '0.1em',
            borderRadius: '4px',
          }}>
            NEW ARRIVALS
          </Link>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '48px', margin: 0 }}>
            FEATURED DROPS
          </h2>
          <Link href="/products" style={{
            color: 'var(--cyan)',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.1em',
          }}>VIEW ALL →</Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 'clamp(36px, 6vw, 72px)',
          marginBottom: '24px',
          background: 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          STREET. CULTURE. STYLE.
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.7' }}>
          Fabricon is more than clothing. It's a movement born in the streets of Dhaka,
          designed for those who live the culture every day.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {[['100%', 'Cotton'], ['Free', 'Delivery over ৳3000'], ['Easy', 'Returns'], ['Secure', 'bKash & Nagad']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '36px', color: 'var(--cyan)' }}>{val}</div>
              <div style={{ color: 'var(--muted)', fontSize: '13px', letterSpacing: '0.05em' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}