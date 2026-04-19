import Link from 'next/link'

export const metadata = {
  title: 'Returns & Exchanges — Fabricon',
  description: 'Fabricon returns and exchanges policy. Unworn items, 7-day window, how to start a return.',
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

export default function ReturnsPage() {
  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px 80px' }}>
      <p style={{ color: 'var(--muted)', fontSize: '13px', letterSpacing: '0.12em', marginBottom: '8px' }}>HELP</p>
      <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(44px, 7vw, 64px)', lineHeight: 1, marginBottom: '16px' }}>
        RETURNS &amp; EXCHANGES
      </h1>
      <p style={{ ...p, marginBottom: '40px' }}>
        We want you to love your Fabricon tee. If the size or style is not right, you can request an exchange within <strong style={{ color: 'var(--text)' }}>7 days</strong> of delivery, subject to the conditions below.
      </p>

      <section style={section}>
        <h2 style={h2}>WHAT WE ACCEPT</h2>
        <ul style={{ ...p, paddingLeft: '20px', margin: 0 }}>
          <li style={{ marginBottom: '8px' }}>Item is <strong style={{ color: 'var(--text)' }}>unworn</strong>, unwashed, and free of odour or stains.</li>
          <li style={{ marginBottom: '8px' }}>Original tags and packaging (if any) are intact.</li>
          <li style={{ marginBottom: '8px' }}>Clearance or final-sale items are noted on the product page and are <strong style={{ color: 'var(--text)' }}>not</strong> eligible unless faulty.</li>
          <li>Defective or incorrect items: contact us within 48 hours of delivery with photos; we will cover return shipping or arrange a replacement.</li>
        </ul>
      </section>

      <section style={section}>
        <h2 style={h2}>HOW TO EXCHANGE</h2>
        <ol style={{ ...p, paddingLeft: '20px', margin: 0 }}>
          <li style={{ marginBottom: '8px' }}>Email <a href="mailto:hello@fabricon.com.bd" style={{ color: 'var(--blue)' }}>hello@fabricon.com.bd</a> with your order number, the item you are returning, and the size or product you would like instead.</li>
          <li style={{ marginBottom: '8px' }}>We will reply with return instructions and our Dhaka return address or a courier pickup option where available.</li>
          <li style={{ marginBottom: '8px' }}>Once we receive and inspect the item, we will ship your exchange or issue store credit if your preferred size is out of stock.</li>
        </ol>
      </section>

      <section style={section}>
        <h2 style={h2}>REFUNDS</h2>
        <p style={p}>
          Paid orders that qualify for cancellation before dispatch may be refunded to the original payment method within <strong style={{ color: 'var(--text)' }}>5–10 business days</strong>, depending on your bank or wallet provider. After dispatch, we prioritise <strong style={{ color: 'var(--text)' }}>exchange or store credit</strong> instead of cash refunds, except for faulty or wrong items.
        </p>
      </section>

      <section style={section}>
        <h2 style={h2}>RETURN SHIPPING</h2>
        <p style={p}>
          For size exchanges where Fabricon is not at fault, return shipping from your location to Dhaka is <strong style={{ color: 'var(--text)' }}>paid by the customer</strong> unless we specify otherwise in your return email.
        </p>
      </section>

      <Link href="/products" style={{
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
      }}>CONTINUE SHOPPING</Link>
    </div>
  )
}
