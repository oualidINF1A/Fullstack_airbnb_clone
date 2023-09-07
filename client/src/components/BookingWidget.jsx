import React, { useContext, useEffect, useState } from 'react';
import {differenceInCalendarDays} from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const BookingWidget = ({place}) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [redirect, setRedirect] = useState('');
    const user = useContext(UserContext);

    useEffect(() => {
        if (user.user) {
          setName(user.user.name);
         }
      }, [user]);

    let numOfNights = 0;
    if(checkIn && checkOut){
        numOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookPlace(){
        const dataToSend = {
            place: place._id,
            checkIn,
            checkOut,
            guests,
            name,
            phone:phoneNumber,
            price: numOfNights * place.price,
        };
        const response = await axios.post('/bookings', dataToSend);
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }


  return (
        <div> 
            <div className='bg-white shadow p-4 rounded-2xl border'>
                <div className='text-2xl text-center '>
                    Price : ${place.price} /  night
                </div>
                <div className='border border-primary rounded-2xl '>
                        <div className='py-4 px-4 rounded-2xl'>
                            <label>Check in:</label><br />
                            <input required type="date" 
                            value={checkIn} 
                            onChange={((e) => setCheckIn(e.target.value))}/>
                        </div>
                        <div className='py-4 px-4 rounded-2xl'>
                            <label>Check out:</label><br />
                            <input required type="date" 
                            value={checkOut} onChange={((e) => 
                            setCheckOut(e.target.value))}/>
                        </div>     
                    <div className='py-4 px-4 rounded-2xl'>
                            <label>Guests:</label><br />
                            <input required type="number" placeholder='4' 
                            value={guests} 
                            onChange={(e) => setGuests(e.target.value)}/>
                    </div>

                    {numOfNights > 0 && (
                        <>
                        <div className='py-4 px-4 rounded-2xl'>
                            <label>Name:</label><br />
                            <input required type="text" placeholder='John Doe' 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className='py-4 px-4 rounded-2xl'>
                            <label>Phone number:</label><br />
                            <input required type="tel" placeholder='+31612345678' 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)}/>
                        </div>
                        </>

                    )}

                    <button onClick={bookPlace} className='primary mt-4'>
                    {numOfNights > 0 ? (
                            <span>Book for: ${numOfNights * place.price}</span>
                        ):(
                            <span>Fill out form for price</span>
                        )}
                    </button>
                </div>
            </div>
        </div>

  )
}

export default BookingWidget