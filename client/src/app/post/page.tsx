'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocation } from '@/hooks/useLocation';
import { createAlert } from '@/services/api';
import { Loader2, MapPin } from 'lucide-react';

export default function PostAlert() {
    const router = useRouter();
    const { location, loading: locLoading } = useLocation();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Other',
        radius: 1000,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!location) return alert('Location required');

        setLoading(true);
        try {
            await createAlert({
                ...formData,
                latitude: location.lat,
                longitude: location.lng,
            });
            router.push('/');
        } catch (error) {
            alert('Failed to post alert');
        } finally {
            setLoading(false);
        }
    };

    if (locLoading) return <div className="text-center p-10"><Loader2 className="animate-spin inline" /> Locating...</div>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Post Local Alert</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        required
                        className="w-full p-2 border rounded mt-1"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Category</label>
                    <select
                        className="w-full p-2 border rounded mt-1"
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option>Water Issue</option>
                        <option>Power Cut</option>
                        <option>Emergency</option>
                        <option>Lost Item</option>
                        <option>Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        required
                        className="w-full p-2 border rounded mt-1"
                        rows={3}
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Alert Radius: {formData.radius}m</label>
                    <select
                        className="w-full p-2 border rounded mt-1"
                        value={formData.radius}
                        onChange={e => setFormData({ ...formData, radius: Number(e.target.value) })}
                    >
                        <option value={500}>500m (Immediate Vicinity)</option>
                        <option value={1000}>1km (Neighborhood)</option>
                        <option value={2000}>2km (Community)</option>
                        <option value={5000}>5km (Area)</option>
                    </select>
                </div>

                <div className="bg-blue-50 p-2 rounded text-xs flex items-center gap-2 text-blue-700">
                    <MapPin size={14} />
                    Location locked: {location?.lat.toFixed(4)}, {location?.lng.toFixed(4)}
                </div>

                <button
                    disabled={loading || !location}
                    className="w-full bg-red-600 text-white p-3 rounded-lg font-bold hover:bg-red-700 disabled:opacity-50"
                >
                    {loading ? 'Posting...' : 'Post Alert'}
                </button>
            </form>
        </div>
    );
}
