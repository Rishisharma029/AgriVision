export interface PerformanceConfig {
  glassmorphism: boolean;
  backdropBlur: string;
  particlesCount: number;
  starFieldDensity: number;
  enable3D: boolean;
  enableTransitions: boolean;
  blurLevel: 'none' | 'md' | 'lg' | 'xl';
}

export const performanceProfiles = {
  ultra: {
    glassmorphism: true,
    backdropBlur: 'backdrop-blur-xl',
    particlesCount: 150,
    starFieldDensity: 300,
    enable3D: true,
    enableTransitions: true,
    blurLevel: 'xl',
  },
  high: {
    glassmorphism: true,
    backdropBlur: 'backdrop-blur-lg',
    particlesCount: 75,
    starFieldDensity: 150,
    enable3D: true,
    enableTransitions: true,
    blurLevel: 'lg',
  },
  medium: {
    glassmorphism: true,
    backdropBlur: 'backdrop-blur-md',
    particlesCount: 0,
    starFieldDensity: 50,
    enable3D: true,
    enableTransitions: true,
    blurLevel: 'md',
  },
  low: {
    glassmorphism: false,
    backdropBlur: 'backdrop-blur-none',
    particlesCount: 0,
    starFieldDensity: 0,
    enable3D: false,
    enableTransitions: false,
    blurLevel: 'none',
  }
} as const;

export type PerformanceProfile = keyof typeof performanceProfiles;
