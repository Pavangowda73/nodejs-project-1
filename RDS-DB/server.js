const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Add this line
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public'))); // Add this line

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST, // Get the RDS host from environment variable
    user: process.env.DB_USER, // Get the DB username from environment variable
    password: process.env.DB_PASSWORD, // Get the DB password from environment variable
    database: process.env.DB_NAME // Get the DB name from environment variable
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Register User Route (POST request)
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error registering user' });
        }
        res.status(201).json({ message: 'User registered successfully', id: result.insertId });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://13.233.105.126:${port}`);
});
