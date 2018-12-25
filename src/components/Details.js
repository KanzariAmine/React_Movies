import React, { Component } from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import StarRating from './StarRating';

class Details extends Component{
  state = {
    movie:[],
    nextID: ''
  }

  async componentDidMount(){
    const movieID = this.props.id;
    let res = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    let data = await res.json();
  
    this.setState({
      movie: data
    })
  }

 getNextPreviousMovie() {
    const IDs = this.props.initialMovies.slice(0,10).map(movie => movie.id)
     let i = 0
     let found = false;
    while(!found && i < IDs.length){ 
      if (IDs[i] === parseInt(this.props.id)) {
        found = true;     
      }else{
        i++
      }
    }
    if (i === 0) return [IDs[i + 1], false];
    if (i === IDs.length - 1) return [false, IDs[i - 1]];
    return [IDs[i + 1], IDs[i - 1]]
  }
   
  async componentWillReceiveProps(nextProps){
  if(this.props.id !== nextProps.id){
    let res = await fetch(`https://api.themoviedb.org/3/movie/${nextProps.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    let data = await res.json();
  
    this.setState({
      movie: data
    })
  }
}

  
  render(){
    const { movie } = this.state;
    let ID = this.getNextPreviousMovie();
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
            <span onClick={() => this.props.favMovies(movie.id)}>
              {
                (!this.props.favMoviesID.includes(movie.id)) ? '☆' : '★'
              }
            </span>
            <StarRating className="rank" note={movie.vote_average}/>
            <div className="info">
              <ul>
                <li><h2>Date:</h2>{movie.release_date}</li>
                <li><h2>Time: </h2>{movie.runtime} min</li>
                <li><h2>Language:</h2>{movie.original_language}</li>
                <li><h2>Budget:</h2>{movie.budget} USD</li>
              </ul>
            </div>
            <h3>Description</h3>
            <p>{movie.overview}</p>
            </div>
            {
              ID[0] ? 
            <Link to={`/details/${ID[0]}`}>
              <button type="button" value="Next" >Next</button>
            </Link> : <button type="button" value="Next"  disabled>Next</button>
            }
            
            { ID[1] ?
              <Link to={`/details/${ID[1]}`}>
              <button type="button" value="Previous">Previous</button>
             </Link> : <button type="button" value="Previous" disabled>Previous</button>

            }

          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return{
    favMoviesID: state.favMovies,
    initialMovies: state.initialMovies
  }
}
const mapDispatchToProps = dispatch => {
  return {
    favMovies: (movieID) => dispatch({type: 'FAV_MOVIES', id: movieID})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Details)
