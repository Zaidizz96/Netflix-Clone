import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalMovie({handleClose , show , props}) {
  const [comment,setComment] = useState('');

  function handleAddFavorite() {
    console.log(comment);

    // call api to add comment by id 

  }
  
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> {props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img style={{width : '100%' , marginBottom: '5px;' }}  src={`https://image.tmdb.org/t/p/w500${props.poster_path}`} />
          <textarea value={comment} 
                    style={{width : '100%' }}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="What is your comment of this movice"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddFavorite}>
            Add Favorite
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalMovie;