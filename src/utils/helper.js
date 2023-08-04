const moment = require("moment");

const timeFormat = (date) => {
  return moment(date).format("MMMM Do YYY");
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(err);

  // Respond with the error message
  res.status(statusCode).json({
    error: message,
  });
};

const responseHandler = (req, res, next) => {
  // Create a function to send responses in a standardized format
  res.sendResponse = (data, statusCode = 200, message = "Success") => {
    res.status(statusCode).json({
      status: "success",
      message: message,
      data: data,
    });
  };

  // Continue to the next middleware or route handler
  next();
};

module.exports = {
  timeFormat,
  errorHandler,
  responseHandler,
};
