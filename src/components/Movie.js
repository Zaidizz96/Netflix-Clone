import ModalMovie from "./ModalMovie";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import './MovieStyle.css';

function Movie(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  return (
    <div className="card-view">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${props.obj.poster_path}`} />
        <Card.Body>
          <Card.Title>{props.obj.title}</Card.Title>
          <Card.Text>
           <strong>Release Date </strong> : {props.obj.release_date}
          </Card.Text>
          <Button variant="primary" onClick={handleShow}>Add To Favorite</Button>
        </Card.Body>
      </Card>
      <ModalMovie handleClose={handleClose} 
                  handleShow={handleShow} 
                  show={show} 
                  props={props.obj} />
    </div>
  )
}
export default Movie;