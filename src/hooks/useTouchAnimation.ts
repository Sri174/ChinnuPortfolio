import { useRef } from 'react';

/**
 * Hook to add touch-based animation feedback to elements
 * Adds visual feedback for touch interactions on mobile devices
 */
export const useTouchAnimation = () => {
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = (element: HTMLElement | null) => {
    if (!element) return;
    element.classList.add('touch-active');
    
    // Clear any existing timeout
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
  };

  const handleTouchEnd = (element: HTMLElement | null) => {
    if (!element) return;
    
    // Set timeout to remove the class after animation completes
    touchTimeoutRef.current = setTimeout(() => {
      element.classList.remove('touch-active');
    }, 200);
  };

  const handleTouchCancel = (element: HTMLElement | null) => {
    if (!element) return;
    element.classList.remove('touch-active');
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
  };

  return {
    handleTouchStart,
    handleTouchEnd,
    handleTouchCancel,
  };
};
