const express = require("express");
const router = express.Router();
const {
  BAD_REQUEST,
  CREATED,
} = require("http-status");
const { check, validationResult } = require("express-validator");
const authorize = require("../middleware/authorize");
const { Message } = require("../models");

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
    check("targetId", "Target user must be a valid mongoId").isMongoId(),
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

module.exports = router;
