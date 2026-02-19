import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Item from '@/models/Item';

export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const lat = searchParams.get('lat');
        const lng = searchParams.get('lng');

        if (!lat || !lng) {
            return NextResponse.json(
                { error: 'Please provide valid latitude and longitude' },
                { status: 400 }
            );
        }

        const userLat = parseFloat(lat);
        const userLng = parseFloat(lng);

        const items = await Item.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [userLng, userLat],
                    },
                    distanceField: 'distance',
                    spherical: true,
                    maxDistance: 5000, // 5km fixed radius for marketplace
                },
            },
        ]);

        return NextResponse.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const { name, price, description, image, latitude, longitude } = body;

        if (!latitude || !longitude) {
            return NextResponse.json(
                { error: 'Location is required' },
                { status: 400 }
            );
        }

        const item = await Item.create({
            name,
            price,
            description,
            image,
            location: {
                type: 'Point',
                coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
        });

        return NextResponse.json(item, { status: 201 });
    } catch (error) {
        console.error('Error creating item:', error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
