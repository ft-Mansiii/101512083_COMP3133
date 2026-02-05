const express = require("express");
const Restaurant = require("../models/Restaurant");

const router = express.Router();

/**
 * (4) GET /restaurants -> all columns
 * (6) GET /restaurants?sortBy=ASC|DESC
 *     -> only id, cuisines, name, city, restaurant_id (sorted by restaurant_id)
 */
router.get("/restaurants", async (req, res) => {
  try {
    const { sortBy } = req.query;

    // (6)
    if (sortBy) {
      const order = String(sortBy).toUpperCase() === "DESC" ? -1 : 1;

      const data = await Restaurant.find({})
        .select({ _id: 1, cuisine: 1, name: 1, city: 1, restaurant_id: 1 })
        .sort({ restaurant_id: order });

      const formatted = data.map((r) => ({
        id: r._id,
        cuisines: r.cuisine,
        name: r.name,
        city: r.city,
        restaurant_id: r.restaurant_id
      }));

      return res.json(formatted);
    }

    // (4)
    const all = await Restaurant.find({});
    return res.json(all);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/**
 * (5) GET /restaurants/cuisine/:cuisine -> all columns
 */
router.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  try {
    const cuisine = req.params.cuisine;
    const data = await Restaurant.find({ cuisine });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/**
 * (7) GET /restaurants/Delicatessen
 * cuisines=Delicatessen AND city != Brooklyn
 * select cuisines, name, city (exclude id)
 * sort by name ASC
 */
router.get("/restaurants/:cuisine", async (req, res) => {
  try {
    const cuisine = req.params.cuisine;

    const data = await Restaurant.find({
      cuisine,
      city: { $ne: "Brooklyn" }
    })
      .select({ _id: 0, cuisine: 1, name: 1, city: 1 })
      .sort({ name: 1 });

    const formatted = data.map((r) => ({
      cuisines: r.cuisine,
      name: r.name,
      city: r.city
    }));

    return res.json(formatted);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
