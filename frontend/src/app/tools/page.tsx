'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, X } from 'lucide-react'
import ToolCard from '@/components/ToolCard'
import { fetchTools, fetchCategories } from '@/lib/api'

interface Tool {
  id: number
  name: string
  slug: string
  description: string
  websiteUrl: string
  logoUrl?: string
  pricing: string
  featured: boolean
  popularity: number
  category: {
    name: string
    slug: string
  }
}

interface Category {
  id: number
  name: string
  slug: string
  toolCount: number
}

export default function ToolsPage() {
  return (
    <Suspense fallback={<ToolsPageSkeleton />}>
      <ToolsPageContent />
    </Suspense>
  )
}

function ToolsPageContent() {
  const searchParams = useSearchParams()
  const [tools, setTools] = useState<Tool[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [pricing, setPricing] = useState(searchParams.get('pricing') || '')
  const [sort, setSort] = useState(searchParams.get('sort') || 'popularity')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    loadTools()
  }, [search, category, pricing, sort])

  async function loadCategories() {
    try {
      const data = await fetchCategories()
      setCategories(data.categories)
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  async function loadTools() {
    setLoading(true)
    try {
      const data = await fetchTools({
        search: search || undefined,
        category: category || undefined,
        pricing: pricing || undefined,
        sort,
        limit: 20
      })
      setTools(data.data)
      setTotal(data.total)
    } catch (error) {
      console.error('Error loading tools:', error)
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    loadTools()
  }

  function clearFilters() {
    setSearch('')
    setCategory('')
    setPricing('')
    setSort('popularity')
  }

  const hasFilters = search || category || pricing

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">AI Tools Directory</h1>
          <p className="text-muted-foreground max-w-2xl">
            Discover and explore the best AI tools for your workflow. From writing assistants to
            image generators, find the perfect tool for your needs.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-xl border p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search AI tools..."
                className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Filter Options */}
          <div className={`mt-4 pt-4 border-t ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="flex flex-wrap gap-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={pricing}
                onChange={(e) => setPricing(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Pricing</option>
                <option value="free">Free</option>
                <option value="freemium">Freemium</option>
                <option value="paid">Paid</option>
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="popularity">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="name">Name A-Z</option>
              </select>

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  <X className="h-4 w-4" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            {loading ? 'Loading...' : `${total} tools found`}
          </p>
        </div>

        {/* Tools Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border p-6 animate-pulse">
                <div className="h-12 w-12 rounded-lg bg-gray-200 mb-4" />
                <div className="h-6 w-32 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-full bg-gray-200 rounded mb-4" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : tools.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No tools found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ToolsPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="h-10 w-64 bg-gray-200 rounded mb-4" />
          <div className="h-6 w-96 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border p-6 mb-8">
          <div className="h-12 bg-gray-200 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border p-6 animate-pulse">
              <div className="h-12 w-12 rounded-lg bg-gray-200 mb-4" />
              <div className="h-6 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-full bg-gray-200 rounded mb-4" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
