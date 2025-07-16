import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  YStack, 
  XStack, 
  Text,
  View
} from '@tamagui/core';
import { LinearGradient } from '@tamagui/linear-gradient';
import Animated, { 
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  interpolate,
  withRepeat,
  Easing
} from 'react-native-reanimated';

// Import hooks and store
import { useAppStore } from '../store/appStore';
import { useAppStats } from '../services/cloudinaryApi';

// Animated components
const AnimatedYStack = Animated.createAnimatedComponent(YStack);
const AnimatedText = Animated.createAnimatedComponent(Text);

interface StatItemProps {
  value: number;
  label: string;
  icon: string;
  index: number;
  color: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, icon, index, color }) => {
  const { isRTL } = useAppStore();
  
  // Animation values
  const countValue = useSharedValue(0);
  const scaleValue = useSharedValue(0);
  const glowValue = useSharedValue(0);

  useEffect(() => {
    // Animate count up
    countValue.value = withDelay(
      index * 200,
      withTiming(value, { 
        duration: 2000,
        easing: Easing.out(Easing.exp)
      })
    );

    // Animate scale in
    scaleValue.value = withDelay(
      index * 100,
      withTiming(1, { 
        duration: 800,
        easing: Easing.back(1.2)
      })
    );

    // Animate glow effect
    glowValue.value = withDelay(
      index * 150,
      withRepeat(
        withTiming(1, { duration: 2000 }),
        -1,
        true
      )
    );
  }, [value, index]);

  // Animated styles
  const countStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scaleValue.value }
      ]
    };
  });

  const glowStyle = useAnimatedStyle(() => {
    const opacity = interpolate(glowValue.value, [0, 1], [0.3, 0.8]);
    return {
      opacity,
    };
  });

  const animatedCount = useAnimatedStyle(() => {
    const displayValue = Math.floor(countValue.value);
    return {
      // We'll use this in the component to display the animated number
    };
  });

  // Format number for display
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${Math.floor(num / 1000)}K+`;
    }
    return `${Math.floor(num)}+`;
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100)}
      style={[countStyle]}
    >
      <LinearGradient
        colors={[color, `${color}CC`, `${color}99`]}
        start={[0, 0]}
        end={[1, 1]}
        borderRadius="$4"
        padding="$4"
        alignItems="center"
        space="$2"
        minWidth={120}
        shadowColor="rgba(0,0,0,0.2)"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.3}
        shadowRadius={8}
        elevation={8}
      >
        {/* Glow Effect */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 16,
              backgroundColor: 'white',
            },
            glowStyle
          ]}
        />

        {/* Icon */}
        <View
          backgroundColor="rgba(255,255,255,0.2)"
          borderRadius="$6"
          padding="$2"
          alignItems="center"
          justifyContent="center"
          width={50}
          height={50}
        >
          <Text fontSize="$6">{icon}</Text>
        </View>

        {/* Value */}
        <AnimatedText
          fontSize="$8"
          fontWeight="900"
          color="white"
          textAlign="center"
          textShadowColor="rgba(0,0,0,0.3)"
          textShadowOffset={{ width: 1, height: 1 }}
          textShadowRadius={2}
        >
          {formatNumber(value)}
        </AnimatedText>

        {/* Label */}
        <Text
          fontSize="$3"
          color="white"
          textAlign="center"
          opacity={0.9}
          fontWeight="600"
          numberOfLines={2}
        >
          {label}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
};

const StatsSection: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL, theme } = useAppStore();
  const { data: appStats, isLoading } = useAppStats();

  // Animation values for section
  const sectionAnimation = useSharedValue(0);

  useEffect(() => {
    sectionAnimation.value = withTiming(1, { duration: 1000 });
  }, []);

  // Animated styles
  const sectionStyle = useAnimatedStyle(() => {
    return {
      opacity: sectionAnimation.value,
      transform: [
        {
          translateY: interpolate(sectionAnimation.value, [0, 1], [50, 0])
        }
      ]
    };
  });

  // Stats data
  const stats = [
    {
      value: appStats?.totalVideos || 300,
      labelKey: 'stats.videos',
      icon: '🎥',
      color: '#ff6b35',
    },
    {
      value: appStats?.activeKids || 50000,
      labelKey: 'stats.kids',
      icon: '👶',
      color: '#e91e63',
    },
    {
      value: appStats?.categories || 5,
      labelKey: 'stats.categories',
      icon: '🏃',
      color: '#9c27b0',
    },
    {
      value: appStats?.families || 10000,
      labelKey: 'stats.families',
      icon: '👨‍👩‍👧‍👦',
      color: '#4caf50',
    },
  ];

  if (isLoading) {
    return (
      <AnimatedYStack
        entering={FadeInUp.delay(400)}
        padding="$4"
        space="$4"
        alignItems="center"
      >
        <Text fontSize="$6" color="$placeholderColor">
          {t('common.loading')}...
        </Text>
      </AnimatedYStack>
    );
  }

  return (
    <Animated.View style={sectionStyle}>
      <AnimatedYStack
        entering={FadeInUp.delay(400)}
        padding="$4"
        space="$4"
        backgroundColor={theme === 'light' ? '$backgroundHover' : '$background'}
      >
        {/* Section Title */}
        <Text 
          fontSize="$8" 
          fontWeight="bold" 
          textAlign="center"
          color="$color"
          marginBottom="$2"
        >
          {t('stats.title')}
        </Text>

        {/* Stats Grid */}
        <XStack 
          flexWrap="wrap" 
          justifyContent="center" 
          space="$3"
          gap="$3"
        >
          {stats.map((stat, index) => (
            <StatItem
              key={stat.labelKey}
              value={stat.value}
              label={t(stat.labelKey)}
              icon={stat.icon}
              index={index}
              color={stat.color}
            />
          ))}
        </XStack>

        {/* Additional Info */}
        <YStack space="$2" alignItems="center" marginTop="$4">
          <Text 
            fontSize="$3" 
            color="$placeholderColor"
            textAlign="center"
            opacity={0.8}
          >
            {t('app.description')}
          </Text>
          
          {/* Animated Separator */}
          <Animated.View
            entering={FadeInUp.delay(800)}
            style={{
              width: 100,
              height: 3,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <LinearGradient
              colors={['#ff6b35', '#e91e63', '#9c27b0']}
              start={[0, 0]}
              end={[1, 0]}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </Animated.View>
        </YStack>
      </AnimatedYStack>
    </Animated.View>
  );
};

export default StatsSection;

