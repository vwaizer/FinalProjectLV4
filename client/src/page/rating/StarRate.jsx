import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

const StarRate = () => {
    const [rating, setRating] = useState(null)
    const [color, setColor] = useState(null)
  return (
    <div>
      {[...Array(5)].map((star,index) => {
      const currentRating = index + 1;
        return(
            <>
            <label>
            <input type='radio' name='rate' 
            value={currentRating}
            onClick={() => {setRating(currentRating)}}/>

            <FaStar size={30}
            color={currentRating <= (color || rating) ? "yellow" : "black"}/>
            </label>
            </>
        )
      })}
    </div>
  )
}

export default StarRate
