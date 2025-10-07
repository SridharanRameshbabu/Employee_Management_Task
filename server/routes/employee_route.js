const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const employeeController = require("../controllers/employee_controller")

// Multer config for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1634234234.png
    }
});

const upload = multer({ storage });

// Routes
router.post("/add", upload.single("image"), employeeController.addEmployee);
router.get("/", employeeController.getEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.put("/update/:id", upload.single("image"), employeeController.updateEmployee);
router.delete("/delete/:id", employeeController.deleteEmployee);

module.exports = router;