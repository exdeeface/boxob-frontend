import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const FilmList = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("/films").then(response => response.json()).then(data => {
            setFilms(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className='Loading'>
                <h1><em>fetching from api...</em></h1>
                <div class="lds-dual-ring"></div>
            </div>
        )
    }

    return (
        <div className='FilmList'>
            <div className='LeftPadding'>

            </div>
            <div className='FilmListContainer'>
                <h1 className='FilmListTitle'>Complete Film List</h1>
                {films.map(film =>
                    <div className='FilmBlock'>
                        <FilmInstance {...film} />
                    </div>
                )}
            </div>
            <div className='Fab'>
                <Fab className="AddButton" color="primary" aria-label="add">
                    <AddIcon />
                </Fab>

            </div>
        </div>
    );
}

export default FilmList;

const FilmInstance = (film) => {
    let [showDetails, setShowDetails] = useState(false);
    let [buttonText, setButtonText] = useState("Expand")
    const navigate = useNavigate();

    return (
        <div className='FilmInstanceContainer'>
            <div className="FilmInstance" key={film.film_id}>
                <div className='FilmStuff'>
                    <h1>{film.film_id}: <a href={"/films/" + film.film_id} onClick={() => {
                        navigate("/films/" + film.film_id);
                    }}>{film.title}</a></h1>
                    <h2><em>Year: {film.release_year}, Rating: {film.rating}</em></h2>
                </div>
                <div className='FilmArt'>
                    <img src={require('../images/missing-image.jpg')} alt='missing poster' />
                </div>
            </div>
            <div className='FilmDescContainer'>
                {showDetails && <FilmDesc {...film} />}
                <button className="DetailsButton" onClick={() => {
                    if (buttonText !== "Expand") {
                        setButtonText("Expand");
                    } else {
                        setButtonText("Hide");
                    }
                    setShowDetails(showDetails = !showDetails);
                }}> {buttonText} </button>
            </div>
        </div>
    )
}

const FilmDesc = (film) => {
    return (
        <div key={film.film_id} className='FilmDesc'>
            <div className='FilmPlot'>
                <h2>Plot:</h2>
                <h4>{film.description}</h4>
            </div>
            <div className='ActorsInFilm'>
                <h3>Cast:</h3>
                <h4>
                    {film.actors.map(
                        (actor, i) => {
                            if (i === film.actors.length - 1) {
                                return (<span>{i + 1}: {actor.first_name} {actor.last_name} </span>)
                            } else {
                                return (<span>{i + 1}: {actor.first_name} {actor.last_name}, </span>)
                            }
                        }
                    )}
                </h4>
            </div>
        </div>
    )
}