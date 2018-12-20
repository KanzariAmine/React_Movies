const reducer = (state={movies:[], initialMovies:[]}, action) => {
  switch(action.type){
    case 'SET_MOVIES':
      return{
        ...state,
        movies: state.movies.concat(action.movies),
        initialMovies: state.initialMovies.concat(action.initialMovies)
      }
    case 'FILTER_MOVIES':
      const updateMoviesArray = state.initialMovies.filter(movie => movie.title.toLowerCase().includes(action.title.toLowerCase()))
      return{
        ...state,
        movies: updateMoviesArray
      }  
    default:
      return state  
  } 
}

export default reducer;