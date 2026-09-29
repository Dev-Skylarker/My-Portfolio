import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  childClassName?: string;
  delay?: number; // In milliseconds
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  duration?: number; // In milliseconds
  once?: boolean;
}

// Global scroll direction tracker: shared across all instances to prevent 40+ scroll event listeners
let globalScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
let globalScrollDir: 'down' | 'up' = 'down';
let isListening = false;

function ensureScrollListener() {
  if (isListening || typeof window === 'undefined') return;
  isListening = true;
  window.addEventListener(
    'scroll',
    () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - globalScrollY) > 4) {
        globalScrollDir = currentY > globalScrollY ? 'down' : 'up';
        globalScrollY = currentY;
      }
    },
    { passive: true }
  );
}

export function ScrollReveal({
  children,
  className = '',
  childClassName = '',
  delay = 0,
  direction = 'up',
  threshold = 0.05,
  duration = 520,
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureScrollListener();

    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const currentEl = ref.current;
    if (!currentEl) return;

    // Check if element is already within viewport on mount
    const rect = currentEl.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      if (once) return;
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    // On mobile, trigger slightly before element enters (rootMargin +30px) for smooth glide-in
    const rootMargin = isMobile ? '0px 0px 35px 0px' : '0px 0px -20px 0px';
    const effectiveThreshold = isMobile ? Math.min(threshold, 0.04) : threshold;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(currentEl);
          }
        } else if (!once) {
          const entryRect = entry.boundingClientRect;
          const isFarAbove = entryRect.bottom < -200;
          const isFarBelow = entryRect.top > window.innerHeight + 200;
          if (isFarAbove || isFarBelow) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold: effectiveThreshold,
        rootMargin,
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.unobserve(currentEl);
    };
  }, [threshold, once]);

  const getInitialTransform = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const dist = isMobile ? 20 : 28;

    if (direction === 'none') return 'scale(0.96)';
    if (direction === 'left') return `translate3d(${dist}px, 0, 0)`;
    if (direction === 'right') return `translate3d(-${dist}px, 0, 0)`;

    // For vertical reveals, adapt smartly to whether user is scrolling down or up
    if (globalScrollDir === 'down') {
      return direction === 'down' ? `translate3d(0, -${dist}px, 0)` : `translate3d(0, ${dist}px, 0)`;
    } else {
      return direction === 'down' ? `translate3d(0, ${dist}px, 0)` : `translate3d(0, -${dist}px, 0)`;
    }
  };

  return (
    <div ref={ref} className={className}>
      <div
        className={childClassName}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
          transitionProperty: 'opacity, transform',
          transitionDuration: `${duration}ms`,
          transitionDelay: isVisible ? `${delay}ms` : '0ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'opacity, transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
