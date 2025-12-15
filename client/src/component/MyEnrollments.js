import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyEnrollments.css";

function MyEnrollments() {
  const [enrollments, setEnrollments] = useState([]);

  // Get userId saved during login
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    if (!currentUserId) {
      console.error("User not logged in");
      return;
    }

    axios
      .get(`http://localhost:5000/api/enrollments/my-enrollments/${currentUserId}`)
      .then((res) => setEnrollments(res.data))
      .catch((err) => console.error(err));
  }, [currentUserId]);

  const getStatus = (date) => {
    const today = new Date();
    const workshopDate = new Date(date);


    today.setHours(0, 0, 0, 0);
    workshopDate.setHours(0, 0, 0, 0);

    if (workshopDate.getTime() === today.getTime()) {
      return "ongoing";
    }

    if (workshopDate < today) {
      return "completed";
    }

    return "upcoming";
  };


  return (
    <div className="course-container">
      <h1>My Enrollments</h1>
      <div className="course-list">
        {enrollments.length === 0 && (
          <p style={{ textAlign: "center" }}>No enrollments found.</p>
        )}

        {enrollments.map((item) => (
          <div key={item._id} className="course-card">
            <div className="course-info">

              <span>{item.title}</span>
            </div>
            <div className="course-buttons">
              <p>
                {new Date(item.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              <p className={`status ${getStatus(item.date)}`}>
                {getStatus(item.date).charAt(0).toUpperCase() +
                  getStatus(item.date).slice(1)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyEnrollments;
