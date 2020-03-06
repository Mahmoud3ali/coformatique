const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require("http-status");

module.exports = async function(req, res, next) {
  // Get token from header
  const token = req.header("Authorization").substring(7);

  // Check if there's no token
  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: "Unauthorized" });
  }

  // Verify token
  try {
    await jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(UNAUTHORIZED).json({ message: "Unauthorized" });
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
