import React, { Component, Fragment } from 'react';
import Cards from './Cards';


class SearchMovie extends Component{
  render(){
    const { handleInputChange, movieTitle, movies, toggleModal} = this.props
    return(
      <Fragment>
        <header>
        <h1>React Search Movies</h1>
            <form>
              <input type="text" placeholder="Search Movise..." value={movieTitle} onChange={handleInputChange}/>
              <input type="button" value="Favoris Movies" onClick={ toggleModal}/>
            </form>
        </header>
        <Cards movies={movies}/>
      </Fragment>
    )
  }
}
export default SearchMovie;
