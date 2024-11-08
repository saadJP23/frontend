import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  let [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewUser((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const registerMe = async (e) => {
    e.preventDefault();
    // console.log("Rigestration button clicked ") // this line works

    try {
      let response = await axios.post(
        "http://localhost:8000/register",
        newUser
      );
      if (response.data.message === "Email already exist.") {
        setError("Email aready exist.");
      } else {
        login(newUser.email, newUser.password);
      }
    } catch (err) {
      setError("Registration error occured.");
    }
  };

  const login = async (email, password) => {
    const response = await axios.post("http://localhost:8000/login", {
      email,
      password,
    });

    if (response.status === 200) {
      const userInfo = {
        userId: response.data.userId,
        username: response.data.username,
        highestScore: response.data.highestScore,
      };

      localStorage.setItem("user_data", JSON.stringify(userInfo));
      navigate("/");
    }
  };
  return (
    <>
      <form onSubmit={registerMe}>
        <div className="register-pg">
          <h3>Register Form</h3>
          <input
            name="username"
            id="username"
            placeholder="Username"
            type="name"
            value={newUser.username}
            onChange={handleChange}
          ></input>

          <input
            type="text"
            name="email"
            value={newUser.email}
            placeholder="Email"
            onChange={handleChange}
          ></input>

          <input
            name="password"
            id="password"
            type="password"
            value={newUser.password}
            placeholder="Password"
            onChange={handleChange}
          ></input>

          <button type="submit">Register me</button>
        </div>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};
