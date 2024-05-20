const express = require("express");
const app = express();

require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());









app.get("/", (req, res) => {
  res.send("Summer School Server is running");
});

app.listen(port, () =>
  console.log(`Summer School server is running on Port: ${port}`)
);
