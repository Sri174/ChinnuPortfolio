import { useEffect, useRef } from 'react';

export const useInteractiveEffects = () => {
  // Check if device is touch-enabled
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Custom cursor effect - only for non-touch devices
  useEffect(() => {
    if (isTouchDevice) return; // Skip cursor effect on touch devices

    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.querySelector('.cursor-follower') as HTMLElement;
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    // Add custom cursor to the body
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);

    // Add mouse move listener
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (cursor && document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
    };
  }, [isTouchDevice]);

  // Interactive element effect for tracking mouse position - only for non-touch devices
  useEffect(() => {
    if (isTouchDevice) return; // Skip mouse position tracking on touch devices

    const handleMouseMove = (e: MouseEvent) => {
      const elements = document.querySelectorAll('.interactive-element');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        (el as HTMLElement).style.setProperty('--x', `${x}px`);
        (el as HTMLElement).style.setProperty('--y', `${y}px`);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTouchDevice]);

// Touch feedback enhancement - only for touch devices
  useEffect(() => {
    if (!isTouchDevice) return; // Only run on touch devices

    // Add touch feedback for interactive elements
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as Element;
      if (target && target instanceof Element) {
        const element = target.closest('.interactive-element, .profile-image-container, .skill-badge, .hero-button');
        if (element) {
          element.classList.add('touch-active');
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Remove touch-active class from all elements to ensure cleanup
      document.querySelectorAll('.touch-active').forEach(el => {
        el.classList.remove('touch-active');
      });
    };

    const handleTouchCancel = () => {
      // Remove touch-active class if touch is cancelled
      document.querySelectorAll('.touch-active').forEach(el => {
        el.classList.remove('touch-active');
      });
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchCancel);

    // Cleanup event listeners
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchCancel);
      
      // Clean up any remaining touch-active classes
      document.querySelectorAll('.touch-active').forEach(el => {
        el.classList.remove('touch-active');
      });
    };
  }, [isTouchDevice]);
};
