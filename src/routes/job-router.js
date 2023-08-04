const express = require("express");
const router = express.Router();
const {
  jobPost,
  viewAllJobPosts,
  viewPost,
} = require("../controllers/job-controller");
const { graphReport } = require("../controllers/reports-controller");

router.post("/", jobPost);
router.get("/", viewAllJobPosts);
router.get("/:id", viewPost);
router.get("/report/all", graphReport);

module.exports = router;
