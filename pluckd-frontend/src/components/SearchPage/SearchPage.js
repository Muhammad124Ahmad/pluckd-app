import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { urlConfig } from "../../config";
import "./SearchPage.css";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ageRange, setAgeRange] = useState(6); // Initialize with minimum value
  const [searchResults, setSearchResults] = useState([]);
  const categories = ["Living", "Bedroom", "Bathroom", "Kitchen", "Office"];
  const conditions = ["New", "Like New", "Older"];

  useEffect(() => {
    // fetch all products
    const fetchProducts = async () => {
      try {
        let url = `${urlConfig.backendUrl}/api/gifts`;
        console.log(url);
        const response = await fetch(url);
        if (!response.ok) {
          //something went wrong
          throw new Error(`HTTP error; ${response.status}`);
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.log("Fetch error: " + error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = async () => {
    // Construct the search URL based on user input
    const baseUrl = `${urlConfig.backendUrl}/api/search?`;
    const queryParams = new URLSearchParams({
      name: searchQuery,
      age_years: ageRange,
      category: document.getElementById("categorySelect").value,
      condition: document.getElementById("conditionSelect").value,
    }).toString();

    try {
      const response = await fetch(`${baseUrl}${queryParams}`);
      if (!response.ok) {
        throw new Error("Search failed");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    }
  };

  const navigate = useNavigate();

  const goToDetailsPage = (productId) => {
    navigate(`/app/product/${productId}`);
  };

  return (
    <>
      <style>{`
        :root {
          --soft-pink: #e8d5d0;
        }

        /* Decorative floral elements */
        .floral-accent {
          position: absolute;
          opacity: 0.35;
          pointer-events: none;
          color: #8b0000;
          z-index: 2;
        }

        .floral-top-left {
          top: 8%;
          left: 5%;
          transform: rotate(-15deg);
        }

        .floral-bottom-right {
          bottom: 10%;
          right: 8%;
          transform: rotate(25deg);
        }

        .floral-mid-left {
          top: 55%;
          left: 3%;
          transform: rotate(-45deg);
        }

        /* Decorative dots */
        .decorative-dots {
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--soft-pink);
          border-radius: 50%;
          opacity: 0.6;
          z-index: 2;
        }

        .dot-1 {
          top: 20%;
          right: 25%;
        }
        .dot-2 {
          top: 70%;
          left: 20%;
        }
        .dot-3 {
          bottom: 25%;
          right: 15%;
        }

        /* Responsive adjustments for mobile */
        @media (max-width: 480px) {
          .floral-accent {
            opacity: 0.2;
          }
        }
      `}</style>

      <div className="pluckd-search-container" style={{ position: 'relative', overflowX: 'hidden' }}>
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

        <div className="pluckd-search-content" style={{ position: 'relative', zIndex: 3 }}>
          <h1 className="pluckd-search-title">Discover Perfect Gifts</h1>

          <div className="pluckd-filters-card">
            <h5 className="pluckd-filters-title">Filters</h5>
            <div className="pluckd-filters-grid">
              {/* Category Dropdown */}
              <div className="pluckd-filter-group">
                <label htmlFor="categorySelect" className="pluckd-filter-label">
                  Category
                </label>
                <select id="categorySelect" className="pluckd-filter-select">
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Condition Dropdown */}
              <div className="pluckd-filter-group">
                <label
                  htmlFor="conditionSelect"
                  className="pluckd-filter-label"
                >
                  Condition
                </label>
                <select id="conditionSelect" className="pluckd-filter-select">
                  <option value="">All Conditions</option>
                  {conditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>

              {/* Age Range Slider */}
              <div className="pluckd-filter-group pluckd-age-slider-container">
                <label htmlFor="ageRange" className="pluckd-filter-label">
                  Less than <span className="pluckd-age-value">{ageRange}</span>{" "}
                  years
                </label>
                <input
                  type="range"
                  className="pluckd-age-slider"
                  id="ageRange"
                  min="1"
                  max="10"
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                />
              </div>
            </div>
          </div>

          <input
            type="text"
            className="pluckd-search-input"
            placeholder="Search for amazing gifts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button className="pluckd-search-btn" onClick={handleSearch}>
            Search Gifts
          </button>

          <div className="pluckd-results-container">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div key={product.id} className="pluckd-result-card">
                  <img
                    src={`${urlConfig.backendUrl}/${product.image}`}
                    alt={product.name}
                    className="pluckd-result-image"
                  />
                  <div className="pluckd-result-body">
                    <h5 className="pluckd-result-title">{product.name}</h5>
                    <p className="pluckd-result-description">
                      {product.description.slice(0, 100)}...
                    </p>
                  </div>
                  <div className="pluckd-result-footer">
                    <button
                      onClick={() => goToDetailsPage(product._id)}
                      className="pluckd-view-more-btn"
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="pluckd-no-results">
                <h4>No gifts found</h4>
                <p>Please adjust your filters and try searching again.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;