import React from 'react';
import { VerifiedField } from './VerifiedField';

export function ValidationLayer({ metrics }) {
  if (!metrics) {
    return null;
  }

  // Expecting metrics for Egypt deployment
  const egyptData = metrics.egypt;

  if (!egyptData) {
    return (
      <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 mt-4">
        <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Hardware Deployment: Egypt</h3>
        <VerifiedField data={{ verified: false }} label="Deployment Metrics" />
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-lg mt-4 backdrop-blur-md bg-opacity-70">
      <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold text-gray-200">Hardware Deployment: Egypt</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VerifiedField 
          data={egyptData.verified ? { verified: true, value: egyptData.importCost } : { verified: false }} 
          label="Import Cost vs. Local Supply Chains" 
        />
        <VerifiedField 
          data={egyptData.verified ? { verified: true, value: egyptData.localAvailability } : { verified: false }} 
          label="Local Availability" 
        />
        <VerifiedField 
          data={egyptData.verified ? { verified: true, value: egyptData.maintenanceCycle } : { verified: false }} 
          label="Maintenance Lifecycle" 
        />
        <VerifiedField 
          data={egyptData.verified ? { verified: true, value: egyptData.scalability } : { verified: false }} 
          label="Scalability Constraints" 
        />
      </div>
    </div>
  );
}
