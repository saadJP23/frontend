import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const navigate = useNavigate();

  
  const handleClick = () => {
    const userInfo = JSON.parse(localStorage.getItem("user_data"));

    
    if (userInfo) {
      localStorage.removeItem("user_data");
      console.log("User logged out");
      navigate('/');
    } else {
      console.log("You are not logged in");
      navigate('/');
    }
  };


  return (
    <div>
      <h2>Home page</h2>
      <button type='button' onClick={handleClick}>Logout</button>
    </div>
  );
};