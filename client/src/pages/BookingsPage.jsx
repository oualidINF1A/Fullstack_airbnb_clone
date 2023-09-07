import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AccountNavbar from '../components/AccountNavbar'
import PlaceImg from '../components/PlaceImg'
import {differenceInCalendarDays, format} from 'date-fns'
import { Link } from 'react-router-dom'
import BookedDays from '../components/BookedDays'

const BookingsPage = () => {
    const [bookings, setBookings] = useState([])
    
    useEffect(() => {
        axios.get('/bookings').then(res => {
            setBookings(res.data)
        })
    }, [])


  return (
    <div>
        <AccountNavbar/>
        <div>
            {bookings?.length > 0 ? bookings.map(booking => (
                <Link to={`/account/bookings/${booking._id}`} 
                key={booking._id} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                    <div className='w-48'>
                        <PlaceImg place={booking.place}/>
                    </div>
                    <div className='py-3 pr-3 flex-grow'>
                        <h2 className='text-xl font-semibold mb-4'> {booking.place.title}</h2>

                        <BookedDays booking={booking} className="border border-t-gray-500 py-2 text-xl" showPrice/>

                    </div>
                </Link>
            )):(
                <div className='w-full h-full flex justify-center items-center'>no bookings</div>
            )}
        </div>
    </div>
  )
}

export default BookingsPage