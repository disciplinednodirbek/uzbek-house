const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Region = require("../models/Region");

// description    Get all region
// route          GET /api/v1/regions
// access         Private 
exports.getRegions = asyncHandler(async (req, res, next) => {
  const regions = await Region.find();
  res.status(200).json({ success: true, data: regions });
});

// description   Create new region
// route         POST /api/v1/regions
// access        Private
exports.createRegion = asyncHandler(async (req, res, next) => {
  const region = await Region.create(req.body);

  res.status(201).json({
    success: true,
    data: region,
  });
});

// description   Update region
// route         PUT /api/v1/regions/:id
// access        Private
exports.updateRegion = asyncHandler(async (req, res, next) => {
  let region = await Region.findById(req.params.id);

  if (!region) {
    return next(
      new ErrorResponse(`region not found with id of ${req.params.id}`, 404)
    );
  }

  region.name = req.body.name;
  const updatedRegion = await region.save();

  res.status(200).json({ success: true, data: updatedRegion });
});

// description    Delete region
// route          DELETE /api/v1/regions/:id
// access         Private
exports.deleteRegion = asyncHandler(async (req, res, next) => {
  const region = await Region.findById(req.params.id);

  if (!region) {
    return next(
      new ErrorResponse(`region not found with id of ${req.params.id}`, 404)
    );
  }

  await region.deleteOne(); 

  res.status(200).json({ success: true, data: {} });
});
