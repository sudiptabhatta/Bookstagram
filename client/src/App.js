import React from 'react'
import Signup from './pages/Signup'
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className='bg-amber-50'>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
