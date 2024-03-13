const mongoose = require("mongoose");

const AvailableTimeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add available time name"],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AvailableTime", AvailableTimeSchema);
