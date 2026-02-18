
async function testGetAlerts() {
    try {
        // Fetch alerts near the location we just posted to
        const lat = 12.9716;
        const lng = 77.5946;
        const response = await fetch(`http://localhost:5000/api/alerts?lat=${lat}&lng=${lng}`);

        if (response.ok) {
            const data = await response.json();
            console.log('Success! Alerts retrieved:', data.length);
            console.log(JSON.stringify(data, null, 2));
        } else {
            console.error('Failed:', response.status, response.statusText);
            const text = await response.text();
            console.error('Response:', text);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testGetAlerts();
