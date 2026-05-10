export function ThemeProfileTransition({ profileImages, themeState }) {
  const {
    theme,
    videoRef,
    displayImage,
    isTransitioning,
    toggleTheme,
    handleVideoEnded,
  } = themeState;

  return (
    <div className="profile-console">
      <div className="profile-console-label">THEME TRANSITION: {theme === 'dark' ? 'DARK' : 'LIGHT'}</div>
      <div className="profile-media" data-transitioning={isTransitioning}>
        <img src={displayImage} alt="Huynh Duc Tinh profile" />
        {profileImages.transition && (
          <video
            ref={videoRef}
            src={profileImages.transition}
            muted
            playsInline
            preload="metadata"
            onEnded={handleVideoEnded}
          />
        )}
      </div>
      <button className="theme-toggle" type="button" onClick={toggleTheme} aria-pressed={theme === 'light'}>
        <span>{theme === 'dark' ? 'Engage Light Mode' : 'Return Dark Mode'}</span>
        <i className="fas fa-adjust" aria-hidden="true" />
      </button>
    </div>
  );
}
