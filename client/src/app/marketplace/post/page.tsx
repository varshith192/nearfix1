'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocation } from '@/hooks/useLocation';
import { createItem } from '@/services/api';
import { Loader2, Camera } from 'lucide-react';

export default function PostItem() {
    const router = useRouter();
    const { location, loading: locLoading } = useLocation();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!location) return alert('Location required');

        setLoading(true);
        try {
            await createItem({
                ...formData,
                price: Number(formData.price),
                latitude: location.lat,
                longitude: location.lng,
            });
            router.push('/marketplace');
        } catch (error) {
            alert('Failed to post item');
        } finally {
            setLoading(false);
        }
    };

    if (locLoading) return <div className="text-center p-10"><Loader2 className="animate-spin inline" /> Locating...</div>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Sell an Item</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-center mb-4">
                    <label className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100">
                        {formData.image ? (
                            <img src={formData.image} alt="Preview" className="h-full object-contain" />
                        ) : (
                            <>
                                <Camera size={24} className="text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500">Upload Photo</span>
                            </>
                        )}
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium">Item Name</label>
                    <input
                        required
                        className="w-full p-2 border rounded mt-1"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Price (₹)</label>
                    <input
                        required
                        type="number"
                        className="w-full p-2 border rounded mt-1"
                        value={formData.price}
                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                    />
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

                <button
                    disabled={loading || !location}
                    className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? 'Posting...' : 'Post Item'}
                </button>
            </form>
        </div>
    );
}
