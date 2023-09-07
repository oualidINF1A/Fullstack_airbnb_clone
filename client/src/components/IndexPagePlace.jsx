import React from 'react'
import { Link } from 'react-router-dom'

const IndexPagePlace = ({placeData}) => {
  return (
    <Link to={`/place/${placeData._id}`}>

      <div className='bg-gray-500 rounded-2xl flex mb-1'>
        {placeData.photos[0] && (
          <img className='rounded-2xl object-cover aspect-square' 
          src={`http://localhost:4000/uploads/${placeData.photos[0]}`} alt="" />
        )}

      </div>

      <h2 className='text-sm font-bold truncate leading-5'>
      {placeData.address}
      </h2>
      <h3 className='text-sm text-gray-500'>
      {placeData.title}
      </h3>
      <div className='mt-1'>
        <span className='font-semibold'>${placeData.price}</span> per night
      </div>

    </Link>
  )
}

export default IndexPagePlace