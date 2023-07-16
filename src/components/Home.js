import { useEffect, useState } from "react";
import MovieList from "./MovieList";

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

    return (
        <div > 
            <MovieList data = {data}/>
        </div>
    )
}
export default Home;