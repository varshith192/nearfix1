import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String, // Storing Base64 or URL
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create 2dsphere index for geospatial queries
ItemSchema.index({ location: '2dsphere' });

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
