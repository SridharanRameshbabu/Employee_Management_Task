import React from "react";
import { FaUsers, FaCalendarAlt, FaEnvelope } from "react-icons/fa";

const Dashboard = ({ onNavigate }) => {
  return (
    <div className="container mt-4 dashboard">
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm text-center p-4 dashboard-card" onClick={() => onNavigate("employee")}>
            <FaUsers size={40} className="text-primary mb-2" />
            <h5>Employee</h5>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm text-center p-4 dashboard-card">
            <FaCalendarAlt size={40} className="text-success mb-2" />
            <h5>Calendar</h5>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm text-center p-4 dashboard-card">
            <FaEnvelope size={40} className="text-warning mb-2" />
            <h5>Messages</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;