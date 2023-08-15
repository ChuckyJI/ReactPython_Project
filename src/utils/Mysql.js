const express = require('express');
const app = express();
const mysql = require('mysql');

// const db = mysql.createConnection({
//     host: '13.250.206.7',
//     user: 'root',
//     password: 'KFJC23jd@1',
//     database: 'researcherRecord'
// });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jcy901110',
    database: 'researcherRecord'
});

// app.all("*", function (req, res) {
//     res.header('Access-Control-Allow-Origin', 'http://13.250.206.7:3000');
//     res.header('Access-Control-Allow-Methods', 'GET,POST,PUT');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     req.next();
// })

app.all("*", function (req, res) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    req.next();
})

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM resultRecord ORDER BY dateTime DESC';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

app.get('/api/data2', (req, res) => {
    const query = 'SELECT * FROM receieveJsonFromDoctor';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});