# 🎮 ZuzSports - Fun Fitness App for Kids

A modern React Native application designed for kids aged 6-12, featuring Hebrew/English localization and engaging workout content from Cloudinary.

## 🌟 Features

- 🇮🇱 **Hebrew/English Support** with automatic RTL layout
- 🎥 **300+ Workout Videos** integrated from Cloudinary
- 🎨 **Modern UI** with Tamagui components
- ✨ **Smooth Animations** using React Native Reanimated
- 🎯 **Custom Graphics** with React Native Skia
- 📱 **Mobile-First Design** optimized for kids
- 🔐 **Secure Configuration** with environment variables

## 🛠️ Technology Stack

### **Core Technologies (As Requested)**
- **UI Kit & Styling**: [Tamagui](https://tamagui.dev/) - High-performance, themeable components with flawless RTL support
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Smooth UI animations and transitions
- **Custom Graphics**: [React Native Skia](https://shopify.github.io/react-native-skia/) - Custom 2D graphics and particle effects
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) - Simple, fast global state management
- **Data & Caching**: [TanStack Query](https://tanstack.com/query/latest) - Managing API data and client-side caching
- **Localization**: [i18next](https://www.i18next.com/) - Managing English/Hebrew text with RTL support

### **Additional Technologies**
- **Framework**: React Native with Expo
- **Media**: Cloudinary for video/image management
- **Deployment**: Fly.io for web deployment
- **Version Control**: Git with GitHub

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/talagmon/zuzu-sports-app.git
   cd zuzu-sports-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Cloudinary credentials
   ```

4. **Start development server**
   ```bash
   npm start
   ```

## 🔐 Environment Setup

### Required Environment Variables

Create a `.env` file in the root directory:

```env
# Cloudinary Configuration
EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# App Configuration
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_API_BASE_URL=https://api.zuzusports.com
```

### Security Notes
- ⚠️ **Never commit `.env` files to version control**
- 🔒 **Use different API keys for development/production**
- 📊 **Monitor API usage regularly**
- 🔄 **Rotate API keys monthly**

See [SECURITY.md](./SECURITY.md) for detailed security guidelines.

## 📱 Available Scripts

```bash
# Development
npm start              # Start Expo development server
npm run web            # Run in web browser
npm run android        # Run on Android device/emulator
npm run ios            # Run on iOS device/simulator

# Building
npm run build:web      # Build for web deployment
npm run build:android  # Build Android APK
npm run build:ios      # Build iOS app

# Deployment
npm run deploy         # Deploy to Fly.io
```

## 🌍 Localization

The app supports Hebrew and English with automatic RTL layout:

- **Hebrew**: Primary language for Israeli kids
- **English**: Secondary language support
- **RTL Support**: Automatic right-to-left layout for Hebrew
- **Dynamic Switching**: Users can switch languages in-app

### Adding New Languages

1. Create new locale file in `src/localization/locales/`
2. Add language to `i18n.ts` configuration
3. Update RTL language list if needed

## 🎥 Cloudinary Integration

The app integrates with Cloudinary for media management:

- **Video Categories**: Family, Dance, Power, Yoga, Static
- **Optimized Delivery**: Automatic format and quality optimization
- **Thumbnail Generation**: Auto-generated video thumbnails
- **Responsive Images**: Multiple sizes for different devices

### Video Categories
- 👨‍👩‍👧‍👦 **Family**: Fun family exercises
- 💃 **Dance**: Energetic and fun dances  
- 💪 **Power**: Muscle strengthening exercises
- 🧘 **Yoga**: Calming yoga for kids
- 🏃 **Static**: Equipment-free exercises

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── HeroSection.tsx
│   ├── StatsSection.tsx
│   ├── VideoPlayer.tsx
│   └── WorkoutCategoryCard.tsx
├── config/             # Configuration files
│   └── environment.ts  # Secure environment management
├── localization/       # Internationalization
│   ├── i18n.ts
│   └── locales/
│       ├── en.json
│       └── he.json
├── screens/            # App screens
│   └── HomeScreen.tsx
├── services/           # API services
│   └── cloudinaryApi.ts
└── store/              # State management
    └── appStore.ts
```

## 🚀 Deployment

### Web Deployment (Fly.io)

1. **Install Fly CLI**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login to Fly.io**
   ```bash
   fly auth login
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### Mobile App Stores

1. **Build for Android**
   ```bash
   npm run build:android
   ```

2. **Build for iOS**
   ```bash
   npm run build:ios
   ```

3. **Submit to stores** using Expo Application Services (EAS)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 **Email**: support@zuzusports.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/talagmon/zuzu-sports-app/issues)
- 📖 **Documentation**: [Wiki](https://github.com/talagmon/zuzu-sports-app/wiki)

## 🙏 Acknowledgments

- **Tamagui Team** for the amazing UI framework
- **Expo Team** for the excellent development platform
- **Cloudinary** for powerful media management
- **React Native Community** for continuous innovation

---

**Made with ❤️ for kids and families by the ZuzSports team**

