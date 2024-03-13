const mongoose = require("mongoose");

const UnitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add unit name"],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Unit", UnitSchema);
