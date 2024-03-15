const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Unit = require("../models/Unit");

// description    Get all units
// route          GET /api/v1/units
// access         Private
exports.getUnits = asyncHandler(async (req, res, next) => {
  const units = await Unit.find();
  res.status(200).json({ success: true, data: units });
});

// description   Create new unit
// route         POST /api/v1/units
// access        Private
exports.createUnit = asyncHandler(async (req, res, next) => {
  const unit = await Unit.create(req.body);

  res.status(201).json({
    success: true,
    data: unit,
  });
});

// description   Update unit
// route         PUT /api/v1/units/:id
// access        Private
exports.updateUnit = asyncHandler(async (req, res, next) => {
  let unit = await Unit.findById(req.params.id);

  if (!unit) {
    return next(
      new ErrorResponse(`unit not found with id of ${req.params.id}`, 404)
    );
  }

  unit.name = req.body.name;
  const updatedUnit = await unit.save();

  res.status(200).json({ success: true, data: updatedUnit });
});

// description    Delete unit
// route          DELETE /api/v1/units/:id
// access         Private
exports.deleteUnit = asyncHandler(async (req, res, next) => {
  const unit = await Unit.findById(req.params.id);

  if (!unit) {
    return next(
      new ErrorResponse(`unit not found with id of ${req.params.id}`, 404)
    );
  }

  await unit.deleteOne(); 

  res.status(200).json({ success: true, data: {} });
});
