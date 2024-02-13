const { body, param } = require("express-validator");

const foundPetValidator = [
  body("userId", "User Id is required").not().isEmpty(),
  body("userId", "User Id must be a number").isNumeric(),
  body("type", "Type is required").not().isEmpty(),
  body("type", "Invalid type").matches(/^(dog|cat|bird|rabbit|other)$/),
  body("colour", "Colour is required").not().isEmpty(),
  body("foundDate", "Found date is required").not().isEmpty(),
  body("foundDate", "Invalid found date").isDate(), //isDate({ format: "YYYY-MM-DD" }),
  body("foundLocation", "Found location is required").not().isEmpty(), // might need to add a regex to check if it's a valid location
  body("comment", "Comment is required").not().isEmpty(),
  body("status", "Invalid status").matches(/^(unclaimed|claimed)$/),
  body("status", "Status is required").not().isEmpty(),
  body("claimedDate", "Invalid claimed date").optional().isDate(), //isDate({ format: "YYYY-MM-DD" }),
];

const updateFoundPetValidator = [
  param("id", "Id is required").not().isEmpty(),
  param("id", "Id must be a number").isNumeric(),
  body("userId").optional().isNumeric().withMessage("User Id must be a number"),
  body("type")
    .optional()
    .matches(/^(dog|cat|bird|rabbit|other)$/)
    .withMessage("Invalid type"),
  body("colour").optional().not().isEmpty(),
  body("foundDate").optional().isDate(), //isDate({ format: "YYYY-MM-DD" }),
  body("foundLocation").optional().not().isEmpty(), // might need to add a regex to check if it's a valid location
  body("comment").optional().not().isEmpty(),
  body("status")
    .optional()
    .matches(/^(unclaimed|claimed)$/),
  body("claimedDate").optional().isDate(), //isDate({ format: "YYYY-MM-DD" }),
];

module.exports = {
  foundPetValidator,
  updateFoundPetValidator,
};
