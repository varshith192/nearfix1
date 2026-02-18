const Item = require('../models/Item');

// @desc    Get items within 5km
// @route   GET /api/items
// @access  Public
exports.getItems = async (req, res) => {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
        return res.status(400).json({ error: 'Please provide valid latitude and longitude' });
    }

    try {
        const userLat = parseFloat(lat);
        const userLng = parseFloat(lng);
        const MAX_DISTANCE_METERS = 5000; // 5km fixed radius for marketplace

        const items = await Item.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [userLng, userLat],
                    },
                    distanceField: 'distance', // Output field with distance in meters
                    spherical: true,
                    maxDistance: MAX_DISTANCE_METERS,
                },
            },
        ]);

        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Create a new item
// @route   POST /api/items
// @access  Public
exports.createItem = async (req, res) => {
    try {
        const { name, price, description, image, latitude, longitude } = req.body;

        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Location is required' });
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

        res.status(201).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};
