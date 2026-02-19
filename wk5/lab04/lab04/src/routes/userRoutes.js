const express = require("express");
const User = require("../models/User");

const router = express.Router();

// POST http://localhost:8081/users
router.post("/users", async (req, res) => {
  try {
    const created = await User.create(req.body);
    return res.status(201).json({ message: "User created", data: created });
  } catch (err) {
    // validation errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }

    // duplicate email
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: ["email must be unique (duplicate email found)"] });
    }

    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
