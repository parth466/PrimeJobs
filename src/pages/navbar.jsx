import React from 'react'

import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';



import { Aperture } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="p-4 bg-background/50 sticky top-0 backdrop-blur-xs border-b z-10">
  
    <div className="container mx-auto flex justify-between items-center">
   
        <Link to="/"> <div className="flex text-lg font-bold gap-2">
        <Aperture/> Prime Jobs
        </div></Link>
        <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="hover:scale-105 hover:font-semibold transition-transform duration-300"> Home
            </Link>
            <Link to="/jobs" className="hover:scale-105 hover:font-semibold transition-transform duration-300"> Jobs
            </Link>
            <Link to="/About" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
                About
            </Link>
       
         
            <div className='flex items-center'>
               <Link to={'/login'}>
               <Button className="mx-1" variant="outline">Login</Button>
               </Link> 
               <Link to={'/register'}>
               <Button className="mx-1" variant="outline">SignUp</Button>
               </Link> 
              
               <Link to={'/profile'}>Profile</Link>
            </div>
        </div>
    </div>



</nav>
  )
}

export default Navbar
