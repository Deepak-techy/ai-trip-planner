import React from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import { useState } from 'react';

const Hero = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser);

    if (!storedUser) {
      toast('Please Login First');
    } else {
      navigate('/create-trip');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mx-40 gap-8'>
      <h1
        className='font-bold text-[50px] text-center mt-16'
      >
        <span className='text-[#f56551]'>Discover Your Next Adventure With AI:</span> Personalised Itineraries at Your Fingertips</h1>

      <p className='text-xl text-gray-600 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>


      <Button className='cursor-pointer' onClick={handleButtonClick} >Get Started, It's Free</Button>

      <img src="/landingpage.png" className='m-15 h-full w-full xs:h-[400px] xs:w-[400px]' />

    </div>
  )
}

export default Hero
