import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IndexPagePlace from '../components/IndexPagePlace';

const IndexPage = () => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    axios.get('/places').then((response) => {
      setPlaces(response.data);
    })
  }, [])



  return (
    <div className='mt-16 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {places.length > 0 && places.map((place, index) => (
          <IndexPagePlace placeData={place} key={(place._id, index)}/>
        ))}
    </div>  
    )
}

export default IndexPage