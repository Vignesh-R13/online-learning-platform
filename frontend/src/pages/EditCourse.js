import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { updateCourse } from "../services/authService";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: ""
  });

  // FETCH EXISTING COURSE DATA
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/courses/${id}`
        );

        setCourse(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourse();
  }, [id]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value
    });
  };

  // SUBMIT UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCourse(id, course);

      alert("Course updated successfully");

      navigate("/instructor-dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Course</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={course.title || ""}
          onChange={handleChange}
          placeholder="Course Title"
        />

        <br /><br />

        <textarea
          name="description"
          value={course.description || ""}
          onChange={handleChange}
          placeholder="Course Description"
        />

        <br /><br />

        <input
          type="number"
          name="price"
          value={course.price || ""}
          onChange={handleChange}
          placeholder="Price"
        />

        <br /><br />

        <button type="submit">
          Update Course
        </button>
      </form>
    </div>
  );
}

export default EditCourse;