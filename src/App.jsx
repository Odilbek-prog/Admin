import { useEffect, useState } from "react";
import "./App.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login/Login";
import NotFound from "./Pages/NotFound";
import Layout from "./components/Layout/Layout";
import Home from "./Pages/Home";
import Settings from "./Pages/Settings";
import Brands from "./Pages/Brands";
import Models from "./Pages/Models";
import Locations from "./Pages/Locations";
import Cities from "./Pages/Cities";
import Cars from "./Pages/Cars";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [token]);

  return (
    <Routes>
      {token ? (
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/models" element={<Models />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/cars" element={<Cars />} />
        </Route>
      ) : (
        <Route path="/" element={<Login />} />
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
