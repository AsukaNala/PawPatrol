const express = require("express");
const router = express.Router();
const MissingPetController = require("../controllers/missingPetController");

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
  missingPetValidator,
  updateMissingPetValidator,
} = require("../validators/missingPetValidator");

/**
 * @swagger
 * /api/missing-pets:
 *  get:
 *    description: Use to request all missing pets
 *    tags:
 *      - Missing Pets
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
    const data = await MissingPetController.getMissingPets();
    res.send({ result: 200, data: data });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/missing-pets/{id}:
 *  get:
 *    description: Use to request a missing pet by ID
 *    tags:
 *      - Missing Pets
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of missing pet to fetch
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
      const data = await MissingPetController.getMissingPet(req.params.id);
      if (!data) {
        return res
          .status(404)
          .send({ result: 404, message: " Data Not found" });
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
 * /api/missing-pets/user/{id}:
 *  get:
 *    description: Use to request a missing pet by User ID
 *    tags:
 *      - Missing Pets
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
      const data = await MissingPetController.getMissingPetByUserId(
        req.params.id
      );
      if (!data) {
        res.status(404).send({ result: 404, message: "Data not found" });
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
 * /api/missing-pets/type/{type}:
 *  get:
 *    description: Use to request a missing pet by type
 *    tags:
 *      - Missing Pets
 *    parameters:
 *      - name: type
 *        in: path
 *        description: type of missing pet to fetch
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
      const data = await MissingPetController.getMissingPetsByType(
        req.params.type
      );
      if (!data) {
        return res
          .status(404)
          .send({ result: 404, message: " Data Not found" });
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
 * /api/missing-pets/status/{status}:
 *  get:
 *    description: Use to request a missing pet by status
 *    tags:
 *      - Missing Pets
 *    parameters:
 *      - name: status
 *        in: path
 *        description: status of missing pet to fetch
 *        required: true
 *        type: string
 *        minimum: 1
 *        example: missing
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
      const data = await MissingPetController.getMissingPetsByStatus(
        req.params.status
      );
      if (!data) {
        return res
          .status(404)
          .send({ result: 404, message: " Data Not found" });
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
 * /api/missing-pets/location/{lastSeenLocation}:
 *  get:
 *    description: Use to request a missing pet by lastSeenLocation
 *    tags:
 *      - Missing Pets
 *    parameters:
 *      - name: lastSeenLocation
 *        in: path
 *        description: location of missing pet last seen to fetch
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
router.get("/location/:lastSeenLocation", async (req, res, next) => {
  try {
    const data = await MissingPetController.getMissingPetsByLastSeenLocation(
      req.params.lastSeenLocation
    );
    if (!data) {
      return res.status(404).send({ result: 404, message: " Data Not found" });
    } else {
      res.send({ result: 200, data: data });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/missing-pets:
 *  post:
 *    description: Use to create a new missing pet
 *    tags:
 *      - Missing Pets
 *    requestBody:
 *     content:
 *      multipart/form-data:
 *       schema:
 *        type: object
 *        required:
 *         - name
 *         - type
 *         - colour
 *         - lostDate
 *         - lastSeenLocation
 *         - comment
 *         - status
 *         - userId
 *        properties:
 *         name:
 *          type: string
 *          example: Max
 *         type:
 *          type: enum
 *          values: [dog, cat, bird, rabbit, other]
 *          example: cat
 *         colour:
 *          type: string
 *          example: black
 *         lostDate:
 *          type: dateonly
 *          example: 2024-01-01
 *         lastSeenLocation:
 *          type: string
 *          example: Fremantle
 *         photo:
 *          type: string
 *          format: binary
 *          example: kitty-cat.png
 *          nullable: true
 *         comment:
 *          type: text
 *          example: Very shy
 *         status:
 *          type: enum
 *          values: [missing, found]
 *          example: missing
 *         foundDate:
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
  upload.single("photo"),
  missingPetValidator,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      // for multiple images per record
      // need another table to store the images - pet/missing_pet_id, image_id
      // you can add missing pet record without pictures
      // seperate endpoint to add pictures to missing pet record and loop through the images in route file
      if (errors.isEmpty()) {
        let missingPet = req.body;
        if (req.file) {
          missingPet.photo = req.file.filename;
        }
        const data = await MissingPetController.createMissingPet(missingPet);
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
 * /api/missing-pets/{id}:
 *  put:
 *    description: Use to update a missing pet
 *    tags:
 *      - Missing Pets
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of missing pet to fetch
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
 *         - name
 *         - type
 *         - colour
 *         - lostDate
 *         - lastSeenLocation
 *         - comment
 *         - status
 *         - userId
 *        properties:
 *         name:
 *          type: string
 *          example: Max
 *         type:
 *          type: string
 *          enum: [dog, cat, bird, rabbit, other]
 *          example: cat
 *         colour:
 *          type: string
 *          example: black
 *         lostDate:
 *          type: dateonly
 *          example: 2024-01-01
 *         lastSeenLocation:
 *          type: string
 *          example: Fremantle
 *         photo:
 *          type: string
 *          format: binary
 *          example: kitty-cat
 *          nullable: true
 *         comment:
 *          type: text
 *          example: Very shy
 *         status:
 *          type: string
 *          enum: [missing, found]
 *          example: missing
 *         foundDate:
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
  upload.single("photo"),
  idParamValidator,
  updateMissingPetValidator,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        let missingPet = req.body;
        if (req.file) {
          missingPet.photo = req.file.filename;
        }
        const data = await MissingPetController.updateMissingPet(
          req.params.id,
          missingPet
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
 * /api/missing-pets/{id}:
 *  delete:
 *    description: Use to delete a missing pet
 *    tags:
 *      - Missing Pets
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of missing pet to fetch
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
 *         - name
 *         - type
 *         - colour
 *         - lostDate
 *         - lastSeenLocation
 *         - comment
 *         - status
 *         - userId
 *        properties:
 *         name:
 *          type: string
 *          example: Max
 *         type:
 *          type: string
 *          enum: [dog, cat, bird, rabbit, other]
 *          example: cat
 *         colour:
 *          type: string
 *          example: black
 *         lostDate:
 *          type: dateonly
 *          example: 2024-01-01
 *         lastSeenLocation:
 *          type: string
 *          example: Fremantle
 *         photo:
 *          type: string
 *          example: kitty-cat.png
 *          nullable: true
 *         comment:
 *          type: text
 *          example: Very shy
 *         status:
 *          type: string
 *          enum: [missing, found]
 *          example: missing
 *         foundDate:
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
router.delete("/:id", idParamValidator, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const data = await MissingPetController.deleteMissingPet(req.params.id);
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
