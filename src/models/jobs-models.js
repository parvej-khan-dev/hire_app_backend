const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const constant = require("../utils/constant");
const model = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    posted: { type: Date, default: new Date() },
    status: { type: String, enum: ["Published", "Draft"] },
    applied: { type: Number, default: 0 },
    jobViews: { type: Number, default: 0 },
    dayLeft: { type: Number },
    premium: { type: Boolean },
    dateFormat: String,
  },
  { timestamps: true }
);

model.pre("save", function (next) {
  // If the plan is "Free" and the dayLeft is not set or it's greater than 7, set it to 7.
  if (
    this.premium === false &&
    (!this.dayLeft || this.dayLeft > constant.freeDayValidity)
  ) {
    this.dayLeft = constant.freeDayValidity;
  }

  // If the plan is "Premium" and the dayLeft is not set or it's greater than 30, set it to 30.
  if (
    this.premium === true &&
    (!this.dayLeft || this.dayLeft > constant.premiumDayValidity)
  ) {
    this.dayLeft = constant.premiumDayValidity;
  }

  next();
});

const JobModel = mongoose.model("JobModel", model);
module.exports = { JobModel };
