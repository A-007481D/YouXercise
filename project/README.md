# Cortex - Zero-Cost C Exercise Platform

A fully functional, mobile-optimized C programming exercise platform that runs entirely in the browser using WebAssembly, with zero hosting costs and persistent user data.

## 🎯 Features

- **Client-Side C Compilation**: WebAssembly-based C compiler running entirely in the browser
- **Interactive Code Editor**: Monaco Editor with syntax highlighting and IntelliSense
- **Mobile-First Design**: Responsive layout with virtual keyboard for mobile coding
- **Progressive Web App**: Install to home screen, offline support
- **Real-Time Testing**: Instant feedback with pass/fail results for each test case
- **User Authentication**: Supabase-powered authentication with email/password
- **Persistent Progress**: Cloud-based progress tracking and code saving
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Zero Cost**: No server infrastructure required - pure static hosting

## 🏗️ Architecture

### Frontend Stack
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Vite PWA Plugin** for Progressive Web App features
- **Monaco Editor** for professional code editing experience
- **Tailwind CSS** for modern, responsive styling
- **Lucide React** for consistent iconography

### WebAssembly Integration
- **Emscripten-based C compiler** running in the browser
- **Sandboxed execution environment** with timeout and memory limits
- **Real-time compilation** and execution feedback
- **stdio redirection** for input/output handling

### Data Management
- **Supabase** for user authentication and data persistence
- **localStorage** as fallback for offline functionality
- **JSON-based exercise definitions** bundled with the app
- **Progress tracking** with completion timestamps
- **Import/export functionality** for data portability

### Mobile Optimization
- **Virtual Keyboard**: Touch-friendly C symbol toolbar
- **Responsive Layout**: Mobile-first design with collapsible panels
- **PWA Support**: Install to home screen, offline caching
- **Touch Gestures**: Optimized for mobile interaction

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with WebAssembly support
- Supabase account (free tier)

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/cortex-c-platform.git
cd cortex-c-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
```

### Supabase Setup
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Run the migration script:
   ```bash
   # In your Supabase SQL editor, run:
   # supabase/migrations/001_initial_schema.sql
   ```
4. Update your environment variables:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Building for Production
```bash
# Build static files
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CodeEditor.tsx   # Monaco editor integration
│   ├── Header.tsx       # Application header
│   ├── VirtualKeyboard.tsx # Mobile coding keyboard
│   └── TestResults.tsx  # Test result display
├── contexts/            # React contexts for state management
│   ├── AuthContext.tsx  # User authentication
│   ├── ProgressContext.tsx # Progress tracking
│   ├── ThemeContext.tsx # Theme management
│   └── WasmContext.tsx  # WebAssembly compiler
├── data/               # Exercise definitions
│   └── exercises.ts    # Exercise database
├── hooks/              # Custom React hooks
│   └── useMediaQuery.ts # Responsive design hook
├── pages/              # Application pages
│   ├── DashboardPage.tsx
│   ├── ExercisePage.tsx
│   ├── ExerciseListPage.tsx
│   └── LoginPage.tsx
├── utils/              # Utility functions
│   ├── compiler.ts     # WASM compiler interface
│   ├── storage.ts      # Local storage utilities
│   ├── supabase.ts     # Supabase client and helpers
│   └── testRunner.ts   # Test execution engine
├── sw.ts               # Service worker for PWA
└── App.tsx             # Main application component
```

## 📱 Mobile Features

### Virtual Keyboard
The platform includes a custom virtual keyboard for mobile devices:
- **C Symbols**: Quick access to `{}`, `()`, `[]`, `;`, `=`, etc.
- **Keywords**: Common C keywords like `int`, `printf`, `scanf`
- **Auto-hide**: Appears when editor is focused, hides when not needed
- **Touch Optimized**: Large buttons for easy tapping

### Responsive Design
- **Mobile-First**: Designed primarily for mobile, enhanced for desktop
- **Collapsible Panels**: Exercise description and results stack on mobile
- **Touch Gestures**: Swipe and tap interactions
- **Optimized Editor**: Smaller font, hidden minimap on mobile

### PWA Features
- **Install Prompt**: Add to home screen functionality
- **Offline Support**: Service worker caches essential resources
- **App-like Experience**: Full-screen, no browser chrome
- **Background Sync**: Sync progress when connection restored

## 🧪 WebAssembly C Compiler

The platform uses a WebAssembly-based C compiler that runs entirely in the browser:

### Features
- **Standards Compliance**: Supports C11 standard with common extensions
- **Optimization Levels**: O0, O1, O2, O3 optimization support
- **Error Reporting**: Detailed compilation errors and warnings
- **Memory Management**: Sandboxed execution with configurable limits
- **Timeout Protection**: Prevents infinite loops with execution timeouts

### Implementation Details
The WASM compiler is initialized asynchronously and provides:
- Code compilation to WebAssembly modules
- Input/output redirection for testing
- Memory usage monitoring
- Execution time measurement

## 📚 Exercise System

### Exercise Structure
Each exercise contains:
- **Metadata**: Title, description, difficulty, category
- **Requirements**: List of objectives to complete
- **Starter Code**: Template C code to begin with
- **Test Cases**: Input/output pairs for validation
- **Hidden Tests**: Optional server-side validation

### Adding New Exercises
1. Edit `src/data/exercises.ts`
2. Add exercise object with required fields
3. Include comprehensive test cases
4. Test thoroughly before deployment

### Exercise Categories
- **Basics**: Hello World, variables, input/output
- **Control Flow**: Loops, conditionals, functions
- **Data Structures**: Arrays, strings, structs
- **Algorithms**: Sorting, searching, recursion
- **Advanced**: Pointers, memory management, file I/O

## 🗄️ Database Schema

### Tables

#### `submissions`
- `id`: UUID primary key
- `user_id`: Foreign key to auth.users
- `exercise_id`: String identifier for exercise
- `code`: User's C code
- `results`: JSON test results
- `created_at`, `updated_at`: Timestamps

#### `user_progress`
- `id`: UUID primary key
- `user_id`: Foreign key to auth.users
- `exercise_id`: String identifier for exercise
- `completed`: Boolean completion status
- `score`: Integer score (0-100)
- `completed_at`: Completion timestamp

### Row Level Security
All tables use RLS policies to ensure users can only access their own data.

## 🔧 Development

### Adding Features
1. Create components in appropriate directories
2. Follow the established patterns for state management
3. Add comprehensive TypeScript types
4. Include proper error handling
5. Test across different browsers

### Mobile Testing
1. Use browser dev tools device emulation
2. Test on actual mobile devices
3. Verify virtual keyboard functionality
4. Check PWA install flow

### Code Organization
- Keep components under 200 lines
- Use proper separation of concerns
- Implement comprehensive error boundaries
- Follow React best practices

### Testing
```bash
# Run type checking
npm run type-check

# Run linter
npm run lint

# Build and test
npm run build
```

## 🚀 Deployment

### Netlify Deployment (Recommended)

1. **Connect Repository**
   - Link your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`

2. **Environment Variables**
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Deploy Settings**
   - Auto-deploy on push to main branch
   - Preview deployments for pull requests
   - Custom domain support (optional)

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Environment Variables**
   Set via Vercel dashboard or CLI:
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

#### GitHub Pages
```bash
# Build the project
npm run build

# Deploy to GitHub Pages
# (Automated via GitHub Actions)
```

### Custom Domain Setup

1. **Purchase Domain** (optional, ~$10-15/year)
2. **Configure DNS**
   - Point to Netlify: `your-domain.com` → Netlify
   - Or use free subdomain: `your-app.netlify.app`
3. **SSL Certificate**: Automatically provided by Netlify/Vercel

## 🔒 Security & Privacy

### Data Protection
- **Client-Side Encryption**: Sensitive data encrypted before storage
- **Row Level Security**: Database-level access control
- **No Personal Data**: Only email and code submissions stored
- **GDPR Compliant**: Users can export/delete their data

### WebAssembly Sandboxing
- **Memory Isolation**: Code runs in isolated WASM environment
- **No File System Access**: Cannot access user's files
- **Network Restrictions**: No external network requests
- **Timeout Protection**: Automatic termination of long-running code

## 📊 Analytics & Monitoring

### Supabase Analytics
- **User Metrics**: Registration, login, activity tracking
- **Exercise Analytics**: Completion rates, popular exercises
- **Performance Monitoring**: Code execution times, error rates
- **Usage Patterns**: Peak hours, device types, geographic data

### Privacy-First Analytics
- **No Personal Tracking**: Only aggregate, anonymized data
- **User Consent**: Optional analytics with clear opt-out
- **Data Retention**: Automatic cleanup of old analytics data
- **Transparent Reporting**: Public dashboard of platform usage

## 💰 Cost Breakdown (Free Tier Limits)

### Hosting (Netlify Free)
- **Bandwidth**: 100GB/month
- **Build Minutes**: 300 minutes/month
- **Sites**: Unlimited
- **Users**: Up to 300 concurrent users easily supported

### Database (Supabase Free)
- **Database Size**: 500MB
- **Bandwidth**: 2GB/month
- **API Requests**: 50,000/month
- **Authentication**: 50,000 monthly active users

### Estimated Capacity
- **300 Active Users**: Well within all free tier limits
- **Storage per User**: ~1MB (code + progress)
- **Monthly Requests**: ~10,000 (well under 50k limit)
- **Total Cost**: $0/month

## 🔒 Security

### Sandboxing
- WebAssembly provides natural sandboxing
- No file system access outside virtual environment
- Network requests blocked by default
- Memory and execution time limits enforced

### Authentication Security
- **JWT Tokens**: Secure, stateless authentication
- **Password Hashing**: bcrypt with salt rounds
- **Session Management**: Automatic token refresh
- **Rate Limiting**: Built-in Supabase protection

## 🎨 Customization

### Theming
The platform supports light/dark themes:
- Edit `src/contexts/ThemeContext.tsx`
- Customize colors in Tailwind configuration
- Add new theme variants as needed

### Branding
- Update logos and icons in `public/` directory
- Modify color scheme in `tailwind.config.js`
- Customize fonts and typography

### Exercise Customization
- **Add Categories**: Extend exercise categories in `exercises.ts`
- **Custom Test Cases**: Create complex input/output scenarios
- **Difficulty Scaling**: Implement progressive difficulty
- **Hints System**: Add contextual help for struggling users

## 📈 Performance

### Optimization Strategies
- **Code Splitting**: Dynamic imports for large components
- **Lazy Loading**: Exercise content loaded on demand
- **Caching**: Aggressive caching of compiled WASM modules
- **Minification**: Optimized production builds
- **Service Worker**: Offline caching and background sync
- **Image Optimization**: WebP format with fallbacks

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Load Times**: Monitor initial and subsequent page loads
- **Mobile Performance**: Specific mobile device testing
- **Offline Functionality**: Service worker cache effectiveness

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Standards
- Use TypeScript for all new code
- Follow React best practices
- Add comprehensive comments
- Include unit tests for utilities
- Update documentation
- Test on mobile devices
- Verify PWA functionality

### Mobile Development Guidelines
- **Touch Targets**: Minimum 44px touch targets
- **Responsive Breakpoints**: Mobile-first approach
- **Performance**: Optimize for slower mobile networks
- **Accessibility**: Screen reader and keyboard navigation support

## 🚀 Roadmap

### Phase 1: Core Platform ✅
- [x] WebAssembly C compiler
- [x] Exercise system
- [x] User authentication
- [x] Progress tracking

### Phase 2: Mobile Optimization ✅
- [x] Responsive design
- [x] Virtual keyboard
- [x] PWA support
- [x] Touch interactions

### Phase 3: Enhanced Features (Planned)
- [ ] Code sharing and collaboration
- [ ] Leaderboards and achievements
- [ ] Advanced debugging tools
- [ ] Video tutorials integration
- [ ] AI-powered code suggestions
- [ ] Multi-language support

### Phase 4: Community Features (Future)
- [ ] User-generated exercises
- [ ] Peer code review
- [ ] Discussion forums
- [ ] Live coding sessions
- [ ] Instructor dashboard
- [ ] Classroom management

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Monaco Editor** for the excellent code editing experience
- **Emscripten** for making C compilation in the browser possible
- **React** and **Vite** for the development framework
- **Tailwind CSS** for the styling system
- **Supabase** for the backend-as-a-service platform
- **Netlify** for free, reliable hosting
- **YouCode** for the educational requirements

## 📞 Support

- Create an issue on GitHub for bug reports
- Join discussions for feature requests
- Check the documentation for common questions
- Review the code for implementation details

### Common Issues

#### PWA Installation
- Ensure HTTPS is enabled
- Check manifest.json is accessible
- Verify service worker registration

#### Mobile Virtual Keyboard
- Test on actual devices, not just browser emulation
- Ensure Monaco editor focus events work correctly
- Check touch event handling

#### Supabase Connection
- Verify environment variables are set correctly
- Check Supabase project settings
- Ensure RLS policies are properly configured

---

Built with ❤️ for the mobile-first coding education community. Code anywhere, anytime! 📱💻