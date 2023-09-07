import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddressLink from '../components/AddressLink';
import BookingWidget from '../components/BookingWidget';
import Gallery from '../components/Gallery';

const PlacePage = () => {
    const {id} = useParams();
    const [place, setPlace] = useState([]);


    useEffect(() => {
        if(!id){
            return "Error place not found"
        }

        axios.get(`/places/${id}`).then((response) => {
            setPlace(response.data);
        });

    }, [id]);
    


    
    return (
        <div className='mt-4 p-4 bg-gray-100 -mx-8 pt-8'>
            <h1 className='text-3xl'>{place.title}</h1>

            <AddressLink className="my-3 block">
                {place.address}
            </AddressLink>

            <Gallery place={place}/>

            <div className='mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] '>
                <div>

                    <div className='my-4'> 
                        <h2 className='font-semibold text-2xl'>Description</h2>
                        {place.description}
                    </div>

                    Check in: {place.checkIn} <br/>
                    Check out: {place.checkOut} <br/>
                    Maximum number of guests : {place.maxGuests}
                </div>
                <div>
                    <BookingWidget place={place}/>
                </div>
            </div>
            <div className='bg-white shadow py-4 rounded-2xl border px-8 mt-8'>
                <div>
                    <h2 className='font-semibold text-2xl'>Exra info:</h2>
                </div>
                <div className='mb-4 mt-2 text-gray-700 text-sm leading-5'>
                    {place.extraInfo}
                </div>
            </div>

                    

        </div>
    )
    }

export default PlacePage