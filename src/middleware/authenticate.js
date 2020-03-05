const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("http-status");

module.exports = async function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if there's no token
  if (!token) {
    return res.status(BAD_REQUEST).json({ message: "Invalid token" });
  }

  // Verify token
  try {
    await jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(BAD_REQUEST).json({ message: "Invalid token" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("Something went wrong with auth middleware");
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal error, please report" });
  }
};
