import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function FilmComplex() {
  const [loading, setLoading] = useState(false);
  const [film, setFilm] = useState([]);
  const { film_id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch("/films/" + film_id).then(response => response.json()).then(data => {
      setFilm(data);
      setLoading(false);
    });

  }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  if (loading) {
    return (
      <div>
        <h1 className='LoadingText'><em>fetching from api...</em></h1>
        <div class="lds-dual-ring"></div>
      </div>
    )
  }

  return (
    <div className="FilmComplex">
      <h1>{film.film_id}: {film.title}</h1>
      <h1>{film.release_year}</h1>
      <h1>{film.rating}</h1>
      <h1>{film.rental_rate} for {film.rental_duration} days rental</h1>
      <h1>{film.length} minutes</h1>
      <h1>{film.special_features.length}</h1>
      
    </div>
  )
}

export default FilmComplex;