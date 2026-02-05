const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    address: {
      building: String,
      street: String,
      zipcode: String
    },
    city: String,
    cuisine: String,
    name: String,
    restaurant_id: String
  },
  { collection: "Restaurants" }
);

module.exports = mongoose.model("Restaurant", RestaurantSchema , "Restaurants");
