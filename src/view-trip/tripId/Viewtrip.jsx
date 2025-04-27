import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import DailyTrip from '../components/DailyTrip';
import Footer from '../components/Footer';

const Viewtrip = () => {
    const { tripId } = useParams();
    const [trip, settrip] = useState({});

    useEffect(() => {
        tripId && GetTripData();
    }, [tripId]);

    // Get Trip Data from firebase firestore
        const GetTripData = async () => {
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document : ", docSnap.data());
            settrip(docSnap.data());
        }
        else {
            console.log("No such document!");
            toast('No Trip Found');
        }
    }

        return (
            <div className='pt-10 md:px-20 lg:px-40 xl:px-50 '>
                {/* Information Section */}
                <InfoSection trip={trip} />

                {/* Recomended Hotels  */}
                <Hotels trip={trip} />

                {/* Daily Plans  */}
                <DailyTrip trip={trip} />

                {/* Footer */}
                <Footer trip={trip} />
            </div>
        )
    }

    export default Viewtrip
