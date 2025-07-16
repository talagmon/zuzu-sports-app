import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Types
export interface CloudinaryVideo {
  public_id: string;
  secure_url: string;
  resource_type: string;
  format: string;
  width: number;
  height: number;
  duration?: number;
  tags: string[];
  folder?: string;
  created_at: string;
}

export interface WorkoutCategory {
  id: string;
  name: string;
  nameKey: string;
  descriptionKey: string;
  icon: string;
  videos: CloudinaryVideo[];
  color: string;
}

export interface AppStats {
  totalVideos: number;
  activeKids: number;
  categories: number;
  families: number;
}

export interface AppState {
  // Language and localization
  currentLanguage: 'en' | 'he';
  isRTL: boolean;
  
  // Theme
  theme: 'light' | 'dark';
  
  // Data
  workoutCategories: WorkoutCategory[];
  featuredVideos: CloudinaryVideo[];
  appStats: AppStats;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  selectedCategory: string | null;
  selectedVideo: CloudinaryVideo | null;
  
  // User preferences
  favoriteVideos: string[];
  completedVideos: string[];
  userProgress: {
    totalWorkouts: number;
    totalMinutes: number;
    streak: number;
    lastWorkout: string | null;
  };
}

export interface AppActions {
  // Language actions
  setLanguage: (language: 'en' | 'he') => void;
  toggleLanguage: () => void;
  
  // Theme actions
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  
  // Data actions
  setWorkoutCategories: (categories: WorkoutCategory[]) => void;
  setFeaturedVideos: (videos: CloudinaryVideo[]) => void;
  setAppStats: (stats: AppStats) => void;
  
  // UI actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  setSelectedVideo: (video: CloudinaryVideo | null) => void;
  
  // User actions
  addFavoriteVideo: (videoId: string) => void;
  removeFavoriteVideo: (videoId: string) => void;
  markVideoCompleted: (videoId: string) => void;
  updateProgress: (minutes: number) => void;
  
  // Reset actions
  resetError: () => void;
  resetSelection: () => void;
}

// Initial state
const initialState: AppState = {
  currentLanguage: 'he', // Default to Hebrew for Israeli kids
  isRTL: true,
  theme: 'light',
  workoutCategories: [],
  featuredVideos: [],
  appStats: {
    totalVideos: 0,
    activeKids: 50000,
    categories: 5,
    families: 10000,
  },
  isLoading: false,
  error: null,
  selectedCategory: null,
  selectedVideo: null,
  favoriteVideos: [],
  completedVideos: [],
  userProgress: {
    totalWorkouts: 0,
    totalMinutes: 0,
    streak: 0,
    lastWorkout: null,
  },
};

// Create store with persistence
export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Language actions
      setLanguage: (language) => set({ 
        currentLanguage: language, 
        isRTL: language === 'he' 
      }),
      
      toggleLanguage: () => {
        const current = get().currentLanguage;
        const newLanguage = current === 'en' ? 'he' : 'en';
        set({ 
          currentLanguage: newLanguage, 
          isRTL: newLanguage === 'he' 
        });
      },
      
      // Theme actions
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
      
      // Data actions
      setWorkoutCategories: (categories) => set({ workoutCategories: categories }),
      setFeaturedVideos: (videos) => set({ featuredVideos: videos }),
      setAppStats: (stats) => set({ appStats: stats }),
      
      // UI actions
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
      setSelectedVideo: (video) => set({ selectedVideo: video }),
      
      // User actions
      addFavoriteVideo: (videoId) => set((state) => ({
        favoriteVideos: [...state.favoriteVideos, videoId]
      })),
      
      removeFavoriteVideo: (videoId) => set((state) => ({
        favoriteVideos: state.favoriteVideos.filter(id => id !== videoId)
      })),
      
      markVideoCompleted: (videoId) => set((state) => {
        const isAlreadyCompleted = state.completedVideos.includes(videoId);
        if (isAlreadyCompleted) return state;
        
        return {
          completedVideos: [...state.completedVideos, videoId],
          userProgress: {
            ...state.userProgress,
            totalWorkouts: state.userProgress.totalWorkouts + 1,
            lastWorkout: new Date().toISOString(),
          }
        };
      }),
      
      updateProgress: (minutes) => set((state) => ({
        userProgress: {
          ...state.userProgress,
          totalMinutes: state.userProgress.totalMinutes + minutes,
        }
      })),
      
      // Reset actions
      resetError: () => set({ error: null }),
      resetSelection: () => set({ 
        selectedCategory: null, 
        selectedVideo: null 
      }),
    }),
    {
      name: 'zuzu-sports-storage',
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          // For React Native, you would use AsyncStorage here
          // For web, we use localStorage
          if (typeof window !== 'undefined') {
            return localStorage.getItem(key);
          }
          return null;
        },
        setItem: (key, value) => {
          if (typeof window !== 'undefined') {
            localStorage.setItem(key, value);
          }
        },
        removeItem: (key) => {
          if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
          }
        },
      })),
      partialize: (state) => ({
        currentLanguage: state.currentLanguage,
        theme: state.theme,
        favoriteVideos: state.favoriteVideos,
        completedVideos: state.completedVideos,
        userProgress: state.userProgress,
      }),
    }
  )
);

