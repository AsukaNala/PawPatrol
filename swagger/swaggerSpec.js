const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Paw Patrol API",
    version: "1.0.0",
    description: "Paw Patrol API for capstone project",
  },
  servers: [
    {
      url: process.env.BASE_URL || "http://localhost:3000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
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
