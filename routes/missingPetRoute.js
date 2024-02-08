const express = require("express");
const router = express.Router();
const MissingPetController = require("../controllers/missingPetController");

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
 *        description: User not found
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
 *        description: User not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/:id", async (req, res, next) => {
  try {
    const data = await MissingPetController.getMissingPet(req.params.id);
    if (!data) {
      return res.status(404).send({ result: 404, message: " Not found" });
    } else {
      res.send({ result: 200, data: data });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/missing-pets/users/{id}:
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
 *        description: User not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/users/:id", async (req, res, next) => {
  try {
    const data = await MissingPetController.getMissingPetByUserId(
      req.params.id
    );
    if (!data) {
      return res.status(404).send({ result: 404, message: " Not found" });
    } else {
      res.send({ result: 200, data: data });
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
 *        description: User not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/type/:type", async (req, res, next) => {
  try {
    const data = await MissingPetController.getMissingPetsByType(
      req.params.type
    );
    if (!data) {
      return res.status(404).send({ result: 404, message: " Not found" });
    } else {
      res.send({ result: 200, data: data });
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
 *        description: User not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/status/:status", async (req, res, next) => {
  try {
    const data = await MissingPetController.getMissingPetsByStatus(
      req.params.status
    );
    if (!data) {
      return res.status(404).send({ result: 404, message: " Not found" });
    } else {
      res.send({ result: 200, data: data });
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
 *        description: User not found
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
      return res.status(404).send({ result: 404, message: " Not found" });
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
 *         - foundDate
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
 *          example: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fdog%2F&psig=AOvVaw2bN6gNqjXrQj8sQjJ7X0kz&ust=1632225067353000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjRjZ6Fz_MCFQAAAAAdAAAAABAD
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
 *         userId:
 *          type: integer
 *          example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Invalid JSON
 *      '404':
 *        description: User not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.post("/", async (req, res, next) => {
  try {
    const data = await MissingPetController.createMissingPet(req.body);
    res.send({ result: 200, data: data });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/missing-pets/{id}:
 *  put:
 *    description: Use to update a  missing pet
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
 *         - foundDate
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
 *          example: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fdog%2F&psig=AOvVaw2bN6gNqjXrQj8sQjJ7X0kz&ust=1632225067353000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjRjZ6Fz_MCFQAAAAAdAAAAABAD
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
 *        description: User not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.put("/:id", async (req, res, next) => {
  try {
    const data = await MissingPetController.updateMissingPet(
      req.params.id,
      req.body
    );
    res.send({ result: 200, data: data });
  } catch (error) {
    next(error);
  }
});

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
 *         - foundDate
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
 *          example: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fdog%2F&psig=AOvVaw2bN6gNqjXrQj8sQjJ7X0kz&ust=1632225067353000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjRjZ6Fz_MCFQAAAAAdAAAAABAD
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
 *        description: User not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const data = await MissingPetController.deleteMissingPet(req.params.id);
    res.send({ result: 200, data: data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
