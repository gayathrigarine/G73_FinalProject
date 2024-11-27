const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const SECRET_KEY = 'ABCD';

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'database-2.cze84y6wknfv.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'Gayathri',
    database: 'G73_db'
});
const saltRounds = 10;
const plainPassword = 'Garine';
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

const updatePasswordIfNeeded = async () => {
    const [rows] = await db.promise().query('SELECT password FROM users WHERE username = ?', ['Garine']);
    if (!rows.length || !bcrypt.compareSync(plainPassword, rows[0].password)) {
        const hash = await bcrypt.hash(plainPassword, saltRounds);
        db.query('UPDATE users SET password = ? WHERE username = ?', [hash, 'Garine'], (err) => {
            if (err) throw err;
            console.log('Password updated with hash');
        });
    }
};

updatePasswordIfNeeded();

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = user;
        next();
    });
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send('Invalid credentials');
        }

        const match = await bcrypt.compare(password, results[0].password);
        if (!match) return res.status(401).send('Invalid credentials');

        const user = { username: results[0].username };
        const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    });
});

app.get('/chart1-data', authenticateToken, (req, res) => {
    db.query('SELECT data FROM chart_data WHERE chart_name = "summary_chart"', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching chart data' });
        res.json(results[0].data);
    });
});

app.get('/chart2-data', authenticateToken, (req, res) => {
    db.query('SELECT data FROM chart_data WHERE chart_name = "reports_chart"', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching chart data' });
        res.json(results[0].data);
    });
});
app.get('/chart3-data', authenticateToken, (req, res) => {
    db.query('SELECT data FROM chartA_data WHERE chart_name = "summary_chart"', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching chart data' });
        res.json(results[0].data);
    });
});

app.get('/chart4-data', authenticateToken, (req, res) => {
    db.query('SELECT data FROM chartA_data WHERE chart_name = "reports_chart"', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching chart data' });
        res.json(results[0].data);
    });
});

app.listen(3000, () => console.log('Backend running on port 3000'));
