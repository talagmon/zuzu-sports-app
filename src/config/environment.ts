import Constants from 'expo-constants';

// Environment configuration with validation
export interface EnvironmentConfig {
  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
    baseUrl: string;
  };
  app: {
    environment: 'development' | 'staging' | 'production';
    apiBaseUrl: string;
    version: string;
  };
  features: {
    analytics: boolean;
    crashReporting: boolean;
    debugMode: boolean;
  };
}

// Get environment variable with validation
const getEnvVar = (key: string, defaultValue?: string): string => {
  // For Expo, use Constants.expoConfig?.extra or process.env
  const value = 
    Constants.expoConfig?.extra?.[key] || 
    process.env[key] || 
    defaultValue;

  if (!value) {
    console.warn(`Environment variable ${key} is not set`);
    return '';
  }

  return value;
};

// Validate required environment variables
const validateEnvironment = (): void => {
  const requiredVars = [
    'EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
  ];

  const missingVars = requiredVars.filter(varName => !getEnvVar(varName));

  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};

// Create environment configuration
const createEnvironmentConfig = (): EnvironmentConfig => {
  // Validate environment first
  validateEnvironment();

  const environment = getEnvVar('EXPO_PUBLIC_APP_ENV', 'development') as 'development' | 'staging' | 'production';
  
  return {
    cloudinary: {
      cloudName: getEnvVar('EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME'),
      apiKey: getEnvVar('CLOUDINARY_API_KEY'),
      apiSecret: getEnvVar('CLOUDINARY_API_SECRET'),
      baseUrl: `https://api.cloudinary.com/v1_1/${getEnvVar('EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME')}`,
    },
    app: {
      environment,
      apiBaseUrl: getEnvVar('EXPO_PUBLIC_API_BASE_URL', 'https://api.zuzusports.com'),
      version: Constants.expoConfig?.version || '1.0.0',
    },
    features: {
      analytics: environment === 'production',
      crashReporting: environment !== 'development',
      debugMode: environment === 'development',
    },
  };
};

// Export configuration
export const ENV = createEnvironmentConfig();

// Helper functions for common operations
export const isProduction = (): boolean => ENV.app.environment === 'production';
export const isDevelopment = (): boolean => ENV.app.environment === 'development';
export const isStaging = (): boolean => ENV.app.environment === 'staging';

// Cloudinary URL builders with security
export const buildCloudinaryUrl = (
  publicId: string,
  resourceType: 'image' | 'video' = 'video',
  transformations: string[] = []
): string => {
  const baseUrl = `https://res.cloudinary.com/${ENV.cloudinary.cloudName}`;
  const transformationString = transformations.length > 0 ? `/${transformations.join(',')}` : '';
  return `${baseUrl}/${resourceType}/upload${transformationString}/${publicId}`;
};

export const buildCloudinaryThumbnail = (
  publicId: string,
  width: number = 400,
  height: number = 225,
  quality: string = 'auto'
): string => {
  return buildCloudinaryUrl(
    publicId,
    'video',
    [`w_${width}`, `h_${height}`, `q_${quality}`, 'f_jpg', 'so_auto']
  ) + '.jpg';
};

// Security: Don't expose sensitive data in logs
export const getSafeConfig = () => ({
  app: ENV.app,
  features: ENV.features,
  cloudinary: {
    cloudName: ENV.cloudinary.cloudName,
    // Never expose API keys in logs
    apiKey: ENV.cloudinary.apiKey ? '***HIDDEN***' : 'NOT_SET',
    apiSecret: ENV.cloudinary.apiSecret ? '***HIDDEN***' : 'NOT_SET',
  },
});

// Log configuration on startup (safe version)
if (isDevelopment()) {
  console.log('Environment Configuration:', getSafeConfig());
}

