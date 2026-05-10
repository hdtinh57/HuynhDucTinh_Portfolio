export function ThemeProfileTransition({ profileImages, themeState }) {
  const {
    theme,
    videoRef,
    displayImage,
    videoSource,
    isTransitioning,
    isSettling,
    transitionDirection,
    toggleTheme,
    handleVideoEnded,
  } = themeState;

  return (
    <div className="profile-console">
      <div className="profile-media" data-transitioning={isTransitioning} data-settling={isSettling} data-direction={transitionDirection}>
        <img src={displayImage} alt="Huynh Duc Tinh profile" />
        {profileImages.transition && (
          <>
            <video
              ref={videoRef}
              src={videoSource || profileImages.transition}
              muted
              playsInline
              preload="auto"
              onEnded={handleVideoEnded}
            />
            {profileImages.transitionReverse && <link rel="preload" as="video" href={profileImages.transitionReverse} />}
          </>
        )}
      </div>
      <button className="theme-toggle" type="button" onClick={toggleTheme} disabled={isTransitioning} aria-pressed={theme === 'light'}>
        <span>{isTransitioning ? 'Transitioning' : theme === 'dark' ? 'Engage Light Mode' : 'Return Dark Mode'}</span>
        <i className="fas fa-adjust" aria-hidden="true" />
      </button>
    </div>
  );
}
