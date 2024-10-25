import React, { useEffect } from "react";
import Login from "../components/Login/Login";
import NotFound from "../Pages/NotFound";
import Home from "../Pages/Home";
import Brands from "../Pages/Brands";
import Models from "../Pages/Models";
import Locations from "../Pages/Locations";
import Cities from "../Pages/Cities";
import Cars from "../Pages/Cars";
import { Routes, Route, useNavigate } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/categories" element={<Home />} />
      <Route path="/brands" element={<Brands />} />
      <Route path="/models" element={<Models />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/cities" element={<Cities />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
