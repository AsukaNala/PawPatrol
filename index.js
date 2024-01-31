require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

//Database
const db = require("./db");
const models = require("./models/index");
models.init();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Routes
app.use("/api/users", require("./routes/userRoute"));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
