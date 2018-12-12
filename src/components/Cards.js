import React from 'react';
import StarRating from './StarRating';
import { Link } from '@reach/router';


const  Cards = props => {
    const {movies} = props;
    
    return (
      <div className="container">
      {
        movies.slice(0, 10).map(movie => {
         return(
           <div className="card_container" key={movie.id}>
            <Link to={`/details/${movie.id}`} >  
              <img  className="movie-img" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}></img>
            </Link>
            <div className="movie_title">
              <h1>{movie.title}</h1>
            </div>
            <StarRating note={movie.vote_average}/>
            <div className="summary_title">
              <h5>SUMMARY</h5>
              <h5 className="movie_date">{movie.release_date}</h5>
            </div>  
            <div className="summary_des">
              <p className="movie-description">{movie.overview}</p>
            </div>  
         </div>
          )
        })
      }
    </div>
    );
  }

export default Cards;