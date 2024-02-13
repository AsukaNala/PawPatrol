const { body, param } = require("express-validator");

const messageValidator = [
  body("userId", "User ID is required").not().isEmpty(),
  body("userId", "User ID must be a number").isNumeric(),
  body("missingPetId", "Missing Pet ID is required").not().isEmpty(),
  body("missingPetId", "Missing Pet ID must be a number").isNumeric(),
  body("message", "Message is required").not().isEmpty(),
];

const updateMessageValidator = [
  param("id", "Message ID is required").not().isEmpty(),
  param("id", "Message ID must be a number").isNumeric(),
  body("message", "Message is required").not().isEmpty(),
  body("userId", "User ID is required").optional().not().isEmpty(),
  body("userId", "User ID must be a number").optional().isNumeric(),
  body("missingPetId", "Missing Pet ID is required").optional().not().isEmpty(),
  body("missingPetId", "Missing Pet ID must be a number")
    .optional()
    .isNumeric(),
];

module.exports = { messageValidator, updateMessageValidator };
