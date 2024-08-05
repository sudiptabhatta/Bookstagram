import React from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export default function Anonymous({ children }) {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
        const tokenExpireTimestamp = jwtDecode(accessToken)['exp']
        const curTimestamp = new Date().getTime() / 1000
        if (curTimestamp > tokenExpireTimestamp) {
            // Handle the error as needed, e.g., clear the invalid token
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            return <Navigate to="/login" replace />
        }
        else{
            const decoded = jwtDecode(accessToken);
            return <Navigate to={`/bookbrowse/profile/${decoded.username}`} replace />;
        }
    } else {
        return children;
    }
}
