
const Employee = require('../models/employee_model')
const path = require("path");
const fs = require("fs");

// Add Employee
exports.addEmployee = async (req, res) => {
    try {
        const { employee_id, employee_name, department, project, designation, type, status } = req.body;
        const image = req.file ? req.file.filename : null;

        const employee = await Employee.create({
            employee_id,
            employee_name,
            department,
            project,
            designation,
            type,
            status,
            image
        });
        console.log(employee)
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Employee By ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        const {employee_id, employee_name, department, project, designation, type, status } = req.body;

        // Delete old image if new uploaded
        if (req.file && employee.image) {
            const oldImagePath = path.join(__dirname, "../uploads", employee.image);
            if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }

        const updatedEmployee = await employee.update({
            employee_id: employee_id || employee.employee_id,
            employee_name: employee_name || employee.employee_name,
            department: department || employee.department,
            project: project || employee.project,
            designation: designation || employee.designation,
            type: type || employee.type,
            status: status || employee.status,
            image: req.file ? req.file.filename : employee.image
        });

        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        // Delete image from uploads folder
        if (employee.image) {
            const imagePath = path.join(__dirname, "../uploads", employee.image);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await employee.destroy();
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};