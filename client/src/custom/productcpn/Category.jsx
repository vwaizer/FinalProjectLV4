import React from 'react'

const Category = ({href,type}) => {
  return (
    <div>
      <a href={href}>{type}</a>
    </div>
  )
}

export default Category
