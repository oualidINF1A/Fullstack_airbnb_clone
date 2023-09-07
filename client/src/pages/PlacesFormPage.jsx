import React, { useEffect, useState } from 'react';
import PhotosUploader from '../components/PhotosUploader';
import Perks from '../components/Perks';
import AccountNavbar from '../components/AccountNavbar';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PlacesFormPage = () => {
    const {id}= useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] =  useState(1);
    const [price, setPrice] =  useState(50);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
      if(!id){
        return;
      }
      axios.get(`/places/${id}`)
        .then(response => {
          const {data} = response;
          setTitle(data.title);
          setAddress(data.address);
          setAddedPhotos(data.photos);
          setDescription(data.description);
          setPerks(data.perks);
          setExtraInfo(data.extraInfo);
          setCheckIn(data.checkIn);
          setCheckOut(data.checkOut);
          setMaxGuests(data.maxGuests);
          setPrice(data.price)
          
        });
    },[id])

    function inputHeader(title){
        return (
          <h2 className='text-xl mt-4'>{title}</h2>
        )
      }
    
      function inputDescription(text){
        return (
          <p className='text-gray-500 text-sm'>{text}</p>
        )
      }
    
      function preInput(title, text){
        return(
          <>
          {inputHeader(title)}
          {inputDescription(text)}
          </>
        )
      }
    
      async function savePlace(e){
        e.preventDefault();
        const placeData = {
          title, address, addedPhotos, 
          description, perks, extraInfo, 
          checkIn, checkOut, maxGuests, price}
        
        if(id){
          //update place
          await axios.put('/places', {
            id, ...placeData
          });
            setRedirect(true);
        }else{
          //create place
          await axios.post('/places', placeData);
            setRedirect(true);
        }



      } 

    
      if(redirect){
        return <Navigate to={'/account/places'} />
      }


  return (
        <div>
          <AccountNavbar/>
          <form onSubmit={savePlace}>
            {preInput('Title','The way you want to display your accomodation.' )}
            <input type="text" value={title} 
            onChange={(e) => setTitle(e.target.value)}  
            placeholder='title, for example: My 2 bedroom bungalow.'/>

            {preInput('Address','The location of your accomodation.' )}
            <input type="text" value={address} 
            onChange={(e) => setAddress(e.target.value)}  
            placeholder='address'/>          
          

            {preInput('Photos', 'The more photos the better the customer understands the accomodation.')}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>


            {preInput('Description', 'Describe the accomodation in appropriate detail.')}
            <textarea value={description} 
            onChange={e => setDescription(e.target.value)} />

            {preInput('Perks', 'Select all perks that are of relevance to your accomodation.')}
            <Perks selected={perks} onChange={setPerks}/>

            {preInput('Extrainfo', 'House rules and unique specifications')}
            <textarea value={extraInfo} 
            onChange={e => setExtraInfo(e.target.value)} />

            {preInput('Check in and -out times.', 'What times should the customer expect to check in and -out.')}
            <div className='grid sm:grid-cols-3 gap-2 '>
              <div>
                <h3 className='mt-2 -mb-1'>Check in time</h3>
                <input value={checkIn} 
                onChange={e => setCheckIn(e.target.value)}  
                type="text" placeholder='13:00'/>
              </div>

              <div>
                <h3 className='mt-2 -mb-1' >Check out time.</h3>
                <input value={checkOut} 
                onChange={e => setCheckOut(e.target.value)} 
                type="text" placeholder='12:00'/>
              </div>

              <div>
                <h3 className='mt-2 -mb-1' >Max number of guests.</h3>
                <input value={maxGuests} 
                onChange={e => setMaxGuests(e.target.value)} 
                type="number" placeholder='4'/>
              </div>
            </div>

            {preInput('Price per night', 'How much the customer should pay per night.')}
            <div>
                <h3 className='mt-2 -mb-1' >Price per night.</h3>
                <input type="number" min="0.00" max="10000.00" step="0.10" 
                placeholder='50.00'
                value={price}
                onChange={(e => setPrice(e.target.value))}
                />
              </div>

            <div >
              <button className='primary my-6 mb-10'>Save</button>
            </div>

          </form>
        </div>
  )
}

export default PlacesFormPage