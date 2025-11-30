import React from "react";
import { useNavigate } from "react-router-dom";
import "./CourseList.css";

const courses = [
  {
    id: 1,
    title: "Makeup Basics",
    image: "https://cdn-icons-png.flaticon.com/512/3163/3163203.png",
  },
  {
    id: 2,
    title: "Photography Essentials",
    image: "https://cdn-icons-png.flaticon.com/512/1314/1314521.png",
  },
  {
    id: 3,
    title: "Cooking for Beginners",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
  },
];

export default function CourseList() {
  const navigate = useNavigate();

  return (
    <div className="course-container">
      {/* Header */}
      <div className="header">
        <h1>Course List</h1>
        <div className="logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="logo"
          />
          <p>Workshop<br />Management<br />System</p>
        </div>
      </div>

      {/* Course cards */}
      <div className="course-list">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-info">
              <img src={course.image} alt={course.title} />
              <span>{course.title}</span>
            </div>
            <div className="course-buttons">
              {/* Navigate to ViewParticipants.js on click */}
              <button
                className="view-btn"
                onClick={() => navigate(`/view-participants/${course.id}`)}
              >
                View
              </button>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
