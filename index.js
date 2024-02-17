require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { engine } = require("express-handlebars");
const {
  handleInvalidJson,
  handleUnauthorized,
  handleNotFound,
  handleAllOtherErrors,
} = require("./errors/errorHandler");
const morganMiddleware = require("./logging/morganMiddleware");
const Logger = require("./logging/logger");
//const multer = require("multer");
//const upload = multer({ dest: "uploads/" });
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

//Static files
app.use(express.static("public"));
app.use("/photos", express.static("photos"));

//Middleware
app.use(express.json());
app.use(morganMiddleware);

//Database
const db = require("./db");
//create tables
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
app.use("/api/missingpets", require("./routes/missingPetRoutes"));
app.use("/api/foundpets", require("./routes/foundPetRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

//Add error handler middleware functions to pipeline
app.use(handleInvalidJson);
app.use(handleUnauthorized);
app.use(handleNotFound);
app.use(handleAllOtherErrors);

app.listen(port, () => {
  Logger.debug(`Example app listening at http://localhost:${port}`);
});
