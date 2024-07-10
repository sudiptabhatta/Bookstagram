import React from 'react'
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

export default function Anonymous({children}) {
    const accessToken = Cookies.get('accessToken')

    if(accessToken) {
        return <Navigate to='/bookbrowse/profile' replace />
    } else {
        return children;
    }
}
