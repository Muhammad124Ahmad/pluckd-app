import React, { useEffect, useState } from "react";
import { useParams, useNavigate, json } from "react-router-dom";

import { urlConfig } from "../../config";
import { useAppContext } from "../../context/AuthContext";
import "./AddGift.css";

function AddGift() {
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const { userName } = useAppContext();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        return console.log("request Failed --adding gift");
      }

      return navigate("/app");
    } catch (error) {
      throw new Error("Something Went Wrong");
    }
  };

  return (
    <form className="p-3" onSubmit={handleSubmit}>
      {/* name */}
      <label htmlFor="name">Name:</label>
      <textarea
        id="name"
        name="name"
        rows="4"
        className="form-control mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Category */}
      <label htmlFor="category">Category:</label>
      <select
        id="category"
        name="category"
        className="form-control mb-3"
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

      {/* Condition */}
      <label htmlFor="condition">Condition:</label>
      <select
        id="condition"
        name="condition"
        className="form-control mb-3"
        defaultValue={"New"}
        onChange={(e) => setCondition(e.target.value)}
        required
      >
        <option value="New">New</option>
        <option value="Like New">Like New</option>
        <option value="Good">Good</option>
        <option value="Older">Older</option>
      </select>

      {/* Age (Years) */}
      <label htmlFor="age_years">Age (Years):</label>
      <input
        type="number"
        id="age_years"
        name="age_years"
        min="0"
        step="0.01"
        className="form-control mb-3"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />

      {/* Description */}
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        rows="4"
        className="form-control mb-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <label htmlFor="image">Upload Image:</label>
      <input
        type="file"
        id="image"
        name="image"
        className="form-control mb-3"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
export default AddGift;

// "id": "420",
