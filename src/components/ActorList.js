import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ActorList = () => {
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("/actors").then(response => response.json()).then(data => {
            setActors(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className='Loading'>
                <h1><em>fetching from api...</em></h1>
                <div class="lds-dual-ring"></div>
            </div>
        )
    }

    return (
        <div className='ActorList'>
            <h1 className='ActorListTitle'>Complete Actor List</h1>
            {actors.map(
                actor =>
                    <div className='ActorBlock'>
                        <ActorInstance {...actor} />
                    </div>
            )}
        </div>
    );
}

const ActorInstance = (actor) => {
    const navigate = useNavigate();

    return (
        <div className='ActorInstanceContainer'>
            <div className="ActorInstance" key={actor.actor_id}>
                <div className='ActorStuff'>
                    <h1>{actor.actor_id}: <a href={"/actor/" + actor.actor_id} onClick={() => {
                        navigate("/actor/" + actor.actor_id);
                    }}>{actor.first_name + " " + actor.last_name}</a></h1>
                    <h2>number of movies: ???</h2>
                </div>
                <div className='ActorArt'>
                    <img src={require('../images/missing-portrait.jpg')} alt='missing-file' />
                </div>
            </div>
        </div>
    )
}

export default ActorList;