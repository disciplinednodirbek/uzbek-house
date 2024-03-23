const { default: mongoose } = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const House = require("../models/House");
const User = require("../models/User");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: "public_1m8F0JkeraCuQxAPWfH6pqRyXHo=",
  privateKey: "private_kvRV4GSIMCZFIcaVQhxZPHD/loA=",
  urlEndpoint: "https://ik.imagekit.io/j4pvd3slcf",
});

exports.getAllHouses = asyncHandler(async (req, res, next) => {
  console.log(req.query);
  const { address, type, min_price, max_price, balcony } = req.query;
  let query = {};
  if (address) {
    query.address = { $regex: new RegExp(address, "i") };
  }

  if (type) {
    query.type = type;
  }

  if (min_price) {
    query.price = { $gte: min_price };
  }
  if (max_price) {
    query.price = { ...query.price, $lte: max_price };
  }

  if (balcony !== undefined) {
    query.balcony = balcony;
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const total = await House.countDocuments(query);
  let houses = await House.find(query)
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(limit)
    .populate("region_id")
    .populate("current_condition")
    .populate("unit_type")
    .populate("available_time");

  if (req.user && req.user._id.toString()) {
    houses = houses.filter(
      (house) => !house.hiddenFor.includes(req.user._id.toString())
    );
  }

  const pagination = { next: null, prev: null };

  if (endIndex < total) {
    pagination.next = page + 1;
  }

  if (startIndex > 0) {
    pagination.prev = page - 1;
  }

  res.status(200).json({
    success: true,
    total,
    limit,
    pagination,
    data: houses,
  });
});

// description   Get single house
// route         GET /api/v1/houses/:id
// access        Public
exports.getHouse = asyncHandler(async (req, res, next) => {
  const house = await House.findById(req.params.id)
    .populate("region_id")
    .populate("current_condition")
    .populate("unit_type")
    .populate("available_time")
    .populate({
      path: "user",
      select: "name email phone_number address",
    });

  if (!house) {
    return next(
      new ErrorResponse(`House not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: house });
});

// description   Create new house
// route         POST /api/v1/houses
// access        Private
exports.createHouse = asyncHandler(async (req, res, next) => {
  if (!req.body.location || !Array.isArray(req.body.location)) {
    return next(
      new ErrorResponse("Location must be provided as an array", 400)
    );
  }

  const location = {
    type: "Point",
    coordinates: req.body.location,
  };

  delete req.body.location;

  try {
    const uploadedImageUrls = [];
    for (let i = 0; i < req.body.imageList.length; i++) {
      const imageUploadResponse = await imagekit.upload({
        file: req.body.imageList[i],
        fileName: `house-${Date.now()}-${i + 1}`,
      });
      uploadedImageUrls.push(imageUploadResponse.url);
    }

    const newHouse = new House({
      ...req.body,
      location,
      user: req.user._id,
      imageList: uploadedImageUrls,
    });

    const house = await newHouse.save();

    res.status(200).json({
      success: true,
      data: house,
    });
  } catch (error) {
    console.error("Error creating house:", error);
    return next(new ErrorResponse("Failed to create house", 500));
  }
});

// description   Update house
// route         PUT /api/v1/houses/:id
// access        Private
exports.updateHouse = asyncHandler(async (req, res, next) => {
  let house = await House.findById(req.params.id);

  if (!house) {
    return next(
      new ErrorResponse(`House not found with id of ${req.params.id}`, 404)
    );
  }

  if (
    req.user._id.toString() !== house.user.toString() &&
    req.user.role !== "super_admin"
  ) {
    return next(
      new ErrorResponse("You are not authorized to update this house", 403)
    );
  }

  if (req.user.role === "admin" && house.user.role === "super_admin") {
    return next(
      new ErrorResponse(
        "You are not authorized to update super_admin users' houses",
        403
      )
    );
  }

  if (
    req.user.role === "super_admin" ||
    (req.user.role === "admin" && house.user.role === "user") ||
    req.user._id.toString() === house.user.toString()
  ) {
    if (req.body.imageList && Array.isArray(req.body.imageList)) {
      // Upload new imageLists and update house's imageList field
      const uploadedImageUrls = [];
      for (let i = 0; i < req.body.imageList.length; i++) {
        const imageUploadResponse = await imagekit.upload({
          file: req.body.imageList[i],
          fileName: `house-${req.params.id}-image-${i + 1}`,
        });
        uploadedImageUrls.push(imageUploadResponse.url);
      }
      req.body.imageList = uploadedImageUrls;
    }

    house = await House.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: house });
  } else {
    return next(
      new ErrorResponse("You are not authorized to update this house", 403)
    );
  }
});

// description    Delete house
// route          DELETE /api/v1/houses/:id
// access         Private
exports.deleteHouse = asyncHandler(async (req, res, next) => {
  try {
    const house = await House.findById(req.params.id);

    if (!house) {
      return next(
        new ErrorResponse(`house not found with id of ${req.params.id}`, 404)
      );
    }

    if (
      house.user.toString() !== req.user._id.toString() &&
      req.user.role !== "super_admin"
    ) {
      return next(
        new ErrorResponse(`You are not authorized to delete this house`, 401)
      );
    }

    await House.deleteOne({ _id: req.params.id });

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.error("Error deleting house:", err);
    return next(new ErrorResponse(`Error deleting house: ${err.message}`, 500));
  }
});

// description   hide functionality for each house
// route         GET /api/v1/houses/hide/:id
// access        Private
exports.hideHouse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const house = await House.findById(id);

  if (!house) {
    return next(new ErrorResponse(`house not found`, 404));
  }

  if (house.hiddenFor.includes(req.user._id.toString())) {
    return next(new ErrorResponse(`already hidden for you`, 403));
  }

  house.hiddenFor.push(req.user._id.toString());
  const updatedHouse = await house.save();
  res.status(201).json({ success: true, data: updatedHouse });
});

exports.likeHouse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const house = await House.findById(id);

  if (!house) {
    return next(new ErrorResponse(`house not found`, 404));
  }

  const index = house.likes.findIndex((id) => id === req.user._id.toString());

  if (index === -1) {
    house.likes.push(req.user._id);
    house.likeCount = house.likeCount + 1;
  } else {
    house.likes = house.likes.filter((id) => id !== req.user._id.toString());
    house.likeCount = house.likes.length;
  }

  const updatedHouse = await House.findByIdAndUpdate(id, house, {
    new: true,
  });
  res.status(201).json({ success: true, data: updatedHouse });
});

// description   Get most relevant category  houses
// route         GET /api/v1/houses/:houseId/suggested/category=..?
// access        Public
exports.getSuggestedHouses = asyncHandler(async (req, res, next) => {
  let houses = await House.find({
    category: req.query.category,
  })
    .populate("user")
    .sort({ likeCount: -1, createdAt: -1 })
    .limit(4);

  if (!houses) {
    return next(new ErrorResponse(`houses not found`, 404));
  }

  houses = houses.filter((house) => house.id.toString() !== req.params.houseId);

  res.status(200).json({ success: true, data: houses });
});
