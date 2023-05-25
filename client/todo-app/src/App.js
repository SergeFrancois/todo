import React from 'react'
// import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo'
import Box from '@mui/material/Box'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MainLayout from './layouts/MainLayout'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />
      }
    ],
  },
])


function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
