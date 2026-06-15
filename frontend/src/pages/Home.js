import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <h1>Learn Without Limits</h1>

        <p>
          Access top-quality courses, track your progress,
          and achieve your career goals with our Online
          Learning Platform.
        </p>

        {/*  FIXED: Added the real database course ID to the path */}
        <Link to="/course-details/6a213cb15a36fbffee1d2eb2">
          <button>View Details</button>
        </Link>
      </section>

      {/* Features */}
      <section className="features">

        <div className="card">
          <h3>📚 Expert Courses</h3>
          <p>
            Learn from industry professionals and experts.
          </p>
        </div>

        <div className="card">
          <h3>🎯 Progress Tracking</h3>
          <p>
            Monitor your learning journey and achievements.
          </p>
        </div>

        <div className="card">
          <h3>💻 Live Classes</h3>
          <p>
            Attend interactive sessions with instructors.
          </p>
        </div>

        <div className="card">
          <h3>🏆 Certificates</h3>
          <p>
            Earn certificates after course completion.
          </p>
        </div>

      </section>

      {/* Statistics */}
      <section className="stats-section">

        <div className="stat-box">
          <h2>10,000+</h2>
          <p>Students</p>
        </div>

        <div className="stat-box">
          <h2>500+</h2>
          <p>Courses</p>
        </div>

        <div className="stat-box">
          <h2>100+</h2>
          <p>Instructors</p>
        </div>

        <div className="stat-box">
          <h2>95%</h2>
          <p>Success Rate</p>
        </div>

      </section>

      {/* Featured Courses */}
      <section className="featured-courses">

        <h2>Featured Courses</h2>

        <div className="course-grid">

          <div className="course-card">
            <h3>MERN Stack Development</h3>
            <p>₹499</p>
            <button>Enroll Now</button>
          </div>

          <div className="course-card">
            <h3>Python Programming</h3>
            <p>₹399</p>
            <button>Enroll Now</button>
          </div>

          <div className="course-card">
            <h3>Java Development</h3>
            <p>₹599</p>
            <button>Enroll Now</button>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;