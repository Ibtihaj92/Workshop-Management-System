import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import "./adminDashboard.css";
import AddCourse from "./AddCourse";

// Reusable Card component
function Card({ iconClass, title, value, onClick }) {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="card-icon">
        <i className={iconClass}></i>
      </div>
      <div className="card-info">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}

// Latest Course Card
function LatestCourse({ course }) {
  return (
    <div className="latest-course">
      <div className="card-icon">
        <i className="fa-solid fa-clock"></i>
      </div>
      <div className="card-info">
        <h3>Latest Course Added</h3>
        <p style={{ whiteSpace: "pre-line" }}>{course}</p>
      </div>
    </div>
  );
}

// Sidebar component
function Sidebar({ active, setActive }) {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Add New Course", icon: "fa-solid fa-plus", path: "/admin/add-course" },
    { name: "Courses List", icon: "fa-solid fa-list", path: "/admin/courses-list" },
    { name: "Profile", icon: "fa-solid fa-user", path: "/admin/profile" },
  ];

  return (
    <div className="sidebar">
      {/* PROFILE ICON CLICKABLE */}
      <div
        className="profile-icon"
        onClick={() => {
          setActive("Profile");
          navigate("/admin/profile");
        }}
        style={{ cursor: "pointer" }}
      >
        <i className="fa-solid fa-user fa-2x"></i>
      </div>

      <ul className="menu">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={active === item.name ? "active" : ""}
            onClick={() => {
              setActive(item.name);
              navigate(item.path);
            }}
          >
            <i className={item.icon} style={{ marginRight: "10px" }}></i>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Main Dashboard component
function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("Add New Course");

  return (
    <div className="admin-dashboard">
      <Sidebar active={activeMenu} setActive={setActiveMenu} />

      <div className="dashboard">
        <h1>Admin Dashboard</h1>

        <div className="dashboard-body">
          <Routes>
            <Route path="add-course" element={<AddCourse />} />
            {/* Add other routes here */}
            <Route
              path=""
              element={
                <div>
                  {/* Stats cards row */}
                  <div className="stats">
                    <Card iconClass="fa-solid fa-book" title="Current Courses" value={5} />
                    <Card
                      iconClass="fa-solid fa-graduation-cap"
                      title="Total Courses"
                      value={20}
                    />
                  </div>

                  {/* Latest course below stats */}
                  <LatestCourse course="React for Beginners" />
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
