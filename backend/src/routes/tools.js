import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Get all tools with optional filtering
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      category, 
      pricing, 
      sort = 'popularity', 
      order = 'desc',
      limit = 20,
      offset = 0 
    } = req.query

    const where = {}
    
    // Search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Category filter
    if (category) {
      where.category = { slug: category }
    }

    // Pricing filter
    if (pricing) {
      where.pricing = pricing
    }

    const tools = await prisma.tool.findMany({
      where,
      include: { category: true },
      orderBy: { [sort]: order },
      take: parseInt(limit),
      skip: parseInt(offset)
    })

    const total = await prisma.tool.count({ where })

    res.json({
      data: tools,
      total,
      limit: parseInt(limit),
      offset: parseInt(offset)
    })
  } catch (error) {
    console.error('Error fetching tools:', error)
    res.status(500).json({ error: 'Failed to fetch tools' })
  }
})

// Get featured tools
router.get('/featured', async (req, res) => {
  try {
    const tools = await prisma.tool.findMany({
      where: { featured: true },
      include: { category: true },
      orderBy: { popularity: 'desc' },
      take: 6
    })
    res.json({ tools })
  } catch (error) {
    console.error('Error fetching featured tools:', error)
    res.status(500).json({ error: 'Failed to fetch featured tools' })
  }
})

// Get popular tools
router.get('/popular', async (req, res) => {
  try {
    const tools = await prisma.tool.findMany({
      include: { category: true },
      orderBy: { popularity: 'desc' },
      take: 8
    })
    res.json({ tools })
  } catch (error) {
    console.error('Error fetching popular tools:', error)
    res.status(500).json({ error: 'Failed to fetch popular tools' })
  }
})

// Get newest tools
router.get('/newest', async (req, res) => {
  try {
    const tools = await prisma.tool.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      take: 8
    })
    res.json({ tools })
  } catch (error) {
    console.error('Error fetching newest tools:', error)
    res.status(500).json({ error: 'Failed to fetch newest tools' })
  }
})

// Get single tool by slug
router.get('/:slug', async (req, res) => {
  try {
    const tool = await prisma.tool.findUnique({
      where: { slug: req.params.slug },
      include: { category: true }
    })

    if (!tool) {
      return res.status(404).json({ error: 'Tool not found' })
    }

    // Increment popularity
    await prisma.tool.update({
      where: { id: tool.id },
      data: { popularity: { increment: 1 } }
    })

    res.json({ tool })
  } catch (error) {
    console.error('Error fetching tool:', error)
    res.status(500).json({ error: 'Failed to fetch tool' })
  }
})

// Create a new tool (simple, no auth for demo)
router.post('/', async (req, res) => {
  try {
    const { name, slug, description, longDescription, websiteUrl, logoUrl, pricing, pricingDetails, keyFeatures, categoryId } = req.body

    // Validate required fields
    if (!name || !slug || !description || !websiteUrl || !categoryId) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Check if slug already exists
    const existingTool = await prisma.tool.findUnique({
      where: { slug }
    })

    if (existingTool) {
      return res.status(400).json({ error: 'A tool with this slug already exists' })
    }

    const tool = await prisma.tool.create({
      data: {
        name,
        slug,
        description,
        longDescription,
        websiteUrl,
        logoUrl,
        pricing: pricing || 'free',
        pricingDetails,
        keyFeatures: keyFeatures || [],
        categoryId: parseInt(categoryId)
      },
      include: { category: true }
    })

    res.status(201).json({ tool })
  } catch (error) {
    console.error('Error creating tool:', error)
    res.status(500).json({ error: 'Failed to create tool' })
  }
})

export default router
