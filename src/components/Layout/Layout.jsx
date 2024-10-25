import React, { useEffect } from "react";
import Topnav from "../Topnav/Topnav";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Router from "../../Router/Router";
import Login from "../Login/Login";

const Layout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/categories");
    } else {
      navigate("/");
    }
  }, [token]);

  const body = () => {
    if (token) {
      return (
        <>
          <ul
            className="ant-menu ant-menu-root ant-menu-vertical ant-menu-dark ant-menu-inline-collapsed css-usln0u"
            role="menu"
            tabIndex={0}
            data-menu-list="true"
            style={{ height: "90vh" }}
          >
            <li
              className="ant-menu-item ant-menu-item-only-child"
              role="menuitem"
              tabIndex={-1}
              data-menu-id="rc-menu-uuid-75187-1-tmp-0"
              style={{}}
            >
              <h3 className="ant-menu-title-content">AutoZoomAdmin</h3>
            </li>
            <li
              className="ant-menu-item ant-menu-item-selected"
              role="menuitem"
              tabIndex={-1}
              data-menu-id="rc-menu-uuid-75187-1-1"
              style={{}}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                version="1.2"
                baseProfile="tiny"
                viewBox="0 0 24 24"
                className="ant-menu-item-icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{ fontSize: 20 }}
              >
                <path d="M12 3s-6.186 5.34-9.643 8.232c-.203.184-.357.452-.357.768 0 .553.447 1 1 1h2v7c0 .553.447 1 1 1h3c.553 0 1-.448 1-1v-4h4v4c0 .552.447 1 1 1h3c.553 0 1-.447 1-1v-7h2c.553 0 1-.447 1-1 0-.316-.154-.584-.383-.768-3.433-2.892-9.617-8.232-9.617-8.232z" />
              </svg>
              <span className="ant-menu-title-content">
                <NavLink
                  className=""
                  to={"/categories"}
                  style={{ fontSize: 16, fontWeight: 600 }}
                  aria-current="page"
                >
                  Categories
                </NavLink>
              </span>
            </li>

            <li
              className="ant-menu-item"
              role="menuitem"
              tabIndex={-1}
              data-menu-id="rc-menu-uuid-75187-1-3"
              style={{}}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 16 16"
                className="ant-menu-item-icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{ fontSize: 20 }}
              >
                <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5" />
              </svg>
              <span className="ant-menu-title-content">
                <NavLink
                  className=""
                  to={"/brands"}
                  style={{ fontSize: 16, fontWeight: 600 }}
                >
                  Brands
                </NavLink>
              </span>
            </li>
            <li
              className="ant-menu-item"
              role="menuitem"
              tabIndex={-1}
              data-menu-id="rc-menu-uuid-75187-1-4"
              style={{}}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="ant-menu-item-icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{ fontSize: 20 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <span className="ant-menu-title-content">
                <NavLink
                  className=""
                  to={"/models"}
                  style={{ fontSize: 16, fontWeight: 600 }}
                >
                  Models
                </NavLink>
              </span>
            </li>
            <li
              className="ant-menu-item"
              role="menuitem"
              tabIndex={-1}
              data-menu-id="rc-menu-uuid-75187-1-5"
              style={{}}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                className="ant-menu-item-icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{ fontSize: 20 }}
              >
                <path
                  fill="none"
                  strokeWidth={2}
                  d="M17.5,6.5 L23,9 L23,22 L16,19 L8,22 L1,19 L1,6 L6,8 M16,19 L16,12 M8,22 L8,12 M12,16.2727273 C12,16.2727273 6,11.5 6,7 C6,3.25 9,1 12,1 C15,1 18,3.25 18,7 C18,11.5 12,16.2727273 12,16.2727273 Z M13,7 C13,6.44766667 12.5523333,6 12,6 C11.4476667,6 11,6.44766667 11,7 C11,7.55233333 11.4476667,8 12,8 C12.5523333,8 13,7.55233333 13,7 Z"
                />
              </svg>
              <span className="ant-menu-title-content">
                <NavLink
                  className=""
                  to={"/locations"}
                  style={{ fontSize: 16, fontWeight: 600 }}
                >
                  Locations
                </NavLink>
              </span>
            </li>
            <li
              className="ant-menu-item"
              role="menuitem"
              tabIndex={-1}
              data-menu-id="rc-menu-uuid-75187-1-6"
              style={{}}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                className="ant-menu-item-icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{ fontSize: 20 }}
              >
                <path d="M21 6h-4V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM6 18H4v-2h2v2zm0-4H4v-2h2v2zm5 4H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V8h2v2zm0-4H9V4h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm0-4h-2V4h2v2zm5 12h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2z" />
              </svg>
              <span className="ant-menu-title-content">
                <NavLink
                  className=""
                  to={"/cities"}
                  style={{ fontSize: 16, fontWeight: 600 }}
                >
                  Cities
                </NavLink>
              </span>
            </li>
            <li
              className="ant-menu-item"
              role="menuitem"
              tabIndex={-1}
              data-menu-id="rc-menu-uuid-75187-1-7"
              style={{}}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 512 512"
                className="ant-menu-item-icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{ fontSize: 20 }}
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={32}
                  d="M469.71 234.6c-7.33-9.73-34.56-16.43-46.08-33.94s-20.95-55.43-50.27-70S288 112 256 112s-88 4-117.36 18.63-38.75 52.52-50.27 70-38.75 24.24-46.08 33.97S29.8 305.84 32.94 336s9 48 9 48h86c14.08 0 18.66-5.29 47.46-8 31.6-3 62.6-4 80.6-4s50 1 81.58 4c28.8 2.73 33.53 8 47.46 8h85s5.86-17.84 9-48-2.04-91.67-9.33-101.4zM400 384h56v16h-56zm-344 0h56v16H56z"
                />
                <path d="M364.47 309.16c-5.91-6.83-25.17-12.53-50.67-16.35S279 288 256.2 288s-33.17 1.64-57.61 4.81-42.79 8.81-50.66 16.35C136.12 320.6 153.42 333.44 167 335c13.16 1.5 39.47.95 89.31.95s76.15.55 89.31-.95c13.56-1.65 29.62-13.6 18.85-25.84zm67.1-66.11a3.23 3.23 0 0 0-3.1-3c-11.81-.42-23.8.42-45.07 6.69a93.88 93.88 0 0 0-30.08 15.06c-2.28 1.78-1.47 6.59 1.39 7.1a455.32 455.32 0 0 0 52.82 3.1c10.59 0 21.52-3 23.55-12.44a52.41 52.41 0 0 0 .49-16.51zm-351.14 0a3.23 3.23 0 0 1 3.1-3c11.81-.42 23.8.42 45.07 6.69a93.88 93.88 0 0 1 30.08 15.06c2.28 1.78 1.47 6.59-1.39 7.1a455.32 455.32 0 0 1-52.82 3.1c-10.59 0-21.52-3-23.55-12.44a52.41 52.41 0 0 1-.49-16.51z" />
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={32}
                  d="M432 192h16m-384 0h16m-2 19s46.35-12 178-12 178 12 178 12"
                />
              </svg>
              <span className="ant-menu-title-content">
                <NavLink
                  className=""
                  to={"/cars"}
                  style={{ fontSize: 16, fontWeight: 600 }}
                >
                  Cars
                </NavLink>
              </span>
            </li>
          </ul>
          <div className="main__container">
            <Topnav />
            <main className="content">
              <Router />
            </main>
          </div>
        </>
      );
    } else {
      return (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      );
    }
  };
  return <div className="layout">{body()}</div>;
};

export default Layout;
