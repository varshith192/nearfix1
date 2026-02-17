import { MapPin, AlertTriangle } from 'lucide-react';

interface AlertProps {
    alert: {
        _id: string;
        title: string;
        description: string;
        category: string;
        radius: number;
        distance?: number;
        createdAt: string;
    };
}

const AlertCard = ({ alert }: AlertProps) => {
    const distance = alert.distance ? (alert.distance / 1000).toFixed(2) : '?';

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-gray-800">{alert.title}</h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{distance} km</span>
            </div>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                <AlertTriangle size={14} /> {alert.category}
            </p>
            <p className="text-gray-700 mt-2 text-sm">{alert.description}</p>
            <div className="mt-3 flex items-center text-xs text-gray-400">
                <MapPin size={12} className="mr-1" /> Within {alert.radius / 1000} km
            </div>
        </div>
    );
};

export default AlertCard;
