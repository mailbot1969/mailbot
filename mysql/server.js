const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "Students"
});

// Connect to MySQL
db.connect((err) =>{
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database successfully");
});

// GET endpoint to retrieve all students
app.get('/view', (req, res) => {
    const query = "SELECT * FROM student";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error retrieving data:", err);
            res.status(500).send("An error occurred while retrieving data.");
            return;
        }
        res.json(results);
    });
});

// POST endpoint to add a new student
app.post('/post', (req, res) => {
    const { name, subject, mark } = req.body;
    if (!name || !subject || !mark) {
        res.status(400).send("All fields (name, subject, mark) are required.");
        return;
    }

    const query = "INSERT INTO student (name, subject, mark) VALUES (?, ?, ?)";
    db.query(query, [name, subject, mark], (err, results) => {
        if (err) {
            console.error("Error inserting data:", err);
            res.status(500).send("An error occurred while inserting data.");
            return;
        }
        res.status(201).send("Student added successfully.");
    });
});
// DELETE endpoint to remove a student by ID
app.delete('/delete/:name', (req, res) => {
    const studentId = req.params.name;  // Get the ID from the URL parameters
    const query = "DELETE FROM student WHERE name = ?";
    
    db.query(query, [studentId], (err, results) => {
        if (err) {
            console.error("Error deleting data:", err);
            res.status(500).send("An error occurred while deleting data.");
            return;
        }
        else {
            res.status(200).send("Student deleted successfully.");
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log("App is running at port 3000");
});
