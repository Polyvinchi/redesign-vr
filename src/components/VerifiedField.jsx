import React from 'react';

export function VerifiedField({ data, label }) {
  if (!data || !data.verified) {
    return (
      <div className="flex flex-col mb-4 p-3 border-l-4 border-yellow-500 bg-yellow-500/10 rounded-r-md">
        <span className="text-sm text-gray-400 font-medium">{label}</span>
        <span className="text-yellow-400 font-semibold mt-1">
          Data Required / To Be Validated with Manufacturers
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col mb-4 p-3 border-l-4 border-green-500 bg-green-500/10 rounded-r-md">
      <span className="text-sm text-gray-400 font-medium">{label}</span>
      <span className="text-gray-100 font-semibold mt-1">{data.value || data.resolution || data}</span>
    </div>
  );
}
