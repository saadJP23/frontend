import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext.js";

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { setUserId, setUsername } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const loginMe = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/login", user);
      if (response.status === 200) {
        //let key = response.data.userId;
        //let value = response.data.highestScore;

        const userInfo = {
          userId: response.data.userId,
          username: response.data.username,
          highestScore: response.data.highestScore,
        };

        localStorage.setItem("user_data", JSON.stringify(userInfo));
        setUserId(response.data.userId);
        setUsername(response.data.username);
        navigate("/");

        //console.log(response.data.message)
        //console.log(response.data.userId)
        //console.log(response.data.username)
        // console.log(localStorage.getItem("user_data"))
      }
    } catch (err) {
      // Check for specific error responses
      if (err.response) {
        if (err.response.status === 401) {
          setError("Incorrect Password");
        } else if (err.response.status === 404) {
          setError("User not found");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      } else {
        // Handle network or other errors
        setError("Network error. Please check your connection.");
      }
    }
  };

  return (
    <>
      <div>Login</div>
      <form onSubmit={loginMe}>
        <input
          name="email"
          type="text"
          placeholder="email"
          value={user.email}
          onChange={handleChange}
        ></input>

        <input
          name="password"
          type="password"
          placeholder="password"
          value={user.password}
          onChange={handleChange}
        ></input>

        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};
