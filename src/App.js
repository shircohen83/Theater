import {useState, useEffect } from 'react';
import React from 'react'
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';

//bbf16245

const API_URL= 'http://www.omdbapi.com?apikey=bbf16245'


function App() {
  
  const [movies, setMovies]=useState([]);
  const [searchTerm, setSearchTerm]=useState("");


  const searchMovies= async(title)=>{
    const response= await fetch(`${API_URL}&s=${title}`);//call our api
    const data= await response.json();

    setMovies(data.Search);//the array of movies calles Search
  }
  //called after first loading of the web
   useEffect(()=>{
    searchMovies('Spiderman');
   },[]);


  return (
      <div className='app'>
        <h1>MovieLand</h1>

        <div className='search'>
          <input 
            placeholder='Serch for movies'
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <img 
            src={SearchIcon}
            alt="search"
            onClick={()=>searchMovies(searchTerm)}
          />
        </div>
        {//display movies id there are any
          (movies?.length>0)
            ?(
              <div className='container'>
                {movies.map((movie)=>(<MovieCard movie={movie}/>))}
              </div>
            ):(
              <div className='empty'>
                <h2>no movies found</h2>
              </div>
            )
        }
      
    </div>  
  );
}

export default App;
