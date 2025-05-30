const express = require("express");
const cors = require("cors");
const matchRoutes = require("./routes/matchRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", matchRoutes);

module.exports = app;
