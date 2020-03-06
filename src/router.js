const Router = require("express");
const { OK } = require("http-status");

const { version } = require("../package.json");

const UsersRouter = require("./routes/users");
const MessagesRouter = require("./routes/messages");
const AuthRouter = require("./routes/auth");

const router = new Router();
router.use("/messages", MessagesRouter);
router.use("/users", UsersRouter);
router.use("/auth", AuthRouter);

// maintenance endpoint
router.get("/system-info", (req, res, next) =>
  res.status(OK).json({ backendVersion: version })
);

module.exports = router;
