/*
 * [2022/2023]
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 6
 */

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import dayjs from "dayjs";

import { React, useState } from "react";
import { Container, Row, Col } from "react-bootstrap/";

import FILMS from "./films";

import { Navigation } from "./components/Navigation";
import Filters from "./components/Filters";
import FilmLibrary from "./components/FilmLibrary";

function App() {
  // This state contains the active filter
  const [activeFilter, setActiveFilter] = useState("filter-all");

  /**
   * Defining a structure for Filters
   * Each filter is identified by a unique name and is composed by the following fields:
   * - A label to be shown in the GUI
   * - An ID (equal to the unique name), used as key during the table generation
   * - A filter function applied before passing the films to the FilmTable component
   */
  const filters = {
    "filter-all": {
      label: "All",
      id: "filter-all",
      filterFunction: () => true,
    },
    "filter-favorite": {
      label: "Favorites",
      id: "filter-favorite",
      filterFunction: (film) => film.favorite,
    },
    "filter-best": {
      label: "Best Rated",
      id: "filter-best",
      filterFunction: (film) => film.rating >= 5,
    },
    "filter-lastmonth": {
      label: "Seen Last Month",
      id: "filter-lastmonth",
      filterFunction: (film) => isSeenLastMonth(film),
    },
    "filter-unseen": {
      label: "Unseen",
      id: "filter-unseen",
      filterFunction: (film) => (film.watchDate ? false : true),
    },
  };

  const isSeenLastMonth = (film) => {
    if ("watchDate" in film && film.watchDate) {
      // Accessing watchDate only if defined
      const diff = film.watchDate.diff(dayjs(), "month");
      const isLastMonth = diff <= 0 && diff > -1; // last month
      return isLastMonth;
    }
  };

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
    <Container fluid className="App">
      <Navigation />

      <Row className="vh-100">
        <Col md={4} xl={3} bg="light" className="below-nav" id="left-sidebar">
          <Filters
            items={filters}
            selected={activeFilter}
            onSelect={setActiveFilter}
          />
        </Col>

        {/* </Collapse> */}
        <Col md={8} xl={9} className="below-nav">
          <h1 className="pb-3">
            Filter:{" "}
            <span className="notbold">{filters[activeFilter].label}</span>
          </h1>
          <FilmLibrary
            films={films.filter(filters[activeFilter].filterFunction)}
            saveNewFilm={saveNewFilm}
            updateFilm={updateFilm}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
