import React from 'react';
import { useHardwareData } from '../hooks/useHardwareData';
import { VerifiedField } from './VerifiedField';
import { ValidationLayer } from './ValidationLayer';

export function HardwarePipeline() {
  const { data, loading, error } = useHardwareData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border-l-4 border-red-500 text-red-500 p-4 rounded mt-4">
        <h3 className="font-bold">Data Pipeline Error</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data || !data.hardware) {
    return <div className="text-gray-400">No hardware schema data available.</div>;
  }

  return (
    <div className="space-y-8 mt-8">
      {data.hardware.map((hw) => (
        <div key={hw.id} className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-xl p-6 shadow-2xl transition hover:shadow-blue-900/20 hover:border-gray-700 duration-300">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-800">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
              {hw.name}
            </h2>
            <span className="text-xs font-mono text-gray-500 bg-gray-800 px-2 py-1 rounded">ID: {hw.id}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <VerifiedField data={hw.display} label="Display Resolution" />
            <VerifiedField data={hw.refreshRate} label="Refresh Rate" />
            <VerifiedField data={hw.batteryLife} label="Battery Life" />
          </div>

          <ValidationLayer metrics={hw.deploymentMetrics} />
        </div>
      ))}
    </div>
  );
}
