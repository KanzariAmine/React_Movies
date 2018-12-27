import moment from 'moment';
const reducer = (state={movies:[], initialMovies:[], favMovies:[], filterType:{filterTitle:'', filterFromDate:'', filterToDate:''}}, action) => {
  switch(action.type){
    case 'SET_MOVIES':
      return{
        ...state,
        movies: state.movies.concat(action.movies),
        initialMovies: state.initialMovies.concat(action.initialMovies)
      }

    case 'FILTER_MOVIES':
      let newState = Object.assign({}, state);
      // let updateMoviesArray;  
      let filtredMovies = state.initialMovies;
      action.payload.filters.map(filter => newState.filterType[filter.field] = filter.value); 

      if(newState.filterType.filterTitle){
        filtredMovies = filtredMovies.filter(movie => movie.title.toLowerCase().includes(newState.filterType.filterTitle));
      }
      if(newState.filterType.filterFromDate && newState.filterType.filterToDate){
        filtredMovies = filtredMovies.filter(movie => moment(movie.release_date).isAfter(newState.filterType.filterFromDate) &&  moment(movie.release_date).isBefore(newState.filterType.filterToDate)); 
      }
      if(newState.filterType.filterFromDate){
        filtredMovies = filtredMovies.filter(movie => moment(movie.release_date).isAfter(newState.filterType.filterFromDate)); 
      }
      if(newState.filterType.filterToDate){
        filtredMovies = filtredMovies.filter(movie => moment(movie.release_date).isBefore(newState.filterType.filterToDate)); 
      }
     
      return{
        ...state,
        movies: filtredMovies
      }  
    case 'CLEAR_FILTER':
    return{
      ...state,
      movies: state.initialMovies
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