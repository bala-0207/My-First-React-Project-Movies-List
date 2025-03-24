import { useState, useEffect } from "react";

import './App.css';

import MovieCard from './Moviecard';

import searchIcon from './search.png';


const API_URL = 'http://www.omdbapi.com?apikey=7d3fa914';

// const movie1 = {

//     "Title": "Iron Man: Armored Adventures",
//     "Year": "2008",
//     "imdbID": "tt0837143",
//     "Type": "series",
//     "Poster": "NA"
// }


const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`); // ✅ Corrected API Call
        const data = await response.json();

        setMovies(data.Search);  // Log the movie search results
    }

    useEffect(() => {
        searchMovies('IRON MAN'); // ✅ Corrected title usage
    }, []);

    return (
        <div className="app">

            <h1>Movies</h1>

            <div className="search">

                <input
                    placeholder="Search Movie"
                    value={searchTerm}  // ✅ Fixed value binding
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) =>
                                (<MovieCard movie={movie} />))}
                        </div>
                    ) :
                    (
                        <div class="emoty">
                            <h2>
                                No Movie Found
                            </h2>
                        </div>
                    )
            }
        </div>
    );
}

export default App;
