import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditFilmForm from './EditFilmForm';
import FilmDesc from './FilmDesc';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';

const FilmInstance = (props) => {
    const { film, onDelete, onEditClose } = props;
    let [showDetails, setShowDetails] = useState(false);
    let [buttonText, setButtonText] = useState("Expand");

    const makeFilmIdHash = () => {
        let value = film.film_id;
        let sum = 0;
        let unit = film.film_id % 10;
        let tens = film.film_id % 100;


        while (value) {
            sum += value % 10;
            value = Math.floor(value / 10);
        }

        let val = sum += Math.abs((unit - tens % 10));
        while (val > 50) {
            val = (val - 50)
        }
        console.log(val);

        return val;
    }
    const [filmIdHash, setFilmIdHash] = useState(makeFilmIdHash);

    const [editFilmOpen, setEditFilmOpen] = useState(false);
    const navigate = useNavigate();

    const handleEditFormClose = () => {
        setEditFilmOpen(false);
    };

    const handleEditFormSubmit = () => {
        setEditFilmOpen(false);
        onEditClose();
    }

    const ColorButton = styled(Button)(({ theme }) => ({
        minWidth: 100,
        backgroundColor: '#202020',
        '&:hover': {
            backgroundColor: '#464646',
        },
    }));

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
                            onSubmit={handleEditFormSubmit}
                            film={film}
                        />
                    </div>
                    <div className='FilmPlot'>
                        <h4>{film.description}</h4>
                    </div>
                    <div className='FilmDescContainer'>
                        {showDetails && <FilmDesc {...film} />}
                        <ColorButton className="DetailsButton" variant="contained" onClick={() => {
                            if (buttonText !== "Expand") {
                                setButtonText("Expand");
                            } else {
                                setButtonText("Hide");
                            }
                            setShowDetails(showDetails = !showDetails);
                        }}>{buttonText}</ColorButton>

                    </div>
                </div>
                <div className='FilmArt'>
                    <img src={require('../images/poster_image_' + filmIdHash + '.jpg')} alt='missing poster' />
                </div>
            </div>
        </div>
    )
}

export default FilmInstance;