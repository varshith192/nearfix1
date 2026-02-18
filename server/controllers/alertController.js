const Alert = require('../models/Alert');

// @desc    Get alerts near a location
// @route   GET /api/alerts
// @access  Public
exports.getAlerts = async (req, res) => {
    const { lat, lng } = req.query;
    console.log(`GET /api/alerts request received. Lat: ${lat}, Lng: ${lng}`);

    if (!lat || !lng) {
        return res.status(400).json({ error: 'Please provide valid latitude and longitude' });
    }

    try {
        // We want to find alerts where the distance between the user and the alert is <= alert.radius
        // However, MongoDB $geoNear or $near filters by a maxDistance from the center point.
        // The requirement is: "Return alerts where distance <= alert.radius"
        // This is slightly tricky because the radius is variable per alert.
        // Standard approach: Get alerts sorted by distance, then filter in application code or use $expr in aggregation if possible (complex).
        // Simpler approach for MVP:
        // 1. Fetch alerts within a reasonable max global radius (e.g., 10km) to avoid fetching world-wide data.
        // 2. Filter the result in JavaScript to check if `distance <= alert.radius`.

        const userLat = parseFloat(lat);
        const userLng = parseFloat(lng);

        const alerts = await Alert.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [userLng, userLat],
                    },
                    distanceField: 'distance', // Output field with distance in meters
                    spherical: true,
                    maxDistance: 500000, // Fetch everything within 500km for safety, then filter
                },
            },
        ]);

        // Client-side filtering for the dynamic radius requirement
        const visibleAlerts = alerts.filter((alert) => {
            // alert.distance is in meters
            return alert.distance <= alert.radius;
        });

        res.json(visibleAlerts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Create a new alert
// @route   POST /api/alerts
// @access  Public
exports.createAlert = async (req, res) => {
    try {
        const { title, description, category, radius, latitude, longitude } = req.body;

        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Location is required' });
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

        res.status(201).json(alert);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};
