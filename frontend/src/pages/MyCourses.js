import React, { useEffect, useState } from "react";
import { getMyCourses } from "../services/authService";

function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const data = await getMyCourses();
      setCourses(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 My Courses</h1>

      {courses.length === 0 ? (
        <p>You have not purchased any courses yet.</p>
      ) : (
        courses.map((course) => (
          <div
            key={course._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "15px",
              borderRadius: "8px"
            }}
          >
            <h2>{course.title}</h2>
            <p>{course.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyCourses;