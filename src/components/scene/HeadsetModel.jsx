import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Text } from '@react-three/drei';
import * as THREE from 'three';

export function HeadsetModel({ position = [0, 0, 0], setEcoScore }) {
  const group = useRef();
  
  // Animation refs
  const visorRef = useRef();
  const leftStrapRef = useRef();
  const rightStrapRef = useRef();
  const backPadRef = useRef();

  // State
  const [isExploded, setIsExploded] = useState(false);
  const [visorEco, setVisorEco] = useState(false);
  const [strapEco, setStrapEco] = useState(false);
  const [padEco, setPadEco] = useState(false);

  React.useEffect(() => {
    let score = 0;
    if (visorEco) score += 1;
    if (strapEco) score += 1;
    if (padEco) score += 1;
    if (setEcoScore) setEcoScore(score);
  }, [visorEco, strapEco, padEco, setEcoScore]);

  const toggleExplode = (e) => {
    e.stopPropagation();
    setIsExploded(!isExploded);
  };

  useFrame((state) => {
    if (group.current) {
      if (!isExploded) {
        group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      }
      group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }

    const dt = 0.1;
    if (visorRef.current) {
      visorRef.current.position.z = THREE.MathUtils.lerp(visorRef.current.position.z, isExploded ? 1.5 : 0, dt);
    }
    if (leftStrapRef.current) {
      leftStrapRef.current.position.x = THREE.MathUtils.lerp(leftStrapRef.current.position.x, isExploded ? -1.8 : -0.82, dt);
    }
    if (rightStrapRef.current) {
      rightStrapRef.current.position.x = THREE.MathUtils.lerp(rightStrapRef.current.position.x, isExploded ? 1.8 : 0.82, dt);
    }
    if (backPadRef.current) {
      backPadRef.current.position.z = THREE.MathUtils.lerp(backPadRef.current.position.z, isExploded ? -2.5 : -1.0, dt);
    }
  });

  return (
    <group ref={group} position={position}>
      
      {/* 3D Button to Toggle Mode */}
      <group position={[0, 1.8, 0]} onClick={toggleExplode}>
        <Box args={[1.5, 0.4, 0.2]} radius={0.05}>
          <meshStandardMaterial color={isExploded ? "#ef4444" : "#3b82f6"} />
        </Box>
        <Text position={[0, 0, 0.15]} fontSize={0.15} color="white">
          {isExploded ? "REASSEMBLE" : "DISMANTLE (CLICK ME)"}
        </Text>
      </group>

      {/* Visor */}
      <group ref={visorRef} onClick={(e) => { e.stopPropagation(); if (isExploded) setVisorEco(!visorEco); }}>
        {visorEco ? (
          // Eco Visor: Reused Cardboard Box
          <group>
            <Box args={[1.7, 0.9, 0.8]}>
              <meshStandardMaterial color="#b48c66" roughness={1} />
            </Box>
            <Text position={[0, 0.6, 0]} fontSize={0.15} color="#10b981">
              Reused Cardboard Box
            </Text>
          </group>
        ) : (
          <group>
            <Box args={[1.6, 0.8, 1]}>
              <meshStandardMaterial color="#a5b4fc" transparent opacity={0.7} roughness={0.2} />
            </Box>
            <Box args={[1.4, 0.6, 0.1]} position={[0, 0, 0.52]}>
              <meshStandardMaterial color="#000000" />
            </Box>
            {isExploded && <Text position={[0, 0.6, 0]} fontSize={0.15} color="#ef4444">Standard Plastic Visor</Text>}
          </group>
        )}
      </group>

      {/* Straps */}
      <group>
        <group ref={leftStrapRef} onClick={(e) => { e.stopPropagation(); if (isExploded) setStrapEco(!strapEco); }}>
          {strapEco ? (
            // Eco Strap: Reused Fabric / Shoelace
            <group>
              <Cylinder args={[0.02, 0.02, 1.2]} rotation={[Math.PI/2, 0, 0]} position={[0, 0, -0.4]}>
                <meshStandardMaterial color="#8b5a2b" roughness={1} />
              </Cylinder>
              <Text position={[0, 0.5, -0.4]} fontSize={0.15} color="#10b981">Old Shoelace</Text>
            </group>
          ) : (
            <group>
              <Box args={[0.05, 0.2, 1.2]} position={[0, 0, -0.4]}>
                <meshStandardMaterial color="#ffffff" roughness={0.7} />
              </Box>
              {isExploded && <Text position={[0, 0.5, -0.4]} fontSize={0.15} color="#ef4444">Nylon Strap</Text>}
            </group>
          )}
        </group>
        
        <group ref={rightStrapRef} onClick={(e) => { e.stopPropagation(); if (isExploded) setStrapEco(!strapEco); }}>
          {strapEco ? (
            <group>
              <Cylinder args={[0.02, 0.02, 1.2]} rotation={[Math.PI/2, 0, 0]} position={[0, 0, -0.4]}>
                <meshStandardMaterial color="#8b5a2b" roughness={1} />
              </Cylinder>
            </group>
          ) : (
            <Box args={[0.05, 0.2, 1.2]} position={[0, 0, -0.4]}>
              <meshStandardMaterial color="#ffffff" roughness={0.7} />
            </Box>
          )}
        </group>
      </group>

      {/* Back Pad */}
      <group ref={backPadRef} onClick={(e) => { e.stopPropagation(); if (isExploded) setPadEco(!padEco); }}>
        {padEco ? (
          // Eco Pad: Natural Cork
          <group>
            <Cylinder args={[0.5, 0.5, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#c09858" roughness={1} bumpScale={0.2} />
            </Cylinder>
            <Text position={[0, 0.5, 0]} fontSize={0.15} color="#10b981">Recycled Cork Pad</Text>
          </group>
        ) : (
          <group>
            <Cylinder args={[0.5, 0.5, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#0f172a" />
            </Cylinder>
            {isExploded && <Text position={[0, 0.5, 0]} fontSize={0.15} color="#ef4444">Polyurethane Foam</Text>}
          </group>
        )}
      </group>

    </group>
  );
}
