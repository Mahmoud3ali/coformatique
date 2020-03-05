const Router = require("express");
const { OK } = require("http-status");

const { version } = require("../package.json");

const router = new Router();

// maintenance endpoint
router.get('/system-info', (req, res, next) => res.status(OK).json({ backendVersion: version }));

module.exports = router;