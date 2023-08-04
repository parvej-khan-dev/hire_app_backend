const jobRouter = require("./job-router");
const express = require("express");
const router = express.Router();

router.use("/jobs", jobRouter);

module.exports = router;
