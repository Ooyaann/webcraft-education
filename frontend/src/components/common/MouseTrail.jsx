import React, { useEffect, useRef } from 'react';

export default function MouseTrail() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const mouseCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Hide default browser cursor
    document.documentElement.classList.add('neo-cursor-sparkle');
    document.body.classList.add('neo-cursor-sparkle');

    let lastTime = 0;
    const colors = ['#FACC15', '#3B82F6', '#10B981', '#EC4899', '#6366F1'];

    // Track mouse movement
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      mouseCoords.current = { x, y };

      // Update dot cursor instantly and fade in
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        cursorDotRef.current.style.opacity = '1';
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.opacity = '1';
      }

      // Sparkle particles logic
      const now = Date.now();
      if (now - lastTime < 35) return;
      lastTime = now;

      const particle = document.createElement('div');
      particle.className = 'mouse-particle';
      particle.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
      
      const size = Math.floor(Math.random() * 8) + 8; // 8px to 16px
      const color = colors[Math.floor(Math.random() * colors.length)];
      const dx = (Math.random() - 0.5) * 80;
      const dy = (Math.random() - 0.5) * 80 - 40;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 700);
    };

    // Hover state global event delegation
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target && typeof target.closest === 'function') {
        const interactive = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
        if (interactive) {
          if (cursorRingRef.current) cursorRingRef.current.classList.add('cursor-hover');
          if (cursorDotRef.current) cursorDotRef.current.classList.add('cursor-hover');
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (target && typeof target.closest === 'function') {
        const interactive = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
        if (interactive) {
          if (cursorRingRef.current) cursorRingRef.current.classList.remove('cursor-hover');
          if (cursorDotRef.current) cursorDotRef.current.classList.remove('cursor-hover');
        }
      }
    };

    // Click/Active state listeners
    const handleMouseDown = () => {
      if (cursorRingRef.current) cursorRingRef.current.classList.add('cursor-clicked');
      if (cursorDotRef.current) cursorDotRef.current.classList.add('cursor-clicked');
    };

    const handleMouseUp = () => {
      if (cursorRingRef.current) cursorRingRef.current.classList.remove('cursor-clicked');
      if (cursorDotRef.current) cursorDotRef.current.classList.remove('cursor-clicked');
    };

    // Handle mouse leaving and entering window
    const handleMouseLeave = () => {
      if (cursorRingRef.current) cursorRingRef.current.style.opacity = '0';
      if (cursorDotRef.current) cursorDotRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      if (cursorRingRef.current) cursorRingRef.current.style.opacity = '1';
      if (cursorDotRef.current) cursorDotRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth inertia circle lag (lerp) loop
    let animationFrameId;
    const updateRing = () => {
      const targetX = mouseCoords.current.x;
      const targetY = mouseCoords.current.y;

      // Lerp ring coordinates
      const ease = 0.15; // smooth factor
      ringCoords.current.x += (targetX - ringCoords.current.x) * ease;
      ringCoords.current.y += (targetY - ringCoords.current.y) * ease;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateRing);
    };

    // Start loop
    animationFrameId = requestAnimationFrame(updateRing);

    return () => {
      document.documentElement.classList.remove('neo-cursor-sparkle');
      document.body.classList.remove('neo-cursor-sparkle');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="neo-custom-cursor-ring" ref={cursorRingRef}>
        <div className="neo-custom-cursor-ring-inner"></div>
      </div>
      <div className="neo-custom-cursor-dot" ref={cursorDotRef}>
        <div className="neo-custom-cursor-dot-inner">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(1.5px 1.5px 0px #0F172A)' }}>
            <path d="M1 1L18 10L10 12L8 19L1 1Z" fill="#FACC15" stroke="#0F172A" strokeWidth="2.5" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </>
  );
}
