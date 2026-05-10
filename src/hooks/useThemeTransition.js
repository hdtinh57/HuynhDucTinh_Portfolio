import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

export function useThemeTransition(profileImages) {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef(null);
  const [theme, setTheme] = useState('dark');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayImage, setDisplayImage] = useState(profileImages.dark || profileImages.fallbackDark);

  const effectiveImages = useMemo(
    () => ({
      dark: profileImages.dark || profileImages.fallbackDark,
      light: profileImages.light || profileImages.fallbackLight,
      transition: profileImages.transition,
    }),
    [profileImages],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    setDisplayImage(theme === 'dark' ? effectiveImages.dark : effectiveImages.light);
  }, [effectiveImages.dark, effectiveImages.light, theme]);

  function setThemeInstant(nextTheme) {
    setTheme(nextTheme);
    setIsTransitioning(false);
    setDisplayImage(nextTheme === 'dark' ? effectiveImages.dark : effectiveImages.light);
  }

  async function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const video = videoRef.current;

    if (prefersReducedMotion || !video || !effectiveImages.transition) {
      setThemeInstant(nextTheme);
      return;
    }

    setIsTransitioning(true);
    setTheme(nextTheme);

    if (nextTheme === 'light') {
      video.currentTime = 0;
      video.playbackRate = 1;
    } else {
      video.currentTime = Math.max(video.duration || 0, 0.01);
      video.playbackRate = -1;
    }

    try {
      await video.play();
    } catch {
      setThemeInstant(nextTheme);
    }
  }

  function handleVideoEnded() {
    const nextImage = theme === 'dark' ? effectiveImages.dark : effectiveImages.light;
    setDisplayImage(nextImage);
    setIsTransitioning(false);
  }

  return {
    theme,
    videoRef,
    displayImage,
    isTransitioning,
    prefersReducedMotion,
    toggleTheme,
    handleVideoEnded,
  };
}
