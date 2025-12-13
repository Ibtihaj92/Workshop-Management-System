import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // لتخزين بيانات المستخدم
  const [editMode, setEditMode] = useState(false);

  // جلب بيانات المستخدم من backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return navigate("/");

        const res = await axios.get(`http://localhost:5000/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const saveChanges = async () => {
    try {
      await axios.put(`http://localhost:5000/users/${user._id}`, user);
      alert("Profile updated!");
      setEditMode(false);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="profile-container">
      <div className="header">
        <h1>Profile</h1>
      </div>

      {/* Profile Image */}
      <div className="profile-image-top">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          alt="User Profile"
        />
      </div>

      {/* Editable / View Table */}
      <table className="profile-table">
        <tbody>
          <tr>
            <th>Name</th>
            <td>
              {editMode ? (
                <input
                  name="userName"
                  value={user.userName || ""}
                  onChange={handleChange}
                />
              ) : (
                user.userName
              )}
            </td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>
              {editMode ? (
                <input
                  name="userPhone"
                  value={user.userPhone || ""}
                  onChange={handleChange}
                />
              ) : (
                user.userPhone
              )}
            </td>
          </tr>
          <tr>
            <th>Address</th>
            <td>
              {editMode ? (
                <input
                  name="userAddress"
                  value={user.userAddress || ""}
                  onChange={handleChange}
                />
              ) : (
                user.userAddress
              )}
            </td>
          </tr>
          <tr>
            <th>Password</th>
            <td>
              {editMode ? (
                <input
                  name="userPassword"
                  type="password"
                  value={user.userPassword || ""}
                  onChange={handleChange}
                />
              ) : (
                "********"
              )}
            </td>
          </tr>
          {user.role === "admin" && (
            <tr>
              <th>Admin Panel</th>
              <td>Access to manage workshops, users, etc.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Buttons */}
      <div className="button-group">
        {!editMode ? (
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        ) : (
          <button className="save-btn" onClick={saveChanges}>
            Save
          </button>
        )}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
