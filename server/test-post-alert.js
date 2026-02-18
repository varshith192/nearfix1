const http = require('http');

const data = JSON.stringify({
    title: 'Test Alert from Script',
    description: 'Testing backend directly',
    category: 'Other',
    radius: 1000,
    latitude: 40.7128,
    longitude: -74.0060
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/alerts',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        try {
            console.log('Body:', JSON.parse(body));
        } catch (e) {
            console.log('Body:', body);
        }
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();
