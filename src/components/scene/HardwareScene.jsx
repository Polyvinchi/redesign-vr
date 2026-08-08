import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, Float, ContactShadows } from '@react-three/drei';
import { HeadsetModel } from './HeadsetModel';
import { DataPanel3D } from './DataPanel3D';
import { useHardwareData } from '../../hooks/useHardwareData';

function HardwareNode({ hw, position, rotation }) {
  const [ecoScore, setEcoScore] = useState(0);

  return (
    <group position={position} rotation={rotation}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <HeadsetModel position={[0, 2, 0]} setEcoScore={setEcoScore} />
      </Float>
      <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={5} blur={2} far={4} color="#3b82f6" />
      <DataPanel3D hw={hw} position={[0, 1, 1.5]} ecoScore={ecoScore} />
    </group>
  );
}

export function HardwareScene() {
  const { data, loading, error } = useHardwareData();

  if (loading || error) {
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-[#050510] z-50 text-blue-500">
        {loading ? "Initializing Spatial UI..." : `Error: ${error.message}`}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full bg-[#030308]">
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 text-white/50 text-sm z-10 pointer-events-none">
        Click on a headset to dismantle it. Click dismantled parts to toggle Eco-Materials.
      </div>
      <Canvas camera={{ position: [0, 2, 12], fov: 45 }}>
        <color attach="background" args={['#020206']} />
        <fog attach="fog" args={['#020206', 10, 30]} />
        
        <ambientLight intensity={0.2} />
        <spotLight position={[0, 10, 5]} intensity={1.5} angle={0.5} penumbra={1} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10b981" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
        <Environment preset="city" />
        
        <group position={[0, -1, 0]}>
          {data && data.hardware && data.hardware.map((hw, index) => {
            const count = data.hardware.length;
            const angle = count > 1 ? (index - (count - 1) / 2) * (Math.PI / 3) : 0;
            const radius = count > 1 ? 4 : 0;
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius - radius; 
            const rotY = count > 1 ? -angle * 0.5 : 0;

            return (
              <HardwareNode key={hw.id} hw={hw} position={[x, 0, z]} rotation={[0, rotY, 0]} />
            );
          })}
        </group>

        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          enableRotate={true}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          minDistance={6}
          maxDistance={18}
        />
      </Canvas>
    </div>
  );
}
