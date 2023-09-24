import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import PopupForm from './PopupForm';
import EditFilmForm from './EditFilmForm';

const FilmList = () => {
    const [films, setFilms] = useState([]);
    const [addFilmOpen, setAddFilmOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("/films").then(response => response.json()).then(data => {
            setFilms(data);
            setLoading(false);
        });
    }, []);

    const handleClose = () => {
        setAddFilmOpen(false);
    };

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
                {films.map(
                    (film, i) => {
                        film.index = i + 1;
                        return (
                            <div className='FilmBlock'>
                                <FilmInstance {...film} />
                            </div>
                        )
                    }
                )}
            </div>
            <div className='Fab'>
                <Fab className="AddButton" color="primary" aria-label="add" onClick={() => {
                    setAddFilmOpen(true);
                }}>
                    <AddIcon />
                </Fab>
            </div>
            <PopupForm
                open={addFilmOpen}
                onClose={handleClose}
            />
        </div>
    );
}

export default FilmList;

const FilmInstance = (film) => {
    let [showDetails, setShowDetails] = useState(false);
    let [buttonText, setButtonText] = useState("Expand")
    const [editFilmOpen, setEditFilmOpen] = useState(false);
    const navigate = useNavigate();

    const handleEditFormClose = () => {
        setEditFilmOpen(false);
    };

    const deleteFilm = (film) => {
        fetch(`films/delete/${film.film_id}`, {
            method: "DELETE",
        })
            .then(response => {
                response.json();
                console.log(response);
            })
    }

    return (
        <div className='FilmInstanceContainer'>
            <div className="FilmInstance" key={film.film_id}>
                <div className='FilmStuff'>
                    <div className='IHateCss'>
                        <div className='FilmTitleContainer'>
                            <h2>{film.index}: <a href={"/films/" + film.film_id} onClick={() => {
                                navigate("/films/" + film.film_id);
                            }}>{film.title}</a></h2>
                            <h3><em>{film.release_year}</em>, <em>{film.rating}</em>, <em>{film.length}</em> mins</h3>
                        </div>
                        <div className='ButtonContainer'>
                            <IconButton aria-label="delete" size="large" >
                                <Delete onClick={() => {
                                    deleteFilm(film);
                                }} />
                            </IconButton>
                            <IconButton aria-label="delete" size="large" onClick={() => {
                                setEditFilmOpen(true);
                            }}>
                                <EditIcon />
                            </IconButton>
                        </div>
                        <EditFilmForm
                            open={editFilmOpen}
                            onClose={handleEditFormClose}
                            film={film}
                        />
                    </div>
                    <div className='FilmPlot'>
                        <h4>Plot:<br></br>{film.description}</h4>
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
                <div className='FilmArt'>
                    <img src={require('../images/missing-image.jpg')} alt='missing poster' />
                </div>
            </div>
        </div>
    )
}

const FilmDesc = (film) => {
    function fixCasing(actor) {
        actor.first_name = actor.first_name.toLowerCase();
        actor.first_name = actor.first_name.charAt(0).toUpperCase() + actor.first_name.slice(1);
        actor.last_name = actor.last_name.toLowerCase();
        actor.last_name = actor.last_name.charAt(0).toUpperCase() + actor.last_name.slice(1);
    }

    return (
        <div key={film.film_id} className='FilmDesc'>
            <div className='ActorsInFilm'>
                <h4>Cast:<br></br>
                    {film.actors.map(
                        (actor, i) => {
                            fixCasing(actor);
                            if (i <= 3) {
                                return (<span>{i + 1}: {actor.first_name} {actor.last_name} </span>)
                            }
                        },

                    )}
                    <em>and {film.actors.length - 3} more. </em></h4>
            </div>
        </div>
    )
}