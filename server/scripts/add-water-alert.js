const mongoose = require('mongoose');
const Alert = require('../models/Alert');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const seedAlert = async () => {
    await connectDB();

    await Alert.deleteMany({ title: 'Emergency Water Cut' });

    const waterAlert = new Alert({
        title: 'Emergency Water Cut',
        description: 'Water supply will be interrupted due to maintenance in the area.',
        category: 'Water Issue',
        location: {
            type: 'Point',
            coordinates: [79.6072, 18.0057] // Longitude, Latitude
        },
        radius: 500000,
        createdAt: new Date()
    });

    try {
        await waterAlert.save();
        console.log('Water Cut Alert Added!');
    } catch (err) {
        console.error('Error adding alert:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedAlert();
