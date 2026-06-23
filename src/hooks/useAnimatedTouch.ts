import { useState, useCallback, useRef } from 'react';

/**
 * Custom hook to enable touch animations on any element
 * Usage: 
 * const { onTouchStart, onTouchEnd, onTouchCancel } = useAnimatedTouch();
 * <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchCancel={onTouchCancel}>
 */
export const useAnimatedTouch = () => {
  const elementRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLElement>) => {
    elementRef.current = e.currentTarget;
    elementRef.current?.classList.add('touch-active');
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent<HTMLElement>) => {
    const element = e.currentTarget;
    
    // Set timeout to remove the class after animation completes
    timeoutRef.current = setTimeout(() => {
      element?.classList.remove('touch-active');
    }, 150);
  }, []);

  const onTouchCancel = useCallback((e: React.TouchEvent<HTMLElement>) => {
    e.currentTarget?.classList.remove('touch-active');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return {
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
  };
};

/**
 * Hook to detect if device supports hover (desktop with mouse)
 */
export const useSupportsHover = () => {
  const [supportsHover, setSupportsHover] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  });

  return supportsHover;
};

/**
 * Hook to detect touch device
 */
export const useTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  });

  return isTouchDevice;
};
