import React from 'react'
import axios from 'axios';
import { Button } from '../ui/button'
import { useState, useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { IoLogOutOutline } from "react-icons/io5";

const Header = () => {

  const [OpenDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
  }, [])


  const login = useGoogleLogin({
    onSuccess: (codeResponse) => GetUserProfile(codeResponse),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((response) => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDialog(false);
      OnGenerateTrip();
    })
  }

  return (
    <div className='flex items-center justify-between p-3 px-3 shadow-sm'>
      <img className='w-25 h-full mx-3' src="/logo.png" alt="" />
      <div>
        {user ?
          <div className='flex items-center gap-4'>

            <Button variant='outline' className='rounded-lg cursor-pointer' onClick={() => navigate('/create-trip')}>Create Trip</Button>

            <Button variant='outline' className='rounded-lg cursor-pointer' onClick={() => navigate('/my-trips')}>My Trips</Button>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-10 w-10 rounded-full object-cover cursor-pointer' />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer flex flex-row justify-between items-center' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  navigate('/');
                }}>Logout <IoLogOutOutline className='h-5 w-5' /></h2>
              </PopoverContent>
            </Popover>

          </div>
          :
          <Button className='rounded-lg cursor-pointer' onClick={() => setOpenDialog(true)}>Sign in</Button>
        }
      </div>
      <Dialog open={OpenDialog} onOpenChange={setOpenDialog}>
        <style>{`
            div[data-state="open"] > button.absolute.top-4.right-4 {
            cursor: pointer !important;
          }
        `}
        </style>
        <DialogContent className="sm:max-w-md" closeButtonClassName="cursor-pointer" >
          <DialogHeader>
            <DialogDescription>
              <img className='w-20' src="/logo.png" />
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in to the App With Google Authentication securely</p>

              <Button
                onClick={login}
                className='w-full mt-7 flex gap-4 items-center cursor-pointer'>
                <FcGoogle className='h-7 w-7' />
                Sign In With Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header
