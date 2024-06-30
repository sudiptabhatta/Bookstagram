import React from 'react'
import Signup from './pages/Signup'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className='bg-amber-50'>
    <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
