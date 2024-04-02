const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const House = require("../models/House");
const Region = require("../models/Region");
const User = require("../models/Region");

exports.getHousesByMonth = asyncHandler(async (req, res, next) => {
  const housesByMonth = await House.aggregate([
    {
      $project: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        type: 1,
      },
    },
    {
      $group: {
        _id: { year: "$year", month: "$month", type: "$type" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        month: {
          $switch: {
            branches: [
              { case: { $eq: ["$_id.month", 1] }, then: "January" },
              { case: { $eq: ["$_id.month", 2] }, then: "February" },
              { case: { $eq: ["$_id.month", 3] }, then: "March" },
              { case: { $eq: ["$_id.month", 4] }, then: "April" },
              { case: { $eq: ["$_id.month", 5] }, then: "May" },
              { case: { $eq: ["$_id.month", 6] }, then: "June" },
              { case: { $eq: ["$_id.month", 7] }, then: "July" },
              { case: { $eq: ["$_id.month", 8] }, then: "August" },
              { case: { $eq: ["$_id.month", 9] }, then: "September" },
              { case: { $eq: ["$_id.month", 10] }, then: "October" },
              { case: { $eq: ["$_id.month", 11] }, then: "November" },
              { case: { $eq: ["$_id.month", 12] }, then: "December" },
            ],
            default: "Unknown",
          },
        },
        type: "$_id.type",
        count: 1,
        _id: 0,
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);

  const months = [];
  const houses_sell = [];
  const houses_rent = [];

  housesByMonth.forEach((entry) => {
    if (!months.includes(entry.month)) {
      months.push(entry.month);
    }
    if (entry.type === "SELLING") {
      houses_sell.push(entry.count);
    } else if (entry.type === "RENTING") {
      houses_rent.push(entry.count);
    }
  });

  // Sort months, houses_sell, and houses_rent based on the index of "March"
  const marchIndex = months.indexOf("March");
  if (marchIndex !== -1) {
    months.unshift(...months.splice(marchIndex, 1));
    houses_sell.unshift(...houses_sell.splice(marchIndex, 1));
    houses_rent.unshift(...houses_rent.splice(marchIndex, 1));
  }

  res.status(200).json({ success: true, months, houses_sell, houses_rent });
});

exports.getHousesTotalCount = asyncHandler(async (req, res, next) => {
  const allHousesCount = await House.countDocuments();
  const sellingHousesCount = await House.countDocuments({ type: "SELLING" });
  const rentingHousesCount = await House.countDocuments({ type: "RENTING" });

  res.status(200).json({
    success: true,
    allHousesCount,
    sellingHousesCount,
    rentingHousesCount,
  });
});

exports.getHousesByRegion = asyncHandler(async (req, res, next) => {
  const regions = await House.distinct("region_id");

  const regionsArray = [];
  const houseCountsArray = [];

  for (const regionId of regions) {
    const region = await Region.findById(regionId);
    const regionName = region ? region.name : "Unknown";

    const houseCount = await House.countDocuments({ region_id: regionId });

    regionsArray.push(regionName);
    houseCountsArray.push(houseCount);
  }

  res
    .status(200)
    .json({ success: true, regions: regionsArray, houses: houseCountsArray });
});

exports.getUsersByRegion = asyncHandler(async (req, res, next) => {
  const users = await User.distinct("region_id");

  const regionsArray = [];
  const usersCountArray = [];

  for (const regionId of users) {
    const region = await Region.findById(regionId);
    const regionName = region ? region.name : "Unknown";

    const userCount = await User.countDocuments({ region_id: regionId });

    regionsArray.push(regionName);
    usersCountArray.push(userCount);
  }

  res
    .status(200)
    .json({ success: true, regions: regionsArray, users: usersCountArray });
});
