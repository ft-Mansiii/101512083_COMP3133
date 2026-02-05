require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const restaurantRoutes = require("./routes/restaurantRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", restaurantRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");

    // ✅ SHOW WHICH DB YOU ARE CONNECTED TO
    console.log("✅ Connected DB name:", mongoose.connection.name);

    // ✅ LIST COLLECTIONS IN THAT DB
    const cols = await mongoose.connection.db.listCollections().toArray();
    console.log("✅ Collections in DB:", cols.map(c => c.name));

    app.listen(PORT, () => console.log(`✅ Server running: http://localhost:${PORT}`));
  })
  .catch((err) => console.log("❌ MongoDB error:", err.message));

