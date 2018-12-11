import React, { Component } from 'react';

class SearchMovie extends Component{
  render(){
    const { handleInputChange, movieTitle} = this.props
    return(
      <header>
        <h1>React Search Movies</h1>
          <form>
            <input type="text" placeholder="Search Movise..." value={movieTitle} onChange={handleInputChange}/>
            <input type="button" value="Search"/>
          </form>
       </header>
    )
  }
}
export default SearchMovie;
