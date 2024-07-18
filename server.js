// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/user");
const noteRoutes = require("./routes/note");

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

mongoose.connect("mongodb://localhost:27017/apsona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
