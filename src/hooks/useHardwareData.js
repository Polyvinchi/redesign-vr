import { useState, useEffect } from 'react';
import manifest from '../../public/hardware-manifest.json';

export function useHardwareData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate slight network delay for realism if needed, or just set immediately
    try {
      setData(manifest);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
}
