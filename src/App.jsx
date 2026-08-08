import React from 'react';
import { HardwareScene } from './components/scene/HardwareScene';
import './index.css';

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden selection:bg-blue-500/30 font-sans">
      
      {/* 3D Scene Overlay UI */}
      <div className="absolute top-0 left-0 w-full p-6 z-10 pointer-events-none">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-white drop-shadow-md">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">ReDesign VR</span> Architecture
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl drop-shadow">
          Interactive Spatial UI Data Layer (Egypt Validation)
        </p>
      </div>

      {/* Main 3D Canvas */}
      <HardwareScene />

    </div>
  );
}

export default App;
