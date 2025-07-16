import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { YStack, XStack, Text, Button, useTheme } from '@tamagui/core';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withRepeat,
  withTiming,
  interpolate
} from 'react-native-reanimated';
import { Canvas, Circle, LinearGradient, vec, Text as SkiaText, useFont } from '@shopify/react-native-skia';
import { useTranslation } from 'react-i18next';

// Import store
import { useAppStore } from '../store/appStore';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { isRTL } = useAppStore();

  // Animation values
  const titleAnim = useSharedValue(0);
  const subtitleAnim = useSharedValue(0);
  const buttonAnim = useSharedValue(0);
  const particleAnim = useSharedValue(0);
  const gradientAnim = useSharedValue(0);

  // Initialize animations
  useEffect(() => {
    // Staggered entrance animations
    titleAnim.value = withSpring(1, { damping: 15, stiffness: 100 });
    
    setTimeout(() => {
      subtitleAnim.value = withSpring(1, { damping: 15, stiffness: 100 });
    }, 300);
    
    setTimeout(() => {
      buttonAnim.value = withSpring(1, { damping: 15, stiffness: 100 });
    }, 600);

    // Continuous animations
    particleAnim.value = withRepeat(
      withTiming(1, { duration: 3000 }),
      -1,
      true
    );

    gradientAnim.value = withRepeat(
      withTiming(1, { duration: 4000 }),
      -1,
      true
    );
  }, []);

  // Animated styles
  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: titleAnim.value,
      transform: [
        { translateY: interpolate(titleAnim.value, [0, 1], [50, 0]) },
        { scale: interpolate(titleAnim.value, [0, 1], [0.8, 1]) }
      ],
    };
  });

  const subtitleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: subtitleAnim.value,
      transform: [
        { translateY: interpolate(subtitleAnim.value, [0, 1], [30, 0]) }
      ],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonAnim.value,
      transform: [
        { translateY: interpolate(buttonAnim.value, [0, 1], [20, 0]) },
        { scale: interpolate(buttonAnim.value, [0, 1], [0.9, 1]) }
      ],
    };
  });

  // Skia animated particles
  const SkiaBackground: React.FC = () => {
    const animatedParticles = useAnimatedStyle(() => {
      const progress = particleAnim.value;
      return {
        transform: [
          { translateX: interpolate(progress, [0, 1], [0, 20]) },
          { translateY: interpolate(progress, [0, 1], [0, -10]) }
        ],
      };
    });

    return (
      <Canvas style={{ width: screenWidth, height: 300, position: 'absolute' }}>
        {/* Animated gradient background */}
        <LinearGradient
          start={vec(0, 0)}
          end={vec(screenWidth, 300)}
          colors={['#ff6b6b', '#4ecdc4', '#feca57']}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 15 }, (_, i) => (
          <Circle
            key={i}
            cx={Math.random() * screenWidth}
            cy={Math.random() * 300}
            r={Math.random() * 8 + 2}
            color={`rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`}
          />
        ))}
      </Canvas>
    );
  };

  return (
    <YStack
      height={400}
      position=\"relative\"
      justifyContent=\"center\"
      alignItems=\"center\"
      overflow=\"hidden\"
    >
      {/* Skia Background */}
      <SkiaBackground />

      {/* Content Overlay */}
      <YStack
        position=\"absolute\"
        top={0}
        left={0}
        right={0}
        bottom={0}
        justifyContent=\"center\"
        alignItems=\"center\"
        padding=\"$6\"
        zIndex={1}
      >
        {/* App Logo/Title */}
        <Animated.View style={titleAnimatedStyle}>
          <YStack alignItems=\"center\" marginBottom=\"$4\">
            <Text
              fontSize=\"$12\"
              fontWeight=\"900\"
              color=\"white\"
              textAlign=\"center\"
              textShadowColor=\"rgba(0,0,0,0.3)\"
              textShadowOffset={{ width: 2, height: 2 }}
              textShadowRadius={4}
            >
              {t('hero.title')}
            </Text>
            <Text
              fontSize=\"$6\"
              color=\"white\"
              textAlign=\"center\"
              opacity={0.9}
              marginTop=\"$2\"
            >
              {t('app.tagline')}
            </Text>
          </YStack>
        </Animated.View>

        {/* Subtitle */}
        <Animated.View style={subtitleAnimatedStyle}>
          <Text
            fontSize=\"$5\"
            color=\"white\"
            textAlign=\"center\"
            marginBottom=\"$6\"
            paddingHorizontal=\"$4\"
            lineHeight={24}
            textShadowColor=\"rgba(0,0,0,0.2)\"
            textShadowOffset={{ width: 1, height: 1 }}
            textShadowRadius={2}
          >
            {t('hero.subtitle')}
          </Text>
        </Animated.View>

        {/* CTA Buttons */}
        <Animated.View style={buttonAnimatedStyle}>
          <XStack space=\"$3\" flexWrap=\"wrap\" justifyContent=\"center\">
            <Button
              backgroundColor=\"white\"
              color={theme.primary}
              fontSize=\"$5\"
              fontWeight=\"bold\"
              paddingHorizontal=\"$6\"
              paddingVertical=\"$4\"
              borderRadius=\"$6\"
              pressStyle={{ scale: 0.95 }}
              shadowColor=\"rgba(0,0,0,0.2)\"
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.3}
              shadowRadius={8}
              elevation={5}
            >
              <XStack alignItems=\"center\" space=\"$2\">
                <Text color={theme.primary} fontSize=\"$5\" fontWeight=\"bold\">
                  {t('buttons.download')}
                </Text>
                <Text fontSize=\"$4\">🚀</Text>
              </XStack>
            </Button>

            <Button
              backgroundColor=\"rgba(255,255,255,0.2)\"
              color=\"white\"
              fontSize=\"$4\"
              fontWeight=\"bold\"
              paddingHorizontal=\"$5\"
              paddingVertical=\"$4\"
              borderRadius=\"$6\"
              borderWidth={2}
              borderColor=\"white\"
              pressStyle={{ scale: 0.95, backgroundColor: 'rgba(255,255,255,0.3)' }}
            >
              <XStack alignItems=\"center\" space=\"$2\">
                <Text color=\"white\" fontSize=\"$4\" fontWeight=\"bold\">
                  {t('buttons.watchAll')}
                </Text>
                <Text fontSize=\"$4\">🎬</Text>
              </XStack>
            </Button>
          </XStack>
        </Animated.View>

        {/* Scroll Indicator */}
        <YStack
          position=\"absolute\"
          bottom={20}
          alignItems=\"center\"
        >
          <Animated.View
            style={{
              transform: [
                { 
                  translateY: useAnimatedStyle(() => 
                    interpolate(particleAnim.value, [0, 1], [0, 10])
                  ).value 
                }
              ],
            }}
          >
            <Text color=\"white\" fontSize=\"$6\" opacity={0.8}>
              ⬇️
            </Text>
          </Animated.View>
        </YStack>
      </YStack>
    </YStack>
  );
};

export default HeroSection;

