const { body, param } = require("express-validator");
const User = require("../models/user");

const userValidator = [
  body("name", "Name is required").not().isEmpty(),
  body("email", "Email is required").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body("password", "The password lenght must be 6-8 characters").isLength({
    min: 6,
    max: 8,
  }),
];

const emailValidator = [
  body("email", "Email must be unique")
    .isEmail()
    .custom(async (email) => {
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        throw new Error("Email already exists");
      }
      return true;
    }),
];

const userUpdateValidator = [
  param("id", "User ID is required").not().isEmpty(),
  param("id", "User ID must be a number").isNumeric(),
  body("name").optional().not().isEmpty(),
  body("email").optional().not().isEmpty(),
  body("password", "The password lenght must be 6-120 characters")
    .optional()
    .isLength({
      min: 6,
      max: 120,
    }),
];

module.exports = {
  userValidator,
  emailValidator,
  userUpdateValidator,
};
