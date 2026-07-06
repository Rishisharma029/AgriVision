import { create } from 'zustand'
import { PerformanceProfile } from '../design-system/theme/performance'

interface PerformanceState {
  profile: PerformanceProfile;
  autoDetectedProfile: PerformanceProfile;
  setProfile: (profile: PerformanceProfile) => void;
  detectPerformance: () => void;
}

const safeSetItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {}
};

export const usePerformanceStore = create<PerformanceState>((set) => ({
  profile: 'high', // Default fallback
  autoDetectedProfile: 'high',
  
  setProfile: (profile) => {
    safeSetItem('performance-profile', profile);
    set({ profile });
  },
  
  detectPerformance: () => {
    // 1. Check if user has stored a preference
    let savedProfile: PerformanceProfile | null = null;
    try {
      const val = localStorage.getItem('performance-profile');
      if (val === 'ultra' || val === 'high' || val === 'medium' || val === 'low') {
        savedProfile = val as PerformanceProfile;
      }
    } catch (e) {}
    
    // 2. Perform auto-detection
    let detected: PerformanceProfile = 'high'; // Default target
    
    try {
      if (typeof window !== 'undefined' && window.matchMedia) {
        // Check prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          detected = 'low';
        } else {
          const memory = (navigator as any).deviceMemory || 8; // Default to 8GB if not supported
          const cores = navigator.hardwareConcurrency || 8;  // Default to 8 cores if not supported
          
          if (memory >= 8 && cores >= 8) {
            detected = 'ultra';
          } else if (memory >= 4 && cores >= 4) {
            detected = 'high';
          } else if (memory >= 2 && cores >= 2) {
            detected = 'medium';
          } else {
            detected = 'low';
          }
        }
      }
    } catch (e) {
      console.warn("Performance detection failed, falling back to High", e);
    }
    
    set({
      autoDetectedProfile: detected,
      profile: savedProfile || detected
    });
  }
}));

export default usePerformanceStore;
export type { PerformanceProfile };
