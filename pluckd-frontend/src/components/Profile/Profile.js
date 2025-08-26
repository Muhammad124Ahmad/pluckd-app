import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { urlConfig } from "../../config";
import { useAppContext } from "../../context/AuthContext";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const { setUserName } = useAppContext();
  const [changed, setChanged] = useState("");

  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/app/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");
      const name = sessionStorage.getItem("name");
      if (name || authtoken) {
        const storedUserDetails = {
          name: name,
          email: email,
        };

        setUserDetails(storedUserDetails);
        setUpdatedDetails(storedUserDetails);
      }
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken || !email) {
        navigate("/app/login");
        return;
      }

      const payload = { ...updatedDetails };
      const response = await fetch(`${urlConfig.backendUrl}/api/auth/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          email: email,
        },
        body: JSON.stringify(payload), //Step 1: Task 3
      });

      if (response.ok) {
        // Update the user details in session storage
        setUserName(updatedDetails.name); //Step 1: Task 4
        sessionStorage.setItem("name", updatedDetails.name); //Step 1: Task 5
        setUserDetails(updatedDetails);
        setEditMode(false);
        // Display success message to the user
        setChanged("Name Changed Successfully!");
        setTimeout(() => {
          setChanged("");
          navigate("/");
        }, 1000);
      } else {
        // Handle error case
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  return (
    <div className="pluckd-profile-page">
      {/* Decorative floral elements */}
      <svg className="floral-accent floral-top-left" width="120" height="120" viewBox="0 0 120 120" fill="none">
        <path d="M60 20C65 25 70 35 65 45C70 50 75 55 70 65C65 70 55 65 50 60C45 65 35 70 25 65C20 60 25 50 30 45C25 40 20 30 25 20C30 15 40 20 45 25C50 20 60 15 60 20Z" fill="currentColor" opacity="0.6"/>
        <circle cx="60" cy="60" r="3" fill="currentColor" opacity="0.8"/>
      </svg>

      <svg className="floral-accent floral-bottom-right" width="100" height="100" viewBox="0 0 100 100" fill="none">
        <path d="M50 10C55 15 60 25 55 35C60 40 65 45 60 55C55 60 45 55 40 50C35 55 25 60 15 55C10 50 15 40 20 35C15 30 10 20 15 10C20 5 30 10 35 15C40 10 50 5 50 10Z" fill="currentColor" opacity="0.5"/>
      </svg>

      <svg className="floral-accent floral-mid-left" width="85" height="85" viewBox="0 0 85 85" fill="none">
        <path d="M42 6C45 10 48 16 45 22C48 25 51 28 48 34C45 37 38 34 35 31C32 34 25 37 18 34C15 31 18 25 21 22C18 19 15 13 18 6C21 3 27 6 30 9C35 6 42 3 42 6Z" fill="currentColor" opacity="0.4"/>
      </svg>

      {/* Decorative dots */}
      <div className="decorative-dots dot-1"></div>
      <div className="decorative-dots dot-2"></div>
      <div className="decorative-dots dot-3"></div>

      <div className="pluckd-profile-container">
        {editMode ? (
          <div className="pluckd-profile-card">
            <div className="pluckd-card-header">
              <h2 className="pluckd-profile-title">Edit Profile</h2>
              <p className="pluckd-profile-subtitle">Update your personal information</p>
            </div>
            
            <form className="pluckd-profile-form" onSubmit={handleSubmit}>
              <div className="pluckd-form-group">
                <label className="pluckd-form-label">
                  Email Address
                  <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    disabled
                    className="pluckd-form-input pluckd-input-disabled"
                  />
                </label>
                <span className="pluckd-input-help">Email cannot be changed</span>
              </div>

              <div className="pluckd-form-group">
                <label className="pluckd-form-label">
                  Full Name
                  <input
                    type="text"
                    name="name"
                    value={updatedDetails.name}
                    onChange={handleInputChange}
                    className="pluckd-form-input"
                    placeholder="Enter your full name"
                  />
                </label>
              </div>

              <div className="pluckd-form-actions">
                <button 
                  type="button" 
                  className="pluckd-btn-secondary"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="pluckd-btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="pluckd-profile-card">
            <div className="pluckd-card-header">
              <div className="pluckd-profile-avatar">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="40" fill="var(--pistachio)" opacity="0.2"/>
                  <circle cx="40" cy="32" r="12" fill="var(--dark-green)"/>
                  <path d="M20 65C20 52 28 45 40 45C52 45 60 52 60 65" stroke="var(--dark-green)" strokeWidth="3" fill="none"/>
                </svg>
              </div>
              <h1 className="pluckd-welcome-title">Hi, {userDetails.name}</h1>
              <p className="pluckd-profile-subtitle">Welcome to your PluckD profile</p>
            </div>

            <div className="pluckd-profile-details">
              <div className="pluckd-detail-item">
                <span className="pluckd-detail-label">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 4L10 11L17 4H3Z" fill="var(--dark-green)"/>
                    <path d="M3 4V16H17V4" stroke="var(--dark-green)" strokeWidth="2" fill="none"/>
                  </svg>
                  Email Address
                </span>
                <span className="pluckd-detail-value">{userDetails.email}</span>
              </div>

              <div className="pluckd-detail-item">
                <span className="pluckd-detail-label">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="7" r="3" stroke="var(--dark-green)" strokeWidth="2" fill="none"/>
                    <path d="M4 18C4 14 6.5 12 10 12C13.5 12 16 14 16 18" stroke="var(--dark-green)" strokeWidth="2" fill="none"/>
                  </svg>
                  Full Name
                </span>
                <span className="pluckd-detail-value">{userDetails.name}</span>
              </div>
            </div>

            {changed && (
              <div className="pluckd-success-message">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" fill="#28a745"/>
                  <path d="M6 10L8.5 12.5L14 7" stroke="white" strokeWidth="2" fill="none"/>
                </svg>
                {changed}
              </div>
            )}

            <div className="pluckd-profile-actions">
              <button className="pluckd-btn-secondary" onClick={handleEdit}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 14L1 15L2 14ZM11.5 3.5L12.5 2.5L11.5 3.5ZM14.5 6.5L13.5 7.5L14.5 6.5ZM1 15L2 14L1 15ZM2 14L11.5 4.5L12.5 5.5L3 15L1 15L2 14ZM11.5 4.5L13.5 6.5L14.5 5.5L12.5 3.5L11.5 4.5Z" fill="currentColor"/>
                </svg>
                Edit Profile
              </button>
              
              <button 
                className="pluckd-btn-primary" 
                onClick={() => navigate('/app/addGift')}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Add New Gift
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;