import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import AccountNavbar from '../components/AccountNavbar'
import { UserContext } from '../UserContext'
import PlacesPage from './PlacesPage'

const ProfilePage = () => {
    const [redirect, setRedirect]  = useState(null)
    const { user, setUser, ready } = useContext(UserContext)

    let {subpage} = useParams();
    if( subpage === undefined){
        subpage = 'profile';
    };

    async function logOut(){
        await axios.post('/logout')
        setRedirect('/')
        setUser(null)
    }


    if (!ready) return 'Loading...';

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    };

    
    if(redirect){
        return <Navigate to={redirect} />
    }
    return (
        <div>
            <AccountNavbar/>
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.name} ({user.email})<br/>
                    <button onClick={logOut} className='primary max-w-sm mt-2'>Log out</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage/>
            )}
        </div>
    ) 
}

export default ProfilePage