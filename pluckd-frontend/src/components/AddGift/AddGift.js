import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { urlConfig } from "../../config";
import { useAppContext } from "../../context/AuthContext";
import "./AddGift.css";

function AddGift() {
  // Check if user is authenticated on component mount
  useEffect(() => {
    const authenticationToken = sessionStorage.getItem("auth-token");
    if (!authenticationToken) {
      return navigate("/app/login");
    }
  });

  // Form state management
  const [category, setCategory] = useState("Office");
  const [condition, setCondition] = useState("New");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { userName } = useAppContext();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  // Handle form submission and gift creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare form data for multipart upload (includes image file)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("age", age);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("userName", userName);

    const url = `${urlConfig.backendUrl}/api/gifts/`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setIsSubmitting(false);
        return console.log("request Failed --adding gift");
      }

      // Redirect to main page after successful submission
      return navigate("/app");
    } catch (error) {
      setIsSubmitting(false);
      throw new Error("Something Went Wrong");
    }
  };

  return (
    <div className="pluckd-addgift-page">
      {/* Background decorative floral elements for visual appeal */}
      <svg
        className="floral-accent floral-top-right"
        width="90"
        height="90"
        viewBox="0 0 90 90"
        fill="none"
      >
        <path
          d="M45 8C48 12 52 18 48 25C52 28 55 32 52 38C48 42 40 38 36 35C32 38 25 42 18 38C15 35 18 28 22 25C18 22 15 15 18 8C22 5 28 8 32 12C36 8 45 5 45 8Z"
          fill="currentColor"
          opacity="0.5"
        />
      </svg>

      <svg
        className="floral-accent floral-bottom-left"
        width="110"
        height="110"
        viewBox="0 0 110 110"
        fill="none"
      >
        <path
          d="M55 12C60 17 65 27 60 37C65 42 70 47 65 57C60 62 50 57 45 52C40 57 30 62 20 57C15 52 20 42 25 37C20 32 15 22 20 12C25 7 35 12 40 17C45 12 55 7 55 12Z"
          fill="currentColor"
          opacity="0.6"
        />
      </svg>

      <svg
        className="floral-accent floral-mid-left"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
      >
        <path
          d="M40 5C42 10 45 15 42 22C45 25 48 28 45 35C42 38 35 35 32 32C29 35 22 38 15 35C12 32 15 25 18 22C15 19 12 12 15 5C18 2 25 5 28 8C32 5 40 2 40 5Z"
          fill="currentColor"
          opacity="0.4"
        />
      </svg>

      {/* Small decorative dots for added visual interest */}
      <div className="decorative-dots dot-1"></div>
      <div className="decorative-dots dot-2"></div>
      <div className="decorative-dots dot-3"></div>

      <div className="pluckd-addgift-container">
        {/* Back navigation button */}
        <button className="pluckd-btn-back" onClick={handleBackClick}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 14L2 8L8 2L9.4 3.4L5.8 7H14V9H5.8L9.4 12.6L8 14Z"
              fill="currentColor"
            />
          </svg>
          Back
        </button>

        <div className="pluckd-addgift-card">
          {/* Form header with title and subtitle */}
          <div className="pluckd-card-header">
            <h1 className="pluckd-addgift-title">Share a New Gift</h1>
            <p className="pluckd-addgift-subtitle">
              Add something wonderful for others to discover and love
            </p>
          </div>

          <form className="pluckd-addgift-form" onSubmit={handleSubmit}>
            {/* Gift name field */}
            <div className="pluckd-form-group">
              <label htmlFor="name" className="pluckd-form-label">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M3 3H17V17H3V3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M7 7H13M7 10H13M7 13H10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                Gift Name
              </label>
              <textarea
                id="name"
                name="name"
                rows="3"
                className="pluckd-form-textarea"
                placeholder="What would you like to call this gift?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Category and condition fields in a row */}
            <div className="pluckd-form-row">
              <div className="pluckd-form-group">
                <label htmlFor="category" className="pluckd-form-label">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 4H8V8H4V4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M12 4H16V8H12V4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M4 12H8V16H4V12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M12 12H16V16H12V12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="pluckd-form-select"
                  defaultValue={"Office"}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="Bedroom">Bedroom</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Office">Office</option>
                  <option value="Outdoor">Outdoor</option>
                </select>
              </div>

              <div className="pluckd-form-group">
                <label htmlFor="condition" className="pluckd-form-label">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle
                      cx="10"
                      cy="10"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M6 10L8.5 12.5L14 7"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Condition
                </label>
                <select
                  id="condition"
                  name="condition"
                  className="pluckd-form-select"
                  defaultValue={"New"}
                  onChange={(e) => setCondition(e.target.value)}
                  required
                >
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Older">Older</option>
                </select>
              </div>
            </div>

            {/* Age input field */}
            <div className="pluckd-form-group">
              <label htmlFor="age_years" className="pluckd-form-label">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M10 4V10L14 14"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Age (Years)
              </label>
              <input
                type="number"
                id="age_years"
                name="age_years"
                min="0"
                step="0.01"
                className="pluckd-form-input"
                placeholder="How old is this item?"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            {/* Description textarea */}
            <div className="pluckd-form-group">
              <label htmlFor="description" className="pluckd-form-label">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M3 3H17V17H3V3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M6 7H14M6 10H14M6 13H11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="pluckd-form-textarea"
                placeholder="Tell us about this gift - its story, features, or why it's special..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Image upload field with visual feedback */}
            <div className="pluckd-form-group">
              <label htmlFor="image" className="pluckd-form-label">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect
                    x="3"
                    y="3"
                    width="14"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="8.5"
                    cy="8.5"
                    r="1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M17 13L13 9L5 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                Upload Image
              </label>
              <div className="pluckd-file-upload">
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="pluckd-file-input"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
                <div className="pluckd-file-upload-display">
                  {image ? (
                    // Show selected file name when image is chosen
                    <div className="pluckd-file-selected">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                        />
                        <circle
                          cx="9"
                          cy="9"
                          r="2"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                        />
                        <path
                          d="M21 15L16 10L5 21"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                      <span>{image.name}</span>
                    </div>
                  ) : (
                    // Show upload placeholder when no image selected
                    <div className="pluckd-file-placeholder">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                      >
                        <rect
                          x="8"
                          y="8"
                          width="32"
                          height="32"
                          rx="4"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          opacity="0.5"
                        />
                        <path
                          d="M24 16V32M16 24H32"
                          stroke="currentColor"
                          strokeWidth="2"
                          opacity="0.5"
                        />
                      </svg>
                      <p>Click to upload an image</p>
                      <span>JPG, PNG, GIF up to 10MB</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit button with loading state */}
            <div className="pluckd-form-actions">
              <button
                type="submit"
                className="pluckd-btn-primary pluckd-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="pluckd-spinner"></div>
                    Sharing Gift...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M14 8L8 2L2 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path d="M8 2V15" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    Share Gift
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddGift;
