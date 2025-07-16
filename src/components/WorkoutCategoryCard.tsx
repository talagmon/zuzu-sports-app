import React, { useState } from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { 
  YStack, 
  XStack, 
  Text, 
  Button,
  View,
  ScrollView
} from '@tamagui/core';
import { LinearGradient } from '@tamagui/linear-gradient';
import Animated, { 
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate
} from 'react-native-reanimated';

// Import types and components
import { WorkoutCategory } from '../store/appStore';
import { useAppStore } from '../store/appStore';
import VideoPlayer from './VideoPlayer';

const { width: screenWidth } = Dimensions.get('window');

interface WorkoutCategoryCardProps {
  category: WorkoutCategory;
  index: number;
}

const WorkoutCategoryCard: React.FC<WorkoutCategoryCardProps> = ({
  category,
  index,
}) => {
  const { t } = useTranslation();
  const { isRTL, setSelectedCategory, setSelectedVideo } = useAppStore();
  const [isExpanded, setIsExpanded] = useState(false);

  // Animation values
  const scaleValue = useSharedValue(1);
  const rotationValue = useSharedValue(0);
  const expandValue = useSharedValue(0);

  // Animated styles
  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scaleValue.value },
        { rotateY: `${rotationValue.value}deg` }
      ],
    };
  });

  const expandStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(expandValue.value, [0, 1], [0, 200]),
      opacity: expandValue.value,
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotationValue.value * 2}deg` }
      ],
    };
  });

  // Handlers
  const handlePress = () => {
    scaleValue.value = withSpring(0.95, {}, () => {
      scaleValue.value = withSpring(1);
    });

    rotationValue.value = withTiming(360, { duration: 600 }, () => {
      rotationValue.value = 0;
    });

    setSelectedCategory(category.id);
    toggleExpanded();
  };

  const toggleExpanded = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    
    expandValue.value = withTiming(newExpanded ? 1 : 0, {
      duration: 300,
    });
  };

  const handleVideoPress = (video: any) => {
    setSelectedVideo(video);
    // Here you could open a modal or navigate to a video screen
  };

  // Get gradient colors based on category
  const getGradientColors = () => {
    const baseColor = category.color || '#ff6b35';
    return [baseColor, `${baseColor}CC`, `${baseColor}99`];
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      style={cardStyle}
    >
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <LinearGradient
          colors={getGradientColors()}
          start={[0, 0]}
          end={[1, 1]}
          borderRadius="$4"
          padding="$4"
          marginHorizontal="$2"
          shadowColor="rgba(0,0,0,0.2)"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.3}
          shadowRadius={8}
          elevation={8}
        >
          <XStack 
            alignItems="center" 
            space="$3"
            flexDirection={isRTL ? 'row-reverse' : 'row'}
          >
            {/* Category Icon */}
            <Animated.View style={iconStyle}>
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
            </Animated.View>

            {/* Category Info */}
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
                  {category.videos.length} {t('common.videos')}
                </Text>
                <View
                  backgroundColor="rgba(255,255,255,0.3)"
                  borderRadius="$2"
                  paddingHorizontal="$2"
                  paddingVertical="$1"
                >
                  <Text fontSize="$1" color="white" fontWeight="600">
                    {category.name.toUpperCase()}
                  </Text>
                </View>
              </XStack>
            </YStack>

            {/* Expand Arrow */}
            <Animated.View
              style={[
                iconStyle,
                {
                  transform: [
                    { rotate: isExpanded ? '180deg' : '0deg' }
                  ]
                }
              ]}
            >
              <Text fontSize="$5" color="white">
                {isRTL ? '◀' : '▶'}
              </Text>
            </Animated.View>
          </XStack>

          {/* Expanded Video Section */}
          <Animated.View style={expandStyle}>
            <YStack space="$3" marginTop="$3">
              <Text
                fontSize="$4"
                fontWeight="600"
                color="white"
                textAlign={isRTL ? 'right' : 'left'}
              >
                {t('categories.title')}
              </Text>

              {category.videos.length > 0 ? (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 4 }}
                >
                  <XStack space="$3">
                    {category.videos.map((video, videoIndex) => (
                      <TouchableOpacity
                        key={video.public_id}
                        onPress={() => handleVideoPress(video)}
                        style={{
                          width: 120,
                          height: 80,
                          borderRadius: 8,
                          overflow: 'hidden',
                          backgroundColor: 'rgba(255,255,255,0.1)',
                        }}
                      >
                        <VideoPlayer
                          video={video}
                          thumbnail
                          style={{
                            width: 120,
                            height: 80,
                          }}
                          onPress={() => handleVideoPress(video)}
                        />
                        <View
                          style={{
                            position: 'absolute',
                            bottom: 4,
                            left: 4,
                            right: 4,
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            borderRadius: 4,
                            paddingHorizontal: 6,
                            paddingVertical: 2,
                          }}
                        >
                          <Text
                            fontSize="$1"
                            color="white"
                            numberOfLines={1}
                            textAlign="center"
                          >
                            {video.public_id.split('/').pop()?.replace(/[_-]/g, ' ')}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </XStack>
                </ScrollView>
              ) : (
                <YStack
                  alignItems="center"
                  justifyContent="center"
                  padding="$4"
                  backgroundColor="rgba(255,255,255,0.1)"
                  borderRadius="$3"
                >
                  <Text fontSize="$3" color="white" opacity={0.8}>
                    {t('common.loading')}...
                  </Text>
                </YStack>
              )}

              {/* View All Button */}
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
                  // Navigate to category detail screen
                  console.log('View all videos for category:', category.id);
                }}
              >
                {t('common.viewAll')} {category.videos.length} {t('common.videos')}
              </Button>
            </YStack>
          </Animated.View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default WorkoutCategoryCard;

