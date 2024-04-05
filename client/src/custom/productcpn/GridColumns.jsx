import React from 'react'
import './style.product.css'
import grid1 from '../../assets/img/grid/grid1.png'
import grid2 from '../../assets/img/grid/grid2.png'
import grid3 from '../../assets/img/grid/grid3.png'
import grid4 from '../../assets/img/grid/grid4.png'
const GridColumns = () => {
  return (
    <div className='grid_custom'>
      <input type='radio' name='grid' id='grid-1' value='1' />
      <input type='radio' name='grid' id='grid-2' value='2' />
      <input type='radio' name='grid' id='grid-3' value='3' />
      <input type='radio' name='grid' id='grid-4' value='4' /> 
      <div className="filterGrid">
        <label htmlFor='grid-1'><img src={grid1}/></label> 
        <label htmlFor='grid-2'><img src={grid2}/></label> 
        <label htmlFor='grid-3'><img src={grid3}/></label> 
        <label htmlFor='grid-4'><img src={grid4}/></label> 
      </div>
    </div>
  )
}

export default GridColumns
