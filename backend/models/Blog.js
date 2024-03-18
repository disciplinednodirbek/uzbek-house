const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    category: {
      type: String,
      enum: ["BUYING", "SELLING", "IMPROVEMENT"],
      required: [true, "Please add a  category"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please add a blog owner"],
    },
    tags: {
      type: [String],
      required: [true, "Please add a blog tag"],
    },
    image: {
      type: String,
      required: [true, "Please add an image"],
    },
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [
        {
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
          },
          text: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    likeCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

BlogSchema.index({ "$**": "text" });

module.exports = mongoose.model("Blog", BlogSchema);
