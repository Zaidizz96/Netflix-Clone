import Movie from './Movie';
import './MovieStyle.css';

function MovieList(props) {
    return (
        <div className='movie-list'>
            {props.data.map((obj, i) => {
                if (obj.title !== undefined || obj.release_date !== undefined) {
                    return <Movie obj={obj} key={i} />
                }
            })}
        </div>

    )
}
export default MovieList;