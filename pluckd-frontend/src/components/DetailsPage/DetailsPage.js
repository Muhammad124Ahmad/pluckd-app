import React, { useEffect, useState } from "react";
import { useParams, useNavigate, json } from "react-router-dom";
import "./DetailsPage.css";
import { urlConfig } from "../../config";
import { useAppContext } from "../../context/AuthContext";

function DetailsPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [gift, setGift] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [writtenComment, setWrittenComment] = useState("");
  const [commentErr, setCommentErr] = useState("");
  const [sentiment, setSentiment] = useState("");
  const { userName } = useAppContext();

  useEffect(() => {
    const authenticationToken = sessionStorage.getItem("auth-token");
    if (!authenticationToken) {
      // Task 1: Check for authentication and redirect
      navigate("/app/login");
    }

    // get the gift to be rendered on the details page
    const fetchGift = async () => {
      try {
        // Task 2: Fetch gift details
        const url = `${urlConfig.backendUrl}/api/gifts/${productId}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGift(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGift();

    async function fetchComments() {
      const commentURL = `${urlConfig.backendUrl}/api/comment/`;
      const response = await fetch(commentURL);
      if (!response.ok) {
        throw new Error("Unable to fetch Comments");
      }
      const data = await response.json();
      setComments(data);
    }
    fetchComments();

    window.scrollTo(0, 0);
  }, [productId, navigate]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleComment = async () => {
    try {
      const commentURL = `${urlConfig.backendUrl}/api/comment/`;
      const sentimentURL = `${urlConfig.backendUrl}/api/sentiment/`;
      const response = await fetch(commentURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: userName,
          comment: writtenComment,
          productId: productId,
        }),
      });

      const sentimentResponse = await fetch(sentimentURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sentence: writtenComment,
        }),
      });

      const json = await response.json();

      const sentimentJson = await sentimentResponse.json();

      if (!response.ok) {
        // Validation error case
        if (Array.isArray(json.error) && json.error.length > 0) {
          setCommentErr("Comment must not be empty"); // e.g. "Invalid value"
        } else {
          setCommentErr("Something went wrong");
        }
        return;
      }

      setComments((prev) => [
        ...prev,
        {
          _id: json._id,
          userName,
          comment: writtenComment,
          productId: productId,
        },
      ]);
      setSentiment(sentimentJson.sentiment);
      setWrittenComment("");
      setCommentErr(null);
    } catch (error) {
      setCommentErr("Something went wrong, could not add comment");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const url = `${urlConfig.backendUrl}/api/comment/delete/${commentId}`;
      const response = await fetch(url, { method: "DELETE" });
      if (!response.ok) {
        console.log("Could not Delete");
      }

      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      throw new Error("Internal Error-in deleting comment");
    }
  };

  if (loading)
    return (
      <div className="pluckd-container">
        {/* Decorative floral elements for loading state */}
        <svg
          className="floral-accent floral-top-left"
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
        >
          <path
            d="M60 20C65 25 70 35 65 45C70 50 75 55 70 65C65 70 55 65 50 60C45 65 35 70 25 65C20 60 25 50 30 45C25 40 20 30 25 20C30 15 40 20 45 25C50 20 60 15 60 20Z"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>

        <div className="pluckd-loading">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading gift details...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="pluckd-container">
        <div className="pluckd-error-card">
          <h3>Something went wrong</h3>
          <p>Error: {error}</p>
          <button className="pluckd-btn-secondary" onClick={handleBackClick}>
            Go Back
          </button>
        </div>
      </div>
    );

  if (!gift)
    return (
      <div className="pluckd-container">
        <div className="pluckd-error-card">
          <h3>Gift not found</h3>
          <p>The gift you're looking for doesn't exist.</p>
          <button className="pluckd-btn-secondary" onClick={handleBackClick}>
            Go Back
          </button>
        </div>
      </div>
    );

  return (
    <div className="pluckd-details-page">
      {/* Decorative floral elements */}
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

      {/* Decorative dots */}
      <div className="decorative-dots dot-1"></div>
      <div className="decorative-dots dot-2"></div>
      <div className="decorative-dots dot-3"></div>

      <div className="pluckd-container">
        <button className="pluckd-btn-back" onClick={handleBackClick}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 14L2 8L8 2L9.4 3.4L5.8 7H14V9H5.8L9.4 12.6L8 14Z"
              fill="currentColor"
            />
          </svg>
          Back
        </button>

        <div className="pluckd-details-card">
          <div className="pluckd-card-header">
            <h1 className="pluckd-details-title">{gift.name}</h1>
          </div>

          <div className="pluckd-card-body">
            <div className="pluckd-product-image-container">
              {gift.image ? (
                // Task 5: Display gift image
                <img
                  src={`${urlConfig.backendUrl}/${gift.image}`}
                  alt={gift.name}
                  className="pluckd-product-image"
                />
              ) : (
                <div className="pluckd-no-image">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <rect
                      width="64"
                      height="64"
                      rx="8"
                      fill="var(--soft-pink)"
                      opacity="0.3"
                    />
                    <path
                      d="M20 24H44V40H20V24Z"
                      stroke="var(--text-light)"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx="28" cy="30" r="3" fill="var(--text-light)" />
                    <path
                      d="M20 36L26 30L32 36L38 30L44 36"
                      stroke="var(--text-light)"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                  <p>No Image Available</p>
                </div>
              )}
            </div>

            {/* Task 6: Display gift details */}
            <div className="pluckd-details-grid">
              <div className="pluckd-detail-item">
                <span className="pluckd-detail-label">Category</span>
                <span className="pluckd-detail-value">{gift.category}</span>
              </div>

              <div className="pluckd-detail-item">
                <span className="pluckd-detail-label">Condition</span>
                <span className="pluckd-detail-value">{gift.condition}</span>
              </div>

              <div className="pluckd-detail-item">
                <span className="pluckd-detail-label">Date Added</span>
                <span className="pluckd-detail-value">{gift.date_added}</span>
              </div>

              <div className="pluckd-detail-item">
                <span className="pluckd-detail-label">Age (Years)</span>
                <span className="pluckd-detail-value">{gift.age_years}</span>
              </div>

              <div className="pluckd-detail-item pluckd-detail-full-width">
                <span className="pluckd-detail-label">Description</span>
                <p className="pluckd-detail-description">{gift.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pluckd-comments-section">
          <h3 className="pluckd-comments-title">Comments</h3>

          <div className="pluckd-comments-list">
            {comments.map((comment, index) =>
              comment.productId === productId ? (
                <div key={index} className="pluckd-comment-card">
                  <div className="pluckd-comment-header">
                    <span className="pluckd-comment-author">
                      {comment.userName}
                    </span>
                    {sentiment && (
                      <span className="pluckd-sentiment-badge">
                        {sentiment}
                      </span>
                    )}
                  </div>
                  <p className="pluckd-comment-text">{comment.comment}</p>
                  {comment.userName === userName && (
                    <button
                      className="pluckd-btn-delete"
                      onClick={() => handleDelete(comment._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ) : null
            )}
          </div>

          <div className="pluckd-add-comment">
            <div className="pluckd-input-group">
              <label htmlFor="addComment" className="pluckd-input-label">
                Add a comment
              </label>
              <input
                type="text"
                name="comment"
                id="addComment"
                className="pluckd-comment-input"
                placeholder="Share your thoughts..."
                value={writtenComment}
                onChange={(e) => {
                  setWrittenComment(e.target.value);
                }}
              />
              <button className="pluckd-btn-primary" onClick={handleComment}>
                Add Comment
              </button>
            </div>
            {commentErr && (
              <span className="pluckd-error-message">{commentErr}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
