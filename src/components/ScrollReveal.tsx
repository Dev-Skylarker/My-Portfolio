import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  childClassName?: string;
  delay?: number; // In milliseconds
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  duration?: number; // In milliseconds
}

export function ScrollReveal({
  children,
  className = '',
  childClassName = '',
  delay = 0,
  direction = 'up',
  threshold = 0.08,
  duration = 650,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDir, setScrollDir] = useState<'down' | 'up'>('down');
  const ref = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Track global scroll direction for smart directional entrance
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastScrollY.current) > 4) {
        setScrollDir(currentY > lastScrollY.current ? 'down' : 'up');
        lastScrollY.current = currentY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Hysteresis deadband: only un-reveal when element has scrolled well away from the viewport
          // This prevents rapid oscillation/shaking at the viewport boundary
          const rect = entry.boundingClientRect;
          const isFarAbove = rect.bottom < -80;
          const isFarBelow = rect.top > window.innerHeight + 80;
          if (isFarAbove || isFarBelow) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.unobserve(currentEl);
    };
  }, [threshold]);

  const getInitialTransform = () => {
    if (direction === 'none') return 'scale(0.97)';
    if (direction === 'left') return 'translate3d(28px, 0, 0)';
    if (direction === 'right') return 'translate3d(-28px, 0, 0)';

    // For vertical reveals, adapt smartly to whether user is scrolling down or up
    if (scrollDir === 'down') {
      return direction === 'down' ? 'translate3d(0, -28px, 0)' : 'translate3d(0, 28px, 0)';
    } else {
      return direction === 'down' ? 'translate3d(0, 28px, 0)' : 'translate3d(0, -28px, 0)';
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

