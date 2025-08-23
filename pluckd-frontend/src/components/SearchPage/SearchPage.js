import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { urlConfig } from "../../config";
import "./SearchPage.css"

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
      

      <div className="pluckd-search-container">
        <div className="pluckd-search-content">
          <h1 className="pluckd-search-title">Discover Perfect Gifts</h1>
          
          <div className="pluckd-filters-card">
            <h5 className="pluckd-filters-title">Filters</h5>
            <div className="pluckd-filters-grid">
              {/* Category Dropdown */}
              <div className="pluckd-filter-group">
                <label htmlFor="categorySelect" className="pluckd-filter-label">Category</label>
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
                <label htmlFor="conditionSelect" className="pluckd-filter-label">Condition</label>
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
                  Less than <span className="pluckd-age-value">{ageRange}</span> years
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
                    src={product.image}
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
                      onClick={() => goToDetailsPage(product.id)}
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