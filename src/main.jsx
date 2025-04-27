import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Createtrip from './create-trip/Createtrip.jsx'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/tripId/Viewtrip'
import Router from './routes/Router'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/create-trip",
//     element: <Createtrip />,
//   },
//   {
//     path: "/view-trip/:tripId",
//     element: <Viewtrip />,
//   },
// ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={Router} />
      <Toaster />
    </GoogleOAuthProvider>;
  </StrictMode>,
)
