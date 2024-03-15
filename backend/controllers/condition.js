const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Condition = require("../models/Condition");

// description    Get all conditions
// route          GET /api/v1/conditions
// access         Private
exports.getConditions = asyncHandler(async (req, res, next) => {
  const conditions = await Condition.find();
  res.status(200).json({ success: true, data: conditions });
});

// description   Create new condition
// route         POST /api/v1/conditions
// access        Private
exports.createCondition = asyncHandler(async (req, res, next) => {
  const condition = await Condition.create(req.body);

  res.status(201).json({
    success: true,
    data: condition,
  });
});

// description   Update condition
// route         PUT /api/v1/conditions/:id
// access        Private
exports.updateCondition = asyncHandler(async (req, res, next) => {
  let condition = await Condition.findById(req.params.id);

  if (!condition) {
    return next(
      new ErrorResponse(`condition not found with id of ${req.params.id}`, 404)
    );
  }

  condition.name = req.body.name;
  const updatedCondition = await condition.save();

  res.status(200).json({ success: true, data: updatedCondition });
});

// description    Delete condition
// route          DELETE /api/v1/conditions/:id
// access         Private
exports.deleteCondition = asyncHandler(async (req, res, next) => {
  const condition = await Condition.findById(req.params.id);

  if (!condition) {
    return next(
      new ErrorResponse(`condition not found with id of ${req.params.id}`, 404)
    );
  }

  await condition.deleteOne(); 

  res.status(200).json({ success: true, data: {} });
});
