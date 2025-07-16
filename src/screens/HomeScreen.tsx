import React, { useEffect } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { 
  YStack, 
  XStack, 
  Text, 
  Button, 
  Card, 
  Image,
  Spinner,
  useTheme
} from '@tamagui/core';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withRepeat, 
  withTiming,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

// Import services and store
import { useWorkoutCategories, useCloudinaryVideos } from '../services/cloudinaryApi';
import { useAppStore } from '../store/appStore';

// Import components
import VideoPlayer from '../components/VideoPlayer';
import WorkoutCategoryCard from '../components/WorkoutCategoryCard';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { 
    isRTL, 
    selectedVideo, 
    isVideoModalOpen, 
    setVideoModalOpen,
    setWorkoutCategories,
    setFeaturedVideos,
    setLoading,
    setError
  } = useAppStore();

  // Fetch data using TanStack Query
  const { 
    data: workoutCategories, 
    isLoading: categoriesLoading, 
    error: categoriesError 
  } = useWorkoutCategories();
  
  const { 
    data: videos, 
    isLoading: videosLoading, 
    error: videosError 
  } = useCloudinaryVideos();

  // Animation values
  const fadeAnim = useSharedValue(0);
  const slideAnim = useSharedValue(50);
  const scaleAnim = useSharedValue(0.8);
  const rotateAnim = useSharedValue(0);

  // Initialize animations
  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 1000 });
    slideAnim.value = withSpring(0, { damping: 15, stiffness: 150 });
    scaleAnim.value = withSpring(1, { damping: 12, stiffness: 100 });
    
    // Continuous rotation for loading elements
    rotateAnim.value = withRepeat(
      withTiming(360, { duration: 2000 }),
      -1,
      false
    );
  }, []);

  // Update store when data changes
  useEffect(() => {
    if (workoutCategories) {
      setWorkoutCategories(workoutCategories);
    }
  }, [workoutCategories, setWorkoutCategories]);

  useEffect(() => {
    if (videos) {
      setFeaturedVideos(videos.slice(0, 4)); // Set first 4 as featured
    }
  }, [videos, setFeaturedVideos]);

  useEffect(() => {
    setLoading(categoriesLoading || videosLoading);
  }, [categoriesLoading, videosLoading, setLoading]);

  useEffect(() => {
    if (categoriesError || videosError) {
      setError(categoriesError?.message || videosError?.message || 'Unknown error');
    } else {
      setError(null);
    }
  }, [categoriesError, videosError, setError]);

  // Animated styles
  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      transform: [
        { translateY: slideAnim.value },
        { scale: scaleAnim.value }
      ],
    };
  });

  const loadingAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotateAnim.value}deg` }
      ],
    };
  });

  if (categoriesLoading || videosLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor={theme.background}>
        <Animated.View style={loadingAnimatedStyle}>
          <Spinner size="large" color={theme.primary} />
        </Animated.View>
        <Text marginTop="$4" fontSize="$6" color={theme.color}>
          {t('common.loading')}
        </Text>
      </YStack>
    );
  }

  if (categoriesError || videosError) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor={theme.background} padding="$4">
        <Text fontSize="$6" color={theme.color} textAlign="center" marginBottom="$4">
          {t('common.error')}
        </Text>
        <Text fontSize="$4" color={theme.colorPress} textAlign="center" marginBottom="$6">
          {categoriesError?.message || videosError?.message}
        </Text>
        <Button 
          onPress={() => window.location.reload()} 
          backgroundColor={theme.primary}
          color="white"
        >
          {t('common.retry')}
        </Button>
      </YStack>
    );
  }

  return (
    <Animated.View style={[{ flex: 1 }, containerAnimatedStyle]}>
      <ScrollView 
        style={{ flex: 1, backgroundColor: theme.background }}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Videos Section */}
        <YStack padding="$4" marginTop="$6">
          <Text 
            fontSize="$8" 
            fontWeight="bold" 
            color={theme.primary}
            textAlign={isRTL ? 'right' : 'left'}
            marginBottom="$4"
          >
            {t('sections.featuredWorkouts')}
          </Text>
          
          <XStack flexWrap="wrap" justifyContent="space-between">
            {videos?.slice(0, 4).map((video, index) => (
              <Card
                key={video.public_id}
                width="48%"
                marginBottom="$3"
                backgroundColor={theme.backgroundHover}
                borderRadius="$4"
                overflow="hidden"
                pressStyle={{ scale: 0.95 }}
                onPress={() => {
                  useAppStore.getState().setSelectedVideo(video);
                  useAppStore.getState().setVideoModalOpen(true);
                }}
              >
                <VideoPlayer
                  videoUrl={video.secure_url}
                  width={screenWidth * 0.44}
                  height={120}
                  showControls={false}
                />
                <YStack padding="$2">
                  <Text fontSize="$3" color={theme.color} numberOfLines={2}>
                    {t('buttons.startWorkout')} {index + 1}
                  </Text>
                </YStack>
              </Card>
            ))}
          </XStack>
        </YStack>

        {/* Workout Categories Section */}
        <YStack padding="$4" marginTop="$4">
          <Text 
            fontSize="$8" 
            fontWeight="bold" 
            color={theme.primary}
            textAlign={isRTL ? 'right' : 'left'}
            marginBottom="$4"
          >
            {t('sections.workoutTypes')}
          </Text>
          
          <YStack space="$3">
            {workoutCategories?.map((category, index) => (
              <WorkoutCategoryCard
                key={category.name}
                category={category}
                index={index}
              />
            ))}
          </YStack>
        </YStack>

        {/* Statistics Section */}
        <StatsSection />

        {/* Download CTA Section */}
        <YStack 
          padding="$6" 
          marginTop="$6"
          backgroundColor={theme.primary}
          marginHorizontal="$4"
          borderRadius="$6"
        >
          <Text 
            fontSize="$9" 
            fontWeight="bold" 
            color="white"
            textAlign="center"
            marginBottom="$4"
          >
            {t('sections.downloadApp')}
          </Text>
          
          <XStack space="$3" justifyContent="center" flexWrap="wrap">
            <Button
              backgroundColor={theme.secondary}
              color="white"
              fontSize="$5"
              paddingHorizontal="$6"
              paddingVertical="$3"
              borderRadius="$4"
              pressStyle={{ scale: 0.95 }}
            >
              {t('buttons.appStore')}
            </Button>
            
            <Button
              backgroundColor={theme.accent}
              color="white"
              fontSize="$5"
              paddingHorizontal="$6"
              paddingVertical="$3"
              borderRadius="$4"
              pressStyle={{ scale: 0.95 }}
            >
              {t('buttons.googlePlay')}
            </Button>
          </XStack>
        </YStack>
      </ScrollView>

      {/* Video Modal */}
      {isVideoModalOpen && selectedVideo && (
        <VideoModal 
          video={selectedVideo}
          isVisible={isVideoModalOpen}
          onClose={() => setVideoModalOpen(false)}
        />
      )}
    </Animated.View>
  );
};

// Video Modal Component
const VideoModal: React.FC<{
  video: any;
  isVisible: boolean;
  onClose: () => void;
}> = ({ video, isVisible, onClose }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  
  const modalAnim = useSharedValue(0);
  
  useEffect(() => {
    modalAnim.value = withSpring(isVisible ? 1 : 0);
  }, [isVisible]);
  
  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: modalAnim.value,
      transform: [
        { scale: interpolate(modalAnim.value, [0, 1], [0.8, 1]) }
      ],
    };
  });

  if (!isVisible) return null;

  return (
    <YStack
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundColor="rgba(0,0,0,0.8)"
      justifyContent="center"
      alignItems="center"
      zIndex={1000}
    >
      <Animated.View style={modalAnimatedStyle}>
        <Card
          width={screenWidth * 0.9}
          backgroundColor={theme.background}
          borderRadius="$6"
          padding="$4"
        >
          <XStack justifyContent="space-between" alignItems="center" marginBottom="$4">
            <Text fontSize="$6" fontWeight="bold" color={theme.color}>
              {t('buttons.startWorkout')}
            </Text>
            <Button
              size="$3"
              circular
              backgroundColor={theme.backgroundPress}
              onPress={onClose}
            >
              <Text color={theme.color}>✕</Text>
            </Button>
          </XStack>
          
          <VideoPlayer
            videoUrl={video.secure_url}
            width={screenWidth * 0.82}
            height={200}
            showControls={true}
          />
        </Card>
      </Animated.View>
    </YStack>
  );
};

export default HomeScreen;

