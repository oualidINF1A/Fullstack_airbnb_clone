import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function handleSignUp(e){
    e.preventDefault()
    try{
      await axios.post('/signup', {
        name, 
        email, 
        password
      });
      alert('Registration succesfull! Now you can login.')
    
    } catch(error){
      alert('Registration failed! Try again later')
    }



  }




  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Sign up</h1>
        <form className='max-w-md mx-auto' onSubmit={handleSignUp}>
            
            <input type="text"  
            placeholder='John Doe' 
            value={name} 
            onChange={(e) => setName(e.target.value)}/>
            
            <input type="email"  
            placeholder='Enter your email...'
            value={email} 
            onChange={(e) => setEmail(e.target.value)}/>

            <input type="password" 
            placeholder='Enter your password...'
            value={password} 
            onChange={(e) => setPassword(e.target.value)}/>

            <button className='primary py-2'>Sign up</button>
            <div className='text-center text-gray-500'>
              Already have an account? <Link className='underline text-black' to='/login'>Log in!</Link>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Signup