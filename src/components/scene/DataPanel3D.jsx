import React from 'react';
import { Text, Box, Edges } from '@react-three/drei';
import { VerifiedField3D } from './VerifiedField3D';

export function DataPanel3D({ hw, position = [0, 0, 0], rotation = [0, 0, 0], ecoScore = 0 }) {
  // Extract Egypt metrics
  const egyptData = hw.deploymentMetrics?.egypt;

  return (
    <group position={position} rotation={rotation}>
      {/* Main Glass Panel */}
      <Box args={[3.2, 5.5, 0.1]} position={[0, -0.75, 0]}>
        <meshPhysicalMaterial 
          color="#0f172a" 
          transmission={0.5} 
          opacity={0.8} 
          roughness={0.2} 
          ior={1.5} 
          thickness={0.5} 
        />
        <Edges scale={1.0} threshold={15} color="#3b82f6" />
      </Box>

      {/* Header text */}
      <Text
        position={[-1.3, 1.4, 0.1]}
        fontSize={0.25}
        color="#38bdf8"
        anchorX="left"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeAmM.woff"
      >
        {hw.name}
      </Text>
      
      <Text
        position={[1.3, 1.4, 0.1]}
        fontSize={0.1}
        color="#94a3b8"
        anchorX="right"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeAmM.woff"
      >
        ID: {hw.id}
      </Text>

      {/* Eco Score Section */}
      <group position={[0, 0.9, 0.1]}>
         <Text position={[-1.3, 0, 0]} fontSize={0.15} color="#10b981" anchorX="left" anchorY="middle" font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeAmM.woff">
            Eco Score: {ecoScore} / 3
         </Text>
         {ecoScore > 0 && (
           <Text position={[-1.3, -0.2, 0]} fontSize={0.1} color="#34d399" anchorX="left" anchorY="middle" font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeAmM.woff">
             {ecoScore === 3 ? "Fully Sustainable Setup" : "Partial Green Transition"}
           </Text>
         )}
      </group>

      {/* Basic Metrics */}
      <group position={[0, 0.3, 0.1]}>
        <VerifiedField3D data={hw.display} label="Resolution" position={[0, 0, 0]} />
        <VerifiedField3D data={hw.refreshRate} label="Refresh Rate" position={[0, -0.7, 0]} />
        <VerifiedField3D data={hw.batteryLife} label="Battery Life" position={[0, -1.4, 0]} />
      </group>

      {/* Egypt Validation Layer */}
      <group position={[0, -1.8, 0.1]}>
        <Text
          position={[-1.3, 0, 0]}
          fontSize={0.15}
          color="#60a5fa"
          anchorX="left"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeAmM.woff"
        >
          Validation: Egypt Deployment
        </Text>
        
        <VerifiedField3D 
          data={egyptData?.verified ? { verified: true, value: egyptData.importCost } : { verified: false }} 
          label="Import Cost" 
          position={[0, -0.5, 0]} 
        />
        <VerifiedField3D 
          data={egyptData?.verified ? { verified: true, value: egyptData.localAvailability } : { verified: false }} 
          label="Availability" 
          position={[0, -1.2, 0]} 
        />
      </group>
    </group>
  );
}
