const { JobModel } = require("../models/jobs-models");
const { timeFormat } = require("../utils/helper");
const cron = require("node-cron");

exports.jobPost = async (req, res, next) => {
  const { name, location, posted, premium } = req.body;
  console.log(req.body);
  try {
    const newJobPost = new JobModel({
      name,
      location,
      posted,
      premium,
    });
    console.log("new", newJobPost);
    newJobPost.dateFormat = timeFormat(posted);
    newJobPost.status = "Published";
    const newPostCreate = await newJobPost.save();
    res.sendResponse(newPostCreate);
  } catch (error) {
    next(error);
  }
};

exports.viewAllJobPosts = async (req, res, next) => {
  try {
    const jobPosts = await JobModel.find({}).sort({ createdAt: -1 });
    const allJobData =
      jobPosts.length > 0 ? jobPosts : "Job Post Not Available";
    res.sendResponse(allJobData);
  } catch (error) {
    next(error);
  }
};

exports.viewPost = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find particular Job Post;
    const job = await JobModel.findOne({ _id: id });

    if (job) {
      // if any user visit on view page count will be increase
      job.jobViews = job.jobViews + 1;
      await job.save();
      res.sendResponse(job);
    } else {
      res.sendResponse("Not Job found");
    }
  } catch (err) {
    next(err);
  }
};

const updateJobStatus = async () => {
  try {
    // Find all documents with status "Published"
    const publishedJobs = await JobModel.find({ status: "Published" });

    for (const job of publishedJobs) {
      // If the job is not premium and dayLeft is greater than 0, reduce the dayLeft by 1.
      if (!job.premium && job.dayLeft > 0) {
        job.dayLeft = job.dayLeft - 1;

        // If dayLeft becomes 0, set status to "Draft"
        if (job.dayLeft === 0) {
          job.status = "Draft";
        }

        // Save the updated job
        await job.save();
        console.log("Cron Job Running successfully");
      }
    }
  } catch (err) {
    console.error("Error updating job status:", err);
  }
};

// Schedule the cron job to run every day at midnight (00:00)
cron.schedule("0 0 * * *", updateJobStatus);
