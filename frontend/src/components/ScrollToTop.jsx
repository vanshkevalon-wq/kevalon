import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window to the top on every route change.
 * Drop this inside <BrowserRouter> (or anywhere inside the router).
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = decodeURIComponent(hash.replace('#', ''));

      // Wait a tick so route content mounts before querying target.
      requestAnimationFrame(() => {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
