import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

export function useThemeTransition(profileImages) {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef(null);
  const transitionTokenRef = useRef(0);
  const [theme, setTheme] = useState('dark');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSettling, setIsSettling] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState('forward');
  const [videoSource, setVideoSource] = useState(profileImages.transition);
  const [displayImage, setDisplayImage] = useState(profileImages.dark || profileImages.fallbackDark);

  const effectiveImages = useMemo(
    () => ({
      dark: profileImages.dark || profileImages.fallbackDark,
      light: profileImages.light || profileImages.fallbackLight,
      transition: profileImages.transition,
      transitionReverse: profileImages.transitionReverse,
    }),
    [profileImages],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    if (!isTransitioning) {
      setDisplayImage(theme === 'dark' ? effectiveImages.dark : effectiveImages.light);
    }
  }, [effectiveImages.dark, effectiveImages.light, isTransitioning, theme]);

  function setThemeInstant(nextTheme) {
    setTheme(nextTheme);
    setIsTransitioning(false);
    setDisplayImage(nextTheme === 'dark' ? effectiveImages.dark : effectiveImages.light);
  }

  function finishTransition(nextTheme) {
    setDisplayImage(nextTheme === 'dark' ? effectiveImages.dark : effectiveImages.light);
    setIsTransitioning(false);
    setIsSettling(true);

    setTimeout(() => {
      setIsSettling(false);
    }, 180);
  }

  function waitForVideoReady(video) {
    if (video.readyState >= 2) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const cleanup = () => {
        video.removeEventListener('loadeddata', handleReady);
        video.removeEventListener('canplay', handleReady);
        video.removeEventListener('error', handleError);
      };
      const handleReady = () => {
        cleanup();
        resolve();
      };
      const handleError = () => {
        cleanup();
        reject(new Error('Profile transition video failed to load.'));
      };

      video.addEventListener('loadeddata', handleReady, { once: true });
      video.addEventListener('canplay', handleReady, { once: true });
      video.addEventListener('error', handleError, { once: true });
    });
  }

  async function playVideoTransition(video, nextTheme) {
    const token = transitionTokenRef.current;
    const source = nextTheme === 'light' ? effectiveImages.transition : effectiveImages.transitionReverse;

    if (!source) {
      setThemeInstant(nextTheme);
      return;
    }

    try {
      video.pause();
      setVideoSource(source);
      video.src = source;
      video.load();
      await waitForVideoReady(video);

      if (token !== transitionTokenRef.current) return;

      video.currentTime = 0;
      video.playbackRate = 1;
      setTheme(nextTheme);
      setIsTransitioning(true);
      await video.play();
    } catch {
      if (token === transitionTokenRef.current) setThemeInstant(nextTheme);
    }
  }

  async function toggleTheme() {
    if (isTransitioning) return;

    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const video = videoRef.current;

    if (prefersReducedMotion || !video || !effectiveImages.transition) {
      setThemeInstant(nextTheme);
      return;
    }

    transitionTokenRef.current += 1;
    setTransitionDirection(nextTheme === 'light' ? 'forward' : 'backward');

    await playVideoTransition(video, nextTheme);
  }

  function handleVideoEnded() {
    finishTransition(transitionDirection === 'forward' ? 'light' : 'dark');
  }

  return {
    theme,
    videoRef,
    displayImage,
    videoSource,
    isTransitioning,
    isSettling,
    transitionDirection,
    prefersReducedMotion,
    toggleTheme,
    handleVideoEnded,
  };
}
