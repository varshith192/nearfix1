'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocation } from '@/hooks/useLocation';
import { fetchItems } from '@/services/api';
import ItemCard from '@/components/ItemCard';
import { Loader2, Plus } from 'lucide-react';

export default function Marketplace() {
    const { location, loading: locLoading } = useLocation();
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location) {
            setLoading(true);
            fetchItems(location.lat, location.lng)
                .then(setItems)
                .finally(() => setLoading(false));
        }
    }, [location]);

    if (locLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="p-4 relative min-h-screen">
            <header className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
                    <p className="text-gray-500 text-sm">Buy & Sell nearby (5km)</p>
                </div>
            </header>

            {loading ? (
                <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>
            ) : items.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">No items found nearby. Be the first to sell!</div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {items.map(item => <ItemCard key={item._id} item={item} />)}
                </div>
            )}

            <Link
                href="/marketplace/post"
                className="fixed bottom-20 right-4 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition"
            >
                <Plus size={24} />
            </Link>
        </div>
    );
}
