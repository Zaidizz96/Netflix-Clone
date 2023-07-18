import { useEffect, useState } from "react";
import MovieList from "./MovieList";
import FavList from "./FavList";

function Home() {
    const [data, setData] = useState([]);
    async function getTrendingMovies() {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/trending`);
        const movies = await response.json();
        setData(movies);
    }

    useEffect(() => {
        getTrendingMovies();
    }, [])

    function commentHandler(newMoviesObj , id){
        data.map((e) => {
            if(e.id === id){
                e.comment = newMoviesObj.userComment; 
                return e;
            }
            else {
                return e;
            }
        })
    }

    return (
        <div > 
            <MovieList commentHandler={commentHandler} data = {data}/>
            <FavList data = {data} />
        </div>
    )
}
export default Home;