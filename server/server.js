const express = require("express");
const app = express();
const cors = require('cors')
const { connectDB, sequelize } = require("./config/db");
const employeeRoutes = require("./routes/employee_route");

const path = require("path");
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/employees", employeeRoutes);

// Connect Database & Sync Models
connectDB();
sequelize.sync().then(() => {
    console.log("✅ All models synced");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});