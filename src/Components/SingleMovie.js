import React from 'react'
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../ContextAPI/Context';
import './popup.css';

const SingleMovie = () => {

    //get id from url -> usePramas() hooks
    const {id} = useParams();
    const {movie} = useGlobalContext();
    let object =  {};
    for(let i=0 ; i<movie.length ; i++)
    {
      if(movie[i].id == id){
        object = movie[i];
        break;
      }
    }

  return (
   
    <div className='container'>

      <div className='container_one'>
        <h1>{object.original_title}</h1><br/>
        <p>{object.overview}</p>
      </div>

      <div className='container_two'>
        <h3>Release Date</h3>
        <h5>{object.release_date}</h5>
      </div>
    </div>
    
  )
}

export default SingleMovie