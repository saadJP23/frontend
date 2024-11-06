import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Movie = () => {
  const navigate = useNavigate();

  let [error, setError] = useState('');

  let [newMovie, setNewMovie] = useState({
    title: "",
    qoute: "",
    url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewMovie((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const addMovie = async (e) => {
    e.preventDefault();

    try {
      const responce = await axios.post("http://localhost:8000/add_movie", newMovie);
      if (responce.status === 200){
        console.log("Success")
        navigate('/')
      }
      navigate("/");
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <>
      <form onSubmit={addMovie}>
        <div className="movie-pg">
          <h3>Add Movie</h3>
          <input
          name="title"
            id="title"
            placeholder="Title"
            type="text"
            value={newMovie.title}
            onChange={handleChange}
          ></input>

          <input
            type="text"
            name="quote"
            value={newMovie.qoute}
            placeholder="Quote"
            onChange={handleChange}
          ></input>

          <input
          name="url"
            type="text"
            value={newMovie.url}
            placeholder="Url"
            onChange={handleChange}
          ></input>

          <button type="submit" >
            Add A movie
          </button>

          {error && <p>{error}</p>}
        </div>
      </form>
      </>
  );
};
