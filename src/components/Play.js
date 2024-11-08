import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { json, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./UserContext.js";

export const Play = () => {
  let userInfo = JSON.parse(localStorage.getItem("user_data"));
  //console.log(userInfo)

  let { userId, username } = useContext(UserContext);
  let [index, setIndex] = useState();
  const [isCorrect, setIsCorrect] = useState(false);

  if (userInfo === null) {
    username = "";
    userId = "";
  } else {
    username = userInfo.username;
    userId = userInfo.userId;
  }

  // if(username)
  // {
  //   console.log("user: " + username);
  //   localStorage.setItem("username", username);
  //   localStorage.setItem("userId", userId);

  //   console.log(username);

  // }
  // else{

  //   username = localStorage.getItem("username");
  //   userId = localStorage.getItem("userId");
  //   console.log("not found");
  // }

  const navigate = useNavigate();
  const { movieId } = useParams();
  const [nextMovieId, setNextMovieId] = useState(null);
  const [url, setUrl] = useState("");
  const [userGuess, setUserGuess] = useState({ title: "" });
  const [error, setError] = useState("");
  const [quote, setQuote] = useState("");
  const [feedback, setFeedback] = useState("");
  let [score, setScore] = useState(8);
  const [userScore, setUserScore] = useState(0);
  let [incorrectGuesses, setIncorrectGuesses] = useState(0);

  useEffect(
    () => {
      setError("");

      const fetchQuote = async () => {
        try {
          let response = await axios.get(
            `http://localhost:8000/play/${movieId}`
          );

          if (response.data.message === "Sorry we only have 10 movie data") {
          } else {
            setError("");
            setQuote(response.data.quote);
            setUrl(response.data.url);
          }
        } catch (err) {
          setError("Something went wrong");
        }
      };

      if (movieId) {
        fetchQuote();
        setNextMovieId(parseInt(movieId) + 1);
        setIsCorrect(false);
      }
    },
    [movieId],
    userId
  );

  const gotoNext = () => {
    navigate(`/play/${nextMovieId}`);
    setScore(8);
    setIncorrectGuesses(0);
    setIsCorrect(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserGuess((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const checkanswer = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8000/play/${movieId}`,
        { title: userGuess.title }
      );

      if (response.data.message !== "You are correct") {
        setFeedback(response.data.message);
        setUserGuess({ title: "" });
        if (score === 0) {
          setScore((score = 0));
          setIncorrectGuesses((incorrectGuesses = 8));
        } else {
          setScore(score - 1);
          setIncorrectGuesses(incorrectGuesses + 1);
        }
      } else {
        setFeedback(response.data.message);
        setUserGuess({ title: "" });
        setScore(score);
        setUserScore(userScore + score);
        setIsCorrect(true);

        let userInfo = JSON.parse(localStorage.getItem("user_data"));

        if (userInfo !== null) {
          try {
            let response = await axios.post(`http://localhost:8000/${userId}`, {
              currentScore: userScore + score,
            });
            if (response.status === 200) {
              console.log("score id: ", userId);
              console.log("Score updated successfully");
            }
          } catch (err) {
            console.error("Error updating score:", err);
          }
        }
      }
    } catch (error) {
      setError("Something went wrong while checking the answer.");
    }
  };

  const getSectionStyle = (index, movieId) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return {
      backgroundImage: `url(${url})`, // Use the full image URL
      backgroundSize: "300% 300%", // Scale image to fit 3x3 grid
      backgroundPosition: `${col * 50}% ${row * 50}%`, // Position each section
      opacity: index < incorrectGuesses ? 1 : 0, // Reveal based on incorrect guesses
    };
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          width: "250px",
          height: "250px",
        }}
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            style={{
              ...getSectionStyle(index, movieId),
              width: "100px",
              height: "100px",
              border: "1px solid black",
            }}
          ></div>
        ))}
      </div>

      {username && <>Welcome: {username}</>}
      {quote ? <p>{quote}</p> : <p>Quote not found</p>}

      <form onSubmit={checkanswer}>
        <h2>Your score: {userScore}</h2>
        <h4>Possible score for this round: {score}</h4>

        <div className="quote">
          <input
            onChange={handleChange}
            className="userGuess"
            type="text"
            placeholder="Your Guess"
            name="title"
            value={userGuess.title}
          ></input>

          <button type="submit" disabled={isCorrect}>
            check the answer
          </button>

          {feedback && <p>{feedback}</p>}
        </div>
      </form>

      <button type="button" onClick={gotoNext}>
        Next
      </button>

      {error ? <p>{error}</p> : <p></p>}
    </>
  );
};
