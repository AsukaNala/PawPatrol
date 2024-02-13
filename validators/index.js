const { param } = require("express-validator");

const idParamValidator = [
  param("id", "id is required").not().isEmpty(),
  param("id", "id must be numeric").isNumeric(),
];

//check if image extension is valid
const photoValidator = (req, res, next) => {
  if (req.file) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(req.file.mimetype);
    const extname = fileTypes.test(path.extname(req.file.originalname));
    if (!mimeType || !extname) {
      return res.status(422).json({ error: "Invalid file type" });
    }
  }
  next();
};

module.exports = {
  idParamValidator,
  photoValidator,
};
