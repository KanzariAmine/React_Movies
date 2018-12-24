const reducer = (state={movies:[], initialMovies:[], favMovies:[]}, action) => {
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
    case 'FAV_MOVIES':
        let  updateFavMoviesArray
        //let obj={id: action.id, title: action.title}
      if(state.favMovies.includes(action.id)){
          updateFavMoviesArray = state.favMovies.filter(id => id !== action.id)
      }else{
          updateFavMoviesArray = state.favMovies.concat(action.id)
      }
      return{
          ...state,
          favMovies: updateFavMoviesArray
      }  
    default:
      return state  
  } 
}

export default reducer;