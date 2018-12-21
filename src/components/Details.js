import React, { Component } from 'react';
import { Link } from '@reach/router';
import StarRating from './StarRating';

class Details extends Component{
  state = {
    movie:[]
  }

  async componentDidMount(){
    const movieID = this.props.id;
    let res = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    let data = await res.json();
  
    this.setState({
      movie: data
    })
    
  }
  render(){
    const { movie } = this.state
    console.log(movie)
    return(
      <div>
        <Link to="/"><h1>React Search Movies</h1></Link> 
        <div className="container">
          <div className="row">
            <div className="col-md-4" >
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}/>            
            </div>
            <div className="col-md-6">
            <h1>{movie.title}</h1>
            <StarRating className="rank" note={movie.vote_average}/>
            <div className="info">
              <ul>
                <li><h2>Date:</h2>{movie.release_date}</li>
                <li><h2>Time: </h2>{movie.runtime} min</li>
                <li><h2>Language:</h2>{movie.original_language}</li>
                <li><h2>Budget:</h2>{movie.budget} USD</li>
                {
                  console.log(movie.genres)
                }
              </ul>
            </div>
            <h3>Description</h3>
            <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Details
