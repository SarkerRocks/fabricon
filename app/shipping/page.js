import Link from 'next/link'

export const metadata = {
  title: 'Shipping Info — Fabricon',
  description: 'Delivery times and rates for Fabricon orders in Bangladesh. Free shipping over ৳3000.',
}

const section = { marginBottom: '32px' }
const h2 = {
  fontFamily: 'Bebas Neue, sans-serif',
  fontSize: 'clamp(28px, 4vw, 36px)',
  letterSpacing: '0.06em',
  marginBottom: '12px',
  color: 'var(--text)',
}
const p = {
  color: 'var(--muted)',
  fontSize: '15px',
  lineHeight: 1.7,
  margin: '0 0 12px',
}
const card = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '12px',
}

export default function ShippingPage() {
  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px 80px' }}>
      <p style={{ color: 'var(--muted)', fontSize: '13px', letterSpacing: '0.12em', marginBottom: '8px' }}>HELP</p>
      <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(44px, 7vw, 64px)', lineHeight: 1, marginBottom: '16px' }}>
        SHIPPING INFO
      </h1>
      <p style={{ ...p, marginBottom: '40px' }}>
        We ship from Dhaka across Bangladesh. Orders are packed within <strong style={{ color: 'var(--text)' }}>1–2 business days</strong> after payment confirmation (SSLCommerz, including bKash and Nagad where enabled).
      </p>

      <section style={section}>
        <h2 style={h2}>RATES &amp; FREE SHIPPING</h2>
        <div style={card}>
          <p style={{ ...p, margin: 0, color: 'var(--text)', fontWeight: 600, marginBottom: '8px' }}>Orders ৳3,000 and above</p>
          <p style={{ ...p, margin: 0 }}>Free standard delivery to Dhaka metro. Other zones: subsidised flat rate shown at checkout (typically ৳60–৳120 depending on courier zone).</p>
        </div>
        <div style={card}>
          <p style={{ ...p, margin: 0, color: 'var(--text)', fontWeight: 600, marginBottom: '8px' }}>Orders under ৳3,000</p>
          <p style={{ ...p, margin: 0 }}>Dhaka metro from <strong style={{ color: 'var(--text)' }}>৳50</strong>. Outside Dhaka from <strong style={{ color: 'var(--text)' }}>৳80</strong> (final amount confirmed at checkout).</p>
        </div>
      </section>

      <section style={section}>
        <h2 style={h2}>DELIVERY TIME</h2>
        <ul style={{ ...p, paddingLeft: '20px', margin: 0 }}>
          <li style={{ marginBottom: '8px' }}><strong style={{ color: 'var(--text)' }}>Dhaka:</strong> usually 1–3 business days after dispatch.</li>
          <li style={{ marginBottom: '8px' }}><strong style={{ color: 'var(--text)' }}>Chattogram &amp; major cities:</strong> usually 2–4 business days.</li>
          <li><strong style={{ color: 'var(--text)' }}>Other districts:</strong> allow up to 5–7 business days depending on courier routing.</li>
        </ul>
        <p style={{ ...p, marginTop: '16px' }}>
          Peak sale periods and weather may add a day or two. You will receive tracking details by SMS or email when your parcel is handed to the courier.
        </p>
      </section>

      <section style={section}>
        <h2 style={h2}>ORDER TRACKING</h2>
        <p style={p}>
          Use the tracking link from your confirmation message. If anything looks stuck for more than 3 business days after dispatch, contact us at{' '}
          <a href="mailto:hello@fabricon.com.bd" style={{ color: 'var(--blue)' }}>hello@fabricon.com.bd</a> with your order ID.
        </p>
      </section>

      <section style={section}>
        <h2 style={h2}>ADDRESS &amp; FAILED DELIVERY</h2>
        <p style={p}>
          Please use a complete address with area, road, and a reachable phone number. If the courier cannot reach you, the parcel may be returned; a second delivery attempt may incur an extra charge.
        </p>
      </section>

      <Link href="/cart" style={{
        display: 'inline-block',
        marginTop: '8px',
        background: 'linear-gradient(90deg, #4F6FFF, #B44FFF)',
        color: 'white',
        padding: '14px 32px',
        textDecoration: 'none',
        fontWeight: 700,
        fontSize: '13px',
        letterSpacing: '0.1em',
        borderRadius: '4px',
      }}>VIEW CART</Link>
    </div>
  )
}
