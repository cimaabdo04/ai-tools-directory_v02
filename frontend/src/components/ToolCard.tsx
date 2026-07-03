import Link from 'next/link'
import { ExternalLink, Star } from 'lucide-react'

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

interface ToolCardProps {
  tool: Tool
}

const pricingColors = {
  free: 'bg-green-100 text-green-700',
  freemium: 'bg-blue-100 text-blue-700',
  paid: 'bg-purple-100 text-purple-700',
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="group bg-white rounded-xl border hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {tool.logoUrl ? (
              <img
                src={tool.logoUrl}
                alt={tool.name}
                className="h-12 w-12 rounded-lg object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">{tool.name[0]}</span>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <span className="text-xs text-gray-500">{tool.category.name}</span>
            </div>
          </div>
          {tool.featured && (
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-xs font-medium">Featured</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tool.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${pricingColors[tool.pricing as keyof typeof pricingColors] || pricingColors.free}`}>
            {tool.pricing.charAt(0).toUpperCase() + tool.pricing.slice(1)}
          </span>
          <Link
            href={`/tools/${tool.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View Details
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
