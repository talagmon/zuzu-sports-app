import React, { useEffect } from 'react';
import { YStack, XStack, Text, Card, useTheme } from '@tamagui/core';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withDelay,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

// Import store
import { useAppStore } from '../store/appStore';

interface StatItemProps {
  icon: string;
  value: number;
  label: string;
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, delay }) => {
  const theme = useTheme();
  const { isRTL } = useAppStore();
  
  // Animation values
  const countAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(0.8);
  const fadeAnim = useSharedValue(0);
  
  // Animated counter value
  const [displayValue, setDisplayValue] = React.useState(0);

  useEffect(() => {
    // Entrance animations
    scaleAnim.value = withDelay(delay, withSpring(1, { damping: 15, stiffness: 100 }));
    fadeAnim.value = withDelay(delay, withSpring(1, { damping: 15, stiffness: 100 }));
    
    // Counter animation
    countAnim.value = withDelay(delay + 200, withSpring(value, { 
      damping: 20, 
      stiffness: 80 
    }, () => {
      runOnJS(setDisplayValue)(value);
    }));
  }, [delay, value]);

  // Update display value during animation
  useEffect(() => {
    const updateValue = () => {
      setDisplayValue(Math.round(countAnim.value));
    };
    
    const interval = setInterval(updateValue, 50);
    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      transform: [
        { scale: scaleAnim.value }
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Card
        backgroundColor={theme.backgroundHover}
        borderRadius=\"$4\"
        padding=\"$4\"
        alignItems=\"center\"
        minWidth={120}
        borderWidth={1}
        borderColor={theme.borderColor}
        shadowColor={theme.shadowColor}
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={4}
        elevation={2}
      >
        <Text fontSize=\"$8\" marginBottom=\"$2\">
          {icon}
        </Text>
        
        <Text
          fontSize=\"$8\"
          fontWeight=\"bold\"
          color={theme.primary}
          textAlign=\"center\"
          marginBottom=\"$1\"
        >
          {displayValue.toLocaleString()}
          {value >= 1000 ? '+' : ''}
        </Text>
        
        <Text
          fontSize=\"$3\"
          color={theme.colorPress}
          textAlign=\"center\"
          numberOfLines={2}
        >
          {label}
        </Text>
      </Card>
    </Animated.View>
  );
};

const StatsSection: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { workoutCategories, videos } = useAppStore();

  // Calculate stats from actual data
  const totalWorkouts = videos?.length || 154;
  const totalCategories = workoutCategories?.length || 5;
  const happyFamilies = 1000;
  const minutesPerDay = 5;

  const stats = [
    {
      icon: '🎬',
      value: totalWorkouts,
      label: t('stats.workouts'),
    },
    {
      icon: '🏆',
      value: totalCategories,
      label: t('stats.categories'),
    },
    {
      icon: '👨‍👩‍👧‍👦',
      value: happyFamilies,
      label: t('stats.families'),
    },
    {
      icon: '⏰',
      value: minutesPerDay,
      label: t('stats.minutes'),
    },
  ];

  return (
    <YStack padding=\"$4\" marginTop=\"$6\">
      {/* Section Title */}
      <Text
        fontSize=\"$8\"
        fontWeight=\"bold\"
        color={theme.primary}
        textAlign=\"center\"
        marginBottom=\"$6\"
        paddingHorizontal=\"$4\"
      >
        {t('sections.statistics')}
      </Text>

      {/* Stats Grid */}
      <XStack
        flexWrap=\"wrap\"
        justifyContent=\"space-around\"
        alignItems=\"center\"
        space=\"$3\"
      >
        {stats.map((stat, index) => (
          <StatItem
            key={stat.label}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            delay={index * 150}
          />
        ))}
      </XStack>

      {/* Additional Info */}
      <YStack
        marginTop=\"$6\"
        backgroundColor={theme.backgroundHover}
        borderRadius=\"$4\"
        padding=\"$4\"
        borderWidth={1}
        borderColor={theme.borderColor}
      >
        <Text
          fontSize=\"$5\"
          fontWeight=\"bold\"
          color={theme.primary}
          textAlign=\"center\"
          marginBottom=\"$3\"
        >
          {t('hero.cta')}
        </Text>
        
        <Text
          fontSize=\"$4\"
          color={theme.color}
          textAlign=\"center\"
          lineHeight={22}
        >
          {t('hero.motto')} 💖
        </Text>
      </YStack>
    </YStack>
  );
};

export default StatsSection;

