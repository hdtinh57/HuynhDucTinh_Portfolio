import { useState } from 'react';
import { Hero } from './components/hero/Hero.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Navbar } from './components/layout/Navbar.jsx';
import { CapabilityMatrix } from './components/sections/CapabilityMatrix.jsx';
import { ContactTransmission } from './components/sections/ContactTransmission.jsx';
import { MissionLogs } from './components/sections/MissionLogs.jsx';
import { OperationalTimeline } from './components/sections/OperationalTimeline.jsx';
import { ProofLayer } from './components/sections/ProofLayer.jsx';
import { Lightbox } from './components/ui/Lightbox.jsx';
import { Modal } from './components/ui/Modal.jsx';
import { profile } from './data/profile.js';
import { useThemeTransition } from './hooks/useThemeTransition.js';

function App() {
  const themeState = useThemeTransition(profile.profileImages);
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  function openLightbox(gallery, index) {
    setLightbox({ gallery, index });
  }

  return (
    <>
      <Navbar />
      <main className="app-shell">
        <Hero themeState={themeState} />
        <CapabilityMatrix />
        <MissionLogs onSelectProject={setSelectedProject} />
        <OperationalTimeline />
        <ProofLayer />
        <ContactTransmission />
      </main>
      <Footer />
      <Modal project={selectedProject} onClose={() => setSelectedProject(null)} onOpenLightbox={openLightbox} />
      {lightbox && (
        <Lightbox gallery={lightbox.gallery} initialIndex={lightbox.index} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}

export default App;
