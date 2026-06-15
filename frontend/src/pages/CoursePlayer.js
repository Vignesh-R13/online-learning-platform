import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function CoursePlayer() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const storageKey = `course-progress-${id}`;

  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  const progress =
  course
    ? (completedLessons.length / course.lessons.length) * 100
    : 0;

useEffect(() => {
  const data = {
    id,
    title: "Python Programming",
    lessons: [
      { id: 1, title: "Intro" },
      { id: 2, title: "Variables" },
      { id: 3, title: "Loops" }
    ]
  };

  setCourse(data);
  setCurrentLesson(data.lessons[0]);

  // 🔥 LOAD SAVED DATA
  const saved = localStorage.getItem(`course-progress-${id}`);

  if (saved) {
    const parsed = JSON.parse(saved);

    setCompletedLessons(parsed.completedLessons || []);

    const last = data.lessons.find(
      (l) => l.id === parsed.lastLesson
    );

    if (last) setCurrentLesson(last);
  }
}, [id]);
  if (!course) return <h2>Loading...</h2>;

  return (
    <div style={{ display: "flex", gap: "20px" }}>

      <div style={{ flex: 2 }}>
        <h2>{course.title}</h2>

        <h4>Progress: {progress.toFixed(0)}%</h4>

        <div style={{ height: "300px", background: "#907171", color: "#fff" }}>
          🎥 Playing: {currentLesson?.title}
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h3>Lessons</h3>

        {course.lessons.map((lesson) => (
          <p
            key={lesson.id}
            onClick={() => setCurrentLesson(lesson)}
            style={{ cursor: "pointer" }}
          >
            ▶ {lesson.title}
          </p>
        ))}

        <button
          onClick={() => {
            if (!completedLessons.includes(currentLesson.id)) {
              setCompletedLessons([...completedLessons, currentLesson.id]);
            }
          }}
        >
         ✔ Mark as Complete
        </button>

      </div>

    </div>
  );
}

export default CoursePlayer;