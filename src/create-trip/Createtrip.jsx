import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { AI_PROMPT, SelectBudgetOptions } from '@/constants/options';
import { SelectTravelList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { generateTripPlan } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Createtrip = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const ignoreSuggestions = useRef(false); // <-- new ref
  const [formData, setFormData] = useState([]);
  const [OpenDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])


  useEffect(() => {
    if (ignoreSuggestions.current) {
      ignoreSuggestions.current = false;
      return;
    }

    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.locationiq.com/v1/autocomplete?key=${apiKey}&q=${query}&format=json`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error('LocationIQ Error:', error);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (place) => {
    ignoreSuggestions.current = true; // prevent useEffect firing again
    setQuery(place.display_name);
    setSelected(place);
    setSuggestions([]);

    handleInputChange('Location', place.display_name);
  };

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

  const OnGenerateTrip = async () => {

    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (!formData?.NoOfDays || !formData?.Location || !formData?.Budget || !formData?.TravelCompanion) {
      toast('Please fill all the details');
      return;
    }
    if (formData?.NoOfDays > 15) {
      toast('Please select less than 15 days');
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{Location}', formData?.Location)
      .replace('{NoOfDays}', formData?.NoOfDays)
      .replace('{TravelCompanion}', formData?.TravelCompanion)
      .replace('{Budget}', formData?.Budget)
      .replace('{NoOfDays}', formData?.NoOfDays)

    console.log(FINAL_PROMPT);

    const result = await generateTripPlan(FINAL_PROMPT);

    console.log(result);
    setLoading(false);
    SaveAiTripToDb(result);
  }

  const SaveAiTripToDb = async (TripData) => {

    setLoading(true);
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem('user'));

    // Add a new document in collection "AITrips"
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/' + docId);
  }

  return (
    <div className="flex justify-center px-4 sm:px-10 md:px-20 lg:px-32">
      <div className="w-full max-w-4xl mt-10">
        <h2 className='font-bold text-3xl'>Tell us your preferences</h2>
        <p className='mt-3 text-gray-500 text-xl'>
          Just provide me some basic information, and our trip planner will generate a customized itinerary based on your preferences.
        </p>

        <div className='flex flex-col gap-10 mt-20'>
          <div>
            <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search location..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto shadow-md mt-1">
                  {suggestions.map((place, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelect(place)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div >
            <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip</h2>
            <input
              type="number"
              placeholder="Ex.3"
              onChange={(e) => handleInputChange('NoOfDays', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectBudgetOptions.map((item, index) => (
                <div key={index}
                  onClick={() => handleInputChange('Budget', item.title)}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${formData.Budget === item.title && 'shadow-lg border-black'}
                  `}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectTravelList.map((item, index) => (
                <div key={index}
                  onClick={() => handleInputChange('TravelCompanion', item.people)}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${formData.TravelCompanion === item.people && 'shadow-lg border-black'}
                  `}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

        </div>
        <div className='flex justify-end my-10'>
          <Button
            className='cursor-pointer'
            disabled={loading}
            onClick={OnGenerateTrip}>
            {loading ?
              <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : "Generate Trip"
            }
          </Button>
        </div>
        <Dialog open={OpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img className='w-20' src="/logo.svg" />
                <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
                <p>Sign in to the App With Google Authentication securely</p>

                <Button
                  onClick={login}
                  className='w-full mt-7 flex gap-4 items-center'>
                  <FcGoogle className='h-7 w-7  cursor-pointer' />
                  Sign In With Google</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>


      </div>
    </div >
  );
};

export default Createtrip;
