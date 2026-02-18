const API_URL = 'http://localhost:5000/api';

export const fetchAlerts = async (lat: number, lng: number) => {
    const res = await fetch(`${API_URL}/alerts?lat=${lat}&lng=${lng}`);
    if (!res.ok) throw new Error('Failed to fetch alerts');
    return res.json();
};

export const createAlert = async (data: any) => {
    const res = await fetch(`${API_URL}/alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create alert');
    return res.json();
};

export const fetchItems = async (lat: number, lng: number) => {
    const res = await fetch(`${API_URL}/items?lat=${lat}&lng=${lng}`);
    if (!res.ok) throw new Error('Failed to fetch items');
    return res.json();
};

export const createItem = async (data: any) => {
    const res = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create item');
    return res.json();
};
