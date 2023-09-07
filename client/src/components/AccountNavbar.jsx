import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const AccountNavbar = () => {
    const {pathname} = useLocation();
    function linkClasses(type=null){
        let subpage = pathname.split('/')?.[2];

        if( subpage === undefined){
            subpage = 'profile';
        }

        let classes = 'py-2 px-6 border border-primary rounded-full  ';
        if(type === subpage){
            classes += 'bg-primary text-white';
        }
        return classes;
    }

  return (
    <nav className='w-full flex justify-center mt-8 gap-4 mb-16'>
        <Link className={linkClasses('profile')} to={'/account'}>
            My profile
        </Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}> 
            My bookings
        </Link>
        <Link className={linkClasses('places')} to={'/account/places'}>
            My accommodations
        </Link>
    </nav>
  )
}

export default AccountNavbar