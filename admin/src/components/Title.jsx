import React from 'react'
import './Title.css'
const Title = ({setText}) => {
  return (
    <div>
      <p className='text-heading'>ANGLE ADMIN | {setText}</p>
    </div>
  )
}

export default Title
