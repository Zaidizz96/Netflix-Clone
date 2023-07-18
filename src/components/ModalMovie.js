import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

function ModalMovie({ handleClose, show, props, commentHandler }) {
  const refComment = useRef();
  const [savedComment, setSavedComment] = useState(" ")

  function handleSubmit(e) {
    e.preventDefault();
    const userComment = refComment.current.value;
    const newMoviesObj = { ...props, userComment }
    commentHandler(newMoviesObj, newMoviesObj.id)
    setSavedComment(userComment);
    console.log(savedComment);

  }

  async function handleAddFavorite(e) {
    e.preventDefault();

    // if (checkMovieExistInFav(props.id)) {
    //   toast.warn('This Movie is already added before');
    //   return;
    // }

    let request =
    {
      moviesID: props.id,
      title: props.title,
      release_date: props.release_date,
      overview: props.overview,
      comment: props.comment,
      image_url: props.poster_path
    }

    await fetch(`${process.env.REACT_APP_SERVER_URL}/addMovie`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    }).then(response => {
      if (response.status === 201) {
        toast.success("Movie added sucessfully");
        handleClose();
      }
    }).catch(error => {
      toast.error(error);
    });
  }

  async function checkMovieExistInFav(movieId) {
    return await fetch(`${process.env.REACT_APP_SERVER_URL}/getMovie/${movieId}`).then((response) => {
      if (response.status === 200 && 
          Object.keys(response).length > 0) {
        return true;
      } else {
        return false;
      }

    }).catch((error) => {
        toast.error(error);
        return false;
      });
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> {props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img style={{ width: '100%', marginBottom: '5px' }} src={`https://image.tmdb.org/t/p/w500${props.poster_path}`} />

          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="commentId">
              <Form.Label></Form.Label>
              <Form.Control ref={refComment} as="textarea" rows={3} placeholder="write your comment here ..." />
            </Form.Group>

            <Button variant="primary" type="submit" >
              Submit
            </Button><br /><br />

            <Form.Label>{props.comment ? 'Comment submited : ' + props.comment : 'No Comment Added'}</Form.Label>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button onClick={(e) => handleAddFavorite(e)} variant="primary" >Add Favorite</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalMovie;