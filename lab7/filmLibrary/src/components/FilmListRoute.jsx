import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";

import { React, useState } from "react";
import { Container, Row, Col } from "react-bootstrap/";

import dayjs from "dayjs";

import { Navigation } from "./Navigation";
import Filters from "./Filters";
import FilmLibrary from "./FilmLibrary";

function FilmListRoute(props) {
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
      filterFunction: (film) => props.film.favorite,
    },
    "filter-best": {
      label: "Best Rated",
      id: "filter-best",
      filterFunction: (film) => props.film.rating >= 5,
    },
    "filter-lastmonth": {
      label: "Seen Last Month",
      id: "filter-lastmonth",
      filterFunction: (film) => isSeenLastMonth(film),
    },
    "filter-unseen": {
      label: "Unseen",
      id: "filter-unseen",
      filterFunction: (film) => (props.film.watchDate ? false : true),
    },
  };

  const isSeenLastMonth = (film) => {
    if ("watchDate" in film && props.film.watchDate) {
      // Accessing watchDate only if defined
      const diff = props.film.watchDate.diff(dayjs(), "month");
      const isLastMonth = diff <= 0 && diff > -1; // last month
      return isLastMonth;
    }
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
            films={props.films.filter(filters[activeFilter].filterFunction)}
            saveNewFilm={props.saveNewFilm}
            updateFilm={props.updateFilm}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default FilmListRoute;
