import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CloudinaryVideo, WorkoutCategory } from '../store/appStore';
import { ENV, buildCloudinaryUrl, buildCloudinaryThumbnail } from '../config/environment';

// API endpoints - using secure environment configuration
const CLOUDINARY_BASE_URL = ENV.cloudinary.baseUrl;

// Types
interface CloudinaryResponse {
  resources: CloudinaryVideo[];
  next_cursor?: string;
  total_count: number;
}

interface CloudinarySearchParams {
  resource_type?: 'image' | 'video' | 'raw';
  type?: 'upload' | 'private' | 'authenticated';
  max_results?: number;
  next_cursor?: string;
  tags?: string[];
  folder?: string;
}

// API functions
export const cloudinaryApi = {
  // Get all videos
  async getVideos(params: CloudinarySearchParams = {}): Promise<CloudinaryResponse> {
    const searchParams = new URLSearchParams({
      resource_type: 'video',
      type: 'upload',
      max_results: '500',
      ...params,
    });

    const response = await fetch(`${CLOUDINARY_BASE_URL}/resources/search?${searchParams}`, {
      headers: {
        'Authorization': `Basic ${btoa(`${ENV.cloudinary.apiKey}:${ENV.cloudinary.apiSecret}`)}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Cloudinary API error: ${response.statusText}`);
    }

    return response.json();
  },

  // Get videos by tag
  async getVideosByTag(tag: string): Promise<CloudinaryVideo[]> {
    const response = await this.getVideos({ tags: [tag] });
    return response.resources;
  },

  // Get videos by folder
  async getVideosByFolder(folder: string): Promise<CloudinaryVideo[]> {
    const response = await this.getVideos({ folder });
    return response.resources;
  },

  // Get featured videos (first 10 videos)
  async getFeaturedVideos(): Promise<CloudinaryVideo[]> {
    const response = await this.getVideos({ max_results: 10 });
    return response.resources;
  },

  // Transform video URL for optimization
  transformVideoUrl(publicId: string, options: {
    width?: number;
    height?: number;
    quality?: 'auto' | 'auto:low' | 'auto:good' | 'auto:best';
    format?: 'auto' | 'mp4' | 'webm';
  } = {}): string {
    const { width = 800, height = 450, quality = 'auto', format = 'auto' } = options;
    return buildCloudinaryUrl(
      publicId,
      'video',
      [`w_${width}`, `h_${height}`, `q_${quality}`, `f_${format}`]
    );
  },

  // Get video thumbnail
  getVideoThumbnail(publicId: string, options: {
    width?: number;
    height?: number;
    quality?: 'auto' | 'auto:low' | 'auto:good' | 'auto:best';
  } = {}): string {
    const { width = 400, height = 225, quality = 'auto' } = options;
    return buildCloudinaryThumbnail(publicId, width, height, quality);
  },
};

// React Query hooks
export const useVideos = (params?: CloudinarySearchParams) => {
  return useQuery({
    queryKey: ['videos', params],
    queryFn: () => cloudinaryApi.getVideos(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useVideosByTag = (tag: string) => {
  return useQuery({
    queryKey: ['videos', 'tag', tag],
    queryFn: () => cloudinaryApi.getVideosByTag(tag),
    enabled: !!tag,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useVideosByFolder = (folder: string) => {
  return useQuery({
    queryKey: ['videos', 'folder', folder],
    queryFn: () => cloudinaryApi.getVideosByFolder(folder),
    enabled: !!folder,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useFeaturedVideos = () => {
  return useQuery({
    queryKey: ['videos', 'featured'],
    queryFn: cloudinaryApi.getFeaturedVideos,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Workout categories mapping
export const WORKOUT_CATEGORIES: Omit<WorkoutCategory, 'videos'>[] = [
  {
    id: 'family',
    name: 'Family',
    nameKey: 'categories.family.name',
    descriptionKey: 'categories.family.description',
    icon: '👨‍👩‍👧‍👦',
    color: '#ff6b35',
  },
  {
    id: 'dance',
    name: 'Dance',
    nameKey: 'categories.dance.name',
    descriptionKey: 'categories.dance.description',
    icon: '💃',
    color: '#e91e63',
  },
  {
    id: 'power',
    name: 'Power',
    nameKey: 'categories.power.name',
    descriptionKey: 'categories.power.description',
    icon: '💪',
    color: '#9c27b0',
  },
  {
    id: 'yoga',
    name: 'Yoga',
    nameKey: 'categories.yoga.name',
    descriptionKey: 'categories.yoga.description',
    icon: '🧘',
    color: '#4caf50',
  },
  {
    id: 'static',
    name: 'Static',
    nameKey: 'categories.static.name',
    descriptionKey: 'categories.static.description',
    icon: '🏃',
    color: '#2196f3',
  },
];

// Hook to get workout categories with videos
export const useWorkoutCategories = () => {
  const { data: allVideos, isLoading, error } = useVideos();

  return useQuery({
    queryKey: ['workoutCategories', allVideos],
    queryFn: async (): Promise<WorkoutCategory[]> => {
      if (!allVideos?.resources) return [];

      return WORKOUT_CATEGORIES.map(category => {
        // Filter videos by category (assuming videos have tags or folder structure)
        const categoryVideos = allVideos.resources.filter(video => {
          // Check if video has category tag or is in category folder
          const hasTag = video.tags?.some(tag => 
            tag.toLowerCase().includes(category.id.toLowerCase())
          );
          const inFolder = video.folder?.toLowerCase().includes(category.id.toLowerCase());
          
          return hasTag || inFolder;
        });

        // Limit to 3 videos per category as requested
        const limitedVideos = categoryVideos.slice(0, 3);

        return {
          ...category,
          videos: limitedVideos,
        };
      });
    },
    enabled: !!allVideos?.resources,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook to get app statistics
export const useAppStats = () => {
  const { data: allVideos } = useVideos();
  const { data: categories } = useWorkoutCategories();

  return useQuery({
    queryKey: ['appStats', allVideos, categories],
    queryFn: () => {
      const totalVideos = allVideos?.total_count || 0;
      const totalCategories = categories?.length || 5;
      
      return {
        totalVideos,
        activeKids: 50000, // Static for now
        categories: totalCategories,
        families: 10000, // Static for now
      };
    },
    enabled: !!allVideos,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

