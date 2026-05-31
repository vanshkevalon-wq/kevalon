import { useEffect, useRef, useState } from 'react';
import './Cursor.css';

/**
 * Custom cursor:
 *  • Small sharp dot  — follows mouse exactly (no lag)
 *  • Large ring       — follows with smooth spring lag
 *  • Ring morphs on hover over links/buttons (expands + fills)
 *  • Ring shrinks + inverts on mousedown (click burst)
 *  • Hides on touch devices
 */
export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  /* live mouse position */
  const mouse   = useRef({ x: -200, y: -200 });
  /* ring's current interpolated position */
  const ring    = useRef({ x: -200, y: -200 });
  const rafId   = useRef(null);

  const [hovering,  setHovering]  = useState(false);
  const [clicking,  setClicking]  = useState(false);
  const [visible,   setVisible]   = useState(false);
  const [isTouchDevice, setIsTouch] = useState(false);

  useEffect(() => {
    /* skip on touch-only devices */
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    /* ── mouse move ── */
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    /* ── hover detection ── */
    const HOVER_SELECTOR = 'a, button, [role="button"], input, select, textarea, label[for], .nav-link, .wad-tab, .service-tag';

    const onOver = (e) => {
      if (e.target.closest(HOVER_SELECTOR)) setHovering(true);
    };
    const onOut  = (e) => {
      if (e.target.closest(HOVER_SELECTOR)) setHovering(false);
    };

    /* ── click burst ── */
    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    /* ── leave / enter window ── */
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener('mousemove',   onMove);
    document.addEventListener('mouseover',   onOver);
    document.addEventListener('mouseout',    onOut);
    document.addEventListener('mousedown',   onDown);
    document.addEventListener('mouseup',     onUp);
    document.addEventListener('mouseleave',  onLeave);
    document.addEventListener('mouseenter',  onEnter);

    /* ── RAF spring loop ── */
    const EASE = 0.13; /* lower = more lag */

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * EASE;
      ring.current.y += (mouse.current.y - ring.current.y) * EASE;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }

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
      {/* sharp dot */}
      <div
        ref={dotRef}
        className={`cur-dot
          ${visible   ? 'cur--visible'  : ''}
          ${hovering  ? 'cur-dot--hover' : ''}
          ${clicking  ? 'cur-dot--click' : ''}
        `}
      />

      {/* lagging ring */}
      <div
        ref={ringRef}
        className={`cur-ring
          ${visible   ? 'cur--visible'   : ''}
          ${hovering  ? 'cur-ring--hover' : ''}
          ${clicking  ? 'cur-ring--click' : ''}
        `}
      >
        {/* inner glow pulse — only on hover */}
        <span className="cur-ring__pulse" />
      </div>
    </>
  );
}
