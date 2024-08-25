import React from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export default function Anonymous({ children }) {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
        const username = jwtDecode(accessToken)['username']
        return <Navigate to={`/bookbrowse/profile/${username}`} replace />;
    } else {
        return children;
    }
}
