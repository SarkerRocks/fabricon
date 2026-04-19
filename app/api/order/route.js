import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()
  const { form, cartItems, totalPrice, deliveryCharge, location, grandTotal } = body

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    const itemsList = cartItems
      .map(i => `${i.name} (Size: ${i.size}) x${i.quantity} — ৳${i.price * i.quantity}`)
      .join('\n')

    await resend.emails.send({
      from: 'Fabricon Orders <onboarding@resend.dev>',
      to: process.env.OWNER_EMAIL,
      subject: `New Order from ${form.name} — ৳${grandTotal}`,
      text: `
NEW ORDER — FABRICON
====================
CUSTOMER
Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email || 'Not provided'}
Address: ${form.address}, ${form.city}
Location: ${location === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'}

ITEMS
${itemsList}

PAYMENT
Subtotal: ৳${totalPrice}
Delivery Charge: ৳${deliveryCharge} (paid upfront)
Cash on Delivery: ৳${totalPrice}

Transaction ID: ${form.trxId}
Sent to number: ${form.paymentNumber}
====================
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Order error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}