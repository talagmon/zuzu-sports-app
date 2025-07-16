# 🎮 ZuzSports - Kids Fitness App

A modern React Native application for kids' fitness and workouts, featuring Hebrew/English localization and rich media content from Cloudinary.

## 🚀 Technology Stack (As Requested)

### **UI Kit & Styling**
- **Tamagui** - High-performance, themeable components with flawless RTL support
- Custom ZuzSports theme with vibrant colors for kids

### **Animations**
- **React Native Reanimated** - Smooth UI animations and transitions
- **React Native Skia** - Custom 2D graphics and particle effects

### **State Management**
- **Zustand** - Simple, fast global state management
- Devtools integration for debugging

### **Data & Caching**
- **TanStack Query** - Managing API data and client-side caching
- Cloudinary API integration for video/image content

### **Localization**
- **i18next** - Managing English/Hebrew text with RTL support
- Automatic device language detection

## 📱 Features

### **Core Functionality**
- ✅ **Hebrew/English Localization** with automatic RTL layout
- ✅ **Cloudinary Video Integration** with 300+ workout videos
- ✅ **Workout Categories** (Family, Dance, Power, Yoga, Static)
- ✅ **Animated Statistics** with real-time counters
- ✅ **Video Player** with custom controls
- ✅ **Responsive Design** for all screen sizes

### **Advanced Features**
- ✅ **Smooth Animations** using Reanimated
- ✅ **Custom Graphics** with Skia particles
- ✅ **Theme Support** (Light/Dark modes)
- ✅ **Offline Caching** with TanStack Query
- ✅ **Performance Optimized** with Tamagui

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- npm 8+
- Expo CLI
- React Native development environment

### Install Dependencies
```bash
npm install
```

### Configure Environment
1. Update Cloudinary credentials in `src/services/cloudinaryApi.ts`
2. Customize theme colors in `tamagui.config.ts`
3. Add/modify translations in `src/localization/locales/`

## 🏃‍♂️ Running the App

### Development
```bash
# Start Expo development server
npm start

# Run on specific platforms
npm run android    # Android
npm run ios        # iOS (requires macOS)
npm run web        # Web browser
```

### Production Build
```bash
# Build for web deployment
npm run build:web

# Build for mobile app stores
npm run build:android
npm run build:ios
```

## 🚀 Deployment to Fly.io

### Prerequisites
- Install [Fly CLI](https://fly.io/docs/getting-started/installing-flyctl/)
- Create Fly.io account

### Deploy Steps
```bash
# Login to Fly.io
fly auth login

# Deploy the app
npm run deploy
```

### Configuration
- **fly.toml** - Fly.io app configuration
- **Dockerfile** - Multi-stage build with Nginx
- **nginx.conf** - Web server configuration

## 📁 Project Structure

```
zuzu-rn-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── HeroSection.tsx  # Hero with Skia graphics
│   │   ├── VideoPlayer.tsx  # Custom video player
│   │   ├── WorkoutCategoryCard.tsx
│   │   └── StatsSection.tsx # Animated statistics
│   ├── screens/
│   │   └── HomeScreen.tsx   # Main app screen
│   ├── store/
│   │   └── appStore.ts      # Zustand state management
│   ├── services/
│   │   └── cloudinaryApi.ts # TanStack Query API
│   └── localization/
│       ├── i18n.ts          # i18next configuration
│       └── locales/         # Translation files
│           ├── en.json      # English translations
│           └── he.json      # Hebrew translations
├── App.tsx                  # Main app component
├── tamagui.config.ts        # Tamagui theme configuration
├── babel.config.js          # Babel with Tamagui plugin
├── fly.toml                 # Fly.io configuration
├── Dockerfile               # Docker build configuration
└── nginx.conf               # Nginx web server config
```

## 🎨 Customization

### Theme Colors
Edit `tamagui.config.ts` to customize the color scheme:
```typescript
themes: {
  zuzuLight: {
    primary: '#ff6b6b',      // Main brand color
    secondary: '#4ecdc4',    // Secondary color
    accent: '#feca57',       // Accent color
    // ... more colors
  }
}
```

### Translations
Add new languages by creating files in `src/localization/locales/`:
```json
{
  "app": {
    "name": "Your App Name",
    "tagline": "Your Tagline"
  },
  // ... more translations
}
```

### Animations
Customize animations in components using Reanimated:
```typescript
const fadeAnim = useSharedValue(0);
fadeAnim.value = withSpring(1, { damping: 15 });
```

## 🔧 API Integration

### Cloudinary Setup
1. Update credentials in `src/services/cloudinaryApi.ts`
2. Configure video categorization logic
3. Customize video processing functions

### Adding New APIs
1. Create service files in `src/services/`
2. Use TanStack Query hooks for data fetching
3. Update Zustand store for state management

## 📊 Performance

### Optimizations Included
- **Lazy Loading** - Components load on demand
- **Image Optimization** - Cloudinary automatic optimization
- **Caching** - TanStack Query with 5-minute stale time
- **Bundle Splitting** - Automatic code splitting
- **Gzip Compression** - Nginx compression enabled

### Monitoring
- React Native Performance Monitor
- Flipper integration for debugging
- Zustand DevTools for state inspection

## 🌐 Internationalization (i18n)

### Supported Languages
- **Hebrew (he)** - Primary language with RTL support
- **English (en)** - Secondary language

### RTL Support
- Automatic layout direction based on language
- Tamagui built-in RTL support
- Custom RTL-aware components

### Adding Languages
1. Create translation file in `src/localization/locales/`
2. Update `i18n.ts` configuration
3. Add language to supported languages array

## 🔒 Security

### Implemented Measures
- **API Key Protection** - Server-side API calls
- **Content Security Policy** - Nginx headers
- **XSS Protection** - Security headers enabled
- **HTTPS Enforcement** - Fly.io automatic HTTPS

## 📱 Mobile App Deployment

### iOS App Store
1. Build with `npm run build:ios`
2. Use Xcode for final build and submission
3. Follow Apple App Store guidelines

### Google Play Store
1. Build with `npm run build:android`
2. Generate signed APK/AAB
3. Upload to Google Play Console

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch
3. Follow coding standards
4. Add tests for new features
5. Submit pull request

### Code Standards
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Conventional commits

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

### Documentation
- [Tamagui Docs](https://tamagui.dev/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [TanStack Query](https://tanstack.com/query/)
- [i18next](https://www.i18next.com/)

### Issues
- Report bugs via GitHub Issues
- Feature requests welcome
- Community support available

---

## 🎯 Project Goals Achieved

✅ **Technology Stack Compliance**
- Tamagui for UI components and RTL support
- React Native Reanimated for animations
- React Native Skia for custom graphics
- Zustand for state management
- TanStack Query for data management
- i18next for Hebrew/English localization

✅ **Deployment Ready**
- Fly.io configuration complete
- Docker multi-stage build
- Nginx production server
- Performance optimized

✅ **Feature Complete**
- Cloudinary video integration
- Hebrew/English localization
- Smooth animations
- Responsive design
- Production ready

**🚀 Ready for production deployment to Fly.io!**

