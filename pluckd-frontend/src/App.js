import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import SearchPage from "./components/SearchPage/SearchPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import Profile from "./components/Profile/Profile";
import AddGift from "./components/AddGift/AddGift";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* the final code will not pass the products to every page, but each page will call the server API */}
        <Route path="/" element={<MainPage />} />
        <Route path="/app" element={<MainPage />} />
        <Route path="/app/login" element={<LoginPage />} />
        <Route path="/app/register" element={<RegisterPage />} />
        <Route path="/app/product/:productId" element={<DetailsPage />}></Route>
        <Route path="/app/search" element={<SearchPage />}></Route>
        <Route path="/app/profile" element={<Profile></Profile>}></Route>
        <Route path="/app/addGift" element={<AddGift></AddGift>}></Route>

      </Routes>
    </>
  );
}

export default App;
