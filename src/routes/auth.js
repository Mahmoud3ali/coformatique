const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/authorize");
const jwt = require("jsonwebtoken");
const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } = require("http-status");
const { JWT_SECRET } = process.env;
const { check, validationResult } = require("express-validator");

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(BAD_REQUEST)
        .json({ message: { errors: errors.array() } });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(BAD_REQUEST)
          .json({ message: "Email or password does not match our records" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(BAD_REQUEST)
          .json({ message: "Email or password does not match our records" });
      }

      const payload = {
        user: {
          id: user.id,
          name: user.name
        }
      };

      jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.status(OK).json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal error, please report" });
    }
  }
);

module.exports = router;
