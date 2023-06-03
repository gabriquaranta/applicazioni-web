import { useState } from "react";
import Navigation from "../components/Navigation";

import FILMS from "./films";
import FilmTable from "../components/MainContent";

import dayjs from "dayjs";

function App(props) {
  // This state contains the active filter
  const [activeFilter, setActiveFilter] = useState("filter-all");

  const isSeenLastMonth = (film) => {
    if ("watchDate" in film) {
      // Accessing watchDate only if defined
      const diff = film.watchDate.diff(dayjs(), "month");
      const isLastMonth = diff <= 0 && diff > -1; // last month
      return isLastMonth;
    }
  };

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

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <div className="row ">
        <Navigation />
      </div>

      <div className="row flex-grow-1">
        <div className="col-2 bg-light">
          <div className="d-flex flex-column justify-content-center p-4">
            <h2>Views</h2>
            <ul className="nav nav-pills flex-column mt-2" role="tablist">
              <li className="nav-items">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => {
                    setActiveFilter("filter-all");
                  }}
                >
                  All
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => {
                    setActiveFilter("filter-favorite");
                  }}
                >
                  Favorites
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => {
                    setActiveFilter("filter-best");
                  }}
                >
                  Best Rated
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => {
                    setActiveFilter("filter-lastmonth");
                  }}
                >
                  Seen last Month
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => {
                    setActiveFilter("filter-unseen");
                  }}
                >
                  Not Seen
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="col ">
          <FilmTable
            currentFilter={filters[activeFilter].label}
            films={FILMS.filter(filters[activeFilter].filterFunction)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
