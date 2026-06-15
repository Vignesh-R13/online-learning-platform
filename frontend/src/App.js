import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import CoursesList from "./pages/CoursesList";
import CourseDetails from "./pages/CourseDetails";
import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";
import MyCourses from "./pages/MyCourses";
import CoursePlayer from "./pages/CoursePlayer";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const location = useLocation();

  const authPages = ["/login", "/register"];
  const hideLayout = authPages.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/student-dashboard" element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        } />

        <Route path="/instructor-dashboard" element={
          <ProtectedRoute>
            <InstructorDashboard />
          </ProtectedRoute>
        } />

        <Route path="/courses" element={
          <ProtectedRoute>
            <CoursesList />
          </ProtectedRoute>
        } />

        <Route path="/course/:id" element={
          <ProtectedRoute>
            <CoursePlayer />
          </ProtectedRoute> 
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/create-course" element={
          <ProtectedRoute>
            <CreateCourse />
          </ProtectedRoute>
        } />

        <Route path="/edit-course/:id" element={
          <ProtectedRoute>
            <EditCourse />
          </ProtectedRoute>
        } />

        <Route path="/my-courses" element={
          <ProtectedRoute>
            <MyCourses />
          </ProtectedRoute>
        } />

        <Route path="/course/:id" element={<CoursePlayer />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/course-details/:id" element={<CourseDetails />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;