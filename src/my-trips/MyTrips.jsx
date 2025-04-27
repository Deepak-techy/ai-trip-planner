import { db } from '@/service/firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  // Used to get all User Trips
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/');
      return;
    }

    const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email));
    const querySnapshot = await getDocs(q);
    
    setUserTrips([]);
    const trips = [];
    querySnapshot.forEach((doc) => {

      console.log(doc.id, " => ", doc.data());
      trips.push(doc.data());
      // setUserTrips(prevVal => [...prevVal, doc.data()]);
    });
    setUserTrips(trips);
  }

  return (
    <div className='m-15 sm:px-10 md:px-20 lg:px-32 mt-8'>
      <h2 className='font-bold text-2xl'>My Trips</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
        {userTrips?.length>0 ? userTrips?.map((trip, index) => (
          <UserTripCardItem key={index} trip={trip} />
        ))
      : [1,2,3,4,5,6].map((trip, index) => (
        <div key={index} className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyTrips
