const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export async function fetchTools(params?: {
  search?: string
  category?: string
  pricing?: string
  sort?: string
  limit?: number
  offset?: number
}) {
  const searchParams = new URLSearchParams()
  if (params?.search) searchParams.set('search', params.search)
  if (params?.category) searchParams.set('category', params.category)
  if (params?.pricing) searchParams.set('pricing', params.pricing)
  if (params?.sort) searchParams.set('sort', params.sort)
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.offset) searchParams.set('offset', params.offset.toString())

  const response = await fetch(`${API_URL}/tools?${searchParams.toString()}`)
  if (!response.ok) throw new Error('Failed to fetch tools')
  return response.json()
}

export async function fetchFeaturedTools() {
  const response = await fetch(`${API_URL}/tools/featured`)
  if (!response.ok) throw new Error('Failed to fetch featured tools')
  return response.json()
}

export async function fetchPopularTools() {
  const response = await fetch(`${API_URL}/tools/popular`)
  if (!response.ok) throw new Error('Failed to fetch popular tools')
  return response.json()
}

export async function fetchNewestTools() {
  const response = await fetch(`${API_URL}/tools/newest`)
  if (!response.ok) throw new Error('Failed to fetch newest tools')
  return response.json()
}

export async function fetchToolBySlug(slug: string) {
  const response = await fetch(`${API_URL}/tools/${slug}`)
  if (!response.ok) throw new Error('Failed to fetch tool')
  return response.json()
}

export async function fetchCategories() {
  const response = await fetch(`${API_URL}/categories`)
  if (!response.ok) throw new Error('Failed to fetch categories')
  return response.json()
}

export async function createTool(data: {
  name: string
  slug: string
  description: string
  websiteUrl: string
  pricing: string
  categoryId: number
  logoUrl?: string
  longDescription?: string
  pricingDetails?: string
  keyFeatures?: string[]
}) {
  const response = await fetch(`${API_URL}/tools`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to create tool')
  }
  return response.json()
}
