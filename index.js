require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

//Database
const db = require("./db");
const models = require("./models/index");
models.init();

// Swagger
if (process.env.NODE_ENV === "development") {
  const swaggerUi = require("swagger-ui-express");
  const swaggerSpec = require("./swagger/swaggerSpec");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec.default));
}

app.get("/", (req, res) => {
  res.send("Welcome to Pawpatrol");
});

//Routes
app.use("/api/users", require("./routes/userRoute"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
