import Link from 'next/link'
import { Sparkles, Github, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <span>AI Tools</span>
            </Link>
            <p className="text-gray-600 text-sm max-w-md">
              Discover the best AI tools for your workflow. We curate and review the top AI tools
              to help you stay ahead in the AI revolution.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Submit a Tool
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Popular</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools?category=text-writing" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Text & Writing
                </Link>
              </li>
              <li>
                <Link href="/tools?category=image-generation" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Image Generation
                </Link>
              </li>
              <li>
                <Link href="/tools?category=code-development" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Code & Development
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2024 AI Tools Directory. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
