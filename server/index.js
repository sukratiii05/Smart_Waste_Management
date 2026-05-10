require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const binRoutes = require("./routes/binRoutes");
const wasteRoutes = require("./routes/wasteRoutes");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Smart Waste Management API is working 🚀");
});
app.use("/waste", wasteRoutes);
app.use("/bins", binRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB error:", err);
  });