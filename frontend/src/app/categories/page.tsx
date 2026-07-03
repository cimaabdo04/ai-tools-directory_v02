import Link from 'next/link'
import { fetchCategories } from '@/lib/api'

export default async function CategoriesPage() {
  let categories: any[] = []

  try {
    const data = await fetchCategories()
    categories = data.categories
  } catch (error) {
    console.error('Error loading categories:', error)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Categories</h1>
          <p className="text-muted-foreground max-w-2xl">
            Browse AI tools by category. Find exactly what you need for your specific use case.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {categories.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No categories found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/tools?category=${category.slug}`}
                className="group bg-white rounded-xl border p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
              >
                <span className="text-5xl mb-4 block">{category.icon || '📁'}</span>
                <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {category.description}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  {category.toolCount} {category.toolCount === 1 ? 'tool' : 'tools'}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
