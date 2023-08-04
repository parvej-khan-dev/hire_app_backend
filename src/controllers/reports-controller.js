const { JobModel } = require("../models/jobs-models");
const moment = require("moment");

exports.graphReport = async (req, res, next) => {
  try {
    // Get the current date and the date 30 days ago
    const currentDate = new Date();
    const thirtyDaysAgo = moment().subtract(30, "days").toDate();

    // MongoDB aggregation pipeline to filter and sort data from the last 30 days
    const pipeline = [
      {
        $match: {
          posted: { $gte: thirtyDaysAgo, $lte: currentDate },
        },
      },
      {
        $project: {
          _id: 0,
          applied: 1,
          jobViews: 1,
          posted: { $dateToString: { format: "%Y-%m-%d", date: "$posted" } },
        },
      },
      {
        $sort: {
          posted: -1, // Sort by 'posted' field in descending order (most recent first)
        },
      },
    ];

    // Execute the aggregation pipeline
    const result = await JobModel.aggregate(pipeline);

    // Create two arrays of length 30, initialized with zeros
    const appliedData = new Array(30).fill(0);
    const jobViewsData = new Array(30).fill(0);

    // Populate the arrays with data from the database
    for (const entry of result) {
      const dateIndex = moment(entry.posted).diff(thirtyDaysAgo, "days");
      appliedData[dateIndex] = entry.applied;
      jobViewsData[dateIndex] = entry.jobViews;
    }

    res.sendResponse({
      appliedData,
      jobViewsData,
    });
  } catch (error) {
    next(error);
  }
};
