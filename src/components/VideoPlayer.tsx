import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { YStack, XStack, Button, Text, useTheme } from '@tamagui/core';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSpring
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

interface VideoPlayerProps {
  videoUrl: string;
  width: number;
  height: number;
  showControls?: boolean;
  autoPlay?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  width,
  height,
  showControls = true,
  autoPlay = false
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  
  // Animation values
  const controlsOpacity = useSharedValue(showControls ? 1 : 0);
  const playButtonScale = useSharedValue(1);

  // Animated styles
  const controlsAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: controlsOpacity.value,
    };
  });

  const playButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: playButtonScale.value }],
    };
  });

  const handlePlayPress = () => {
    playButtonScale.value = withSpring(0.8, { duration: 100 }, () => {
      playButtonScale.value = withSpring(1, { duration: 100 });
    });
    setIsPlaying(!isPlaying);
  };

  const handleMutePress = () => {
    setIsMuted(!isMuted);
  };

  return (
    <YStack width={width} height={height} position=\"relative\">
      {/* Video Container - Using a placeholder since we can't embed actual video in this demo */}
      <View
        style={{
          width,
          height,
          backgroundColor: theme.backgroundPress,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Video Thumbnail/Placeholder */}
        <YStack justifyContent=\"center\" alignItems=\"center\" flex={1}>
          <Text fontSize=\"$6\" color={theme.color} opacity={0.7}>
            🎬
          </Text>
          <Text fontSize=\"$3\" color={theme.color} opacity={0.5} marginTop=\"$2\">
            Video Player
          </Text>
        </YStack>

        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <YStack
            position=\"absolute\"
            top={0}
            left={0}
            right={0}
            bottom={0}
            justifyContent=\"center\"
            alignItems=\"center\"
            backgroundColor=\"rgba(0,0,0,0.3)\"
          >
            <Animated.View style={playButtonAnimatedStyle}>
              <Button
                circular
                size=\"$6\"
                backgroundColor=\"rgba(255,255,255,0.9)\"
                onPress={handlePlayPress}
                pressStyle={{ scale: 0.9 }}
              >
                <Text fontSize=\"$6\" color={theme.primary}>
                  ▶️
                </Text>
              </Button>
            </Animated.View>
          </YStack>
        )}

        {/* Controls */}
        {showControls && (
          <Animated.View
            style={[
              {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 8,
              },
              controlsAnimatedStyle,
            ]}
          >
            <XStack
              justifyContent=\"space-between\"
              alignItems=\"center\"
              backgroundColor=\"rgba(0,0,0,0.6)\"
              paddingHorizontal=\"$3\"
              paddingVertical=\"$2\"
              borderRadius=\"$2\"
            >
              <Button
                size=\"$3\"
                backgroundColor=\"transparent\"
                onPress={handlePlayPress}
                pressStyle={{ opacity: 0.7 }}
              >
                <Text color=\"white\" fontSize=\"$4\">
                  {isPlaying ? '⏸️' : '▶️'}
                </Text>
              </Button>

              <XStack space=\"$2\" alignItems=\"center\">
                <Button
                  size=\"$3\"
                  backgroundColor=\"transparent\"
                  onPress={handleMutePress}
                  pressStyle={{ opacity: 0.7 }}
                >
                  <Text color=\"white\" fontSize=\"$3\">
                    {isMuted ? '🔇' : '🔊'}
                  </Text>
                </Button>
              </XStack>
            </XStack>
          </Animated.View>
        )}
      </View>

      {/* Video Info */}
      {showControls && (
        <YStack marginTop=\"$2\">
          <Text fontSize=\"$3\" color={theme.color} numberOfLines={1}>
            {videoUrl.split('/').pop()?.split('.')[0] || 'Video'}
          </Text>
        </YStack>
      )}
    </YStack>
  );
};

export default VideoPlayer;

