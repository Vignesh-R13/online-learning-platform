const express = require("express");

const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");

const Course = require("../models/course");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

/*
  =========================
  COURSE CRUD ROUTES
  =========================
*/

// CREATE COURSE (ONLY INSTRUCTOR)
router.post(
  "/",
  protect,
  authorizeRoles("instructor"),
  createCourse
);

// GET ALL COURSES (PUBLIC)
router.get("/", getCourses);

// GET MY COURSES (INSTRUCTOR ONLY)
router.get("/my-courses", protect, async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.user.id
    });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET COURSE BY ID (PUBLIC)
router.get("/:id", getCourseById);

/*
  =========================
  COURSE ENROLLMENT
  =========================
*/

// ENROLL COURSE (STUDENT ONLY)
router.post(
  "/:id/enroll",
  protect,
  authorizeRoles("student"),
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      if (!course.students) {
        course.students = [];
      }

      const userId = req.user.id;

      if (course.students.includes(userId)) {
        return res.status(400).json({ message: "Already enrolled" });
      }

      course.students.push(userId);

      await course.save();

      res.json({
        message: "Enrolled successfully",
        course
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/*
  =========================
  UPDATE COURSE
  =========================
*/

router.put(
  "/:id",
  protect,
  authorizeRoles("instructor"),
  updateCourse
);

/*
  =========================
  DELETE COURSE
  =========================
*/

router.delete(
  "/:id",
  protect,
  authorizeRoles("instructor"),
  deleteCourse
);

module.exports = router;