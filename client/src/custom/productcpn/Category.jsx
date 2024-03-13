import React from 'react'
import { Link } from 'react-router-dom'

const Category = ({href,type}) => {
  return (
    <div>
      <Link to={href}>{type}</Link>
    </div>
  )
}

export default Category
