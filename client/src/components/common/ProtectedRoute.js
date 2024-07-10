import React from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function ProtectedRoute({children}) {
    const accessToken = Cookies.get('accessToken')
    if(!accessToken) {
        return <Navigate to="/login" replace />
    } else {
        return children;
    }
}
