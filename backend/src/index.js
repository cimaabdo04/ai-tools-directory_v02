import { execSync } from 'child_process'
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

// Auto-run migrations and seed on startup
async function setupDatabase() {
  try {
    console.log('[setup] Running prisma db push...')
    execSync('npx prisma db push --skip-generate', { stdio: 'inherit', cwd: process.cwd() })
    console.log('[setup] Tables synced.')
  } catch (err) {
    console.error('[setup] db push failed:', err.message)
    return
  }
  try {
    console.log('[setup] Running seed...')
    execSync('npx prisma db seed', { stdio: 'inherit', cwd: process.cwd() })
    console.log('[setup] Seed complete.')
  } catch {
    console.log('[setup] Seed skipped.')
  }
}

// Start server
app.listen(PORT, async () => {
  await setupDatabase()
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
