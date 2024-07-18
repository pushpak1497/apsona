const express = require("express");
const Note = require("../models/note");
const jwt = require("jsonwebtoken");
const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, "your_jwt_secret", (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.userId = decoded.userId;
    next();
  });
};

router.post("/", authenticate, async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({
    title,
    content,
    userId: req.userId,
  });
  await note.save();
  res.json(note);
});

router.get("/", authenticate, async (req, res) => {
  const notes = await Note.find({ userId: req.userId });
  res.json(notes);
});

module.exports = router;
