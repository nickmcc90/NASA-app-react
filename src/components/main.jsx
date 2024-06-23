import React from 'react'
import '../styles/main.css'

export default function Main(props) {

  const { data } = props;

  return (
      <div className="img-container">
        <img className="picture" src={data.hdurl} alt={data.title || 'bg-Img'} />
      </div>
  )
}
