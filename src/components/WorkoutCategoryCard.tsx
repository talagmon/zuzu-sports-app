import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { YStack, XStack, Text, Card, Button, useTheme } from '@tamagui/core';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withDelay,
  interpolate
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

// Import types and store
import { WorkoutCategory } from '../store/appStore';
import { useAppStore } from '../store/appStore';
import VideoPlayer from './VideoPlayer';

const { width: screenWidth } = Dimensions.get('window');

interface WorkoutCategoryCardProps {
  category: WorkoutCategory;
  index: number;
}

const WorkoutCategoryCard: React.FC<WorkoutCategoryCardProps> = ({ category, index }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { isRTL, setSelectedVideo, setVideoModalOpen } = useAppStore();

  // Animation values
  const slideAnim = useSharedValue(100);
  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(0.8);

  // Initialize animations with delay based on index
  useEffect(() => {
    const delay = index * 200; // Stagger animation
    
    slideAnim.value = withDelay(delay, withSpring(0, { damping: 15, stiffness: 100 }));
    fadeAnim.value = withDelay(delay, withSpring(1, { damping: 15, stiffness: 100 }));
    scaleAnim.value = withDelay(delay, withSpring(1, { damping: 12, stiffness: 80 }));
  }, [index]);

  // Animated styles
  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      transform: [
        { translateX: isRTL ? -slideAnim.value : slideAnim.value },
        { scale: scaleAnim.value }
      ],
    };
  });

  const getCategoryName = (categoryName: string): string => {
    return t(`workoutCategories.${categoryName}`, categoryName);
  };

  const handleVideoPress = (video: any) => {
    setSelectedVideo(video);
    setVideoModalOpen(true);
  };

  return (
    <Animated.View style={cardAnimatedStyle}>
      <Card
        backgroundColor={theme.backgroundHover}
        borderRadius=\"$6\"
        padding=\"$4\"
        marginBottom=\"$3\"
        borderWidth={1}
        borderColor={theme.borderColor}
        pressStyle={{ scale: 0.98 }}
        shadowColor={theme.shadowColor}
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={4}
        elevation={3}
      >
        {/* Category Header */}
        <XStack alignItems=\"center\" marginBottom=\"$4\" space=\"$3\">
          <Text fontSize=\"$8\">{category.icon}</Text>
          <YStack flex={1}>
            <Text 
              fontSize=\"$6\" 
              fontWeight=\"bold\" 
              color={theme.primary}
              textAlign={isRTL ? 'right' : 'left'}
            >
              {getCategoryName(category.name)}
            </Text>
            <Text 
              fontSize=\"$3\" 
              color={theme.colorPress}
              textAlign={isRTL ? 'right' : 'left'}
            >
              {category.videos.length} {t('stats.workouts')}
            </Text>
          </YStack>
        </XStack>

        {/* Video Grid */}
        <XStack flexWrap=\"wrap\" justifyContent=\"space-between\" marginBottom=\"$4\">
          {category.videos.slice(0, 3).map((video, videoIndex) => (
            <Card
              key={video.public_id}
              width=\"30%\"
              backgroundColor={theme.background}
              borderRadius=\"$3\"
              overflow=\"hidden\"
              pressStyle={{ scale: 0.95 }}
              onPress={() => handleVideoPress(video)}
              marginBottom=\"$2\"
            >
              <VideoPlayer
                videoUrl={video.secure_url}
                width={screenWidth * 0.25}
                height={80}
                showControls={false}
              />
            </Card>
          ))}
        </XStack>

        {/* Action Button */}
        <Button
          backgroundColor={theme.primary}
          color=\"white\"
          fontSize=\"$4\"
          fontWeight=\"bold\"
          borderRadius=\"$4\"
          paddingVertical=\"$3\"
          pressStyle={{ scale: 0.95, backgroundColor: theme.primaryPress }}
          onPress={() => {
            // Navigate to category detail screen
            console.log(`Navigate to ${category.name} category`);
          }}
        >
          <XStack alignItems=\"center\" space=\"$2\">
            <Text color=\"white\" fontSize=\"$4\" fontWeight=\"bold\">
              {t('buttons.watchAll')}
            </Text>
            <Text color=\"white\" fontSize=\"$4\">
              {isRTL ? '◀️' : '▶️'}
            </Text>
          </XStack>
        </Button>
      </Card>
    </Animated.View>
  );
};

export default WorkoutCategoryCard;

