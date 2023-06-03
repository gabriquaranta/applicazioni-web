import React from "react";
import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FILMS from "../src/films";

function AddMovie(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary m-4" onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        {/* MODAL HEADER */}
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Add A New Movie</Modal.Title>
        </Modal.Header>
        {/* MODALE BODY */}
        <Modal.Body>
          {/* FORM  */}
          <Form>
            {/* TITLE */}
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>
                Title <span className="text-secondary">*</span>
              </Form.Label>
              <Form.Control type="text" placeholder="Title" />
            </Form.Group>
            {/* FAVORITE */}
            <Form.Group className="mb-3" controlId="favorite">
              <Form.Check type="checkbox" label="Favorite" />
            </Form.Group>
            {/* DATE */}
            <Form.Group className="mb-3 " controlId="date">
              <Form.Label>Watch Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            {/* SCORE */}
            <Form.Group className="mb-3" controlId="favorite">
              <Form.Label>Score</Form.Label>
              <br />
              <Form.Check inline type="radio" label="1" name="score" />
              <Form.Check inline type="radio" label="2" name="score" />
              <Form.Check inline type="radio" label="3" name="score" />
              <Form.Check inline type="radio" label="4" name="score" />
              <Form.Check inline type="radio" label="5" name="score" />
            </Form.Group>
          </Form>

          <small className="text-secondary">* required</small>
        </Modal.Body>
        {/* MODAL FOOTER */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddMovie;
