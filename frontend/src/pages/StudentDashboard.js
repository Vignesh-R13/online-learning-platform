import "../styles/StudentDashboard.css";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  // ✅ READ PROGRESS FROM COURSEPLAYER (LOCALSTORAGE)
  const getProgress = (courseId, totalLessons) => {
    const saved = localStorage.getItem(`course-progress-${courseId}`);

    if (!saved) return 0;

    const data = JSON.parse(saved);

    return (data.completedLessons.length / totalLessons) * 100;
  };
  
  const handleLogout = () => {
  // clear auth data
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // optional: clear progress too (ONLY if you want full reset)
  // localStorage.clear();

  // redirect to login
  navigate("/login");
  };
  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>LearnHub</h2>

        <ul>
          <li>📊 Dashboard</li>
          <li>📚 My Courses</li>
          <li>📈 Progress</li>
          <li onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
             👤 Profile
          </li>
          <li onClick={handleLogout} style={{ cursor: "pointer", color: "red" }}>
             🚪 Logout
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="content">

        <h1>Student Dashboard</h1>
        <p>Welcome back! Continue your learning journey.</p>

        {/* STATS */}
        <div className="stats">

          <div className="stat-card">
            <h2>5</h2>
            <p>Enrolled Courses</p>
          </div>

          <div className="stat-card">
            <h2>80%</h2>
            <p>Overall Progress</p>
          </div>

          <div className="stat-card">
            <h2>2</h2>
            <p>Certificates Earned</p>
          </div>

        </div>

        <h2>My Courses</h2>

        {/* COURSE 1 */}
        <div className="course-card">
          <h3>MERN Stack Development</h3>

          <p>
            Progress: {getProgress(1, 10).toFixed(0)}%
          </p>

          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${getProgress(1, 10)}%` }}
            ></div>
          </div>

          <button onClick={() => navigate("/course/1")}>
            Continue Learning
          </button>
        </div>

        {/* COURSE 2 */}
        <div className="course-card">
          <h3>Python Programming</h3>

          <p>
            Progress: {getProgress(2, 10).toFixed(0)}%
          </p>

          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${getProgress(2, 10)}%` }}
            ></div>
          </div>

          <button onClick={() => navigate("/course/2")}>
            Continue Learning
          </button>
        </div>

        {/* COURSE 3 */}
        <div className="course-card">
          <h3>Java Development</h3>

          <p>
            Progress: {getProgress(3, 10).toFixed(0)}%
          </p>

          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${getProgress(3, 10)}%` }}
            ></div>
          </div>

          <button onClick={() => navigate("/course/3")}>
            Continue Learning
          </button>
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;