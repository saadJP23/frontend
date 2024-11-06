import "./App.css";

import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {Home} from "./components/Home";
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {HighestScore} from "./components/HighestScore";
import {Play} from "./components/Play";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  json,
} from "react-router-dom";
import { Movie } from "./components/Movie";
import { Logout } from "./components/Logout";
import { UserProvider } from "./components/UserContext";
import { useEffect, useContext } from "react";

function App() {


  useEffect(() => {
    const userInfo = localStorage.getItem("user_data");
    if (userInfo) {
      console.log(localStorage.setItem("user_data", JSON.stringify(userInfo)))
    }
    else{
      console.log('no one is here')
    }
  }, []);
  
  return (
    <>

    <UserProvider>
    <Router>
      <Header title="Our app title"></Header>
      <Routes>
      <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/highest_score" element={<HighestScore />} />
          <Route path="/movie" element={<Movie />}></Route>
          <Route path="/play/:movieId" element={<Play />}></Route>
          <Route path="/logout" element={<Logout />}></Route>

      </Routes>

      <Footer></Footer>
    </Router>

    </UserProvider>
    </>
  );
}

export default App;
