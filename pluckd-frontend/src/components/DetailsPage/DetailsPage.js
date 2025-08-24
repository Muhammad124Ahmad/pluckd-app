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
      const response = await fetch(commentURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: userName,
          comment: writtenComment,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        // Validation error case
        if (Array.isArray(json.error) && json.error.length > 0) {
          setCommentErr("Comment must not be empty"); // e.g. "Invalid value"
        } else {
          setCommentErr("Something went wrong");
        }
        return;
      }

      setComments((prev) => [...prev, { userName, comment: writtenComment }]);
      setWrittenComment("");
      setCommentErr(null);
    } catch (error) {
      setCommentErr("Something went wrong, could not add comment");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!gift) return <div>Gift not found</div>;

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={handleBackClick}>
        Back
      </button>
      <div className="card product-details-card">
        <div className="card-header text-white">
          <h2 className="details-title">{gift.name}</h2>
        </div>
        <div className="card-body">
          <div className="image-placeholder-large">
            {gift.image ? (
              // Task 5: Display gift image
              <img
                src={gift.image}
                alt={gift.name}
                className="product-image-large"
              />
            ) : (
              <div className="no-image-available-large">No Image Available</div>
            )}
          </div>
          {/* Task 6: Display gift details */}
          <p>
            <strong>Category:</strong>
            {gift.category}
          </p>
          <p>
            <strong>Condition:</strong>
            {gift.condition}
          </p>
          <p>
            <strong>Date Added:</strong>
            {gift.dateAdded}
          </p>
          <p>
            <strong>Age (Years):</strong>
            {gift.age}
          </p>
          <p>
            <strong>Description:</strong>
            {gift.description}
          </p>
        </div>
      </div>
      <div className="comments-section mt-4">
        <h3 className="mb-3">Comments</h3>
        {/* Task 7: Render comments section */}
        {comments.map((comment, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <p className="comment-author">
                <strong>{comment.userName}:</strong>
              </p>
              <p className="comment-text">{comment.comment}</p>
            </div>
          </div>
        ))}
        <label htmlFor="addComment"></label>
        <input
          type="text"
          name="comment"
          id="addComment"
          value={writtenComment}
          onChange={(e) => {
            setWrittenComment(e.target.value);
          }}
        />
        <button className="btn btn-primary" onClick={handleComment}>
          Add Comment
        </button>
        <span>{commentErr}</span>
      </div>
    </div>
  );
}

export default DetailsPage;
