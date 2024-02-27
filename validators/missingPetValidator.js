const { body, param } = require("express-validator");

const missingPetValidator = [
  body("name", "Name is required").not().isEmpty(),
  body("type", "Type is required").not().isEmpty(),
  body("type", "Invalid type").matches(/^(dog|cat|bird|rabbit|other)$/),
  body("colour", "Colour is required").not().isEmpty(),
  body("lostDate", "Lost date is required").not().isEmpty(),
  body("lostDate", "Invalid lost date").isDate(), //isDate({ format: "YYYY-MM-DD" }),
  body("lastSeenLocation", "Last seen location is required").not().isEmpty(), // might need to add a regex to check if it's a valid location
  body("comment", "Comment is required").not().isEmpty(),
  body("status", "Status is required").not().isEmpty(),
  body("status", "Invalid status").matches(/^(missing|found)$/),
  body("foundDate", "Invalid found date").optional().isDate(), //isDate({ format: "YYYY-MM-DD" }),
];

const updateMissingPetValidator = [
  param("id", "Id is required").not().isEmpty(),
  param("id", "Id must be a number").isNumeric(),
  body("userId").optional().isNumeric().withMessage("User Id must be a number"),
  body("name").optional().not().isEmpty(),
  body("type")
    .optional()
    .matches(/^(dog|cat|bird|rabbit|other)$/)
    .withMessage("Invalid type"),
  body("colour").optional().not().isEmpty(),
  body("lostDate").optional().isDate(), //isDate({ format: "YYYY-MM-DD" }),
  body("lastSeenLocation").optional().not().isEmpty(), // might need to add a regex to check if it's a valid location
  body("comment").optional().not().isEmpty(),
  body("status")
    .optional()
    .matches(/^(missing|found)$/),
  body("foundDate").optional().isDate(), //isDate({ format: "YYYY-MM-DD" }),
];

module.exports = {
  missingPetValidator,
  updateMissingPetValidator,
};
