import React, { Component, Fragment } from 'react';
import FilterMovies from './FilterMovies'
import Cards from './Cards';


class SearchMovie extends Component{
state = {
  showFilter: false,
}
 
toggleFilter = () => this.setState({showFilter: !this.state.showFilter})

  render(){
    const { showFilter } = this.state;
    const { handleInputChange, movieTitle, movies, toggleModal} = this.props;
    return(
      <Fragment>
        <header>
        <h1>React Search Movies</h1>
            <form>
              <input type="text" placeholder="Quick Search Movise..." value={movieTitle} onChange={handleInputChange}/>
              <input type="button" value="Favoris Movies" onClick={ toggleModal}/>
              <input type="button" value="Filter" onClick={this.toggleFilter}/>
              {
                (showFilter) ? <FilterMovies/> : null
              }
            </form>
        </header>
        <Cards movies={movies}/>
      </Fragment>
    )
  }
}
export default SearchMovie;
