import React from 'react'
import { useGlobalContext } from '../ContextAPI/Context'

const Search = () => 
{
    const {query , setQuery , isError , setMovie , compare} = useGlobalContext();
    const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
    let filterMovie = [];

    const searchMovie = async(movieTitle)=>{

        //Debouncing used -> ?
            setTimeout( async()=>{
            const movies = await fetch(API_URL);
            const data = await movies.json();
            
            for(let i=0 ; i<data.results.length ; i++)
            {
                if( (data.results[i].original_title.toLowerCase()).includes(movieTitle.toLowerCase())){
                    filterMovie.push(data.results[i]);
                }
            }
            console.log(filterMovie)
          
            filterMovie.sort(compare);
            setMovie(filterMovie);
            
        } , 800);
    }

    return(
        <section className='search-section'>
        <h2>Search Your Favourite Movie</h2>
        <form action="#" onSubmit = {(event)=>{event.preventDefault()}}>
            <div>
                <input type = "text"  placeholder='search here'
                    value = {query}

                    onChange = {(e)=>{
                        setQuery(e.target.value);
                        searchMovie(e.target.value);
                    }}
                />
            </div>
        </form>

        <div className='card-error'>
            <p>{isError.show && isError.msg}</p>
        </div>
    </section>
    )
}

export default Search