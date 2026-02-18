'use client';

import { useEffect, useState } from 'react';
import { useLocation } from '@/hooks/useLocation';
import { fetchAlerts } from '@/services/api';
import AlertCard from '@/components/AlertCard';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { location, loading: locLoading, error: locError } = useLocation();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location) {
      setLoading(true);
      fetchAlerts(location.lat, location.lng)
        .then(setAlerts)
        .catch(() => setError('Failed to load alerts'))
        .finally(() => setLoading(false));
    }
  }, [location]);

  if (locLoading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /> Getting Location...</div>;
  if (locError) return <div className="text-center p-10 text-red-500">{locError}</div>;

  return (
    <div className="p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Local Alerts</h1>
        <p className="text-gray-500 text-sm">Happening around you</p>
      </header>

      {loading ? (
        <div className="flex justify-center p-10"><Loader2 className="animate-spin" /> Loading Alerts...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : alerts.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No alerts found nearby.</div>
      ) : (
        alerts.map(alert => <AlertCard key={alert._id} alert={alert} />)
      )}
    </div>
  );
}
