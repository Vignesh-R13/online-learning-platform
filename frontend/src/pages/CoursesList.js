import React, { useEffect, useState } from "react";
import { getCourses } from "../services/authService";

function CoursesList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Courses</h1>

      {courses.length === 0 ? (
        <p>No courses found</p>
      ) : (
        courses.map((course) => (
          <div key={course._id} style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>💰 Price: {course.price}</p>
            <p>👨‍🏫 Instructor: {course.instructor?.name || course.instructor}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CoursesList;