const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Water Issue', 'Power Cut', 'Emergency', 'Lost Item', 'Other'],
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    radius: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create 2dsphere index for geospatial queries
AlertSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Alert', AlertSchema);
