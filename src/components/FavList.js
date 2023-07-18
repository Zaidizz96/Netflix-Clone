import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import './MovieStyle.css';

function FavList() {
    const [favMovie, setFavMovie] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        getFavMovies();
    }, []);

    async function getFavMovies() {
        await fetch(`${process.env.REACT_APP_SERVER_URL}/getMovies`).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            throw new Error('Something went wrong');
        }).then((responseJson) => {
            setFavMovie(responseJson);
        }).catch((error) => {
            toast.error(error);
        });
    }

    async function handleDelete(movieId) {
        await fetch(`${process.env.REACT_APP_SERVER_URL}/DELETE/${movieId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.status === 204) {
                toast.success("Movie deleted sucessfully");
            }
            getFavMovies();
        }).catch((error) => {
            toast.error(error);
        });
    }

    async function handleUpdateComment(movieId) {
        let request = {
            comment: comment
        }

        await fetch(`${process.env.REACT_APP_SERVER_URL}/UPDATE/${movieId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        }).then((response) => {
            if (response.status === 200) {
                toast.success("Updated sucessfully");
            }
            getFavMovies();
        }).catch((error) => {
            toast.error(error);
        });
    }

    return (
        <div className='movie-list'>
            {favMovie?.map((movie, index) => (
                <div className="card-view">
                    <Card key={index} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.image_url}`} />
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>
                                <strong>Release Date </strong> : {movie.release_date}
                            </Card.Text>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label></Form.Label>
                                <Form.Control as="textarea"
                                    rows={3}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="write your comment here ..." />
                            </Form.Group>
                            <div className="row">
                                <Button variant="primary" className="btn btn-primary"
                                    value={comment}
                                    onClick={() => handleUpdateComment(movie.id)}> Update comment
                                </Button>
                                <Button variant="primary" className="btn btn-danger" onClick={() => handleDelete(movie.id)}>Delete movie</Button>
                            </div>

                        </Card.Body>
                    </Card>
                </div>

            ))}

        </div>
    )
}
export default FavList;
