import React, {useContext, useState} from 'react'
import {Link, Navigate} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);


  async function handleLogin(e) {
    e.preventDefault()
    try{
      const {data} = await axios.post('/login', {email, password}, {withCredentials:true})
      setUser(data)
      alert('Login succesfull!')
      setRedirect(true)
    }catch(error){
      alert('Login failed! Try again later!')
    }
  };

  if(redirect){
    return <Navigate to={'/'}/>
  };

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Log in</h1>
        <form className='max-w-md mx-auto' onSubmit={handleLogin}>
            
            <input type="email"  placeholder='Enter your email...' value={email} onChange={(e) => setEmail(e.target.value)}/>
            
            <input type="password" placeholder='Enter your password...' value={password} onChange={(e) => setPassword(e.target.value)}/>
            
            <button className='primary py-2'>Log in</button>
            
            <div className='text-center text-gray-500'>
              Don't have an account yet? <Link className='underline text-black' to='/signup'>Sign up now!</Link>
            </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage