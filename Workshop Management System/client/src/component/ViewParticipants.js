import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewParticipants.css";

function ViewParticipants() {
  const { courseId } = useParams(); // Get courseId from URL

  // Map courseId to course name
  const courseNames = {
    1: "Makeup Basics",
    2: "Photography Essentials",
    3: "Cooking for Beginners",
  };

  const courseName = courseNames[courseId] || "Course";

  const [participants, setParticipants] = useState([
    { id: 1, name: "Aisha Al-Mahri", attended: false },
    { id: 2, name: "Sara Al-Balushi", attended: true },
    { id: 3, name: "Hanan Al-Harthy", attended: true },
    { id: 4, name: "Amal Al-Azri", attended: false },
    { id: 5, name: "Reem Al-Farsi", attended: true },
  ]);

  const handleAttendanceChange = (id) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, attended: !p.attended } : p))
    );
  };

  const totalAttended = participants.filter((p) => p.attended).length;

  return (
    <div className="participants-container">
      <div className="header">
        <h1>View Participants for {courseName}</h1>
        <div className="logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="logo"
          />
          <p>
            Workshop
            <br />
            Management
            <br />
            System
          </p>
        </div>
      </div>

      <p className="total">Total Participants: {participants.length}</p>

      <table className="participants-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Participant Name</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p, index) => (
            <tr key={p.id}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={p.attended}
                  onChange={() => handleAttendanceChange(p.id)}
                />
              </td>
            </tr>
          ))}
          <tr className="total-row">
            <td colSpan="3">Total Attended: {totalAttended}</td>
          </tr>
        </tbody>
      </table>

      <button className="save-btn">Save</button>
    </div>
  );
}

export default ViewParticipants;
