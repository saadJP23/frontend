import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  let [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()
  const handleChange = (e) => {

     const {name, value} = e.target

    setNewUser((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const registerMe = async (e) => {
    e.preventDefault()
    // console.log("Rigestration button clicked ") // this line works   
    
    try{
      await axios.post("http://localhost:8000/Register", newUser)
      navigate('/')
    }catch(err){
      console.log("Rigestration error occured")
    }

  }
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

          <button type="submit" >
            Register me
          </button>
        </div>
      </form>
    </>
  );
};
