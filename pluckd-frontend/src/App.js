import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import Home from "./components/Home/Home";
import AboutPage from "./components/AboutPage/AboutPage";

function App() {
  const location = useLocation();

  // hide Navbar only on home page
  const hideNavbar = location.pathname === "/";
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<MainPage />} />
        <Route path="/app/login" element={<LoginPage />} />
        <Route path="/app/register" element={<RegisterPage />} />
        <Route path="/app/product/:productId" element={<DetailsPage />}></Route>
        <Route path="/app/search" element={<SearchPage />}></Route>
        <Route path="/app/profile" element={<Profile></Profile>}></Route>
        <Route path="/app/addGift" element={<AddGift></AddGift>}></Route>
        <Route path="/app/about" element={<AboutPage></AboutPage>}></Route>
      </Routes>
    </>
  );
}

export default App;
