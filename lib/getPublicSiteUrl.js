/**
 * Public HTTPS origin for redirects and callbacks.
 * Prefer NEXT_PUBLIC_URL in production (custom domain). VERCEL_URL is set on Vercel previews.
 */
export function getPublicSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_URL?.trim()
  if (explicit) return explicit.replace(/\/$/, '')

  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) return `https://${vercel.replace(/\/$/, '')}`

  return ''
}
