import React from "react";
import person from "../../assets/person.png";
import logout from "../../assets/logout.png";
import "./Topnav.scss";
import { useNavigate } from "react-router-dom";

const Topnav = () => {
  const navigate = useNavigate();
  const tokenx = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="topnav">
      <div className="topnav__prof">
        <img className="topnav__img" src={person} alt="" />
        <h2 className="topnav__title">Admin</h2>
      </div>
      <img
        className="topnav__img topnav__logout"
        onClick={tokenx}
        src={logout}
        alt=""
      />
    </div>
  );
};

export default Topnav;
