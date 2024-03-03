import React from 'react'
import './style.css';

const TypeBook = ({href, image, alt,title}) => {
  return (
    <>
      <a href={href}><img src={image} alt={alt} /></a>
      <p>{title}</p>
    </>
  )
}

export default TypeBook
