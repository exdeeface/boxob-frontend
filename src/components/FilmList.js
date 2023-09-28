import { useState, useEffect } from 'react';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddFilmForm from './AddFilmForm';
import FilmSearch from './FilmSearch';
import FilmInstance from './FilmInstance';

const FilmList = () => {
    const [films, setFilms] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [shownFilms, setShownFilms] = useState([]);
    const [addFilmOpen, setAddFilmOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    let [pageNumber, setPageNumber] = useState(1);
    let [maxPages, setMaxPages] = useState(0);
    const [resultsPerPage, setResultsPerPage] = useState(50);

    useEffect(() => {
        setLoading(true);
        fetch("https://graeme.fergcb.uk/films").then(response => response.json()).then(data => {
            const slicedData = data.slice((pageNumber - 1) * resultsPerPage, pageNumber * resultsPerPage);
            setFilms(data);
            setShownFilms(slicedData);
            setLoading(false);
            let x = Math.ceil(films.length / resultsPerPage);
            setMaxPages(x);
        });
    }, []);

    const handlePageChange = (pageNum) => {
        setPageNumber(maxPages);
        const slicedData = films.slice((pageNum - 1) * resultsPerPage, pageNum * resultsPerPage);
        setShownFilms(slicedData);
    }

    const deleteFilm = async (film) => {
        console.log(film.index, "/", films.length);
        setLoading(true);
        await fetch("https://graeme.fergcb.uk/films/delete/" + film.film_id, {
            method: "DELETE",
        })

        setLoading(false);

        films.splice(films.indexOf(film), 1);
        console.log(films.length);
    }

    const handleAddButtonClose = () => {
        setRefresh(!refresh);
        setAddFilmOpen(false);
    };

    const filterFilms = (searchParam) => {
        let search = searchParam.toLowerCase();
        const newArray = films.filter((film) => {
            if (film.title.toLowerCase().includes(search)) { return film; }
            if (film.categories[0].name.toLowerCase().includes(search)) { return film; }
            if (film.rating.toLowerCase().includes(search)) { return film };
        });
        setSearchResults(newArray);
        const splicedArray = searchResults.slice((pageNumber - 1) * resultsPerPage, pageNumber * resultsPerPage);
        setShownFilms(splicedArray);
    }

    const resetFilter = () => {
        const slicedData = films.slice((pageNumber - 1) * resultsPerPage, pageNumber * resultsPerPage);
        setShownFilms(slicedData);
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
                <div>
                    <h3><a href="" onClick={() => {
                        handlePageChange(maxPages);
                    }}>LAST</a></h3>
                </div>
                <div> <p className='FooterText'>some hidden text</p> </div>
            </div>
        </div>

    );
}

export default FilmList;