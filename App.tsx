import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TamaguiProvider } from '@tamagui/core';

// Import configurations
import config from './tamagui.config';
import i18n from './src/localization/i18n';

// Import store
import { useAppStore } from './src/store/appStore';

// Import screens
import HomeScreen from './src/screens/HomeScreen';

// Create QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// App component
export default function App() {
  const { currentLanguage, theme } = useAppStore();

  useEffect(() => {
    // Set i18n language when store language changes
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config} defaultTheme={theme === 'light' ? 'zuzuLight' : 'zuzuDark'}>
        <I18nextProvider i18n={i18n}>
          <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
          <HomeScreen />
        </I18nextProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}

