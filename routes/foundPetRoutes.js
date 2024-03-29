const express = require("express");
const router = express.Router();
const FoundPetController = require("../controllers/foundPetController");
const verifyToken = require("../auth/authMiddleware");
//import multer
const multer = require("multer");
const upload = multer({
  dest: process.env.UPLOADS_DIR || "photos",
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

//import validators
const { validationResult } = require("express-validator");
const idParamValidator = require("../validators");
const {
  foundPetValidator,
  updateFoundPetValidator,
} = require("../validators/foundPetValidator");
const e = require("express");

/**
 * @swagger
 * /api/foundpets:
 *  get:
 *    description: Use to request all found pets
 *    tags:
 *      - Found Pets
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Data not found
 *      '500':
 *        description: Server error
 */
router.get("/", async (req, res, next) => {
  try {
    const data = await FoundPetController.getFoundPets();
    res.send({ result: 200, data: data });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/foundpets/{id}:
 *  get:
 *    description: Use to request a found pet by ID
 *    tags:
 *      - Found Pets
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of found pet to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Data not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/:id", idParamValidator, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const data = await FoundPetController.getFoundPet(req.params.id);
      if (!data) {
        return res.status(404).send({ result: 404, message: "Data Not Found" });
      } else {
        res.send({ result: 200, data: data });
      }
    } else {
      res.status(422).json({ result: 422, errors: errors.array() });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/foundpets/user/{id}:
 *  get:
 *    description: Use to request  found pet by User ID
 *    tags:
 *      - Found Pets
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Data not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/user/:id", idParamValidator, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const data = await FoundPetController.getFoundPetByUserId(req.params.id);
      if (!data) {
        return res.status(404).send({ result: 404, message: "Data Not Found" });
      } else {
        res.send({ result: 200, data: data });
      }
    } else {
      res.status(422).json({ result: 422, errors: errors.array() });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/foundpets/type/{type}:
 *  get:
 *    description: Use to request found pets by type
 *    tags:
 *      - Found Pets
 *    parameters:
 *      - name: type
 *        in: path
 *        description: type of found pet to fetch
 *        required: true
 *        type: string
 *        example: cat
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Data not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/type/:type", async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const data = await FoundPetController.getFoundPetsByType(req.params.type);
      if (!data) {
        return res.status(404).send({ result: 404, message: "Data Not Found" });
      } else {
        res.send({ result: 200, data: data });
      }
    } else {
      res.status(422).json({ result: 422, errors: errors.array() });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/foundpets/status/{status}:
 *  get:
 *    description: Use to request found pets by status
 *    tags:
 *      - Found Pets
 *    parameters:
 *      - name: status
 *        in: path
 *        description: status of found pet to fetch
 *        required: true
 *        type: string
 *        minimum: 1
 *        example: unclaimed
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Data not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/status/:status", async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const data = await FoundPetController.getFoundPetsByStatus(
        req.params.status
      );
      if (!data) {
        return res.status(404).send({ result: 404, message: "Data Not Found" });
      } else {
        res.send({ result: 200, data: data });
      }
    } else {
      res.status(422).json({ result: 422, errors: errors.array() });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/foundpets/location/{foundLocation}:
 *  get:
 *    description: Use to request found pets by found location
 *    tags:
 *      - Found Pets
 *    parameters:
 *      - name: foundLocation
 *        in: path
 *        description: found location of found pet to fetch
 *        required: true
 *        type: string
 *        minimum: 1
 *        example: Fremantle
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Data not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/location/:foundLocation", async (req, res, next) => {
  try {
    const data = await FoundPetController.getFoundPetsByFoundLocation(
      req.params.foundLocation
    );
    if (!data) {
      return res.status(404).send({ result: 404, message: "Data Not Found" });
    } else {
      res.send({ result: 200, data: data });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/foundpets:
 *  post:
 *    description: Use to create a new found pet
 *    tags:
 *      - Found Pets
 *    requestBody:
 *     content:
 *      multipart/form-data:
 *       schema:
 *        type: object
 *        required:
 *         - type
 *         - colour
 *         - foundDate
 *         - foundLocation
 *         - comment
 *         - status
 *         - userId
 *        properties:
 *         type:
 *          type: enum
 *          values: [dog, cat, bird, rabbit, other]
 *          example: cat
 *         colour:
 *          type: string
 *          example: red
 *         foundDate:
 *          type: dateonly
 *          example: 2024-01-03
 *         foundLocation:
 *          type: string
 *          example: Bibra Lake
 *         photo:
 *          type: string
 *          format: binary
 *          example: kitty-cat.png
 *          nullable: true
 *         comment:
 *          type: text
 *          example: Very scared, but friendly
 *         status:
 *          type: enum
 *          values: [unclaimed, claimed]
 *          example: unclaimed
 *         claimedDate:
 *          type: dateonly
 *          example: 2024-05-01
 *          nullable: true
 *         userId:
 *          type: integer
 *          example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Invalid JSON
 *      '404':
 *        description: Data not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.post(
  "/",
  verifyToken,
  upload.single("photo"),
  foundPetValidator,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        let foundPet = req.body;
        if (req.file) {
          foundPet.photo = req.file.filename;
        }
        if (req.userId) {
          foundPet.userId = req.userId;
        }
        const data = await FoundPetController.createFoundPet(foundPet);
        if (!data) {
          return res
            .status(404)
            .send({ result: 404, message: "Data Not found" });
        } else {
          res.send({ result: 200, data: data });
        }
      } else {
        res.status(422).json({ result: 422, errors: errors.array() });
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/foundpets/{id}:
 *  put:
 *    description: Use to update a found pet
 *    tags:
 *      - Found Pets
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of found pet to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    requestBody:
 *     content:
 *      multipart/form-data:
 *       schema:
 *        type: object
 *        required:
 *         - type
 *         - colour
 *         - foundDate
 *         - foundLocation
 *         - comment
 *         - status
 *         - userId
 *        properties:
 *         type:
 *          type: string
 *          enum: [dog, cat, bird, rabbit, other]
 *          example: cat
 *         colour:
 *          type: string
 *          example: white
 *         foundDate:
 *          type: dateonly
 *          example: 2024-01-01
 *         foundLocation:
 *          type: string
 *          example: Bibra Lake
 *         photo:
 *          type: string
 *          format: binary
 *          example: kitty-cat
 *          nullable: true
 *         comment:
 *          type: text
 *          example: Very scared, but friendly
 *         status:
 *          type: string
 *          enum: [unclaimed, claimed]
 *          example: unclaimed
 *         claimedDate:
 *          type: dateonly
 *          nullable: true
 *          example: 2024-05-01
 *         userId:
 *          type: integer
 *          example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Invalid JSON
 *      '404':
 *        description: Data not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.put(
  "/:id",
  verifyToken,
  upload.single("photo"),
  idParamValidator,
  updateFoundPetValidator,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        let foundPet = req.body;
        if (req.file) {
          foundPet.photo = req.file.filename;
        }
        if (req.userId) {
          foundPet.userId = req.userId;
        }
        const data = await FoundPetController.updateFoundPet(
          req.params.id,
          foundPet
        );
        if (data[0] === 0) {
          return res
            .status(404)
            .send({ result: 404, message: "Data Not found" });
        } else {
          res.send({ result: 200, data: data });
        }
      } else {
        res.status(422).json({ result: 422, errors: errors.array() });
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/foundpets/{id}:
 *  delete:
 *    description: Use to delete a found pet
 *    tags:
 *      - Found Pets
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of found pet to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *         - type
 *         - colour
 *         - foundDate
 *         - foundLocation
 *         - comment
 *         - status
 *         - userId
 *        properties:
 *         type:
 *          type: string
 *          enum: [dog, cat, bird, rabbit, other]
 *          example: cat
 *         colour:
 *          type: string
 *          example: white
 *         foundDate:
 *          type: dateonly
 *          example: 2024-01-01
 *         foundLocation:
 *          type: string
 *          example: Bibra Lake
 *         photo:
 *          type: string
 *          example: kitty-cat.png
 *          nullable: true
 *         comment:
 *          type: text
 *          example: Very scared, but friendly
 *         status:
 *          type: string
 *          enum: [unclaimed, claimed]
 *          example: unclaimed
 *         claimedDate:
 *          type: dateonly
 *          nullable: true
 *          example: 2024-05-01
 *         userId:
 *          type: integer
 *          example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Invalid JSON
 *      '404':
 *        description: Data not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.delete("/:id", verifyToken, idParamValidator, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      if (req.userId) {
        req.body.userId = req.userId;
      }
      const data = await FoundPetController.deleteFoundPet(req.params.id);
      if (data === 0) {
        return res.status(404).send({ result: 404, message: "Data Not found" });
      } else {
        res.send({ result: 200, data: data });
      }
    } else {
      res.status(422).json({ result: 422, errors: errors.array() });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
