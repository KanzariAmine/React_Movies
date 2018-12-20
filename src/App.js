import React, { Component } from 'react';
import { Router } from '@reach/router';
import  { connect } from 'react-redux';
import SearchMovie from './components/SearchMovie';
import Details from './components/Details'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      movieTitle: "",
      // initalMovies: [],
      // movies:[]
    }
  }


  async componentDidMount(){
      let response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
      let data =  await response.json();
      let movies;

      if(data && Array.isArray(data.results)) {
        movies = data.results
      }else{
        movies = []
      }
      this.props.setMovies(movies)
      // this.setState({
      //   initalMovies: movies,
      //   movies: movies
      // })
  };

  handleInputChange = event => { 
   // let movies = this.state.initialMovies.filter(movie => movie.title.toLowerCase().includes(event.target.value.toLowerCase()));
    this.setState({
      movieTitle:event.target.value,
     // movies
    }) 
    console.log(this.state.movieTitle)
    this.props.filterMovies(this.state.movieTitle)
   
  }

  render() {
    
    //const { movies } = this.props.movie;
    console.log(this.props.initialMovies)
       return (
      <div className="App">
        <Router>
          <SearchMovie handleInputChange={this.handleInputChange} movieTitle={this.state.movieTitle}  movies={this.props.movie}path="/"/>
          <Details path="/details/:id"  moviesID={movies}/>
        </Router>
      </div>
    );
  }g
}

const mapStateToProps = state => {
  return{
    movie: state.movies,
    initialMovies: state.initialMovies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMovies: (movies) => dispatch({type: 'SET_MOVIES', movies: movies, initialMovies: movies}),
    filterMovies: (movieTitle) => dispatch({type: 'FILTER_MOVIES', title: movieTitle})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
