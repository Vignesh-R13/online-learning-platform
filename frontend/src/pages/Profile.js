import "../styles/Profile.css";

function Profile() {
  return (
    <div className="profile-page">

      <h1 className="profile-title">👤 My Profile</h1>

      <div className="profile-container">

        {/* LEFT CARD */}
        <div className="profile-card">

          <div className="avatar">
            👨‍💻
          </div>

          <h2>Vignesh Ravi</h2>
          <p className="role">Full Stack Developer Student</p>

            <button className="edit-btn">
              Edit Profile
            </button>
        </div>

        {/* RIGHT DETAILS */}
        <div className="profile-details">

          <div className="info-box">
             <h3>📧 Email</h3>
             <p>vignesh.ravi@email.com</p>
          </div>

          <div className="info-box">
             <h3>📚 Enrolled Courses</h3>
             <p>3 Active Courses</p>
          </div>

          <div className="info-box">
             <h3>📈 Overall Progress</h3>
             <p>72%</p>
          </div>

          <div className="info-box">
             <h3>🏆 Certificates</h3>
             <p>2 Earned</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;