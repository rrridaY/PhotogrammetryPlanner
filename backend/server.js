const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3001;


app.use(cors());
app.use(express.json());

//path 
const dataPath = path.join(__dirname, 'data','mapdata.json');

// data GET request 
app.get('/api/data', (req, res) => {
    console.log('data GET request received');
    try {
        // file not exist
        if (!fs.existsSync(dataPath)) {
            console.error('Data file does not exist:', dataPath);
            return res.status(404).json({ error: 'Data file not found' });
        }

        // read data
        const data = fs.readFileSync(dataPath, 'utf8');

        // parse data
        const jsonData = JSON.parse(data);
        res.json(jsonData);
        console.log('Data sent successfully');
    } catch (error) {
        console.error('Error reading data file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// data POST request
app.post('/api/data', (req, res) => {
    console.log('data POST request received');
    try {
        const data = req.body;
        // Validate data
        if (!data || typeof data !== 'object') {
            return res.status(400).json({ error: 'Invalid data format' });
        }

        // Write data to file
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
        console.log('Data saved successfully');
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});