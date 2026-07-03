import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.tool.deleteMany()
  await prisma.category.deleteMany()

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Text & Writing',
        slug: 'text-writing',
        description: 'AI tools for writing, editing, and content creation',
        icon: '✍️'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Image Generation',
        slug: 'image-generation',
        description: 'Create stunning images with AI',
        icon: '🎨'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Code & Development',
        slug: 'code-development',
        description: 'AI-powered coding tools and assistants',
        icon: '💻'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Video & Animation',
        slug: 'video-animation',
        description: 'AI tools for video creation and editing',
        icon: '🎬'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Audio & Music',
        slug: 'audio-music',
        description: 'AI for audio processing and music generation',
        icon: '🎵'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Marketing & SEO',
        slug: 'marketing-seo',
        description: 'AI tools for marketing and search optimization',
        icon: '📈'
      }
    })
  ])

  console.log(`Created ${categories.length} categories`)

  // Create Tools
  const tools = [
    // Text & Writing
    {
      name: 'ChatGPT',
      slug: 'chatgpt',
      description: 'Advanced AI assistant by OpenAI for conversation and content creation.',
      longDescription: 'ChatGPT is a large language model developed by OpenAI. It can help you with a wide range of tasks including writing, coding, analysis, and creative projects.',
      websiteUrl: 'https://chat.openai.com',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
      pricing: 'freemium',
      featured: true,
      popularity: 98,
      pricingDetails: 'Free tier available, Plus at $20/month',
      keyFeatures: ['Natural language understanding', 'Code generation', 'Multi-language support', 'Context memory'],
      categoryId: categories[0].id
    },
    {
      name: 'Claude',
      slug: 'claude',
      description: 'Anthropic\'s AI assistant focused on being helpful, harmless, and honest.',
      longDescription: 'Claude is an AI assistant created by Anthropic, designed to be helpful while maintaining strong ethical guidelines.',
      websiteUrl: 'https://claude.ai',
      logoUrl: 'https://claude.ai/logo.png',
      pricing: 'freemium',
      featured: true,
      popularity: 95,
      pricingDetails: 'Free with limits, Pro at $20/month',
      keyFeatures: ['Long document analysis', 'Ethical AI design', 'Writing assistance', 'Coding help'],
      categoryId: categories[0].id
    },
    {
      name: 'Jasper',
      slug: 'jasper',
      description: 'AI writing assistant for marketing teams and content creators.',
      longDescription: 'Jasper is an AI writing platform that helps create marketing content, blog posts, and social media updates at scale.',
      websiteUrl: 'https://www.jasper.ai',
      logoUrl: 'https://www.jasper.ai/logo.png',
      pricing: 'paid',
      featured: false,
      popularity: 85,
      pricingDetails: 'Starting at $49/month',
      keyFeatures: ['50+ templates', 'Brand voice', 'Multi-language', 'Team collaboration'],
      categoryId: categories[0].id
    },

    // Image Generation
    {
      name: 'Midjourney',
      slug: 'midjourney',
      description: 'AI art generator creating stunning images from text descriptions.',
      longDescription: 'Midjourney is a generative AI program that creates images from natural language descriptions, called prompts.',
      websiteUrl: 'https://www.midjourney.com',
      logoUrl: 'https://www.midjourney.com/logo.png',
      pricing: 'paid',
      featured: true,
      popularity: 96,
      pricingDetails: 'Basic $10/month, Standard $30/month',
      keyFeatures: ['High-quality art', 'Style variations', 'Upscaling', 'Community gallery'],
      categoryId: categories[1].id
    },
    {
      name: 'DALL-E 3',
      slug: 'dall-e-3',
      description: 'OpenAI\'s latest image generation model with improved accuracy.',
      longDescription: 'DALL-E 3 can understand significantly more nuance and detail in your prompts, generating images that more accurately match what you\'re looking for.',
      websiteUrl: 'https://openai.com/dall-e-3',
      logoUrl: 'https://openai.com/dall-e-3-logo.png',
      pricing: 'freemium',
      featured: true,
      popularity: 94,
      pricingDetails: 'Included with ChatGPT Plus',
      keyFeatures: ['Photorealistic images', 'Text in images', 'Better prompt following', 'Safety filters'],
      categoryId: categories[1].id
    },
    {
      name: 'Stable Diffusion',
      slug: 'stable-diffusion',
      description: 'Open-source image generation model for creating AI art.',
      longDescription: 'Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images given any text input.',
      websiteUrl: 'https://stability.ai',
      logoUrl: 'https://stability.ai/logo.png',
      pricing: 'free',
      featured: false,
      popularity: 90,
      pricingDetails: 'Free to use, open source',
      keyFeatures: ['Open source', 'Local deployment', 'Custom models', 'Community support'],
      categoryId: categories[1].id
    },

    // Code & Development
    {
      name: 'GitHub Copilot',
      slug: 'github-copilot',
      description: 'AI pair programmer that helps you write code faster.',
      longDescription: 'GitHub Copilot uses the OpenAI Codex to suggest code completions and entire functions in real-time right in your editor.',
      websiteUrl: 'https://github.com/features/copilot',
      logoUrl: 'https://github.com/logo.png',
      pricing: 'paid',
      featured: true,
      popularity: 97,
      pricingDetails: '$10/month for individuals, $19/user/month for business',
      keyFeatures: ['Code completions', 'Multi-language support', 'IDE integration', 'Bug fixing'],
      categoryId: categories[2].id
    },
    {
      name: 'Cursor',
      slug: 'cursor',
      description: 'AI-first code editor built for pair programming with AI.',
      longDescription: 'Cursor is a code editor built around AI, designed to be your pair programmer with features like AI code generation, editing, and chat.',
      websiteUrl: 'https://cursor.sh',
      logoUrl: 'https://cursor.sh/logo.png',
      pricing: 'freemium',
      featured: true,
      popularity: 88,
      pricingDetails: 'Free tier, Pro at $20/month',
      keyFeatures: ['AI chat', 'Code generation', 'Multi-file editing', 'Privacy mode'],
      categoryId: categories[2].id
    },
    {
      name: 'Replit',
      slug: 'replit',
      description: 'AI-powered coding platform with instant deployment.',
      longDescription: 'Replit is an online IDE that lets you code, compile, and deploy from anywhere with built-in AI assistance.',
      websiteUrl: 'https://replit.com',
      logoUrl: 'https://replit.com/logo.png',
      pricing: 'freemium',
      featured: false,
      popularity: 82,
      pricingDetails: 'Free tier, Pro at $15/month',
      keyFeatures: ['Instant setup', 'Cloud hosting', 'AI chat', 'Collaborative coding'],
      categoryId: categories[2].id
    },

    // Video & Animation
    {
      name: 'Runway',
      slug: 'runway',
      description: 'AI video generation and editing platform for creators.',
      longDescription: 'Runway is an applied AI research company building the next generation of creative tools for artists and creators.',
      websiteUrl: 'https://runwayml.com',
      logoUrl: 'https://runwayml.com/logo.png',
      pricing: 'freemium',
      featured: true,
      popularity: 89,
      pricingDetails: 'Free tier, Pro at $35/month',
      keyFeatures: ['Video generation', 'Video editing', 'Motion tracking', 'Green screen'],
      categoryId: categories[3].id
    },
    {
      name: 'Synthesia',
      slug: 'synthesia',
      description: 'Create AI videos with virtual avatars from text.',
      longDescription: 'Synthesia lets you create professional AI videos with virtual avatars without cameras, microphones, or actors.',
      websiteUrl: 'https://www.synthesia.io',
      logoUrl: 'https://www.synthesia.io/logo.png',
      pricing: 'paid',
      featured: false,
      popularity: 80,
      pricingDetails: 'Starter at $30/month',
      keyFeatures: ['AI avatars', 'Multi-language', 'Template library', 'Brand templates'],
      categoryId: categories[3].id
    },

    // Audio & Music
    {
      name: 'ElevenLabs',
      slug: 'elevenlabs',
      description: 'AI voice synthesis and text-to-speech platform.',
      longDescription: 'ElevenLabs creates realistic, versatile, and context-aware AI audio. Generate high-quality spoken audio in any voice and language.',
      websiteUrl: 'https://elevenlabs.io',
      logoUrl: 'https://elevenlabs.io/logo.png',
      pricing: 'freemium',
      featured: true,
      popularity: 86,
      pricingDetails: 'Free tier, Starter at $5/month',
      keyFeatures: ['Realistic voices', 'Voice cloning', 'Multi-language', 'API access'],
      categoryId: categories[4].id
    },
    {
      name: 'Mubert',
      slug: 'mubert',
      description: 'AI-powered music generation for creators and brands.',
      longDescription: 'Mubert uses AI to generate infinite, royalty-free music for videos, streams, podcasts, and apps.',
      websiteUrl: 'https://mubert.com',
      logoUrl: 'https://mubert.com/logo.png',
      pricing: 'freemium',
      featured: false,
      popularity: 75,
      pricingDetails: 'Free for personal use, Pro plans available',
      keyFeatures: ['Infinite music', 'Customizable', 'Royalty-free', 'API access'],
      categoryId: categories[4].id
    },

    // Marketing & SEO
    {
      name: 'Surfer SEO',
      slug: 'surfer-seo',
      description: 'AI-powered SEO tool for content optimization.',
      longDescription: 'Surfer SEO helps you create content that ranks. Get data-driven insights to optimize your articles for search engines.',
      websiteUrl: 'https://surferseo.com',
      logoUrl: 'https://surferseo.com/logo.png',
      pricing: 'paid',
      featured: false,
      popularity: 83,
      pricingDetails: 'Essential at $69/month',
      keyFeatures: ['Content audit', 'Keyword research', 'SERP analyzer', 'Outline builder'],
      categoryId: categories[5].id
    },
    {
      name: 'Semrush',
      slug: 'semrush',
      description: 'All-in-one marketing toolkit for SEO and content.',
      longDescription: 'Semrush is an all-in-one marketing toolkit that helps with SEO, content marketing, competitor analysis, and PPC.',
      websiteUrl: 'https://www.semrush.com',
      logoUrl: 'https://www.semrush.com/logo.png',
      pricing: 'paid',
      featured: false,
      popularity: 88,
      pricingDetails: 'Pro at $119.95/month',
      keyFeatures: ['Keyword research', 'Site audit', 'Backlink analysis', 'Competitor analysis'],
      categoryId: categories[5].id
    }
  ]

  for (const tool of tools) {
    await prisma.tool.create({ data: tool })
  }

  console.log(`Created ${tools.length} tools`)
  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
