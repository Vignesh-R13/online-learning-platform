import { useEffect, useState } from "react";
import { getCourses } from "../services/authService";
import "../styles/Courses.css";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="courses-page">
      <h1>Available Courses</h1>

      <div className="course-grid">
        {courses.length === 0 ? (
          <h3>No courses available</h3>
        ) : (
          courses.map((course) => (
            <div className="course-card" key={course._id}>
              <img
                src="https://picsum.photos/300/200"
                alt={course.title}
              />

              <h2>{course.title}</h2>

              <p>{course.description}</p>

              <p>
                <strong>Price:</strong> ₹{course.price}
              </p>

              <p>
                <strong>Instructor:</strong>{" "}
                {course.instructor?.name || "Unknown"}
              </p>

              <Link to={`/course-details/${course._id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Courses;