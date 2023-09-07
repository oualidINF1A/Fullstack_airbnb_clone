import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom'
import AccountNavbar from '../components/AccountNavbar';
import Place from '../components/Place';

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/user-places').then(({data}) => {
      setPlaces(data);
    });
  }, [])

  return (
    <div>
      <AccountNavbar/>
        <div className='text-center'>
          <Link className='inline-flex gap-2 font-bold bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new place
          </Link>
        </div>
        <div className="mt-4">
          {places.length > 0 && places.map(place => (
            <Place place={place} key={place._id}/>
          ))}
        </div>
    </div>
  )
}

export default PlacesPage