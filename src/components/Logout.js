import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Logout = () => {

    const navigate = useNavigate();
    
    const Logout = () => {
      window.localStorage.removeItem('isLoggedIn')
      window.localStorage.removeItem('userId');
      navigate('/login')
    }

    return (
      <div>
        <h2>Home page</h2>
        <button onClick={() => Logout()}>Logout</button>
      </div>
    )
}
