const mongoose = require("mongoose");

const HouseSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please add your full name"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    year_build: {
      type: Number,
      required: [true, "Please add year build"],
    },
    bathroom_count: {
      type: Number,
      required: [true, "Please add bathroom count"],
    },
    phone_number: {
      type: String,
      required: [true, "Please add phone number"],
    },
    bedroom_count: {
      type: Number,
      required: [true, "Please add bedroom count"],
    },
    kitchen_count: {
      type: Number,
      required: [true, "Please add kitchen count"],
    },
    hiddenFor: {
      type: [String],
      default: [],
    },
    square_yard: {
      type: Number,
      required: [true, "Please add square yard"],
    },
    balcony: {
      type: Boolean,
      required: [true, "Please confirm whether the house exist balcony or not"],
    },
    price: {
      type: Number,
      required: [true, "Please add your full name"],
    },
    address: {
      type: String,
      required: [true, "Please add your full name"],
    },
    maintenance_description: {
      type: String,
      required: [true, "Please add a maintenance description"],
    },
    zip_code: {
      type: Number,
      required: [true, "Please add a zip code"],
    },
    imageList: {
      type: [String],
      required: [true, "Please add image"],
    },
    likes: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      required: [true, "Please add type"],
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

    region_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
      required: [true, "Please add region ID"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add user"],
    },
    current_condition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Condition",
      required: [true, "Please add current condition"],
    },
    unit_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: [true, "Please add unit type"],
    },
    available_time: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AvailableTime",
      required: [true, "Please add available time"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);

// Define a virtual property for calculateAverageRating
HouseSchema.virtual("calculateAverageRating").get(function () {
  const likesCount = this.likes.length;
  const commentsCount = this.comments.length;
  const totalInteractions = likesCount + commentsCount;
  if (totalInteractions === 0) {
    return 0; // Return 0 if there are no interactions
  }
  const averageRating = (likesCount + commentsCount * 0.5) / totalInteractions; // Assuming comments contribute 50% to the rating
  return averageRating;
});

HouseSchema.index({ "$**": "text" });

module.exports = mongoose.model("House", HouseSchema);
