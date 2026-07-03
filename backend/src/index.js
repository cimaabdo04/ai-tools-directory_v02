import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import toolsRouter from './routes/tools.js'
import categoriesRouter from './routes/categories.js'

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/tools', toolsRouter)
app.use('/api/categories', categoriesRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`)
  console.log(`📚 API endpoints:`)
  console.log(`   GET  /api/health`)
  console.log(`   GET  /api/tools`)
  console.log(`   GET  /api/tools/:slug`)
  console.log(`   GET  /api/tools/featured`)
  console.log(`   GET  /api/categories`)
  console.log(`   GET  /api/categories/:slug/tools`)
})

export { prisma }
