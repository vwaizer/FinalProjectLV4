import React from 'react'
import { Link } from 'react-router-dom'

const Category = ({href,type,onClick,value}) => {
  return (
    <div>
      <Link defaultValue={value} onClick={onClick} to={href}>{type}</Link>
    </div>
  )
}

export default Category
