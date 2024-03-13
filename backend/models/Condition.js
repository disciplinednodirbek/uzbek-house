const mongoose = require("mongoose");

const ConditionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add condition name"],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Condition", ConditionSchema);
