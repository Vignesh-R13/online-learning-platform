import React, { useState } from "react";
import "../styles/CreateCourse.css";
import { createCourse } from "../services/authService";

function CreateCourse() {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: ""
  });

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createCourse({
        title: courseData.title,
        description: courseData.description,
        price: Number(courseData.price)
      });

      alert("Course Created Successfully!");

      console.log("Created Course:", data);

      setCourseData({
        title: "",
        description: "",
        price: ""
      });

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to create course"
      );
    }
  };

  return (
    <div className="create-course">
      <div className="form-container">
        <h1>Create New Course</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={courseData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Course Description"
            value={courseData.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Course Price"
            value={courseData.price}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Create Course
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateCourse;