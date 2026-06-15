import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getInstructorCourses,
  deleteCourse
} from "../services/authService";

import "../styles/CourseCard.css";

function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getInstructorCourses();
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      fetchCourses();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Instructor Dashboard</h1>

      {courses.length === 0 ? (
        <p>No courses created yet</p>
      ) : (
        <div className="course-grid">

          {courses.map((course) => (
            <div className="course-card" key={course._id}>

              <div className="course-title">
                {course.title}
              </div>

              <div className="course-desc">
                {course.description}
              </div>

              <div className="course-meta">
                👨‍🎓 Students: {course.students?.length || 0}
              </div>

              <div className="course-meta">
                💰 Price: ₹{course.price || "Free"}
              </div>

              <div className="btn-group">
                <button
                  className="btn-edit"
                  onClick={() => navigate(`/edit-course/${course._id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn-delete"
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default InstructorDashboard;