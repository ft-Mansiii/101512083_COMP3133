require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Lab04 running. POST /users"));
app.use("/", userRoutes);

const PORT = process.env.PORT || 8081;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected:", mongoose.connection.name);
    app.listen(PORT, () => console.log(`✅ Server running: http://localhost:${PORT}`));
  })
  .catch((err) => console.log("❌ MongoDB error:", err.message));
