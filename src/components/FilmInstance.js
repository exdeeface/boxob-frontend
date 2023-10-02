import React from "react";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditFilmForm from './EditFilmForm';
import FilmDesc from './FilmDesc';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ConfirmDelete from "./ConfirmDelete";

const FilmInstance = (props) => {
    const { film, onDelete, onEditClose } = props;
    let [showDetails, setShowDetails] = useState(false);
    let [buttonText, setButtonText] = useState("Expand");
    const [editFilmOpen, setEditFilmOpen] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const [filmIdHash] = useState(() => {
        let value = film.film_id;
        let sum = 0;
        let unit = film.film_id % 10;
        let tens = film.film_id % 100;

        while (value) {
            sum += value % 10;
            value = Math.floor(value / 10);
        }

        let val = sum += Math.abs((3 * unit - 2 * tens % 10));
        while (val > 50) { val = (val - 50) }

        return val;
    });

    const handleEditFormClose = () => {
        setEditFilmOpen(false);
    };

    const handleEditFormSubmit = () => {
        setEditFilmOpen(false);
        onEditClose();
    }

    const ColorButton = styled(Button)(() => ({
        minWidth: 100,
        backgroundColor: '#202020',
        '&:hover': { backgroundColor: '#464646' }
    }));

    return (
        <div className='FilmInstanceContainer'>
            <div className="FilmInstance" key={film.film_id}>
                <div className='FilmInfoContainer'>
                    <div className='FilmInfo'>
                        <div className='FilmTitleContainer'>
                            <h2>{film.index}: {film.title} {"(" + film.release_year + ")"}</h2>
                            <h3><em>Genre:</em> {film.categories[0].name}, <em>Rated:</em> {film.rating}</h3>
                        </div>
                        <div className='ButtonContainer'>
                            <ConfirmDelete open={showConfirmDelete} confirm={() => {
                                onDelete(film)
                            }}
                                onClose={() => setShowConfirmDelete(false)} />
                            <IconButton aria-label="delete" size="large" >
                                <Delete onClick={() => {
                                    setShowConfirmDelete(true);
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
                            onSubmit={() => {
                                handleEditFormSubmit();
                            }}
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