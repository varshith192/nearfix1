import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Alert from '@/models/Alert';

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

        // Fetch alerts within 500km, then filter
        // Note: In a real app, you'd want a more precise geo query using $near with specific maxDistance
        // but this mimics the logic you had in the Express controller.
        const alerts = await Alert.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [userLng, userLat],
                    },
                    distanceField: 'distance',
                    spherical: true,
                    maxDistance: 500000, // 500km
                },
            },
        ]);

        // Client-side filtering for dynamic radius (alert.radius)
        // In strict TypeScript, we might need to define an interface for Alert to avoid 'any'
        const visibleAlerts = alerts.filter((alert: any) => {
            return alert.distance <= alert.radius;
        });

        return NextResponse.json(visibleAlerts);
    } catch (error) {
        console.error('Error fetching alerts:', error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const { title, description, category, radius, latitude, longitude } = body;

        if (!latitude || !longitude) {
            return NextResponse.json(
                { error: 'Location is required' },
                { status: 400 }
            );
        }

        const alert = await Alert.create({
            title,
            description,
            category,
            radius,
            location: {
                type: 'Point',
                coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
        });

        return NextResponse.json(alert, { status: 201 });
    } catch (error) {
        console.error('Error creating alert:', error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
