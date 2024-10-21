import React, { useState } from "react";
import { toast } from "react-toastify";

import "./Login.scss"; // CSS faylni ulaymiz

function Login() {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const API = "https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (number === "900474227" && password === "superadmin") {
      fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: "900474227",
          password: "superadmin",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Admin Xush kelibsiz!");
          localStorage.setItem("token", data?.data?.tokens?.accessToken?.token);
          window.location.href = "/";
        });
    } else {
      toast.error("Ism yoki parol xato");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="heading">Log in</h2>
        <input
          type="text"
          name="phone"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Phone Number"
          className="input"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input"
          required
        />
        <button type="submit" className="button">
          Log in
        </button>
      </form>
    </div>
  );
}

export default Login;
