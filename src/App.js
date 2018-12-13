import React, { Component } from 'react';
import { Router } from '@reach/router';
import SearchMovie from './components/SearchMovie';
import Details from './components/Details'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      movieTitle: "",
      initalMovies: [],
      movies:[]
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
      this.setState({
        initalMovies: movies,
        movies: movies
      })
  };

  handleInputChange = event => { 
    let movies = this.state.initalMovies.filter(movie => movie.title.toLowerCase().includes(event.target.value.toLowerCase()));
    this.setState({
      movieTitle:event.target.value,
      movies
    }) 
   
  }

  render() {
    const { movies,  } = this.state;
       return (
      <div className="App">
        <Router>
          <SearchMovie handleInputChange={this.handleInputChange} movieTitle={this.state.movieTitle}  movies={movies}path="/"/>
          <Details path="/details/:id"  moviesID={movies}/>
        </Router>
      </div>
    );
  }g
}

export default App;
