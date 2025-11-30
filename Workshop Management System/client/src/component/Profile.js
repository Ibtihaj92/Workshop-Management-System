import React from "react";
import "./Profile.css";

function Profile() {
  const user = {
    name: "Ebtehag Al-Shuaibi",
    phone: "+968 94702517",
    Address: "Muscat",
    Password: "*********",
    profileImage: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  };

  return (
    <div className="profile-container">
      <div className="header">
        <h1>Profile</h1>
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

      {/* Profile Image */}
      <div className="profile-image-top">
        <img src={user.profileImage} alt="User Profile" />
      </div>

      {/* User Details Table */}
      <table className="profile-table">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{user.name}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{user.Address}</td>
          </tr>
          <tr>
            <th>Password</th>
            <td>{user.Password}</td>
          </tr>
        </tbody>
      </table>

      {/* Buttons */}
      <div className="button-group">
        <button className="edit-btn">Edit Profile</button>
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Profile;
