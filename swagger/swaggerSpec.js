const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Paw Ptrol API",
    version: "1.0.0",
    description: "Paw Patrol API for capstone project",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  tags: [
    {
      name: "Paw Patrol",
      description: "API for Paw Patrol",
    },
  ],
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
};

const options = {
  definition: swaggerDocument,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

exports.default = swaggerSpec;
