import React, { useEffect } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { 
  YStack, 
  XStack, 
  Text, 
  Button, 
  Spinner,
  Theme,
  View,
  SafeAreaView
} from '@tamagui/core';
import { LinearGradient } from '@tamagui/linear-gradient';
import Animated, { 
  FadeInDown, 
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate
} from 'react-native-reanimated';

// Import components
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import WorkoutCategoryCard from '../components/WorkoutCategoryCard';

// Import hooks and store
import { useAppStore } from '../store/appStore';
import { 
  useWorkoutCategories, 
  useFeaturedVideos, 
  useAppStats 
} from '../services/cloudinaryApi';
import { getTextDirection } from '../localization/i18n';

// Animated components
const AnimatedYStack = Animated.createAnimatedComponent(YStack);
const AnimatedXStack = Animated.createAnimatedComponent(XStack);

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { 
    currentLanguage, 
    isRTL, 
    theme,
    setWorkoutCategories,
    setFeaturedVideos,
    setAppStats,
    setLoading,
    setError,
    isLoading,
    error
  } = useAppStore();

  // Queries
  const { 
    data: categories, 
    isLoading: categoriesLoading, 
    error: categoriesError,
    refetch: refetchCategories
  } = useWorkoutCategories();
  
  const { 
    data: featuredVideos, 
    isLoading: videosLoading, 
    error: videosError,
    refetch: refetchVideos
  } = useFeaturedVideos();
  
  const { 
    data: appStats, 
    isLoading: statsLoading, 
    error: statsError,
    refetch: refetchStats
  } = useAppStats();

  // Animation values
  const floatingAnimation = useSharedValue(0);
  const pulseAnimation = useSharedValue(1);

  // Start animations
  useEffect(() => {
    floatingAnimation.value = withRepeat(
      withTiming(1, { duration: 3000 }),
      -1,
      true
    );
    
    pulseAnimation.value = withRepeat(
      withTiming(1.1, { duration: 2000 }),
      -1,
      true
    );
  }, []);

  // Update store when data changes
  useEffect(() => {
    if (categories) {
      setWorkoutCategories(categories);
    }
  }, [categories, setWorkoutCategories]);

  useEffect(() => {
    if (featuredVideos) {
      setFeaturedVideos(featuredVideos);
    }
  }, [featuredVideos, setFeaturedVideos]);

  useEffect(() => {
    if (appStats) {
      setAppStats(appStats);
    }
  }, [appStats, setAppStats]);

  // Update loading state
  useEffect(() => {
    const loading = categoriesLoading || videosLoading || statsLoading;
    setLoading(loading);
  }, [categoriesLoading, videosLoading, statsLoading, setLoading]);

  // Update error state
  useEffect(() => {
    const errorMessage = categoriesError?.message || videosError?.message || statsError?.message;
    setError(errorMessage || null);
  }, [categoriesError, videosError, statsError, setError]);

  // Animated styles
  const floatingStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(floatingAnimation.value, [0, 1], [0, -10])
        }
      ]
    };
  });

  const pulseStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: pulseAnimation.value
        }
      ]
    };
  });

  // Refresh handler
  const onRefresh = async () => {
    await Promise.all([
      refetchCategories(),
      refetchVideos(),
      refetchStats()
    ]);
  };

  // Features data
  const features = [
    {
      icon: '🎮',
      titleKey: 'features.games.title',
      descriptionKey: 'features.games.description',
    },
    {
      icon: '👨‍👩‍👧‍👦',
      titleKey: 'features.family.title',
      descriptionKey: 'features.family.description',
    },
    {
      icon: '🏃‍♀️',
      titleKey: 'features.variety.title',
      descriptionKey: 'features.variety.description',
    },
    {
      icon: '🛡️',
      titleKey: 'features.safety.title',
      descriptionKey: 'features.safety.description',
    },
  ];

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Theme name={theme === 'light' ? 'zuzuLight' : 'zuzuDark'}>
          <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
            <Text fontSize="$6" color="$error" textAlign="center" marginBottom="$4">
              {t('common.error')}: {error}
            </Text>
            <Button onPress={onRefresh} theme="active">
              {t('common.retry')}
            </Button>
          </YStack>
        </Theme>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, direction: getTextDirection(currentLanguage) }}>
      <Theme name={theme === 'light' ? 'zuzuLight' : 'zuzuDark'}>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <HeroSection />

          {/* Features Section */}
          <AnimatedYStack
            entering={FadeInUp.delay(200)}
            padding="$4"
            space="$4"
          >
            <Animated.View style={floatingStyle}>
              <Text 
                fontSize="$8" 
                fontWeight="bold" 
                textAlign="center"
                color="$color"
                marginBottom="$4"
              >
                {t('features.title')}
              </Text>
            </Animated.View>

            <YStack space="$3">
              {features.map((feature, index) => (
                <AnimatedXStack
                  key={feature.titleKey}
                  entering={FadeInDown.delay(300 + index * 100)}
                  padding="$4"
                  backgroundColor="$background"
                  borderRadius="$4"
                  borderWidth={1}
                  borderColor="$borderColor"
                  space="$3"
                  alignItems="center"
                  flexDirection={isRTL ? 'row-reverse' : 'row'}
                >
                  <Animated.View style={pulseStyle}>
                    <Text fontSize="$6">{feature.icon}</Text>
                  </Animated.View>
                  <YStack flex={1} space="$2">
                    <Text 
                      fontSize="$5" 
                      fontWeight="600"
                      color="$color"
                      textAlign={isRTL ? 'right' : 'left'}
                    >
                      {t(feature.titleKey)}
                    </Text>
                    <Text 
                      fontSize="$3" 
                      color="$placeholderColor"
                      textAlign={isRTL ? 'right' : 'left'}
                    >
                      {t(feature.descriptionKey)}
                    </Text>
                  </YStack>
                </AnimatedXStack>
              ))}
            </YStack>
          </AnimatedYStack>

          {/* Stats Section */}
          <StatsSection />

          {/* Categories Section */}
          <AnimatedYStack
            entering={FadeInUp.delay(600)}
            padding="$4"
            space="$4"
          >
            <Text 
              fontSize="$8" 
              fontWeight="bold" 
              textAlign="center"
              color="$color"
            >
              {t('categories.title')}
            </Text>

            {isLoading ? (
              <YStack alignItems="center" padding="$8">
                <Spinner size="large" color="$primary" />
                <Text marginTop="$2" color="$placeholderColor">
                  {t('common.loading')}
                </Text>
              </YStack>
            ) : (
              <YStack space="$3">
                {categories?.map((category, index) => (
                  <WorkoutCategoryCard
                    key={category.id}
                    category={category}
                    index={index}
                  />
                ))}
              </YStack>
            )}
          </AnimatedYStack>

          {/* Call to Action Section */}
          <AnimatedYStack
            entering={FadeInUp.delay(800)}
            padding="$4"
            space="$4"
            marginBottom="$8"
          >
            <LinearGradient
              colors={['$primary', '$secondary', '$accent']}
              start={[0, 0]}
              end={[1, 1]}
              borderRadius="$6"
              padding="$6"
            >
              <YStack space="$4" alignItems="center">
                <Text 
                  fontSize="$8" 
                  fontWeight="bold" 
                  color="white"
                  textAlign="center"
                >
                  {t('cta.title')}
                </Text>
                <Text 
                  fontSize="$4" 
                  color="white"
                  textAlign="center"
                  opacity={0.9}
                >
                  {t('cta.description')}
                </Text>
                
                <XStack space="$3" flexWrap="wrap" justifyContent="center">
                  <Button
                    size="$5"
                    backgroundColor="white"
                    color="$primary"
                    borderRadius="$4"
                    fontWeight="600"
                    pressStyle={{ scale: 0.95 }}
                    icon="📱"
                  >
                    {t('cta.appStore')}
                  </Button>
                  <Button
                    size="$5"
                    backgroundColor="white"
                    color="$primary"
                    borderRadius="$4"
                    fontWeight="600"
                    pressStyle={{ scale: 0.95 }}
                    icon="📱"
                  >
                    {t('cta.googlePlay')}
                  </Button>
                </XStack>
              </YStack>
            </LinearGradient>
          </AnimatedYStack>

          {/* Footer */}
          <YStack padding="$4" alignItems="center">
            <Text 
              fontSize="$2" 
              color="$placeholderColor"
              textAlign="center"
            >
              {t('footer.copyright')}
            </Text>
          </YStack>
        </ScrollView>
      </Theme>
    </SafeAreaView>
  );
};

export default HomeScreen;

