import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Category {
  id: number
  name: string
  slug: string
  description?: string
  icon?: string
  toolCount: number
}

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/tools?category=${category.slug}`}
      className="group bg-white rounded-xl border p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-4xl">{category.icon || '📁'}</span>
        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
        {category.name}
      </h3>
      <p className="text-sm text-gray-500">
        {category.toolCount} tools
      </p>
    </Link>
  )
}
