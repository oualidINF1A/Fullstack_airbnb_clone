import React from 'react';
import { Link } from 'react-router-dom';
import PlaceImg from './PlaceImg';

const Place = ({place, className=null}) => {
  if(!place.photos?.length) return "No images"

  return (
    <Link to={'/account/places/'+place._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
      <div className="flex w-32 h-32 bg-gray-300 grow shrink-0 overflow-hidden">
        <PlaceImg place={place} index={0}/>
      </div>
      <div className="grow-0 shrink">
        <h2 className="text-xl">{place.title}</h2>
        <p className="text-sm mt-2">{place.description}</p>
      </div>
  </Link>
  )
}

export default Place