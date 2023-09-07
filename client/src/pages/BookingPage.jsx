import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AddressLink from '../components/AddressLink';
import BookedDays from '../components/BookedDays';
import Gallery from '../components/Gallery';

const BookingPage = () => {
    const {id} = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        if(id){
            axios.get('/bookings')
            .then(response => {
                const foundBooking = response.data.find(({_id}) => _id === id);
                if(foundBooking){
                    setBooking(foundBooking);
                }
            });

        };
    }, [id])

    if(!booking){
        return "Loading..."
    }
    

    return (
        <div className='my-8 '>
            <h1 className='text-3xl'>{booking.place.title}</h1>
            <AddressLink className="my-2 block">
                {booking.place.address}
            </AddressLink>

            <div className="border-2 border-primary bg-gray-100 p-6 mb-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className='text-2xl mb-4 '>Booking info:</h2>
                    <BookedDays booking={booking} /> 
                </div>
                <div className="bg-primary text-white p-6 rounded-2xl">
                    <div>Total price</div>
                    <div className='text-3xl'>${booking.price}</div>
                </div>
            </div>
            <Gallery place={booking.place}/>
            <div className='text-xl mt-6 border-2 p-4 rounded-2xl border-primary'>
                {booking.place.description} <br /> <br />
                {booking.place.extraInfo}
            </div>
        </div>
     )
}

export default BookingPage