import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const rafId   = useRef(null);

  const [hovering,      setHovering]  = useState(false);
  const [clicking,      setClicking]  = useState(false);
  const [visible,       setVisible]   = useState(false);
  const [isTouchDevice, setIsTouch]   = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) { setIsTouch(true); return; }

    const onMove  = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; if (!visible) setVisible(true); };
    const HOVER   = 'a, button, [role="button"], input, select, textarea, label[for], .nav-link, .wad-tab, .service-tag';
    const onOver  = (e) => { if (e.target.closest(HOVER)) setHovering(true);  };
    const onOut   = (e) => { if (e.target.closest(HOVER)) setHovering(false); };
    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseover',  onOver);
    document.addEventListener('mouseout',   onOut);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    const EASE = 0.13;
    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * EASE;
      ring.current.y += (mouse.current.y - ring.current.y) * EASE;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mouse.current.x}px,${mouse.current.y}px) translate(-50%,-50%)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ring.current.x}px,${ring.current.y}px) translate(-50%,-50%)`;
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, [visible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Sharp dot — instant, mix-blend-mode difference */}
      <div
        ref={dotRef}
        style={{ mixBlendMode: 'difference' }}
        className={[
          'fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform rounded-full bg-white',
          'transition-[width,height,opacity] duration-[180ms] ease-[ease]',
          visible  ? 'opacity-100' : 'opacity-0',
          hovering ? 'w-1 h-1'    : clicking ? 'w-2.5 h-2.5' : 'w-2 h-2',
        ].join(' ')}
      />

      {/* Lagging ring */}
      <div
        ref={ringRef}
        style={{ mixBlendMode: 'exclusion' }}
        className={[
          'fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform rounded-full',
          'border-2 border-white bg-transparent',
          'flex items-center justify-center',
          'transition-[width,height,border-color,background,border-width,opacity] duration-300',
          visible  ? 'opacity-100' : 'opacity-0',
          hovering ? 'w-[34px] h-[34px] bg-white/[0.06] border-[1.5px]' :
          clicking ? 'w-6 h-6 border-[2.5px] bg-white/10' :
                     'w-7 h-7',
        ].join(' ')}
      >
        {/* pulse on hover */}
        {hovering && (
          <span
            className="absolute inset-0 rounded-full border border-white/50 opacity-0"
            style={{ animation: 'curPulse 1.5s ease-out infinite' }}
          />
        )}
        {/* burst on click */}
        {clicking && (
          <span
            className="absolute inset-0 rounded-full border-[1.5px] border-white/70"
            style={{ animation: 'curBurst 0.45s ease-out forwards' }}
          />
        )}
      </div>

      <style>{`
        @keyframes curPulse { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2);opacity:0} }
        @keyframes curBurst { 0%{transform:scale(1);opacity:0.9} 100%{transform:scale(2.4);opacity:0} }
        @media (pointer: coarse) { .cur-dot,.cur-ring { display:none !important; } }
      `}</style>
    </>
  );
}
