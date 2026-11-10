import { useEffect, useState } from 'react';
import { DESKTOP_QUERY } from '~/config/viewport';

export const useDesktop = () => {
  const [desktop, setDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const update = () => setDesktop(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return desktop;
};
