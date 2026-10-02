import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Position coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on devices that have a real fine pointer (mouse/trackpad, not touch)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!visible) setVisible(true);

      // Check if hovering over an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest(
            'button, a, [role="button"], input, select, textarea, label, [tabindex="0"], .cursor-pointer, [data-interactive="true"]'
          )
        );
        setIsPointer(isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth animation loop for trailing ring
    const render = () => {
      // Linear interpolation for smooth trailing ring
      const ease = 0.22;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [visible]);

  if (!enabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Outer Glow Halo / Trailing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none transition-[width,height,border-color,background-color] duration-200 ease-out will-change-transform ${
          isPointer
            ? isClicking
              ? 'w-10 h-10 border-2 border-purple-400 bg-purple-500/25 shadow-[0_0_20px_rgba(168,85,247,0.6)]'
              : 'w-11 h-11 border-2 border-purple-400/90 bg-purple-600/15 shadow-[0_0_25px_rgba(168,85,247,0.45)]'
            : isClicking
            ? 'w-6 h-6 border border-purple-400/80 bg-purple-500/20'
            : 'w-8 h-8 border border-white/40 bg-white/5 backdrop-blur-[0.5px]'
        }`}
      />

      {/* Central Precision Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none transition-[width,height,background-color,box-shadow] duration-150 ease-out will-change-transform ${
          isPointer
            ? 'w-2.5 h-2.5 bg-gradient-to-tr from-purple-400 to-pink-400 shadow-[0_0_10px_#a855f7]'
            : isClicking
            ? 'w-2 h-2 bg-purple-300 shadow-[0_0_8px_#c084fc]'
            : 'w-1.5 h-1.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]'
        }`}
      />
    </div>
  );
};
