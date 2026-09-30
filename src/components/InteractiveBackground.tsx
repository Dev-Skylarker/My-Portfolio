import { useEffect, useRef, useState } from 'react';

/**
 * InteractiveBackground
 * 
 * Ambient interactive lighting system that:
 * - Fluidly follows the mouse on hover with a luminous, noticeable presence
 * - Automatically transitions to an organic floating Lissajous drift when no mouse is detected (idle/offscreen/touch)
 * - Seamlessly glides back to tracking when the mouse moves again
 * - Dynamically brightens on hover and softly glows during idle
 * - GPU accelerated with will-change: transform, zero layout thrashing, pointer-events-none
 */
export function InteractiveBackground() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Position references (current interpolated and target)
  const currentPos = useRef({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.4 });
  const targetPos = useRef({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.4 });
  
  // Secondary trailing light position for chromatic depth
  const trailPos = useRef({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.4 });

  // DOM node references for direct GPU transforms (bypassing React re-renders)
  const primaryLightRef = useRef<HTMLDivElement>(null);
  const secondaryLightRef = useRef<HTMLDivElement>(null);

  // Mouse activity & idle tracking
  const isMouseActive = useRef(false);
  const lastMouseTime = useRef(0);
  const animFrameId = useRef<number>(0);
  const idleCheckTimeout = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const w = window.innerWidth;
    const h = window.innerHeight;
    currentPos.current = { x: w * 0.5, y: h * 0.4 };
    targetPos.current = { x: w * 0.5, y: h * 0.4 };
    trailPos.current = { x: w * 0.5, y: h * 0.4 };

    const resetIdleTimer = () => {
      if (idleCheckTimeout.current) {
        window.clearTimeout(idleCheckTimeout.current);
      }
      idleCheckTimeout.current = window.setTimeout(() => {
        isMouseActive.current = false;
        setIsHovering(false);
      }, 2500);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.clientX < 0 || e.clientY < 0) return;
      if (!isMouseActive.current) {
        isMouseActive.current = true;
        setIsHovering(true);
      }
      lastMouseTime.current = performance.now();
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
      resetIdleTimer();
    };

    const handleMouseLeave = () => {
      isMouseActive.current = false;
      setIsHovering(false);
      if (idleCheckTimeout.current) {
        window.clearTimeout(idleCheckTimeout.current);
      }
    };

    const handleResize = () => {
      if (!isMouseActive.current) {
        targetPos.current.x = window.innerWidth * 0.5;
        targetPos.current.y = window.innerHeight * 0.4;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize, { passive: true });

    let startTime = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - startTime) * 0.001;
      const timeSinceMouse = now - lastMouseTime.current;

      // If no mouse interaction for 2.5 seconds, or if mouse left the window,
      // smoothly transition into the autonomous organic ambient animation
      if (!isMouseActive.current || timeSinceMouse > 2500) {
        const cx = window.innerWidth * 0.5;
        const cy = window.innerHeight * 0.42;

        // Elegant multi-frequency Lissajous orbit across the screen
        const autoX = cx + Math.sin(elapsed * 0.45) * (window.innerWidth * 0.28) + Math.cos(elapsed * 0.2) * (window.innerWidth * 0.1);
        const autoY = cy + Math.cos(elapsed * 0.38) * (window.innerHeight * 0.22) + Math.sin(elapsed * 0.15) * (window.innerHeight * 0.08);

        targetPos.current.x = autoX;
        targetPos.current.y = autoY;
      }

      // Smooth inertia lerp towards target (faster tracking on mouse hover, gentler on idle)
      const lerpSpeed = isMouseActive.current ? 0.09 : 0.045;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpSpeed;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpSpeed;

      // Secondary trail light lags slightly behind for fluid organic dimensionality
      trailPos.current.x += (currentPos.current.x - trailPos.current.x) * 0.055;
      trailPos.current.y += (currentPos.current.y - trailPos.current.y) * 0.055;

      // Direct GPU hardware transform updates
      if (primaryLightRef.current) {
        primaryLightRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0px) translate(-50%, -50%)`;
      }
      if (secondaryLightRef.current) {
        secondaryLightRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0px) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (idleCheckTimeout.current) {
        window.clearTimeout(idleCheckTimeout.current);
      }
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      {/* Primary Interactive Aura: Electric Blue / Sky tint that brightens on hover and softly floats on idle */}
      <div
        ref={primaryLightRef}
        className={`absolute top-0 left-0 w-[540px] h-[540px] sm:w-[660px] sm:h-[660px] rounded-full blur-[75px] sm:blur-[85px] transition-opacity duration-500 ease-out will-change-transform bg-[radial-gradient(circle_at_center,rgba(0,133,255,0.6)_0%,rgba(56,155,255,0.3)_35%,rgba(0,133,255,0.06)_60%,transparent_75%)] ${
          isHovering
            ? 'opacity-12 dark:opacity-24'
            : 'opacity-5 dark:opacity-10'
        }`}
      />

      {/* Secondary Trailing Ambient Aura: Deep Cyan / Indigo tint lagging for chromatic depth */}
      <div
        ref={secondaryLightRef}
        className={`absolute top-0 left-0 w-[400px] h-[400px] sm:w-[480px] sm:h-[480px] rounded-full blur-[65px] sm:blur-[75px] transition-opacity duration-500 ease-out will-change-transform bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.5)_0%,rgba(79,70,229,0.22)_45%,transparent_70%)] ${
          isHovering
            ? 'opacity-8 dark:opacity-18'
            : 'opacity-4 dark:opacity-8'
        }`}
      />
    </div>
  );
}
