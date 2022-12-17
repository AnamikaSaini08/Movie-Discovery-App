import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../ContextAPI/Context';

const Movies = () => {
    const {movie} = useGlobalContext();

    const getPosterPath = (posterPath)=>{
        return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterPath}`;
    }

  return (
    <div>
        <section className='movie-page'>
            <div className='container grid grid-4-col'>
            {movie.map((curMovie)=>{

                const {id , original_title,poster_path , release_date} = curMovie;
                let movieName = original_title.substring(0,15);
                if(original_title.length >= 15)
                    movieName = movieName.concat("...");

                return(
                    <NavLink to={`movie/${id}`} key = {id}>
                        <div className='card'>
                            <div className='card-info'>
                                <h2>{movieName}</h2>
                                <img src={getPosterPath(poster_path)} alt={id} />
                                <h5>{release_date}</h5>
                            </div>
                        </div>
                    </NavLink>
                )
            })}
       
            </div>
        </section>
    </div>
  )
}

export default Movies;