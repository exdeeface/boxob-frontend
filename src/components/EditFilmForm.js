import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

const EditFilmForm = (props) => {
    const { onClose, onSubmit, open, film } = props;
    const [title, setTitle] = useState(film.title);
    const [description, setDescription] = useState(film.description);
    const [release_year, setReleaseYear] = useState(film.release_year);
    const [language_id, setLanguageId] = useState(film.language_id);;
    const [length, setLength] = useState(film.length);
    const [rating, setRating] = useState(film.rating);
    const [category, setCategory] = useState(film.categories[0].category_id);

    const handleRatingChange = (event) => { setRating(event.target.value); };
    const handleCategoryChange = (event) => { setCategory(event.target.value); };
    const handleLanaguageChange = (event) => { setLanguageId(event.target.value); };
    const handleClose = () => { onClose(); };
    const handleSubmit = () => { onSubmit() };

    const updateFilm = () => {
        fetch("https://graeme.fergcb.ukfilms/update/" + film.film_id, {
            method: "PUT",
            body: JSON.stringify({
                "film_id": film.film_id,
                "title": title,
                "description": description,
                "length": length,
                "release_year": release_year,
                "rating": rating,
                "language_id": language_id,
                "rental_duration": film.rental_duration,
                "rental_rate": film.rental_rate,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })

        fetch("film_category/update", {
            method: "PUT",
            body: JSON.stringify({
                "filmCategoryId": {
                    "film_id": film.film_id,
                    "category_id": category
                }
             }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
    }

    return (
        <div>
            <Dialog fullWidth={true} maxWidth={'sm'} open={open} onClose={handleClose} className='EditFilmForm'>
                <DialogTitle>Edit Movie Details</DialogTitle>
                <List sx={{ padding: 2 }}>
                    <ListItem disableGutters>
                        <TextField id="outlined-basic" label={"Title"} placeholder={title} variant="outlined" style={{ width: 300 }}
                            onChange={e => {
                                setTitle(e.target.value);
                            }} />
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <TextField id="outlined-basic" label="Year" placeholder={film.release_year} variant="outlined" style={{ width: 120 }}
                            onChange={e => {
                                setReleaseYear(e.target.value);
                            }} />
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <TextField id="outlined-basic" label="Runtime" placeholder={film.length} variant="outlined" style={{ width: 120 }}
                            onChange={e => {
                                setLength(e.target.value);
                            }} />
                    </ListItem>
                    <ListItem disableGutters>
                        <TextField id="outlined-basic" label="Description" placeholder={film.description} multiline variant="outlined" fullWidth
                            onChange={e => {
                                setDescription(e.target.value);
                            }} />
                    </ListItem>
                    <ListItem disableGutters>
                        <FormControl sx={{ minWidth: 178 }}>
                            <InputLabel id="RatingInput">Rating</InputLabel>
                            <Select
                                labelId="ratingsLabel"
                                id="ratings"
                                value={rating}
                                label="Rating"
                                onChange={handleRatingChange}
                            >   <MenuItem value={"G"}>G</MenuItem>
                                <MenuItem value={"PG"}>PG</MenuItem>
                                <MenuItem value={"PG-13"}>PG-13</MenuItem>
                                <MenuItem value={"NC-17"}>NC-17</MenuItem>
                                <MenuItem value={"R"}>R</MenuItem>
                            </Select>
                        </FormControl>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <FormControl sx={{ minWidth: 178 }}>
                            <InputLabel id="CategoryInput">Category</InputLabel>
                            <Select
                                labelId="catlabel"
                                id="categories"
                                value={category}
                                label="Category"
                                onChange={handleCategoryChange}
                            >   <MenuItem value={"1"}>Action</MenuItem>
                                <MenuItem value={"2"}>Animation</MenuItem>
                                <MenuItem value={"3"}>Children</MenuItem>
                                <MenuItem value={"4"}>Classics</MenuItem>
                                <MenuItem value={"5"}>Comedy</MenuItem>
                                <MenuItem value={"6"}>Documentary</MenuItem>
                                <MenuItem value={"7"}>Drama</MenuItem>
                                <MenuItem value={"8"}>Family</MenuItem>
                                <MenuItem value={"9"}>Foreign</MenuItem>
                                <MenuItem value={"10"}>Games</MenuItem>
                                <MenuItem value={"11"}>Horror</MenuItem>
                                <MenuItem value={"12"}>Music</MenuItem>
                                <MenuItem value={"13"}>New</MenuItem>
                                <MenuItem value={"14"}>Sci-Fi</MenuItem>
                                <MenuItem value={"15"}>Sports</MenuItem>
                                <MenuItem value={"16"}>Travel</MenuItem>
                            </Select>
                        </FormControl>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <FormControl sx={{ minWidth: 180 }}>
                            <InputLabel id="LanguageInput">Language</InputLabel>
                            <Select
                                labelId="catlabel"
                                id="language"
                                value={language_id}
                                label="Language"
                                onChange={handleLanaguageChange}
                            >   <MenuItem value={"1"}>English</MenuItem>
                                <MenuItem value={"2"}>Italian</MenuItem>
                                <MenuItem value={"3"}>Japanese</MenuItem>
                                <MenuItem value={"4"}>Mandarin</MenuItem>
                                <MenuItem value={"5"}>French</MenuItem>
                                <MenuItem value={"6"}>German</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemButton autoFocus onClick={() => {
                            updateFilm();
                            handleClose();
                        }}>
                            <ListItemAvatar>
                                <Avatar>
                                    <AddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Submit" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}

EditFilmForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};


export default EditFilmForm;