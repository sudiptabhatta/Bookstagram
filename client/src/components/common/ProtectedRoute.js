import React from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute({children}) {
    const accessToken = Cookies.get('accessToken')
    
    if(!accessToken) {
        return <Navigate to="/login" replace />
    } else {
        const tokenExpireTimestamp = jwtDecode(accessToken)['exp']
        const curTimestamp = new Date().getTime() / 1000
        if (curTimestamp > tokenExpireTimestamp) {
            console.log('expired timestamp')
            return <Navigate to="/login" replace />
        }
        else{
            return children;
        }
    }
}
