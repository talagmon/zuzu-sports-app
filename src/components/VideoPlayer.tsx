import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  ViewStyle 
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { 
  XStack, 
  YStack, 
  Text, 
  Button,
  Progress
} from '@tamagui/core';
import Animated, { 
  FadeIn, 
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

// Import types and services
import { CloudinaryVideo } from '../store/appStore';
import { cloudinaryApi } from '../services/cloudinaryApi';

const { width: screenWidth } = Dimensions.get('window');

interface VideoPlayerProps {
  video: CloudinaryVideo;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  showControls?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
  thumbnail?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  autoPlay = false,
  muted = false,
  loop = false,
  showControls = true,
  style,
  onPress,
  thumbnail = false,
}) => {
  const { t } = useTranslation();
  const videoRef = useRef<Video>(null);
  
  // State
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showControlsOverlay, setShowControlsOverlay] = useState(false);

  // Animation values
  const controlsOpacity = useSharedValue(0);
  const loadingOpacity = useSharedValue(1);

  // Get optimized video URL
  const videoUrl = cloudinaryApi.transformVideoUrl(video.public_id, {
    width: Math.min(screenWidth, 800),
    height: Math.min(450, (screenWidth * 9) / 16),
    quality: 'auto',
    format: 'auto',
  });

  // Get thumbnail URL
  const thumbnailUrl = cloudinaryApi.getVideoThumbnail(video.public_id, {
    width: style?.width as number || 400,
    height: style?.height as number || 225,
    quality: 'auto',
  });

  // Animated styles
  const controlsStyle = useAnimatedStyle(() => {
    return {
      opacity: controlsOpacity.value,
    };
  });

  const loadingStyle = useAnimatedStyle(() => {
    return {
      opacity: loadingOpacity.value,
    };
  });

  // Handlers
  const handlePlayPause = async () => {
    if (!videoRef.current) return;

    try {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await videoRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing/pausing video:', error);
    }
  };

  const handleMuteToggle = async () => {
    if (!videoRef.current) return;

    try {
      await videoRef.current.setIsMutedAsync(!isMuted);
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  const handleSeek = async (value: number) => {
    if (!videoRef.current || duration === 0) return;

    try {
      const seekPosition = (value / 100) * duration;
      await videoRef.current.setPositionAsync(seekPosition);
      setPosition(seekPosition);
    } catch (error) {
      console.error('Error seeking video:', error);
    }
  };

  const handleVideoPress = () => {
    if (onPress) {
      onPress();
      return;
    }

    if (showControls) {
      setShowControlsOverlay(!showControlsOverlay);
      controlsOpacity.value = withTiming(showControlsOverlay ? 0 : 1, {
        duration: 300,
      });
    }
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    loadingOpacity.value = withTiming(1);
  };

  const handleLoad = (status: any) => {
    if (status.isLoaded) {
      setIsLoading(false);
      setDuration(status.durationMillis || 0);
      loadingOpacity.value = withTiming(0);
    }
  };

  const handlePlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis || 0);
      setIsPlaying(status.isPlaying || false);
    }
  };

  // If thumbnail mode, show thumbnail image
  if (thumbnail) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
        <Video
          ref={videoRef}
          source={{ uri: thumbnailUrl }}
          style={[styles.video, style]}
          resizeMode={ResizeMode.COVER}
          shouldPlay={false}
          isLooping={false}
          isMuted={true}
        />
        <View style={styles.playOverlay}>
          <View style={styles.playButton}>
            <Text fontSize="$6" color="white">▶️</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity 
        onPress={handleVideoPress}
        style={styles.videoContainer}
        activeOpacity={0.9}
      >
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          style={[styles.video, style]}
          resizeMode={ResizeMode.COVER}
          shouldPlay={autoPlay}
          isLooping={loop}
          isMuted={muted}
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />

        {/* Loading Overlay */}
        <Animated.View style={[styles.loadingOverlay, loadingStyle]}>
          <YStack alignItems="center" space="$2">
            <Text color="white" fontSize="$4">
              {t('common.loading')}
            </Text>
          </YStack>
        </Animated.View>

        {/* Controls Overlay */}
        {showControls && (
          <Animated.View 
            style={[styles.controlsOverlay, controlsStyle]}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <YStack flex={1} justifyContent="space-between" padding="$3">
              {/* Top Controls */}
              <XStack justifyContent="flex-end">
                <Button
                  size="$3"
                  circular
                  backgroundColor="rgba(0,0,0,0.6)"
                  color="white"
                  onPress={handleMuteToggle}
                  pressStyle={{ scale: 0.9 }}
                >
                  {isMuted ? '🔇' : '🔊'}
                </Button>
              </XStack>

              {/* Center Play/Pause */}
              <XStack justifyContent="center">
                <Button
                  size="$6"
                  circular
                  backgroundColor="rgba(0,0,0,0.7)"
                  color="white"
                  onPress={handlePlayPause}
                  pressStyle={{ scale: 0.9 }}
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </Button>
              </XStack>

              {/* Bottom Progress */}
              <YStack space="$2">
                <Progress
                  value={duration > 0 ? (position / duration) * 100 : 0}
                  backgroundColor="rgba(255,255,255,0.3)"
                  color="white"
                  size="$2"
                />
                <XStack justifyContent="space-between">
                  <Text color="white" fontSize="$2">
                    {formatTime(position)}
                  </Text>
                  <Text color="white" fontSize="$2">
                    {formatTime(duration)}
                  </Text>
                </XStack>
              </YStack>
            </YStack>
          </Animated.View>
        )}
      </TouchableOpacity>

      {/* Video Info */}
      {showControls && video.tags && video.tags.length > 0 && (
        <XStack padding="$2" space="$1" flexWrap="wrap">
          {video.tags.slice(0, 3).map((tag, index) => (
            <View
              key={index}
              style={styles.tag}
            >
              <Text fontSize="$1" color="white">
                {tag}
              </Text>
            </View>
          ))}
        </XStack>
      )}
    </View>
  );
};

// Helper function to format time
const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
  },
  videoContainer: {
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: 'rgba(255,107,53,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});

export default VideoPlayer;

