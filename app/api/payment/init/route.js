import { NextResponse } from 'next/server'
import SSLCommerzPayment from 'sslcommerz-lts'
import { getPublicSiteUrl } from '@/lib/getPublicSiteUrl'

export const runtime = 'nodejs'

export async function POST(request) {
  const store_id = process.env.SSLCOMMERZ_STORE_ID
  const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD
  const baseUrl = getPublicSiteUrl()
  const is_live = process.env.SSLCOMMERZ_IS_LIVE === 'true'

  if (!store_id || !store_passwd) {
    return NextResponse.json(
      { error: 'Payment is not configured (missing store credentials).' },
      { status: 503 }
    )
  }
  if (!baseUrl) {
    return NextResponse.json(
      { error: 'Payment is not configured (set NEXT_PUBLIC_URL or deploy on Vercel for VERCEL_URL).' },
      { status: 503 }
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { cartItems, totalPrice, deliveryCharge, customerInfo } = body
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return NextResponse.json({ error: 'Cart is empty or invalid.' }, { status: 400 })
  }
  if (typeof totalPrice !== 'number' || typeof deliveryCharge !== 'number' || !customerInfo) {
    return NextResponse.json({ error: 'Missing order or customer fields.' }, { status: 400 })
  }
  const { name, email, phone, address, city } = customerInfo
  if (!name || !email || !phone || !address || !city) {
    return NextResponse.json({ error: 'Incomplete customer information.' }, { status: 400 })
  }

  const data = {
    total_amount: totalPrice + deliveryCharge,
    currency: 'BDT',
    tran_id: 'FAB_' + Date.now(),
    success_url: `${baseUrl}/checkout/success`,
    fail_url: `${baseUrl}/checkout/fail`,
    cancel_url: `${baseUrl}/checkout/cancel`,
    ipn_url: `${baseUrl}/api/payment/ipn`,
    shipping_method: 'Courier',
    product_name: cartItems.map(i => i.name).join(', '),
    product_category: 'T-Shirt',
    product_profile: 'general',
    cus_name: name,
    cus_email: email,
    cus_add1: address,
    cus_city: city,
    cus_country: 'Bangladesh',
    cus_phone: phone,
    ship_name: name,
    ship_add1: address,
    ship_city: city,
    ship_country: 'Bangladesh',
  }

  try {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    const apiResponse = await sslcz.init(data)
    if (apiResponse?.GatewayPageURL) {
      return NextResponse.json({ url: apiResponse.GatewayPageURL })
    }
    return NextResponse.json({ error: 'Failed to get payment URL' }, { status: 500 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Payment init failed' }, { status: 500 })
  }
}
