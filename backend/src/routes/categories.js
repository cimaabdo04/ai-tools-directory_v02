import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { tools: true }
        }
      },
      orderBy: { name: 'asc' }
    })

    // Transform to include tool count
    const categoriesWithCount = categories.map(cat => ({
      ...cat,
      toolCount: cat._count.tools
    }))

    res.json({ categories: categoriesWithCount })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
})

// Get single category by slug
router.get('/:slug', async (req, res) => {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: req.params.slug },
      include: {
        _count: {
          select: { tools: true }
        }
      }
    })

    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    res.json({ 
      category: {
        ...category,
        toolCount: category._count.tools
      }
    })
  } catch (error) {
    console.error('Error fetching category:', error)
    res.status(500).json({ error: 'Failed to fetch category' })
  }
})

// Get tools by category slug
router.get('/:slug/tools', async (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query

    const category = await prisma.category.findUnique({
      where: { slug: req.params.slug }
    })

    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    const tools = await prisma.tool.findMany({
      where: { categoryId: category.id },
      include: { category: true },
      orderBy: { popularity: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset)
    })

    const total = await prisma.tool.count({
      where: { categoryId: category.id }
    })

    res.json({
      data: tools,
      total,
      limit: parseInt(limit),
      offset: parseInt(offset),
      category
    })
  } catch (error) {
    console.error('Error fetching category tools:', error)
    res.status(500).json({ error: 'Failed to fetch category tools' })
  }
})

export default router
