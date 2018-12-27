import React, { Component } from 'react';
import { Router } from '@reach/router';
import  { connect } from 'react-redux';
import SearchMovie from './components/SearchMovie';
import Details from './components/Details';
import Modal from './components/Modal';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      movieTitle: "",
      showModal: false,
      showFilter: false
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
  };

  toggleModal = () => this.setState({showModal: !this.state.showModal});

  handleInputChange = event => { 
    this.setState({
      movieTitle:event.target.value,
    }) 
    // [{field: title, value: target.value}]
    this.props.filterMovies([{field: 'filterTitle', value: event.target.value}])
  }

  getListFav(){
    const { movies, favorisMovies } = this.props;
   return movies.filter(movie => favorisMovies.includes(movie.id))
  }
  render() {
    const { showModal } = this.state
    const { movies } = this.props;
    const favoriteMoviesObj = this.getListFav();
    return (
      <div className="App">
        <Router>
          <SearchMovie 
            handleInputChange={this.handleInputChange} 
            toggleModal={this.toggleModal}
            movieTitle={this.state.movieTitle}  
            movies={movies} 
            path="/"
          />
          <Details 
            path="/details/:id"  
            moviesID={movies}
          />
        </Router>
        
        {
           (showModal) ? (
            <Modal>
              <h1>Favoris Movies</h1>
              <ul>
               {
                favoriteMoviesObj.map(favMovie => 
                  <li key={favMovie.id}>
                  {favMovie.title}
                  <span onClick={() => this.props.favMovies(favMovie.id)}>
                    {(!this.props.favMoviesID.includes(favMovie.id)) ? '☆' : '★'}
                  </span>
                  </li>
                )
               }
              </ul>
              <button onClick={this.toggleModal}>Close</button>
            </Modal>
            
          ) : null 
        }
      </div>
    );
  }g
}

const mapStateToProps = state => {
  return{
    movies: state.movies,
    initialMovies: state.initialMovies,
    favorisMovies: state.favMovies,
    favMoviesID: state.favMovies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMovies: (movies) => dispatch({type: 'SET_MOVIES', movies: movies, initialMovies: movies}),
    filterMovies: (filters) => dispatch({type: 'FILTER_MOVIES', payload:{filters}}),
    favMovies: (movieID) => dispatch({type: 'FAV_MOVIES', id: movieID})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
