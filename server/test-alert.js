
async function testCreateAlert() {
    try {
        const response = await fetch('http://localhost:5000/api/alerts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: "Test Alert via Script",
                description: "This is a test alert to verify backend connectivity.",
                category: "Other",
                radius: 1000,
                latitude: 12.9716,
                longitude: 77.5946
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Success! Alert created:', data);
        } else {
            console.error('Failed:', response.status, response.statusText);
            const text = await response.text();
            console.error('Response:', text);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testCreateAlert();
