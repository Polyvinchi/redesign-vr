import React from 'react';
import { Text } from '@react-three/drei';

export function EcoDifferencePanel({ position, visible, text, color = "#10b981" }) {
  if (!visible) return null;

  return (
    <group position={position}>
      <Text
        fontSize={0.12}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeAmM.woff"
      >
        {text}
      </Text>
    </group>
  );
}
