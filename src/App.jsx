import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login.jsx";
import StudentDashboard from "./dashboard/StudentDashboard.jsx";
import InstructorDashboard from "./dashboard/InstructorDashboard.jsx";
import AdminDashboard from "./dashboard/AdminDashboard.jsx";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import MyCourses from "./pages/MyCourses.jsx"; // ✅ NEW

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Login */}
          <Route path="/" element={<Login />} />

          {/* Student Dashboard */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Instructor Dashboard */}
          <Route
            path="/instructor/dashboard"
            element={
              <ProtectedRoute role="instructor">
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* All Courses */}
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />

          {/* My Courses (Started Courses) */}
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute role="student">
                <MyCourses />
              </ProtectedRoute>
            }
          />

          {/* Course Detail */}
          <Route
            path="/course/:id"
            element={
              <ProtectedRoute>
                <CourseDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
