import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Createtrip from '@/create-trip/Createtrip.jsx'
import Viewtrip from '@/view-trip/tripId/Viewtrip'
import App from '@/App'
import MyTrips from '@/my-trips/MyTrips'

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,         
                element: <App />,     
            },
            {
                path: "/create-trip",
                element: <Createtrip />,
            },
            {
                path: "/view-trip/:tripId",
                element: <Viewtrip />,
            },
            {
                path: "/my-trips",
                element: <MyTrips />,
            },
        ]
    },

]);

export default Router
