import React, { useEffect, useState } from 'react'
import NavbarLayout from '../components/layout/NavbarLayout'
import User from '../components/common/User'
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { userBooklistProfileService } from '../services/BooklistProfileService';
import Books from '../components/common/Books';
// import { useToast } from 'react-toastify';

export default function Profile() {

  const [user, setUser] = useState({email: '', username: '', fullname: '', profile_picture: '', books: []}); 

  // const {toastError} = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = Cookies.get('accessToken')
        const decoded = jwtDecode(accessToken)
        const response = await userBooklistProfileService(decoded.username)
        setUser(response)
      } catch(error) {
        console.log('hello', error.message)
      }
    }
    fetchUserData()
  }, [])
  
  return (
    <div>
      <NavbarLayout username={user.username} />
      <User user={user} />
      <Books books={user.books} />
    </div>
  )
}
