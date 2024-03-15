const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const AvailableTime = require("../models/AvailableTime");

// description    Get all available times
// route          GET /api/v1/available-times
// access         Private
exports.getAvailableTimes = asyncHandler(async (req, res, next) => {
  const availableTimes = await AvailableTime.find();
  res.status(200).json({ success: true, data: availableTimes });
});

// description   Create new available times
// route         POST /api/v1/available-times
// access        Private
exports.createAvailableTime = asyncHandler(async (req, res, next) => {
  const availableTime = await AvailableTime.create(req.body);

  res.status(201).json({
    success: true,
    data: availableTime,
  });
});

// description   Update available times
// route         PUT /api/v1/available-times/:id
// access        Private
exports.updateAvailableTime = asyncHandler(async (req, res, next) => {
  let availableTime = await AvailableTime.findById(req.params.id);

  if (!availableTime) {
    return next(
      new ErrorResponse(
        `availableTime not found with id of ${req.params.id}`,
        404
      )
    );
  }

  availableTime.name = req.body.name;
  const updatedAvailableTime = await availableTime.save();

  res.status(200).json({ success: true, data: updatedAvailableTime });
});

// description    Delete available times
// route          DELETE /api/v1/available-times/:id
// access         Private
exports.deleteAvailableTime = asyncHandler(async (req, res, next) => {
  const availableTime = await AvailableTime.findById(req.params.id);

  if (!availableTime) {
    return next(
      new ErrorResponse(
        `availableTime not found with id of ${req.params.id}`,
        404
      )
    );
  }

  await availableTime.deleteOne(); 


  res.status(200).json({ success: true, data: {} });
});
