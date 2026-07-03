import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, CheckCircle, Star } from 'lucide-react'
import { fetchToolBySlug } from '@/lib/api'

interface Props {
  params: { slug: string }
}

export default async function ToolDetailPage({ params }: Props) {
  try {
    const data = await fetchToolBySlug(params.slug)
    const tool = data.tool

    if (!tool) {
      notFound()
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Tools
            </Link>

            <div className="flex flex-col md:flex-row items-start gap-6">
              {tool.logoUrl ? (
                <img
                  src={tool.logoUrl}
                  alt={tool.name}
                  className="h-20 w-20 rounded-xl object-cover"
                />
              ) : (
                <div className="h-20 w-20 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-4xl">{tool.name[0]}</span>
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold">{tool.name}</h1>
                  {tool.featured && (
                    <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-xs font-medium">Featured</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{tool.category.name}</p>
                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Visit Website
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-sm font-medium px-3 py-1 rounded-full mb-2 ${
                  tool.pricing === 'free' ? 'bg-green-100 text-green-700' :
                  tool.pricing === 'freemium' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {tool.pricing.charAt(0).toUpperCase() + tool.pricing.slice(1)}
                </span>
                {tool.pricingDetails && (
                  <p className="text-sm text-gray-500">{tool.pricingDetails}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed">
                  {tool.longDescription || tool.description}
                </p>
              </div>

              {/* Key Features */}
              {tool.keyFeatures && tool.keyFeatures.length > 0 && (
                <div className="bg-white rounded-xl border p-6">
                  <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                  <ul className="space-y-3">
                    {tool.keyFeatures.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-xl border p-6">
                <h3 className="font-semibold mb-4">Quick Info</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Category</dt>
                    <dd className="font-medium">
                      <Link
                        href={`/tools?category=${tool.category.slug}`}
                        className="text-primary hover:underline"
                      >
                        {tool.category.name}
                      </Link>
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Pricing</dt>
                    <dd className="font-medium capitalize">{tool.pricing}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Popularity</dt>
                    <dd className="font-medium">{tool.popularity}%</dd>
                  </div>
                </dl>
              </div>

              {/* Visit Button */}
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-primary text-white text-center rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                Visit {tool.name}
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
