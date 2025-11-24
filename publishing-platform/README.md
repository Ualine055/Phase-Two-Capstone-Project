# Publish - Modern Publishing Platform

A full-stack publishing platform built with Next.js 16, Firebase, and TypeScript. Features a rich text editor, user authentication, draft management, and social interactions.

## 🚀 Features

### Core Functionality
- **User Authentication**: Complete signup/login system with password validation
- **Story Writing**: Rich text editor with Markdown support and image insertion
- **Draft Management**: Save drafts and publish later from dashboard
- **Image Support**: Cover images and inline content images
- **Comment System**: Real-time commenting on published stories
- **Social Features**: Follow authors and engage with content
- **Responsive Design**: Mobile-friendly interface

### Technical Features
- **Firebase Integration**: Firestore database for posts, users, and comments
- **TypeScript**: Full type safety throughout the application
- **Authentication Guard**: Protected routes for authenticated users only
- **Real-time Updates**: Live comment counts and interactions
- **Error Handling**: Comprehensive error management and user feedback
- **SEO Optimized**: Meta tags and structured data

## 📁 Project Structure

\`\`\`
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   │   ├── login/         # Login API
│   │   │   └── signup/        # Registration API
│   │   └── posts/             # Post management
│   │       ├── [id]/          # Individual post operations
│   │       │   ├── comments/  # Comment system
│   │       │   └── route.ts   # Post CRUD
│   │       └── route.ts       # Posts listing
│   ├── auth/                  # Authentication pages
│   │   ├── login/             # Login page
│   │   └── signup/            # Registration page
│   ├── dashboard/             # User dashboard
│   ├── post/[id]/             # Individual post view
│   ├── write/                 # Story editor
│   └── page.tsx               # Home page with feed
├── components/
│   ├── auth-guard.tsx         # Route protection
│   ├── auth-provider.tsx      # Authentication context
│   ├── comment-section.tsx    # Comment system
│   ├── editor.tsx             # Rich text editor
│   ├── follow-button.tsx      # Follow functionality
│   ├── header.tsx             # Navigation header
│   └── ui/                    # UI components
├── hooks/
│   ├── useAuth.ts             # Authentication hook
│   └── useComments.ts         # Comment management
├── lib/
│   ├── db.ts                  # Firebase database functions
│   ├── firebase.ts            # Firebase configuration
│   ├── context.ts             # React contexts
│   └── types.ts               # TypeScript definitions
└── public/                     # Static assets
\`\`\`

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Firebase project with Firestore enabled

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/Ualine055/Phase-Two-Capstone-Project.git
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
\`\`\`

### Environment Variables

Create a `.env.local` file with your Firebase configuration:

\`\`\`
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
\`\`\`

## Scripts

\`\`\`bash
npm run dev              # Start development server
npm run build            # Production build
npm start                # Start production server
npm run lint             # Run ESLint
npm run test             # Run Jest tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
\`\`\`

## Deployment

### Deploy to Vercel

🚀 **[View Live Deployment](https://phase-two-capstone-project-orcin.vercel.app)**

1. Push to GitHub
2. Connect project to Vercel
3. Set environment variables
4. Deploy

\`\`\`bash
# Or deploy from CLI
vercel
\`\`\`

### Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Set up Firestore security rules:
   \`\`\`javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   \`\`\`
4. Copy your Firebase config to `.env.local`

## 🔥 Firebase Collections

The app uses these Firestore collections:

- **users**: User profiles and authentication data
- **posts**: Published stories and drafts
- **comments**: User comments on posts
- **reactions**: Likes and reactions
- **follows**: User follow relationships

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


## 🎯 Usage

### For Writers
1. **Sign Up**: Create an account with email and password
2. **Write Stories**: Use the rich text editor with Markdown support
3. **Add Images**: Insert cover images and inline content images
4. **Save Drafts**: Save work in progress and publish later
5. **Manage Content**: View and publish drafts from your dashboard

### For Readers
1. **Browse Stories**: Read published stories on the home feed
2. **Engage**: Comment on stories and follow authors
3. **Discover**: Explore content by tags and categories

## 🚀 Deployment

The app is ready for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your Firebase environment variables
4. Deploy!

## 🛠️ Built With

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Firebase** - Backend-as-a-Service for database and auth
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Recharts** - Dashboard analytics charts
- **Jest & React Testing Library** - Testing framework
- **Vercel Analytics** - Performance monitoring
- **ESLint & Prettier** - Code quality and formatting

## ✅ **Complete Feature Checklist**

### **Lab 1 - Project Setup & Routing** ✅
- ✅ Next.js 16 with App Router
- ✅ TypeScript configuration
- ✅ Clean folder structure (app/, components/, lib/, hooks/)
- ✅ Root layout with header and footer
- ✅ Responsive design

### **Lab 2 - Authentication & User Profiles** ✅
- ✅ Custom JWT authentication
- ✅ Signup/login pages with validation
- ✅ Protected routes with AuthGuard
- ✅ User profile management
- ✅ Dashboard with user posts

### **Lab 3 - Editor & Rich Content** ✅
- ✅ Rich text editor with Markdown support
- ✅ Bold, italic, headings, lists, code blocks, links, quotes
- ✅ Image upload and insertion
- ✅ Preview and publish flows
- ✅ Draft saving functionality

### **Lab 4 - Posts CRUD & Media Handling** ✅
- ✅ Create posts (draft & publish states)
- ✅ Read posts with dynamic routing
- ✅ Update posts functionality
- ✅ Delete posts with confirmation
- ✅ Image optimization and responsive loading

### **Lab 5 - Feeds, Tags, and Search** ✅
- ✅ Home feed with latest posts
- ✅ Tag filtering system
- ✅ Search functionality with debounced queries
- ✅ Explore page with pagination
- ✅ Category-based filtering

### **Lab 6 - Comments, Reactions & Social Features** ✅
- ✅ Comment system for posts
- ✅ Like/clap functionality with optimistic UI
- ✅ Follow/unfollow authors
- ✅ Social interaction buttons
- ✅ Real-time engagement updates

### **Lab 7 - State Management & Data Fetching** ✅
- ✅ Custom useQuery hook for data fetching
- ✅ Context API for auth state
- ✅ Loading and error states
- ✅ Optimistic UI updates
- ✅ Caching strategies

### **Lab 8 - TypeScript & Quality** ✅
- ✅ TypeScript types for Post, User, Comment, Tag
- ✅ Strict typing for props and hooks
- ✅ ESLint and Prettier configuration
- ✅ Jest and React Testing Library setup
- ✅ Unit and integration tests

### **Lab 9 - SEO, Performance & SSG/SSR** ✅
- ✅ Dynamic metadata and Open Graph tags
- ✅ Sitemap and robots.txt
- ✅ Performance optimizations
- ✅ Image optimization with Next.js Image
- ✅ Font optimization

### **Lab 10 - Deployment & Observability** ✅
- ✅ Deployed on Vercel
- ✅ Environment variables configured
- ✅ Vercel Analytics integration
- ✅ CI/CD with GitHub Actions
- ✅ Production build optimization

## 🎯 **All Requirements Met**

✅ **Production-ready Next.js app** deployed on Vercel  
✅ **Functional authentication** and authorization  
✅ **Rich text editor** with image uploads and previews  
✅ **Posts CRUD** with SEO metadata  
✅ **Search and tag filtering** with good performance  
✅ **Comments, likes/claps, and follow features**  
✅ **TypeScript types, linting, and test coverage**  
✅ **Clean, documented code** with comprehensive README

---

**Built with Aline using Next.js 16, Firebase, and TypeScript**
