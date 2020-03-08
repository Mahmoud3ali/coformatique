const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {
  OK,
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  INTERNAL_SERVER_ERROR
} = require("http-status");
const { check, validationResult } = require("express-validator");
const authorize = require("../middleware/authorize");

const { User } = require("../models");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST).send({
        message: { errors: errors.array() }
      });
    }

    const { name, email, password } = req.body;
    delete req.body.password;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(CONFLICT).send({ message: "Email already exists" });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      res.status(CREATED).send({ message: "Created Successfully" });
    } catch (err) {
      console.error(err.message);
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal error, please report" });
    }
  }
);

// @route    GET api/users
// @desc     List all users
// @access   Private
router.get("/", authorize, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(OK).send(users);
  } catch (err) {
    console.error(err.message);
    res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: "Internal error, please report" });
  }
});

module.exports = router;
