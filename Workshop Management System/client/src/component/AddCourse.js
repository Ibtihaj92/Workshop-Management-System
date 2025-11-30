import React, { useState } from "react";
import "./AddCourse.css";

function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [courseType, setCourseType] = useState("Online");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ courseName, date, time, courseType, description, image });
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="add-course-container">
      <div className="add-course-card">
        <div className="header">
          <h2>Add New Course</h2>
          <img
            src="/logo.png" // Replace with your logo path
            alt="Logo"
            className="logo"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="image-upload">
            <label htmlFor="file-input">
              {image ? (
                <img src={image} alt="Course" className="preview-image" />
              ) : (
                <div className="upload-placeholder">📷 Upload Image</div>
              )}
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />

          <div className="row">
            <input
              type="date"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <input
              type="time"
              placeholder="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
            <select
              value={courseType}
              onChange={(e) => setCourseType(e.target.value)}
            >
              <option value="Online">Online</option>
              <option value="In-Person">In-Person</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
