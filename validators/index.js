const { param } = require("express-validator");

const idParamValidator = [
  param("id", "id is required").not().isEmpty(),
  param("id", "id must be numeric").isNumeric(),
];

module.exports = idParamValidator;
