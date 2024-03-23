const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    image: {
      type: String,
    },
    address: {
      type: String,
      default:'',
    },
    phone_number: {
      type: String,
      default:'',
    },
    password: {
      type: String,
      minlength: 5,
    },
    status: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "super_admin"],
    },
    googleId: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);

//hash the password using bcrypt before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Check the entered password with password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
