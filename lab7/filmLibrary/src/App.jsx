/*
 * [2022/2023]
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 6
 */

import { React, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import FILMS from "./films";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import FilmListRoute from "./components/FilmListRoute";
import FormRoute from "./components/FilmForm";

function App() {
  // This state contains the list of films (it is initialized from a predefined array).
  const [films, setFilms] = useState(FILMS);

  // This state contains the last film ID (the ID is continuously incremented and never decresead).
  const [lastFilmId, setLastFilmId] = useState(FILMS[FILMS.length - 1].id + 1);

  // This function add the new film into the FilmLibrary array
  const saveNewFilm = (newFilm) => {
    setFilms((films) => [...films, { id: lastFilmId, ...newFilm }]);
    setLastFilmId((id) => id + 1);
  };

  // This function updates a film already stored into the FilmLibrary array
  const updateFilm = (film) => {
    setFilms((oldFilms) => {
      return oldFilms.map((f) => {
        if (film.id === f.id)
          return {
            id: film.id,
            title: film.title,
            favorite: film.favorite,
            watchDate: film.watchDate,
            rating: film.rating,
          };
        else return f;
      });
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <FilmListRoute
              films={films}
              setFilms={setFilms}
              lastFilmId={lastFilmId}
              setLastFilmId={setLastFilmId}
              saveNewFilm={saveNewFilm}
              updateFilm={updateFilm}
            />
          }
        />
        <Route path="/add" element={<FormRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
