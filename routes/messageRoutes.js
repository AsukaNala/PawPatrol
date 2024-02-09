const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/messageController");
const MissingPet = require("../models/missingPet");

/**
 * @swagger
 * /api/messages:
 *  get:
 *    description: Use to request all messages
 *    tags:
 *      - Messages
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
    const data = await MessageController.getAllMessages();
    res.send({ result: 200, data: data });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/messages/{id}:
 *  get:
 *    description: Use to request a message by ID
 *    tags:
 *      - Messages
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of message to fetch
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
router.get("/:id", async (req, res, next) => {
  try {
    const data = await MessageController.getMessage(req.params.id);
    if (!data) {
      res.status(404).send({ result: 404, message: "Message not found" });
    } else {
      res.send({ result: 200, data: data });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/messages/users/{id}:
 *  get:
 *    description: Use to request a message by User ID
 *    tags:
 *      - Messages
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
router.get("/users/:id", async (req, res, next) => {
  try {
    const data = await MessageController.getMessageByUserId(req.params.id);
    if (!data) {
      res.status(404).send({ result: 404, message: "Message not found" });
    } else {
      res.send({ result: 200, data: data });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/messages/missing-pets/{id}:
 *  get:
 *    description: Use to request a message by MissingPet ID
 *    tags:
 *      - Messages
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of missingpet to fetch
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
router.get("/missing-pets/:id", async (req, res, next) => {
  try {
    const data = await MessageController.getMessageByMissingPetId(
      req.params.id
    );
    if (!data) {
      res.status(404).send({ result: 404, message: "Message not found" });
    } else {
      res.send({ result: 200, data: data });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/messages:
 *  post:
 *    description: Use to create a new message
 *    tags:
 *      - Messages
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *         - comment
 *         - userId
 *         - missingPetId
 *        properties:
 *         comment:
 *          type: text
 *          example: Hey I saw your pet!
 *         userId:
 *          type: integer
 *          example: 1
 *         missingPetId:
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
router.post("/", async (req, res, next) => {
  try {
    const data = await MessageController.createMessage(req.body);
    res.send({ result: 200, data: data });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/messages/{id}:
 *  put:
 *    description: Use to update a  message
 *    tags:
 *      - Messages
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *         - comment
 *         - userId
 *         - missingPetId
 *        properties:
 *         comment:
 *          type: text
 *          example: Hey I saw your pet!
 *         userId:
 *          type: integer
 *          example: 1
 *         missingPetId:
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
router.put("/:id", async (req, res, next) => {
  try {
    const data = await MessageController.updateMessage(req.params.id, req.body);
    if (!data) {
      res.status(404).send({ result: 404, message: "Message not found" });
    } else {
      res.send({ result: 200, data: data });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/messages/{id}:
 *  delete:
 *    description: Use to delete a  message
 *    tags:
 *      - Messages
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *         - comment
 *         - userId
 *         - missingPetId
 *        properties:
 *         comment:
 *          type: text
 *          example: Hey I saw your pet!
 *         userId:
 *          type: integer
 *          example: 1
 *         missingPetId:
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
router.delete("/:id", async (req, res, next) => {
  try {
    const data = await MessageController.deleteMessage(req.params.id);
    if (!data) {
      res.status(404).send({ result: 404, message: "Message not found" });
    } else {
      res.send({ result: 200, data: data });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
