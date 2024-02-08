require("dotenv").config();
const express = require("express");
const { engine } = require("express-handlebars");
const multer = require("multer");
const cors = require("cors");
const upload = multer({ dest: "uploads/" });
const app = express();
const port = 3000;

//Cors
app.use(cors());

//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home");
});

//Middleware
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

//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/missing-pets", require("./routes/missingPetRoutes"));
app.use("/api/found-pets", require("./routes/foundPetRoutes"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
