import React, { useContext, useEffect , useState} from "react";

//fetch data from API------

const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;


const AppContext = React.createContext();

const AppProvider = ({children})=>
{
    function compare (a, b) {
        let partsA = a.release_date.split("-");
        let partsB = b.release_date.split("-");
        if (partsA[0] > partsB[0]) {
            return -1;
        } else if (partsA[0] < partsB[0]) {
            return 1;
        } else {
            if (partsA[1] > partsB[1]) {
                return -1;
            } else if (partsA[1] < partsB[1]) {
                return 1;
            } else {
                if (partsA[2] > partsB[2]) {
                    return -1;
                } else if (partsA[2] < partsB[2]) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
    }
    const [isLoading , setIsLoading] = useState(true);
    const [movie , setMovie] = useState([]);
    const [isError , setIsError] = useState({show:"false" , msg:""});
    const [query , setQuery] = useState("");

    const getMovies = async(url)=>{
        try{
            const movies = await fetch(url);
            const data = await movies.json();
            console.log(data);
            if(data)
            {
                setIsLoading(false);
                data.results.sort(compare);
                setMovie(data.results);
            }
            else{
                setIsError({
                    show : true,
                    msg : data.error
                })
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getMovies(API_URL);
    } , []);

    return <AppContext.Provider value={{isLoading,isError, movie,query, setQuery , setMovie , compare}}>
        {children}
    </AppContext.Provider>
};

//global custom hooks
const useGlobalContext = ()=>{
    return useContext(AppContext);
}
export {AppContext , AppProvider , useGlobalContext};

