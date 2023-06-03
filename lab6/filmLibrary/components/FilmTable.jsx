import React from "react";
import FILMS from "../src/films";

import dayjs from "dayjs";

function FilmTable(props) {
  const { currentFilter, films } = props;

  return (
    <div className="p-4">
      <h2>{currentFilter}</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Favorite</th>
            <th scope="col">Watch Date</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film) => (
            <Row filmData={film} key={film.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Row(props) {
  const { filmData, key } = props;

  const formatWatchDate = (dayJsDate, format) => {
    return dayJsDate ? dayJsDate.format(format) : "";
  };

  return (
    <tr>
      <td>{filmData.title}</td>
      <td>
        {
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              checked={filmData.favorite}
            />
          </div>
        }
      </td>
      <td>{formatWatchDate(filmData.watchDate, "MMMM D, YYYY")}</td>
      <td>{filmData.rating}</td>
    </tr>
  );
}
export default FilmTable;
