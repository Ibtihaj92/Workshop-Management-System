import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ViewParticipants.css";
import logo from "../logo.png"; 

function ViewParticipants() {
  const { courseId } = useParams(); // course ID from URL
  const [participants, setParticipants] = useState([]);
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        // 1️⃣ Get course title
        const courseRes = await axios.get(`http://localhost:5000/workshops/${courseId}`);
        setCourseName(courseRes.data.title);

        // 2️⃣ Get all enrollments for this course
        const enrollmentRes = await axios.get(`http://localhost:5000/api/enrollments/course/${courseId}`);
        const enrollments = enrollmentRes.data;

        // 3️⃣ Map enrollments to participant data with userName
        const participantList = await Promise.all(
          enrollments.map(async (enroll) => {
            const userRes = await axios.get(`http://localhost:5000/users/${enroll.userId}`);
            return {
              id: enroll._id,
              name: userRes.data.userName,
              attended: enroll.attended || false,
            };
          })
        );

        setParticipants(participantList);
      } catch (err) {
        console.error("Error fetching participants:", err);
      }
    };

    fetchParticipants();
  }, [courseId]);

  const handleAttendanceChange = async (id) => {
    const updated = participants.map((p) =>
      p.id === id ? { ...p, attended: !p.attended } : p
    );
    setParticipants(updated);

    try {
      const participant = updated.find((p) => p.id === id);
      await axios.put(`http://localhost:5000/api/enrollments/${id}`, {
        attended: participant.attended,
      });
    } catch (err) {
      console.error("Error updating attendance:", err);
    }
  };

  return (
    <div className="participants-container">
      <div className="header">
        <h1>Participants for {courseName}</h1>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
      </div>

      {participants.length === 0 ? (
        <p style={{ textAlign: "center" }}>No participants yet.</p>
      ) : (
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
              <td colSpan="3">
                Total Attended: {participants.filter((p) => p.attended).length}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      <button className="save-btn" onClick={() => alert("Attendance saved!")}>
        Save
      </button>
    </div>
  );
}

export default ViewParticipants;
