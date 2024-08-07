import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ProtectedRoute from './components/common/ProtectedRoute';
import Anonymous from './components/common/Anonymous';
import BookDetailPage from './pages/BookDetailPage';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Profile = lazy(() => import('./pages/Profile'));
const Error = lazy(() => import('./pages/Error'));

export default function App() {



  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Suspense fallback={<h6>🌀 Loading...</h6>}>
          <Routes>
            <Route path='/signup' element={<Anonymous><Signup /></Anonymous>} />
            <Route path='/login' element={<Anonymous><Login /></Anonymous>} />
            <Route>
            <Route path='/bookbrowse/profile/:username' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='*' element={<ProtectedRoute><Error /></ProtectedRoute>} />
            <Route path='/bookbrowse/b/:book_id' element={<ProtectedRoute><BookDetailPage /></ProtectedRoute>} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}
