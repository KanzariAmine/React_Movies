import React from 'react'
//import Rating from 'react-rating'
import ReactStars from 'react-stars'


const StarRating = props => {

  return (
    <ReactStars
      count={8}
      value={props.note}
      size={24}
      color2={'#ffd700'}
      half={true} />
  )
}

export default StarRating