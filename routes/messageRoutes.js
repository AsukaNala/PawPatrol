const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/messageController");
const verifyToken = require("../auth/authMiddleware");

//import validator
const { validationResult } = require("express-validator");
const idParamValidator = require("../validators");
const {
  messageValidator,
  updateMessageValidator,
} = require("../validators/messageValidator");

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
router.get("/:id", idParamValidator, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const data = await MessageController.getMessage(req.params.id);
      if (!data) {
        res.status(404).send({ result: 404, message: "Message not found" });
      } else {
        res.send({ result: 200, data: data });
      }
    } else {
      res.status(422).send({ result: 422, errors: errors.array() });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/messages/user/{id}:
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
router.get("/user/:id", idParamValidator, async (req, res, next) => {
  try {
    let data;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({ result: 422, errors: errors.array() });
    } else {
      data = await MessageController.getMessageByUserId(req.params.id);
      if (!data) {
        res.status(404).json({ result: 404, message: "Message not found" });
      } else {
        res.send({ result: 200, data: data });
      }
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/messages/missingpet/{id}:
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
router.get("/missingpet/:id", idParamValidator, async (req, res, next) => {
  try {
    let data;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({ result: 422, errors: errors.array() });
    } else {
      data = await MessageController.getMessageByMissingPetId(req.params.id);
      if (!data) {
        res.status(404).json({ result: 404, message: "Message not found" });
      } else {
        res.send({ result: 200, data: data });
      }
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
 *         - message
 *         - userId
 *         - missingPetId
 *        properties:
 *         message:
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
router.post("/", verifyToken, messageValidator, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      if (req.userId) {
        req.body.userId = req.userId;
      }
      const data = await MessageController.createMessage(req.body);
      if (!data) {
        res.status(404).send({ result: 404, message: "Message not found" });
      } else {
        res.send({ result: 200, data: data });
      }
    } else {
      res.status(422).send({ result: 422, errors: errors.array() });
    }
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
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to fetch
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
 *         - message
 *         - userId
 *         - missingPetId
 *        properties:
 *         message:
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
router.put(
  "/:id",
  verifyToken,
  updateMessageValidator,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        if (req.userId) {
          req.body.userId = req.userId;
        }
        const data = await MessageController.updateMessage(
          req.params.id,
          req.body
        );
        if (data[0] === 0) {
          res.status(404).send({ result: 404, message: "Message not found" });
        } else {
          res.send({ result: 200, data: data });
        }
      } else {
        res.status(422).send({ result: 422, errors: errors.array() });
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/messages/{id}:
 *  delete:
 *    description: Use to delete a  message
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
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *         - message
 *         - userId
 *         - missingPetId
 *        properties:
 *         message:
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
router.delete("/:id", verifyToken, idParamValidator, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      if (req.userId) {
        req.body.userId = req.userId;
      }
      const data = await MessageController.deleteMessage(req.params.id);
      if (!data) {
        res.status(404).send({ result: 404, message: "Message not found" });
      } else {
        res.send({ result: 200, data: data });
      }
    } else {
      res.status(422).send({ result: 422, errors: errors.array() });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
