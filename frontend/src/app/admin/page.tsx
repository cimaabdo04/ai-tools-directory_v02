'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchCategories } from '@/lib/api'

interface Category {
  id: number
  name: string
  slug: string
}

export default function AdminPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    websiteUrl: '',
    logoUrl: '',
    pricing: 'free',
    categoryId: '',
    longDescription: '',
    pricingDetails: '',
    keyFeatures: ''
  })

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      const data = await fetchCategories()
      setCategories(data.categories)
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name)
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('http://localhost:3001/api/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          categoryId: parseInt(formData.categoryId),
          keyFeatures: formData.keyFeatures.split('\n').filter(f => f.trim())
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create tool')
      }

      setMessage({ type: 'success', text: 'Tool created successfully!' })
      setFormData({
        name: '',
        slug: '',
        description: '',
        websiteUrl: '',
        logoUrl: '',
        pricing: 'free',
        categoryId: '',
        longDescription: '',
        pricingDetails: '',
        keyFeatures: ''
      })

      setTimeout(() => {
        router.push('/tools')
      }, 1500)
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Submit a Tool</h1>
          <p className="text-muted-foreground max-w-2xl">
            Know a great AI tool that should be on our list? Submit it here!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Tool Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={handleNameChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., ChatGPT"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Slug *</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="chatgpt"
              />
              <p className="text-xs text-gray-500 mt-1">URL-friendly version of the name</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Brief description of the tool..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Website URL *</label>
              <input
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Logo URL</label>
                <input
                  type="url"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Pricing *</label>
                <select
                  value={formData.pricing}
                  onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="free">Free</option>
                  <option value="freemium">Freemium</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Pricing Details</label>
              <input
                type="text"
                value={formData.pricingDetails}
                onChange={(e) => setFormData({ ...formData, pricingDetails: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Free tier, Pro at $20/month"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Key Features</label>
              <textarea
                value={formData.keyFeatures}
                onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter each feature on a new line..."
              />
              <p className="text-xs text-gray-500 mt-1">One feature per line</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Long Description</label>
              <textarea
                value={formData.longDescription}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                rows={5}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Detailed description of the tool..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Tool'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
