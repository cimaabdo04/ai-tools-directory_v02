import Link from 'next/link'
import { Search, Sparkles, ArrowRight, Grid3X3, Users, MessageSquare, Star } from 'lucide-react'
import ToolCard from '@/components/ToolCard'
import CategoryCard from '@/components/CategoryCard'
import { fetchFeaturedTools, fetchPopularTools, fetchNewestTools, fetchCategories } from '@/lib/api'

async function getData() {
  try {
    const [featured, popular, newest, categoriesData] = await Promise.all([
      fetchFeaturedTools(),
      fetchPopularTools(),
      fetchNewestTools(),
      fetchCategories()
    ])
    return { featured, popular, newest, categories: categoriesData.categories }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { featured: { tools: [] }, popular: { tools: [] }, newest: { tools: [] }, categories: [] }
  }
}

export default async function HomePage() {
  const { featured, popular, newest, categories } = await getData()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance mb-6">
            Discover the Best <span className="text-primary">AI Tools</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-balance">
            Explore our curated collection of the most powerful AI tools for writing, image generation,
            coding, and more.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Sparkles className="h-5 w-5" />
              Browse Tools
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Submit a Tool
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Grid3X3, value: '500+', label: 'AI Tools' },
            { icon: Star, value: '20+', label: 'Categories' },
            { icon: Users, value: '50K+', label: 'Users' },
            { icon: MessageSquare, value: '10K+', label: 'Reviews' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center rounded-lg border bg-card p-6 text-center">
              <stat.icon className="h-8 w-8 text-primary mb-2" />
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      {featured.tools.length > 0 && (
        <section className="border-t bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  Featured Tools
                </h2>
                <p className="text-muted-foreground mt-1">Hand-picked AI tools by our team</p>
              </div>
              <Link
                href="/tools"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.tools.slice(0, 6).map((tool: any) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
              <p className="text-muted-foreground mt-1">Browse tools by category</p>
            </div>
            <Link
              href="/categories"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.slice(0, 6).map((category: any) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* Popular Tools */}
      {popular.tools.length > 0 && (
        <section className="border-t bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Popular Tools</h2>
                <p className="text-muted-foreground mt-1">Most trending AI tools right now</p>
              </div>
              <Link
                href="/tools?sort=popular"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popular.tools.slice(0, 8).map((tool: any) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newest Tools */}
      {newest.tools.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Newest Additions</h2>
              <p className="text-muted-foreground mt-1">Recently added AI tools</p>
            </div>
            <Link
              href="/tools?sort=newest"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newest.tools.slice(0, 6).map((tool: any) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Know a Great AI Tool?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Help us build the most comprehensive AI tools directory by submitting tools you love.
          </p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors mt-6"
          >
            Submit a Tool
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
