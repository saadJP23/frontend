import React, { useState, useEffect } from "react";
import axios from "axios";

export const HighestScore = () => {
  const [scoreList, setScoreList] = useState([]);

  let userInfo = JSON.parse(localStorage.getItem("user_data"));
  let [error, setError] = useState("");

  try {
    useEffect(() => {
      if (userInfo === null) {
        setError("You need to register/login first");
      }
      const fetchData = async () => {
        // const response = await fetch('http://localhost:8000/highest_score/');
        // const json = await response.json();
        // console.log(json);
        // setScoreList = json.scoreList;

        const response = await axios.get(
          "http://localhost:8000/highest_score/"
        );
        setScoreList(response.data.scoreList);
      };
      fetchData();
    }, []);

    //let response = await axios.get("http://localhost:8000/highest_score/")
    //console.log(response);
    // alert();
    //setScoreList(response.data.scoreList)
  } catch (err) {
    console.log("_________________");
    if (err.response) {
      setError("Error occured, please try again later.");
    }
  }

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scoreList.map((score, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{score.username}</td>
                <td>{score.highestScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
