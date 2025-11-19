# Publish - Modern Publishing Platform

A full-stack publishing platform built with Next.js 16, featuring a rich text editor, social features, and production-ready deployment.

## Features

### Lab 6-10 Implementations

**Lab 6: Comments, Reactions & Social Features**
- Comment system with nested replies
- Like/clap functionality with optimistic UI
- Follow/unfollow authors
- Personalized feed based on follows

**Lab 7: State Management & Data Fetching**
- Custom React hooks for posts and comments (`usePosts`, `useComments`)
- Context API setup for auth and theme state
- Loading and error states handling
- Optimistic UI updates

**Lab 8: TypeScript & Quality**
- Full TypeScript implementation with strict mode
- Type definitions for Post, User, Comment, Tag, API responses
- ESLint and Prettier configuration
- Jest unit tests for components
- Type-safe React hooks

**Lab 9: SEO, Performance & SSG/ISR**
- Dynamic Open Graph and Twitter meta tags
- Next.js Image component optimization
- Font optimization with Google Fonts
- Metadata API for dynamic page titles/descriptions
- Performance monitoring setup

**Lab 10: Deployment & Observability**
- Vercel deployment ready
- CI/CD configuration
- Error handling and analytics
- Environment variable setup
- Production build optimization

## Project Structure

\`\`\`
├── app/
│   ├── api/                    # API routes
│   │   ├── posts/             # Post CRUD endpoints
│   │   ├── feed/              # Personalized feed
│   │   └── users/             # User follow endpoints
│   ├── post/[id]/             # Individual post page
│   ├── profile/[username]/    # User profile
│   ├── write/                 # Post editor
│   └── layout.tsx             # Root layout with metadata
├── components/
│   ├── comment-section.tsx    # Comment tree component
│   ├── reaction-button.tsx    # Like/reaction button
│   ├── follow-button.tsx      # Follow button
│   └── __tests__/             # Component tests
├── hooks/
│   ├── usePosts.ts            # Posts data fetching
│   ├── useComments.ts         # Comments management
│   └── useAuth.ts             # Auth context hook
├── lib/
│   ├── types.ts               # TypeScript types
│   └── context.ts             # React Context definitions
├── public/                     # Static assets
└── next.config.mjs            # Next.js configuration

\`\`\`

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/publish-platform.git

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
\`\`\`

### Environment Variables

Create a `.env.local` file:

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

## Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Production build
npm start            # Start production server
npm run lint         # Run ESLint
npm run test         # Run Jest tests
npm run type-check   # TypeScript type checking
\`\`\`

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Connect project to Vercel
3. Set environment variables
4. Deploy

\`\`\`bash
# Or deploy from CLI
vercel
\`\`\`

### Environment Variables (Production)
- `NEXT_PUBLIC_API_URL` - API endpoint
- `NEXTAUTH_URL` - Authentication URL
- `CLOUDINARY_URL` - Image upload service
- `SENTRY_DSN` - Error tracking

## Testing

\`\`\`bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Generate coverage report
npm run test -- --coverage
\`\`\`

## TypeScript Configuration

Strict mode enabled by default:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`

## Performance

- React Compiler enabled for automatic optimization
- Image optimization with Next.js Image component
- Font optimization with Google Fonts
- CSS compression with Tailwind CSS
- Bundle size optimized with dynamic imports

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- iOS Safari: Latest version
- Android Chrome: Latest version

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub or visit [your-support-url].

## Roadmap

- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] AI-powered content recommendations
- [ ] Mobile app (React Native)
- [ ] Monetization features
- [ ] Multi-language support
- [ ] Video uploads
- [ ] Collaborative writing

---

Built with Next.js 16, React 19, TypeScript, and Tailwind CSS
