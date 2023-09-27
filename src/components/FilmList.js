import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddFilmForm from './AddFilmForm';
import EditFilmForm from './EditFilmForm';
import TextField from '@mui/material/TextField';

const FilmList = () => {
    const [films, setFilms] = useState([]);
    const [addFilmOpen, setAddFilmOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setLoading(true);
        //fetch("http://Boxob-Backend-env-1.eba-3dpffdfw.eu-north-1.elasticbeanstalk.com/films")
        fetch("/films").then(response => response.json()).then(data => {
            setFilms(data);
            setLoading(false);
        });
    }, []);

    const deleteFilm = async (film) => {
        console.log(film.index, "/", films.length);
        setLoading(true);
        //fetch("http://Boxob-Backend-env-1.eba-3dpffdfw.eu-north-1.elasticbeanstalk.com
        await fetch("/films/delete/" + film.film_id, {
            method: "DELETE",
        })

        setLoading(false);

        films.splice(films.indexOf(film), 1);
        console.log(films.length);
    }

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
            <div className='TopBar'>
                <h1 className='FilmListTitle'>Complete Film List</h1>
                <div className='TopBarButtons'>
                    <TextField id="search" label="Search" variant="outlined" style={{ width: 450, background: true, backgroundColor: 'rgb(252, 244, 246)', borderRadius: 5 }}
                        onChange={e => {

                        }} />

                </div>
            </div>
            <div className='LeftPadding' />
            <div className='FilmListContainer'>
                <Fab className="AddButton" color="primary" aria-label="add" onClick={() => { setAddFilmOpen(true); }}>
                    <AddIcon />
                </Fab>
                <AddFilmForm
                    open={addFilmOpen}
                    onClose={handleClose}
                />
                {films.map(
                    (film, i) => {
                        film.index = i + 1;
                        return (
                            <div className='FilmBlock' key={film.film_id}>
                                {film && <FilmInstance
                                    film={film}
                                    onDelete={(film) => {
                                        deleteFilm(film);
                                    }}
                                />}
                            </div>
                        )
                    }
                )}
                <div>
                    <p className='FooterText'>some hidden text</p>
                </div>
            </div>
        </div>

    );
}

export default FilmList;

const FilmInstance = (props) => {
    const { film, onDelete } = props;
    let [showDetails, setShowDetails] = useState(false);
    let [buttonText, setButtonText] = useState("Expand");

    const [editFilmOpen, setEditFilmOpen] = useState(false);
    const navigate = useNavigate();

    const handleEditFormClose = () => {
        setEditFilmOpen(false);
    };

    return (
        <div className='FilmInstanceContainer'>
            <div className="FilmInstance" key={film.film_id}>
                <div className='FilmStuff'>
                    <div className='IHateCss'>
                        <div className='FilmTitleContainer'>
                            <h2>{film.index}: <a href={"/films/" + film.film_id} onClick={() => {
                                navigate("/films/" + film.film_id);
                            }}>{film.title}</a> {"(" + film.release_year + ")"}</h2>
                            <h3><em>Genre:</em> {film.categories[0].name}, <em>Rated:</em> {film.rating}</h3>
                        </div>
                        <div className='ButtonContainer'>
                            <IconButton aria-label="delete" size="large" >
                                <Delete onClick={() => {
                                    onDelete(film);
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
                        <h4>{film.description}</h4>
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

    const getLanguage = (language_id) => {
        switch (language_id) {
            case 1: return "English";
            case 2: return "Italian";
            case 3: return "Japanese";
            case 4: return "Mandarin";
            case 5: return "French";
            case 6: return "German";
            default: return "English";
        }
    }

    if (film.special_features && film.actors) {
        return (
            <div key={film.film_id} className='FilmDescContainer'>
                <div className='FilmDesc'>
                    <h5><em>Language: </em> {getLanguage(film.language_id)}<br />
                        <em>Run Time: </em> {film.length} mins <br />
                        <em>Cast: </em>
                        {film.actors.map(
                            (actor, i) => {
                                fixCasing(actor);
                                if (i < film.actors.length - 1) { return (<span>{actor.first_name} {actor.last_name}, </span>); }
                                else { return (<span>{actor.first_name} {actor.last_name} </span>); }
                            },
                        )}
                        <br />
                        <em>Special Features: </em>
                        {film.special_features.map(
                            (feature, i) => {
                                if (i < film.special_features.length - 1) { return (<span>{feature}, </span>); }
                                else { return (<span>{feature} </span>); }
                            },
                        )}
                    </h5>
                </div>
            </div>
        )
    } else {
        return (
            <div key={film.film_id} className='FilmDescContainer'>
                <div className='FilmDesc'>
                    <h5><em>Language: </em> {getLanguage(film.language_id)} </h5>
                    <h5><em>Run Time: </em> {film.length} mins</h5>
                    <h5><em>Cast:</em> None Available</h5>
                    <h5><em>Special Features:</em> None Available</h5>
                </div>
            </div>
        )
    }
}