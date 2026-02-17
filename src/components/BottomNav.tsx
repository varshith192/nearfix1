'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PlusCircle, ShoppingBag } from 'lucide-react';

const BottomNav = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path ? 'text-blue-600' : 'text-gray-500';

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 z-50 pb-safe">
            <Link href="/" className={`flex flex-col items-center ${isActive('/')}`}>
                <Home size={24} />
                <span className="text-xs mt-1">Alerts</span>
            </Link>
            <Link href="/post" className={`flex flex-col items-center ${isActive('/post')}`}>
                <PlusCircle size={24} />
                <span className="text-xs mt-1">Post</span>
            </Link>
            <Link href="/marketplace" className={`flex flex-col items-center ${isActive('/marketplace')}`}>
                <ShoppingBag size={24} />
                <span className="text-xs mt-1">Market</span>
            </Link>
        </div>
    );
};

export default BottomNav;
