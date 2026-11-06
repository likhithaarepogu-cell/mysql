const express = require("express");
const mysql = require("mysql8");

const app = express();

// Read JSON data from request body
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "school"
});

db.connect((err) => {
    if (err)
        throw err;

    console.log("Prem! Connected to MySQL Database");
});

app.get("/students", (req, res) => {

    db.query("SELECT * FROM students", (err, result) => {
        if (err)
            throw err;
        res.json(result);
    });

});

app.get("/students/:sno", (req, res) => {

    db.query(
        "SELECT * FROM students WHERE sno=?",
        [req.params.sno],
        (err, result) => {

            if (err)
                throw err;

            res.json(result);

        });

});


// =====================================
// INSERT STUDENT
// =====================================

app.post("/students", (req, res) => {

    const { sno, name, total } = req.body;

    db.query(
        "INSERT INTO students VALUES(?,?,?)",
        [sno, name, total],
        (err) => {

            if (err)
                throw err;

            res.send("Student Inserted Successfully");

        });

});


// =====================================
// UPDATE STUDENT
// =====================================

app.put("/students/:sno", (req, res) => {

    const { name, total } = req.body;

    db.query(
        "UPDATE students SET name=?, total=? WHERE sno=?",
        [name, total, req.params.sno],
        (err, result) => {

            if (err)
                throw err;

            if (result.affectedRows == 0)
                res.send("Student Not Found");
            else
                res.send("Student Updated Successfully");

        });

});


// =====================================
// DELETE STUDENT
// =====================================

app.delete("/students/:sno", (req, res) => {

    db.query(
        "DELETE FROM students WHERE sno=?",
        [req.params.sno],
        (err, result) => {

            if (err)
                throw err;

            if (result.affectedRows == 0)
                res.send("Student Not Found");
            else
                res.send("Student Deleted Successfully");

        });

});




app.listen(3000, () => {

    console.log("Server Running at http://localhost:3000");

});