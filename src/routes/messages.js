const express = require("express");
const router = express.Router();
const {
  BAD_REQUEST,
  CREATED,
  UNAUTHORIZED,
  OK,
  INTERNAL_SERVER_ERROR
} = require("http-status");
const { check, param, validationResult } = require("express-validator");
const authorize = require("../middleware/authorize");
const { Message, User, Reply } = require("../models");

// @route    POST api/messages
// @desc     Send a new message
// @access   Private
router.post(
  "/",
  authorize,
  [
    check("targetId", "Target user is required")
      .not()
      .isEmpty(),
    check("targetId", "Target user must be a valid ID").isMongoId(),
    check("title", "Message title is required")
      .not()
      .isEmpty(),
    check("body", "Message body is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST).send({
        message: { errors: errors.array() }
      });
    }

    const { targetId, title, body } = req.body;
    const creatorId = req.user.id;

    if (creatorId === targetId) {
      return res
        .status(BAD_REQUEST)
        .send({ message: "You cannot send messages to yourself" });
    }

    const message = new Message({
      targetId,
      creatorId,
      title,
      body
    });

    await message.save();

    res.status(CREATED).send({ message: "Created Successfully" });
  }
);

// @route    PATCH api/messages/:id
// @desc     Edit a message
// @access   Private
router.patch(
  "/:id",
  authorize,
  [
    check("targetId", "Target user must be a valid ID")
      .if((value, { req }) => req.body.targetId)
      .isMongoId(),
    param("id", "Target message must be a valid ID").isMongoId()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST).send({
        message: { errors: errors.array() }
      });
    }

    const { targetId, title, body } = req.body;
    const userId = req.user.id;
    const messageId = req.params.id;

    const targetMessage = await Message.findById(messageId);

    if (!targetMessage) {
      //If there's no such message
      return res
        .status(BAD_REQUEST)
        .send({ message: "Cannot find your message" });
    }

    if (targetId === userId) {
      return res
        .status(BAD_REQUEST)
        .send({ message: "You can't send messages to yourself" });
    }

    const target = await User.findById(targetId);

    if (!target) {
      //If there's no such user
      return res.status(BAD_REQUEST).send({ message: "Invalid targetId" });
    }

    if (targetMessage.creatorId != userId) {
      //If the current user isn't the author
      return res
        .status(UNAUTHORIZED)
        .send({ message: "You cannot edit this message" });
    }

    targetMessage.targetId = targetId || targetMessage.targetId;
    targetMessage.title = title || targetMessage.title;
    targetMessage.body = body || targetMessage.body;

    try {
      await targetMessage.save();
    } catch (err) {
      return res.status(BAD_REQUEST).send({ message: err.message });
    }

    res.status(OK).send({ message: "Updated Successfully" });
  }
);

// @route    DELETE api/messages/:id
// @desc     Delete a message
// @access   Private
router.delete(
  "/:id",
  authorize,
  [param("id", "Target message must be a valid ID").isMongoId()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST).send({
        message: { errors: errors.array() }
      });
    }

    const userId = req.user.id;
    const messageId = req.params.id;

    const targetMessage = await Message.findById(messageId);

    if (!targetMessage) {
      //If there's no such message
      return res
        .status(BAD_REQUEST)
        .send({ message: "Cannot find this message" });
    }

    if (targetMessage.creatorId != userId) {
      //If the current user isn't the author
      return res
        .status(UNAUTHORIZED)
        .send({ message: "You cannot edit this message" });
    }

    try {
      await Message.findByIdAndDelete(targetMessage._id);
    } catch (err) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal error, please report" });
    }

    res.status(OK).send({ message: "Deleted Successfully" });
  }
);

// @route    POST api/messages/:id/reply
// @desc     Reply to a message
// @access   Private
router.post(
  "/:id/reply",
  authorize,
  [
    check("parentMessageId", "Parent message must be a valid ID")
      .if((value, { req }) => req.body.parentMessageId)
      .isMongoId(),
    check("body", "Message body is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST).send({
        message: { errors: errors.array() }
      });
    }

    const { body } = req.body;

    const userId = req.user.id;
    const parentMessageId = req.params.id;

    const parentMessage = await Message.findById(parentMessageId);

    if (!parentMessage) {
      //If there's no such message
      return res
        .status(BAD_REQUEST)
        .send({ message: "Cannot find this message" });
    }

    if (parentMessage.targetId != userId) {
      //If the current user isn't the receiver
      return res
        .status(UNAUTHORIZED)
        .send({ message: "You cannot reply to this message" });
    }

    try {
      const reply = new Reply({
        parentMessageId,
        body
      });

      await reply.save();

      res.status(OK).send({ message: "Reply sent" });
    } catch (err) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal error, please report" });
    }
  }
);

module.exports = router;
