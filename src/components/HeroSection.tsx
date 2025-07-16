import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { 
  YStack, 
  XStack, 
  Text, 
  Button,
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
  interpolate,
  Easing
} from 'react-native-reanimated';
import { Canvas, Circle, Group, Paint, Skia } from '@shopify/react-native-skia';

// Import hooks and store
import { useAppStore } from '../store/appStore';
import { useFeaturedVideos } from '../services/cloudinaryApi';
import VideoPlayer from './VideoPlayer';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Animated components
const AnimatedYStack = Animated.createAnimatedComponent(YStack);
const AnimatedText = Animated.createAnimatedComponent(Text);

// Particle component using Skia
const ParticleSystem: React.FC = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * screenWidth,
    y: Math.random() * 300,
    size: Math.random() * 8 + 4,
    speed: Math.random() * 2 + 1,
  }));

  const animationValue = useSharedValue(0);

  useEffect(() => {
    animationValue.value = withRepeat(
      withTiming(1, { 
        duration: 4000, 
        easing: Easing.inOut(Easing.ease) 
      }),
      -1,
      false
    );
  }, []);

  const paint = Skia.Paint();
  paint.setAntiAlias(true);

  return (
    <Canvas style={{ position: 'absolute', width: screenWidth, height: 300 }}>
      <Group>
        {particles.map((particle) => {
          const animatedX = interpolate(
            animationValue.value,
            [0, 1],
            [particle.x, particle.x + 50]
          );
          const animatedY = interpolate(
            animationValue.value,
            [0, 1],
            [particle.y, particle.y - 30]
          );
          const opacity = interpolate(
            animationValue.value,
            [0, 0.5, 1],
            [0.3, 1, 0.3]
          );

          paint.setColor(Skia.Color(`rgba(255, 107, 53, ${opacity})`));

          return (
            <Circle
              key={particle.id}
              cx={animatedX}
              cy={animatedY}
              r={particle.size}
              paint={paint}
            />
          );
        })}
      </Group>
    </Canvas>
  );
};

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage, isRTL, theme } = useAppStore();
  const { data: featuredVideos, isLoading } = useFeaturedVideos();

  // Animation values
  const titleAnimation = useSharedValue(0);
  const subtitleAnimation = useSharedValue(0);
  const buttonAnimation = useSharedValue(1);

  useEffect(() => {
    titleAnimation.value = withTiming(1, { duration: 1000 });
    subtitleAnimation.value = withTiming(1, { duration: 1200, delay: 300 });
    
    buttonAnimation.value = withRepeat(
      withTiming(1.05, { duration: 2000 }),
      -1,
      true
    );
  }, []);

  // Animated styles
  const titleStyle = useAnimatedStyle(() => {
    return {
      opacity: titleAnimation.value,
      transform: [
        {
          translateY: interpolate(titleAnimation.value, [0, 1], [50, 0])
        },
        {
          scale: interpolate(titleAnimation.value, [0, 1], [0.8, 1])
        }
      ]
    };
  });

  const subtitleStyle = useAnimatedStyle(() => {
    return {
      opacity: subtitleAnimation.value,
      transform: [
        {
          translateY: interpolate(subtitleAnimation.value, [0, 1], [30, 0])
        }
      ]
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: buttonAnimation.value
        }
      ]
    };
  });

  // Get featured video for background
  const backgroundVideo = featuredVideos?.[0];

  return (
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

      {/* Particle System */}
      <ParticleSystem />

      {/* Background Video (if available) */}
      {backgroundVideo && (
        <View 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.3,
          }}
        >
          <VideoPlayer
            video={backgroundVideo}
            autoPlay
            muted
            loop
            showControls={false}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      )}

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
        <Animated.View style={titleStyle}>
          <Text
            fontSize="$10"
            fontWeight="900"
            color="white"
            textAlign="center"
            textShadowColor="rgba(0,0,0,0.3)"
            textShadowOffset={{ width: 2, height: 2 }}
            textShadowRadius={4}
            fontFamily="$hebrew"
          >
            {t('app.title')}
          </Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.View style={subtitleStyle}>
          <Text
            fontSize="$6"
            color="white"
            textAlign="center"
            opacity={0.95}
            textShadowColor="rgba(0,0,0,0.2)"
            textShadowOffset={{ width: 1, height: 1 }}
            textShadowRadius={2}
            fontFamily="$hebrew"
          >
            {t('app.subtitle')}
          </Text>
        </Animated.View>

        {/* Description */}
        <AnimatedText
          entering={FadeInDown.delay(600)}
          fontSize="$4"
          color="white"
          textAlign="center"
          opacity={0.9}
          maxWidth={300}
          lineHeight="$2"
          fontFamily="$hebrew"
        >
          {t('app.description')}
        </AnimatedText>

        {/* Call to Action Button */}
        <Animated.View style={buttonStyle}>
          <AnimatedYStack entering={FadeInUp.delay(800)} space="$3">
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
              shadowColor="rgba(0,0,0,0.3)"
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.3}
              shadowRadius={8}
              elevation={8}
            >
              {t('app.tagline')}
            </Button>

            {/* Video Preview Thumbnails */}
            {featuredVideos && featuredVideos.length > 1 && (
              <XStack 
                space="$2" 
                justifyContent="center"
                flexWrap="wrap"
              >
                {featuredVideos.slice(1, 4).map((video, index) => (
                  <Animated.View
                    key={video.public_id}
                    entering={FadeInUp.delay(1000 + index * 100)}
                  >
                    <VideoPlayer
                      video={video}
                      showControls={false}
                      style={{
                        width: 80,
                        height: 60,
                        borderRadius: 8,
                        borderWidth: 2,
                        borderColor: 'white',
                      }}
                    />
                  </Animated.View>
                ))}
              </XStack>
            )}
          </AnimatedYStack>
        </Animated.View>

        {/* Floating Elements */}
        <View style={{ position: 'absolute', top: 50, left: 30 }}>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    rotate: withRepeat(
                      withTiming('360deg', { duration: 10000 }),
                      -1,
                      false
                    )
                  }
                ]
              }
            ]}
          >
            <Text fontSize="$8">🎮</Text>
          </Animated.View>
        </View>

        <View style={{ position: 'absolute', top: 80, right: 40 }}>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    rotate: withRepeat(
                      withTiming('-360deg', { duration: 8000 }),
                      -1,
                      false
                    )
                  }
                ]
              }
            ]}
          >
            <Text fontSize="$6">⭐</Text>
          </Animated.View>
        </View>

        <View style={{ position: 'absolute', bottom: 60, left: 50 }}>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    translateY: withRepeat(
                      withTiming(-20, { duration: 3000 }),
                      -1,
                      true
                    )
                  }
                ]
              }
            ]}
          >
            <Text fontSize="$7">🏃‍♀️</Text>
          </Animated.View>
        </View>

        <View style={{ position: 'absolute', bottom: 40, right: 60 }}>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    translateY: withRepeat(
                      withTiming(-15, { duration: 2500 }),
                      -1,
                      true
                    )
                  }
                ]
              }
            ]}
          >
            <Text fontSize="$5">💪</Text>
          </Animated.View>
        </View>
      </AnimatedYStack>
    </View>
  );
};

export default HeroSection;

