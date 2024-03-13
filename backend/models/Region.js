const mongoose = require("mongoose");

const RegionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add region name"],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Region", RegionSchema);
