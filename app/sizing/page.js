import Link from 'next/link'

export const metadata = {
  title: 'Size Guide — Fabricon',
  description: 'How to choose your Fabricon tee size. Chest and length measurements for unisex streetwear.',
}

const section = {
  marginBottom: '32px',
}

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

const tableWrap = {
  overflowX: 'auto',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  background: 'var(--surface)',
}

const thtd = {
  padding: '12px 14px',
  textAlign: 'left',
  fontSize: '14px',
  borderBottom: '1px solid var(--border)',
}

export default function SizingPage() {
  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px 80px' }}>
      <p style={{ color: 'var(--muted)', fontSize: '13px', letterSpacing: '0.12em', marginBottom: '8px' }}>HELP</p>
      <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(44px, 7vw, 64px)', lineHeight: 1, marginBottom: '16px' }}>
        SIZE GUIDE
      </h1>
      <p style={{ ...p, marginBottom: '40px' }}>
        Fabricon tees are a relaxed, unisex street fit. Most drops are offered in <strong style={{ color: 'var(--text)' }}>M, L, and XL</strong>; check the product page for the exact size run on each item.
      </p>

      <section style={section}>
        <h2 style={h2}>HOW TO MEASURE</h2>
        <p style={p}>
          Lay a tee you already like flat. <strong style={{ color: 'var(--text)' }}>Chest</strong> is measured one inch below the armpits, straight across the front (double that number for the full chest). <strong style={{ color: 'var(--text)' }}>Length</strong> is from the highest point of the shoulder to the bottom hem.
        </p>
      </section>

      <section style={section}>
        <h2 style={h2}>BODY MEASUREMENTS (CM)</h2>
        <p style={p}>Use these as a guide; fabric and wash can vary by a centimetre or two.</p>
        <div style={tableWrap}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text)' }}>
            <thead>
              <tr style={{ background: 'var(--bg)' }}>
                <th style={{ ...thtd, color: 'var(--muted)', fontWeight: 600 }}>Size</th>
                <th style={{ ...thtd, color: 'var(--muted)', fontWeight: 600 }}>Chest (cm)</th>
                <th style={{ ...thtd, color: 'var(--muted)', fontWeight: 600 }}>Length (cm)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['S', '46–48', '68–70'],
                ['M', '50–52', '70–72'],
                ['L', '54–56', '72–74'],
                ['XL', '58–60', '74–76'],
                ['XXL', '62–64', '76–78'],
              ].map(([size, chest, len], i, arr) => {
                const last = i === arr.length - 1
                const cell = { ...thtd, ...(last ? { borderBottom: 'none' } : {}) }
                return (
                  <tr key={size}>
                    <td style={{ ...cell, fontWeight: 600 }}>{size}</td>
                    <td style={cell}>{chest}</td>
                    <td style={cell}>{len}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section style={section}>
        <h2 style={h2}>FIT NOTES</h2>
        <ul style={{ ...p, paddingLeft: '20px', margin: 0 }}>
          <li style={{ marginBottom: '8px' }}>Heavyweight cotton has minimal stretch; if you are between sizes, size up for a looser street fit.</li>
          <li style={{ marginBottom: '8px' }}>Graphics are applied to sit comfortably across the chest at the intended size.</li>
          <li>Still unsure? Email <a href="mailto:hello@fabricon.com.bd" style={{ color: 'var(--blue)' }}>hello@fabricon.com.bd</a> with your chest measurement and we will suggest a size.</li>
        </ul>
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
      }}>SHOP TEES</Link>
    </div>
  )
}
