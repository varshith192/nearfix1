const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

console.log('MongoDB URI:', process.env.MONGO_URI ? 'Loaded' : 'Not setup');


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for base64 images

// Routes
app.use('/api/alerts', require('./routes/alertRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));

app.get('/', (req, res) => {
    res.send('Hyperlocal App API is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
