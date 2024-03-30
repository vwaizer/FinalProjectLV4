import React from 'react'
import { Link } from 'react-router-dom'

const Category = ({href,type,onClick}) => {
  return (
    <div>
      <Link onClick={onClick} to={href}>{type}</Link>
    </div>
  )
}

export default Category
