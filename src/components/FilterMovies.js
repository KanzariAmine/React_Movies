import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
class FilterMovies extends Component{

  state = {
    fromDate: '',
    toDate: '',
    MoviesListDate:[]
  }

  componentDidMount(){
     let MoviesListDate = this.props.listOfMovies.slice(0, 10).map(movie => movie.release_date);
    this.setState(
      {
        MoviesListDate
      }
    )
    console.log('MoviesListDate', MoviesListDate)
  }
  filterMoviesDate = () => {
    this.state.MoviesListDate.filter(movieDate => (moment(movieDate).isAfter(this.state.fromDate) && moment(movieDate).isBefore(this.state.toDate) ? console.log(movieDate): console.log('not found')));
  }
  // componentWillReceiveProps(nextProps){
  //   console.log('ReciveProps', nextProps)
  // }
  handleDateChangeFromDate = (e) =>{
    let fromDate = e.target.value;
    (moment(fromDate).isBefore(this.state.toDate)) ? alert('Date is not correct') : this.setState({fromDate});
    
  }

  handleDateChangeToDate = (e) => {
    let toDate = e.target.value;
    (moment(toDate).isAfter(this.state.fromDate)) ? this.setState({toDate}) : alert('Date is not correct');
  }
  render(){
    const {fromDate, toDate} = this.state 
    return(
      <div className="container_filter">
        <div className="from">
          <label htmlFor="fromdate">From:</label>
          <input 
              id="fromdate" 
              type="date"  
              value={fromDate}
              data-date-inline-picker="true" 
              onChange={this.handleDateChangeFromDate}
              max={toDate}
              />
        </div>
        
        <div className="to">
          <label htmlFor="todate">To:</label>          
          <input 
            id="todate" 
            type="date"  
            value={toDate}
            data-date-inline-picker="true" 
            onChange={this.handleDateChangeToDate}
            min={fromDate}
            />
        </div>
       
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    listOfMovies: state.initialMovies
  }
}

export default connect(mapStateToProps)(FilterMovies);