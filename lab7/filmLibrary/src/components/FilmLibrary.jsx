import "dayjs";
import { useState } from "react";

import { Table, Form, Button } from "react-bootstrap/";

import FilmForm from "./FilmForm";
import { Link } from "react-router-dom";

function FilmLibrary(props) {
  const filteredFilms = props.films;

  // This state is used for displaying the form
  const [showForm, setShowForm] = useState(false);

  // This state stores the current film when an *edit* button is pressed.
  const [editableFilm, setEditableFilm] = useState();

  return (
    <>
      <Table striped>
        <tbody>
          {filteredFilms.map((film) => (
            <FilmRow
              key={film.id}
              filmData={film}
              setEditableFilm={setEditableFilm}
              setShowForm={setShowForm}
            />
          ))}
        </tbody>
      </Table>
      <Link to="/add" props={props}>
        <Button variant="primary" size="lg" className="fixed-right-bottom">
          &#43;
        </Button>
      </Link>
    </>
  );
}

function FilmRow(props) {
  const formatWatchDate = (dayJsDate, format) => {
    return dayJsDate ? dayJsDate.format(format) : "";
  };

  return (
    <tr>
      <td>
        <Button
          variant="primary"
          onClick={() => {
            props.setShowForm(true);
            props.setEditableFilm(props.filmData);
          }}
        >
          <i className="bi bi-pencil-square" />
        </Button>
      </td>
      <td>
        <p className={props.filmData.favorite ? "favorite" : ""}>
          {props.filmData.title}
        </p>
      </td>
      <td>
        <Form.Check
          type="checkbox"
          disabled={true}
          label="Favorite"
          checked={props.filmData.favorite ? true : false}
        />
      </td>
      <td>
        <small>
          {formatWatchDate(props.filmData.watchDate, "MMMM D, YYYY")}
        </small>
      </td>
      <td>
        <Rating rating={props.filmData.rating} maxStars={5} />
      </td>
    </tr>
  );
}

function Rating(props) {
  return [...Array(props.maxStars)].map((el, index) => (
    <i
      key={index}
      className={index < props.rating ? "bi bi-star-fill" : "bi bi-star"}
    />
  ));
}

export default FilmLibrary;
