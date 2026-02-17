import { MapPin } from 'lucide-react';

interface ItemProps {
    item: {
        _id: string;
        name: string;
        price: number;
        description: string;
        image?: string;
        distance?: number;
    };
}

const ItemCard = ({ item }: ItemProps) => {
    const distance = item.distance ? (item.distance / 1000).toFixed(2) : '?';

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            {item.image && (
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md mb-3" />
            )}
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                <span className="font-bold text-green-600">₹{item.price}</span>
            </div>
            <p className="text-gray-700 mt-1 text-sm">{item.description}</p>
            <div className="mt-3 flex justify-between items-center">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{distance} km away</span>
                <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded">Contact</button>
            </div>
        </div>
    );
};

export default ItemCard;
