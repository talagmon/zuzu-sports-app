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
  View
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
      <View style={{ flex: 1 }}>
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
      </View>
    );
  }

  return (
    <View style={{ flex: 1, direction: getTextDirection(currentLanguage) }}>
      <Theme name={theme === 'light' ? 'zuzuLight' : 'zuzuDark'}>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={{ position: 'relative', height: 400 }}>
            {/* Background Gradient */}
            <LinearGradient
              colors={[
                theme === 'light' ? '#ff6b35' : '#ff8a65',
                theme === 'light' ? '#e91e63' : '#f06292',
                theme === 'light' ? '#9c27b0' : '#ba68c8'
              ]}
              start={[0, 0]}
              end={[1, 1]}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />

            {/* Content */}
            <AnimatedYStack
              entering={FadeInUp.delay(100)}
              flex={1}
              justifyContent="center"
              alignItems="center"
              padding="$6"
              space="$4"
              style={{ zIndex: 10 }}
            >
              {/* Main Title */}
              <Animated.View style={floatingStyle}>
                <Text
                  fontSize="$10"
                  fontWeight="900"
                  color="white"
                  textAlign="center"
                  fontFamily="$hebrew"
                >
                  {t('app.title')}
                </Text>
              </Animated.View>

              {/* Subtitle */}
              <Text
                fontSize="$6"
                color="white"
                textAlign="center"
                opacity={0.95}
                fontFamily="$hebrew"
              >
                {t('app.subtitle')}
              </Text>

              {/* Description */}
              <Text
                fontSize="$4"
                color="white"
                textAlign="center"
                opacity={0.9}
                maxWidth={300}
                lineHeight="$2"
                fontFamily="$hebrew"
              >
                {t('app.description')}
              </Text>

              {/* Call to Action Button */}
              <Animated.View style={pulseStyle}>
                <Button
                  size="$6"
                  backgroundColor="white"
                  color="$primary"
                  borderRadius="$6"
                  fontWeight="700"
                  fontSize="$5"
                  pressStyle={{ 
                    scale: 0.95,
                    backgroundColor: '$backgroundHover'
                  }}
                  onPress={() => {
                    alert('זוזו ספורט - בקרוב באפליקציה!');
                  }}
                >
                  {t('app.tagline')}
                </Button>
              </Animated.View>
            </AnimatedYStack>
          </View>

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
          <AnimatedYStack
            entering={FadeInUp.delay(400)}
            padding="$4"
            space="$4"
            backgroundColor={theme === 'light' ? '$backgroundHover' : '$background'}
          >
            <Text 
              fontSize="$8" 
              fontWeight="bold" 
              textAlign="center"
              color="$color"
              marginBottom="$2"
            >
              {t('stats.title')}
            </Text>

            <XStack 
              flexWrap="wrap" 
              justifyContent="center" 
              space="$3"
              gap="$3"
            >
              {[
                { value: appStats?.totalVideos || 300, labelKey: 'stats.videos', icon: '🎥', color: '#ff6b35' },
                { value: appStats?.activeKids || 50000, labelKey: 'stats.kids', icon: '👶', color: '#e91e63' },
                { value: appStats?.categories || 5, labelKey: 'stats.categories', icon: '🏃', color: '#9c27b0' },
                { value: 10000, labelKey: 'stats.families', icon: '👨‍👩‍👧‍👦', color: '#4caf50' },
              ].map((stat, index) => (
                <LinearGradient
                  key={stat.labelKey}
                  colors={[stat.color, `${stat.color}CC`, `${stat.color}99`]}
                  start={[0, 0]}
                  end={[1, 1]}
                  borderRadius="$4"
                  padding="$4"
                  alignItems="center"
                  space="$2"
                  minWidth={120}
                >
                  <View
                    backgroundColor="rgba(255,255,255,0.2)"
                    borderRadius="$6"
                    padding="$2"
                    alignItems="center"
                    justifyContent="center"
                    width={50}
                    height={50}
                  >
                    <Text fontSize="$6">{stat.icon}</Text>
                  </View>
                  <Text
                    fontSize="$8"
                    fontWeight="900"
                    color="white"
                    textAlign="center"
                  >
                    {stat.value >= 1000 ? `${Math.floor(stat.value / 1000)}K+` : `${stat.value}+`}
                  </Text>
                  <Text
                    fontSize="$3"
                    color="white"
                    textAlign="center"
                    opacity={0.9}
                    fontWeight="600"
                    numberOfLines={2}
                  >
                    {t(stat.labelKey)}
                  </Text>
                </LinearGradient>
              ))}
            </XStack>
          </AnimatedYStack>

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
                {[
                  { id: 'family', nameKey: 'categories.family.name', descriptionKey: 'categories.family.description', icon: '👨‍👩‍👧‍👦', color: '#ff6b35', videos: 37 },
                  { id: 'dance', nameKey: 'categories.dance.name', descriptionKey: 'categories.dance.description', icon: '💃', color: '#e91e63', videos: 36 },
                  { id: 'power', nameKey: 'categories.power.name', descriptionKey: 'categories.power.description', icon: '💪', color: '#9c27b0', videos: 41 },
                  { id: 'yoga', nameKey: 'categories.yoga.name', descriptionKey: 'categories.yoga.description', icon: '🧘', color: '#4caf50', videos: 25 },
                ].map((category, index) => (
                  <LinearGradient
                    key={category.id}
                    colors={[category.color, `${category.color}CC`, `${category.color}99`]}
                    start={[0, 0]}
                    end={[1, 1]}
                    borderRadius="$4"
                    padding="$4"
                    marginHorizontal="$2"
                  >
                    <XStack 
                      alignItems="center" 
                      space="$3"
                      flexDirection={isRTL ? 'row-reverse' : 'row'}
                    >
                      <View
                        backgroundColor="rgba(255,255,255,0.2)"
                        borderRadius="$6"
                        padding="$3"
                        alignItems="center"
                        justifyContent="center"
                        width={60}
                        height={60}
                      >
                        <Text fontSize="$7">{category.icon}</Text>
                      </View>

                      <YStack flex={1} space="$2">
                        <Text
                          fontSize="$6"
                          fontWeight="bold"
                          color="white"
                          textAlign={isRTL ? 'right' : 'left'}
                        >
                          {t(category.nameKey)}
                        </Text>
                        <Text
                          fontSize="$3"
                          color="white"
                          opacity={0.9}
                          textAlign={isRTL ? 'right' : 'left'}
                        >
                          {t(category.descriptionKey)}
                        </Text>
                        <XStack 
                          alignItems="center" 
                          space="$2"
                          flexDirection={isRTL ? 'row-reverse' : 'row'}
                        >
                          <Text fontSize="$2" color="white" opacity={0.8}>
                            {category.videos} {t('common.videos')}
                          </Text>
                          <View
                            backgroundColor="rgba(255,255,255,0.3)"
                            borderRadius="$2"
                            paddingHorizontal="$2"
                            paddingVertical="$1"
                          >
                            <Text fontSize="$1" color="white" fontWeight="600">
                              {category.id.toUpperCase()}
                            </Text>
                          </View>
                        </XStack>
                      </YStack>

                      <Button
                        size="$3"
                        backgroundColor="rgba(255,255,255,0.2)"
                        color="white"
                        borderRadius="$3"
                        borderWidth={1}
                        borderColor="rgba(255,255,255,0.3)"
                        pressStyle={{
                          backgroundColor: 'rgba(255,255,255,0.3)',
                          scale: 0.95,
                        }}
                        onPress={() => {
                          alert(`צפה ב-${category.videos} סרטוני ${t(category.nameKey)}`);
                        }}
                      >
                        צפה
                      </Button>
                    </XStack>
                  </LinearGradient>
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
                    onPress={() => {
                      alert('הורדת האפליקציה מחנות האפליקציות - בקרוב!');
                    }}
                  >
                    📱 {t('cta.appStore')}
                  </Button>
                  <Button
                    size="$5"
                    backgroundColor="white"
                    color="$primary"
                    borderRadius="$4"
                    fontWeight="600"
                    pressStyle={{ scale: 0.95 }}
                    onPress={() => {
                      alert('הורדת האפליקציה מגוגל פליי - בקרוב!');
                    }}
                  >
                    📱 {t('cta.googlePlay')}
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
    </View>
  );
};

export default HomeScreen;

