import React from "react";

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

export default FilmDesc;