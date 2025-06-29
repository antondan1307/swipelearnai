# SwipeLearn AI - Smart Vocabulary Learning App

A modern, AI-powered English vocabulary learning application built with Next.js, featuring video flashcards, personalized learning paths, and gamified experiences.

## 🚀 Features

### Core Features
- **AI Video Flashcards**: Convert YouTube/TikTok videos into 30-second learning segments with auto-generated Q&A using OpenAI Whisper + GPT
- **Personalized Learning Paths**: 7-day AI-curated playlists based on user preferences using OpenAI embeddings
- **Gamification**: Streak tracking, badges, leaderboards, and social features
- **PWA Offline-First**: Cache videos & flashcards using Workbox for offline learning
- **Real-time Features**: Firebase Realtime Database for live updates and social interactions

### Technical Features
- **Modern UI**: Beautiful, responsive design with Tailwind CSS and Framer Motion animations
- **TypeScript**: Full type safety throughout the application
- **API Routes**: Built-in Next.js API routes for backend functionality
- **Firebase Integration**: Authentication, Firestore database, and real-time features
- **OpenAI Integration**: GPT-4 for content generation and Whisper for transcription

## 🛠️ Technology Stack

- **Frontend**: Next.js 13+ (TypeScript) + Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **Real-time**: Firebase Realtime Database
- **AI Services**: OpenAI GPT-4 + Whisper
- **Deployment**: Vercel
- **PWA**: Next-PWA with Workbox

## 📁 Project Structure

```
swipelearn-ai/
├── app/
│   ├── api/                    # API routes
│   │   ├── flashcard/         # Flashcard generation
│   │   ├── transcribe/        # Audio transcription
│   │   ├── video-process/     # Video processing
│   │   └── learning-path/     # AI learning paths
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── navigation.tsx         # Main navigation
│   ├── video-upload.tsx       # Video upload interface
│   ├── flashcard-deck.tsx     # Flashcard learning interface
│   ├── learning-path.tsx      # Learning path display
│   ├── leaderboard.tsx        # Gamification leaderboard
│   ├── user-stats.tsx         # User profile and stats
│   ├── theme-provider.tsx     # Theme management
│   └── auth-provider.tsx      # Authentication context
├── lib/
│   ├── firebase.ts            # Firebase configuration
│   ├── openai.ts              # OpenAI utilities
│   └── utils.ts               # Utility functions
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   └── icons/                 # App icons
├── vercel.json                # Vercel deployment config
└── package.json               # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key
- Firebase project
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd swipelearn-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Enable Storage
5. Copy your configuration to `.env.local`

### OpenAI Setup

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add it to your `.env.local` file
3. Ensure you have sufficient credits for GPT-4 and Whisper usage

## 🚀 Deployment to Vercel

### Automatic Deployment

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will automatically detect Next.js and configure build settings

2. **Set Environment Variables**
   In your Vercel dashboard, add the following environment variables:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. **Deploy**
   ```bash
   git push origin main
   ```
   Vercel will automatically build and deploy your application.

#### Continuous Deployment with GitHub Actions

This repository includes a workflow at `.github/workflows/vercel-prod.yml` that
deploys to Vercel whenever changes are pushed to the `main` branch. To use it,
add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` as repository
secrets on GitHub. After pushing to `main`, a production deployment will appear
in your Vercel dashboard so you can use **Visit Preview** to view the site.

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add OPENAI_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
# ... add all other environment variables

# Redeploy with environment variables
vercel --prod
```

## 📱 PWA Features

The app includes Progressive Web App capabilities:

- **Offline Support**: Cached content for offline learning
- **Install Prompt**: Users can install the app on their devices
- **Background Sync**: Sync progress when connection is restored
- **Push Notifications**: Learning reminders and achievements

## 🎮 Gamification Features

- **Streak Tracking**: Daily learning streaks
- **XP System**: Experience points for completed activities
- **Badges**: Achievement system for milestones
- **Leaderboards**: Compete with friends and global users
- **Levels**: Progressive difficulty and content unlocking

## 🤖 AI Features

### Video Processing
- Automatic video segmentation (≤30 seconds)
- Audio extraction and transcription
- Content analysis for educational value

### Flashcard Generation
- Context-aware question generation
- Difficulty adjustment based on user level
- Multiple question types (vocabulary, grammar, usage)

### Personalized Learning
- User preference analysis
- Adaptive content recommendation
- Progress-based difficulty adjustment

## 🔒 Security & Privacy

- Firebase Authentication for secure user management
- API key protection through environment variables
- Client-side data validation
- CORS configuration for API security

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📈 Performance Optimization

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component with optimization
- **Caching**: Service worker caching for offline support
- **Bundle Analysis**: Webpack bundle analyzer for optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Contact the development team

## 🚀 Future Enhancements

- **Voice Recognition**: Practice pronunciation with speech recognition
- **Social Learning**: Study groups and collaborative features
- **Advanced Analytics**: Detailed learning progress insights
- **Multi-language Support**: Support for multiple target languages
- **AR/VR Integration**: Immersive learning experiences

---

Built with ❤️ using Next.js, OpenAI, and Firebase