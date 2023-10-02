import { useState, useEffect } from 'react';
import React from 'react';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddFilmForm from './AddFilmForm';
import FilmSearch from './FilmSearch';
import FilmInstance from './FilmInstance';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FilmList = () => {
    const [films, setFilms] = useState([]);
    const [shownFilms, setShownFilms] = useState([]);
    const [addFilmOpen, setAddFilmOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [showFilmSuccess, setShowFilmSuccess] = useState(false);

    useEffect(() => {
        const fetchFilms = async () => {
            setLoading(true);
            await fetch("https://graeme.fergcb.uk/films").then(response => response.json()).then(data => {
                //fetch("http://localhost:8080/films").then(response => response.json()).then(data => {
                setFilms(data);
                setShownFilms(data);
                setLoading(false);
                setShowFilmSuccess(true);
            });
        }
        fetchFilms();
    }, [refresh]);

    const deleteFilm = async (film) => {
        console.log(film.index, "/", films.length);
        setLoading(true);
        await fetch("https://graeme.fergcb.uk/films/delete/" + film.film_id, {
            //await fetch("http://localhost:8080/films/delete/" + film.film_id, {
            method: "DELETE",
        })

        setLoading(false);

        films.splice(films.indexOf(film), 1);
        console.log(films.length);
    }

    const handleToasterClose = () => {
        setShowFilmSuccess(false);
    }

    const handleAddButtonClose = () => {
        console.log(refresh);
        setRefresh(!refresh);
        console.log(refresh);
        setAddFilmOpen(false);
    };

    const filterFilms = (searchParam) => {
        let search = searchParam.toLowerCase();
        let newArray = films.filter((film) => film.title.toLowerCase().includes(search));

        newArray = [...newArray, ...films.filter((film) => !newArray.includes(film) && film.description.toLowerCase().includes(search))]
        newArray = [...newArray, ...films.filter((film) => !newArray.includes(film) && film.categories[0].name.toLowerCase().includes(search))]

        setShownFilms(newArray);
    }

    const resetFilter = () => {
        setShownFilms(films);
    }

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
                <FilmSearch
                    onSearch={filterFilms}
                    onReset={resetFilter} />
            </div>
            <div className='LeftPadding' />
            <div className='FilmListContainer'>
                <Fab className="AddButton" color="primary" aria-label="add" onClick={() => { setAddFilmOpen(true); }}>
                    <AddIcon />
                </Fab>
                <AddFilmForm
                    open={addFilmOpen}
                    onClose={handleAddButtonClose}
                />
                {shownFilms.map(
                    (film, i) => {
                        film.index = i + 1;
                        return (
                            <div className='FilmBlock' key={film.film_id}>
                                {film && <FilmInstance
                                    film={film}
                                    onDelete={(film) => {
                                        deleteFilm(film);
                                    }}
                                    onEditClose={() => {
                                        setRefresh(!refresh);
                                    }}
                                />}
                            </div>
                        )
                    }
                )}
                <div> <p className='FooterText'>some hidden text</p> </div>
            </div>
            <Snackbar open={showFilmSuccess} autoHideDuration={3000} onClose={handleToasterClose}>
                <Alert onClose={handleToasterClose} severity="success" sx={{ width: '200px' }}>
                    Database request successful
                </Alert>
            </Snackbar>
        </div>

    );
}

export default FilmList;