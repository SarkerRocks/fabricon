import { NextResponse } from 'next/server'
import SSLCommerzPayment from 'sslcommerz-lts'

export async function POST(request) {
  const body = await request.json()
  const { cartItems, totalPrice, deliveryCharge, customerInfo } = body

  const store_id = process.env.SSLCOMMERZ_STORE_ID
  const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD
  const is_live = false // change to true when you go live

  const data = {
    total_amount: totalPrice + deliveryCharge,
    currency: 'BDT',
    tran_id: 'FAB_' + Date.now(),
    success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success`,
    fail_url: `${process.env.NEXT_PUBLIC_URL}/checkout/fail`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout/cancel`,
    ipn_url: `${process.env.NEXT_PUBLIC_URL}/api/payment/ipn`,
    shipping_method: 'Courier',
    product_name: cartItems.map(i => i.name).join(', '),
    product_category: 'T-Shirt',
    product_profile: 'general',
    cus_name: customerInfo.name,
    cus_email: customerInfo.email,
    cus_add1: customerInfo.address,
    cus_city: customerInfo.city,
    cus_country: 'Bangladesh',
    cus_phone: customerInfo.phone,
    ship_name: customerInfo.name,
    ship_add1: customerInfo.address,
    ship_city: customerInfo.city,
    ship_country: 'Bangladesh',
  }

  try {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    const apiResponse = await sslcz.init(data)
    if (apiResponse?.GatewayPageURL) {
      return NextResponse.json({ url: apiResponse.GatewayPageURL })
    } else {
      return NextResponse.json({ error: 'Failed to get payment URL' }, { status: 500 })
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Payment init failed' }, { status: 500 })
  }
}