const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db"); // Make sure db.js exists in same folder

const app = express();
app.use(cors());
app.use(bodyParser.json());

// CREATE course
app.post("/courses", (req, res) => {
  const { code, name } = req.body;
  const sql = "INSERT INTO courses (code, name) VALUES (?, ?)";
  db.query(sql, [code, name], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ id: result.insertId, code, name });
  });
});

// READ courses
app.get("/courses", (req, res) => {
  db.query("SELECT * FROM courses", (err, rows) => {
    if (err) return res.status(500).send(err);
    res.send(rows);
  });
});

// UPDATE course
app.put("/courses/:id", (req, res) => {
  const { id } = req.params;
  const { code, name } = req.body;
  const sql = "UPDATE courses SET code=?, name=? WHERE id=?";
  db.query(sql, [code, name, id], err => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Course updated" });
  });
});

// DELETE course
app.delete("/courses/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM courses WHERE id=?", [id], err => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Course deleted" });
  });
});

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
