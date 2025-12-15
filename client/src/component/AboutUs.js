import React from "react";
import "./AboutUs.css"; 
import logo from "../logo.png";
function AboutUs() {
  return (
    <div className="aboutus-container">
      <div className="header">
        <h1>About Us</h1>
      </div>

      <div className="aboutus-content">
        <img src={logo} alt="Logo" style={{ width: "120px" }} />

        <p>
          Welcome to our Workshop Management System! <br /><br />
          This platform allows users to easily browse,and register to any Workshops. 
          Admins can efficiently manage users, workshops, and other resources. <br /><br />
          Our goal is to provide a seamless experience for both learners and organizers, 
          ensuring everyone can focus on learning and improving their skills.
        </p>

        <h3>Our Mission</h3>
        <p>
          To make workshop management easy, transparent, and accessible for everyone.
        </p>

        <h3>Contact Us</h3>
        <p>Email: support@workshopsystem.com</p>
        <p>Phone: +968 1234 5678</p>
      </div>
    </div>
  );
}

export default AboutUs;
