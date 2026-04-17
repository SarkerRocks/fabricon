import { NextResponse } from 'next/server'
import SSLCommerzPayment from 'sslcommerz-lts'

export const runtime = 'nodejs'

/**
 * SSLCommerz Instant Payment Notification.
 * @see https://developer.sslcommerz.com/doc/v4/#validate-payment-with-ipn
 */
export async function POST(request) {
  let formData
  try {
    formData = await request.formData()
  } catch {
    return new NextResponse('BAD_REQUEST', { status: 400 })
  }

  const val_id = formData.get('val_id')
  if (!val_id) {
    return new NextResponse('MISSING_VAL_ID', { status: 400 })
  }

  const store_id = process.env.SSLCOMMERZ_STORE_ID
  const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD
  if (!store_id || !store_passwd) {
    return new NextResponse('SERVER_MISCONFIGURED', { status: 500 })
  }

  const is_live = process.env.SSLCOMMERZ_IS_LIVE === 'true'
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)

  try {
    const result = await sslcz.validate({ val_id: String(val_id) })
    if (!result || typeof result !== 'object') {
      return new NextResponse('VALIDATION_FAILED', { status: 500 })
    }
    const ok = result.status === 'VALID' || result.status === 'VALIDATED'
    if (!ok) {
      console.warn('SSLCommerz IPN validation rejected', result.status)
      return new NextResponse('INVALID', { status: 400 })
    }
    console.log('SSLCommerz IPN validated', { tran_id: result.tran_id })
    return new NextResponse('OK', { status: 200 })
  } catch (err) {
    console.error('SSLCommerz IPN error', err)
    return new NextResponse('ERROR', { status: 500 })
  }
}
