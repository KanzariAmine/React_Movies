import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
class FilterMovies extends Component{

  state = {
    fromDate: '',
    toDate: '',
    filtredMovies:[]
  }

  filterMoviesDate = (e) => {
    e.preventDefault()
     const {fromDate, toDate} = this.state
    this.props.filterMovies([{field:'filterFromDate', value:fromDate}, {field: 'filterToDate', value: toDate}])
    
  }
  handleDateChangeFromDate = (e) =>{
    let fromDate = e.target.value;
    if(!this.state.toDate){
       this.setState({fromDate});
    }
    if(this.state.toDate){
      (moment(fromDate).isBefore(this.state.toDate)) ? alert('Date is not correct') : this.setState({fromDate});
    }
  }
  handleDateChangeToDate = (e) => {
    let toDate = e.target.value;
    if(!this.state.fromDate){
      this.setState({toDate}) 
    }
     if(this.state.fromDate){ (moment(toDate).isAfter(this.state.fromDate)) ? this.setState({toDate}) : alert('Date is not correct');
    }
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
       <button onClick={this.filterMoviesDate}>Apply</button>
       <button onClick={this.props.clearFilter}>Clear</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    listOfMovies: state.initialMovies
  }
}

const mapDispatchToProps = dispatch => {
  return{
    filterMovies: (filters) => dispatch({type: 'FILTER_MOVIES', payload:{filters}}),
    clearFilter: () => dispatch({type: 'CLEAR_FILTER'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterMovies);