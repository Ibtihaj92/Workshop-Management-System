import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./component/AdminDashboardPage";
import CourseList from "./component/CourseList";
import ViewParticipants from "./component/ViewParticipants";
import Profile from "./component/Profile";
import AddCourse from "./component/AddCourse";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/courses-list" element={<CourseList />} />  {/* Added closing /> */}
        <Route path="/view-participants/:courseId" element={<ViewParticipants />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/*" element={<AdminDashboard />} />

        
      </Routes>
    </Router>
  );
}

export default App;
