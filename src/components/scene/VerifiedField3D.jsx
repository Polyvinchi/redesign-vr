import React from 'react';
import { Text, Box } from '@react-three/drei';

export function VerifiedField3D({ data, label, position = [0, 0, 0] }) {
  const isVerified = data && data.verified;
  
  return (
    <group position={position}>
      {/* Label */}
      <Text
        position={[-1.2, 0.2, 0]}
        fontSize={0.12}
        color="#9ca3af"
        anchorX="left"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeAmM.woff"
      >
        {label}
      </Text>

      {/* Background Plate for Value */}
      <Box args={[2.5, 0.35, 0.05]} position={[0.1, -0.2, -0.05]}>
        <meshStandardMaterial 
          color={isVerified ? "#064e3b" : "#78350f"} 
          roughness={0.2}
          transparent 
          opacity={0.8}
        />
      </Box>

      {/* Value or Warning Text */}
      <Text
        position={[-1.0, -0.2, 0]}
        fontSize={0.14}
        color={isVerified ? "#34d399" : "#fbbf24"}
        anchorX="left"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeAmM.woff"
      >
        {isVerified ? (data.value || data.resolution || String(data)) : "DATA REQUIRED / UNVERIFIED"}
      </Text>
    </group>
  );
}
