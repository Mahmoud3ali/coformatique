const Router = require("express");
const { OK } = require("http-status");

const { version } = require("../package.json");

const UsersRouter = require("./routes/users");

const router = new Router();
router.use("/users", UsersRouter);

// maintenance endpoint
router.get("/system-info", (req, res, next) =>
  res.status(OK).json({ backendVersion: version })
);

module.exports = router;
