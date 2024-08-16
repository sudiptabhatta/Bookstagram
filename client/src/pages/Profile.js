import React, { useEffect, useState } from 'react';
import NavbarLayout from '../components/layout/NavbarLayout';
import User from '../components/common/User';
import { userBooklistProfileService } from '../services/BooklistProfileService';
import Books from '../components/common/Books';
import useToast from '../hooks/useToast';
import Container from 'react-bootstrap/esm/Container';
import { useParams } from 'react-router';

export default function Profile() {

  const [user, setUser] = useState({ email: '', username: '', fullname: '', profile_picture: '', books: [], book_count: 0 });
  const [isLoading, setLoading] = useState(true);

  const { username } = useParams();

  const { toastError } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userBooklistProfileService(username)
        setUser(response)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toastError(error.message)
      }
    }
    fetchUserData()
  }, [username])

  return (
    <div>
      <NavbarLayout user={user} setUser={setUser} />
      <User user={user} />
      {isLoading && <Container><h6 className='mt-5'>Loading....</h6></Container>}
      {user.books && <Books books={user.books} setUser={setUser} />}
    </div>
  )
}
