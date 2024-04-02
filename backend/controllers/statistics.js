const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const House = require("../models/House");
const Region = require("../models/Region");


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
    // Get distinct regions from the House collection
    const regions = await House.distinct("region_id");

    // Initialize arrays to store regions and house counts
    const regionsArray = [];
    const houseCountsArray = [];

    // Loop through each region and find the count of houses belonging to that region
    for (const regionId of regions) {
        // Populate the region name from the Region collection
        const region = await Region.findById(regionId);
        const regionName = region ? region.name : "Unknown";

        // Find the count of houses belonging to the current region
        const houseCount = await House.countDocuments({ region_id: regionId });

        // Push region name and house count to their respective arrays
        regionsArray.push(regionName);
        houseCountsArray.push(houseCount);
    }

    res.status(200).json({ success: true, regions: regionsArray, houses: houseCountsArray });
});