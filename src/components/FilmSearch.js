import React from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const FilmSearch = (props) => {
    const { onSearch, onReset } = props;
    const [searchText, setSearchText] = useState("");

    return (
        <div className='TopBarButtons'>
            <TextField
                {...props}
                style={{ width: 450, background: true, backgroundColor: 'rgb(252, 244, 246)', borderRadius: 5 }}
                onChange={(e) => {
                    setSearchText(e.target.value);
                }}
                onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                        if (searchText !== "") {
                            onSearch(searchText);
                        } else {
                            onReset();
                        }

                    }
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton edge="end" color="primary" onClick={() => {
                                if (searchText !== "") {
                                    onSearch(searchText);
                                } else {
                                    onReset();
                                }
                            }}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    )
}

export default FilmSearch;