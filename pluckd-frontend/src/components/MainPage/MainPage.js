import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { urlConfig } from "../../config";

function MainPage() {
  const [gifts, setGifts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        let url = `${urlConfig.backendUrl}/api/gifts`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error; ${response.status}`);
        }

        const data = await response.json();
        setGifts(data);
      } catch (error) {
        console.log(`Fetch Error: ${error}`);
      }
    };

    fetchGifts();
  }, []);

  const goToDetailsPage = (productId) => {
    navigate(`/app/product/${productId}`);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("default", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getConditionClass = (condition) => {
    return condition === "New"
      ? "pluckd-condition-new"
      : "pluckd-condition-used";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Inter:wght@300;400;500&family=Comfortaa:wght@300;400;500;600&family=Nunito:wght@300;400;500;600&display=swap');
        
        .pluckd-main-container {
          background: linear-gradient(135deg, #faf8f5 0%, #f5f2ef 50%, #fdf7f3 100%);
          min-height: 100vh;
          padding: 40px 20px;
          font-family: 'Nunito', sans-serif;
        }

        .pluckd-gifts-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          padding: 20px 0;
        }

        .pluckd-gift-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(253, 251, 248, 0.95));
          border: 1px solid rgba(196, 164, 132, 0.15);
          border-radius: 25px;
          box-shadow: 0 4px 20px rgba(90, 64, 55, 0.06);
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          overflow: hidden;
          position: relative;
          transform-origin: center;
          backdrop-filter: blur(10px);
        }

        .pluckd-gift-card:hover {
          transform: translateY(-8px) scale(1.02) rotate(0.5deg);
          box-shadow: 0 12px 35px rgba(90, 64, 55, 0.12);
          border-color: rgba(232, 165, 165, 0.3);
        }

        .pluckd-gift-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #e8a5a5, #d4af9a, #c4a484);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .pluckd-gift-card:hover::before {
          opacity: 1;
        }

        .pluckd-image-container {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(232, 165, 165, 0.05), rgba(212, 175, 154, 0.05));
        }

        .pluckd-gift-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .pluckd-gift-card:hover .pluckd-gift-image {
          transform: scale(1.05) rotate(-0.5deg);
        }

        .pluckd-no-image {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          background: linear-gradient(135deg, rgba(232, 165, 165, 0.1), rgba(212, 175, 154, 0.1));
          color: #8b6f47;
          font-family: 'Nunito', sans-serif;
          font-weight: 500;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
        }

        .pluckd-card-body {
          padding: 24px;
          position: relative;
        }

        .pluckd-gift-title {
          font-family: 'Comfortaa', serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: #5a4037;
          margin-bottom: 16px;
          letter-spacing: 0.3px;
          line-height: 1.3;
        }

        .pluckd-condition-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
          border: 2px solid transparent;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .pluckd-condition-new {
          background: linear-gradient(135deg, rgba(132, 204, 132, 0.15), rgba(144, 238, 144, 0.15));
          color: #2d5a2d;
          border-color: rgba(132, 204, 132, 0.3);
        }

        .pluckd-condition-used {
          background: linear-gradient(135deg, rgba(255, 193, 7, 0.15), rgba(255, 206, 84, 0.15));
          color: #8b6914;
          border-color: rgba(255, 193, 7, 0.3);
        }

        .pluckd-date-text {
          color: #8b6f47;
          font-family: 'Nunito', sans-serif;
          font-weight: 400;
          font-size: 0.9rem;
          letter-spacing: 0.3px;
          margin-bottom: 20px;
          opacity: 0.8;
        }

        .pluckd-details-btn {
          background: linear-gradient(135deg, #c4a484, #d4af9a);
          color: white;
          font-family: 'Nunito', sans-serif;
          padding: 12px 28px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          letter-spacing: 0.5px;
          box-shadow: 0 4px 15px rgba(196, 164, 132, 0.3);
          transform-origin: center;
          width: 100%;
        }

        .pluckd-details-btn:hover {
          background: linear-gradient(135deg, #b8956f, #c4a484);
          transform: translateY(-2px) scale(1.03) rotate(-0.5deg);
          box-shadow: 0 6px 20px rgba(196, 164, 132, 0.4);
          border-radius: 25px;
        }

        .pluckd-details-btn:active {
          transform: translateY(0) scale(0.98);
        }

        /* Empty state styling */
        .pluckd-empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #8b6f47;
          font-family: 'Nunito', sans-serif;
        }

        .pluckd-empty-state h3 {
          font-family: 'Comfortaa', serif;
          font-size: 2rem;
          font-weight: 600;
          color: #5a4037;
          margin-bottom: 16px;
          letter-spacing: 0.5px;
        }

        .pluckd-empty-state p {
          font-size: 1.1rem;
          font-weight: 400;
          opacity: 0.8;
          letter-spacing: 0.3px;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .pluckd-main-container {
            padding: 20px 15px;
          }

          .pluckd-gifts-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .pluckd-gift-card {
            border-radius: 20px;
          }

          .pluckd-gift-title {
            font-size: 1.2rem;
          }

          .pluckd-image-container {
            height: 200px;
          }

          .pluckd-card-body {
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .pluckd-gifts-grid {
            padding: 0;
          }

          .pluckd-image-container {
            height: 180px;
          }

          .pluckd-card-body {
            padding: 16px;
          }

          .pluckd-gift-title {
            font-size: 1.1rem;
          }
        }

        /* Loading animation */
        @keyframes pluckd-shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }

        .pluckd-loading-card {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);
          background-size: 400% 100%;
          animation: pluckd-shimmer 1.5s ease-in-out infinite;
        }
      `}</style>

      <div className="pluckd-main-container">
        {gifts.length === 0 ? (
          <div className="pluckd-empty-state">
            <h3>No Gifts Available</h3>
            <p>Check back later for amazing gift discoveries!</p>
          </div>
        ) : (
          <div className="pluckd-gifts-grid">
            {gifts.map((gift) => (
              <div key={gift.id} className="pluckd-gift-card">
                <div className="pluckd-image-container">
                  {gift.image ? (
                    <img
                      src={gift.image}
                      alt={gift.name}
                      className="pluckd-gift-image"
                    />
                  ) : (
                    <div className="pluckd-no-image">No Image Available</div>
                  )}
                </div>

                <div className="pluckd-card-body">
                  <h5 className="pluckd-gift-title">{gift.name}</h5>

                  <p
                    className={`pluckd-condition-badge ${getConditionClass(
                      gift.condition
                    )}`}
                  >
                    {gift.condition}
                  </p>

                  <p className="pluckd-date-text">
                    {formatDate(gift.date_added)}
                  </p>

                  <button
                    onClick={() => goToDetailsPage(gift.id)}
                    className="pluckd-details-btn"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MainPage;
