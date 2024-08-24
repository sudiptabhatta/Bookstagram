import React, { useEffect, useState } from 'react';
import NavbarLayout from '../components/layout/NavbarLayout';
import User from '../components/common/User';
import { userBooklistProfileService } from '../services/BooklistProfileService';
import Books from '../components/common/Books';
import useToast from '../hooks/useToast';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router';

export default function Profile() {

  const [user, setUser] = useState({ email: '', username: '', fullname: '', profile_picture: '', new_profile_picture: null, books: [], book_count: 0 });
  const [isLoading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);

  const { username } = useParams();

  const { toastError } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
          const response = await userBooklistProfileService(username, currentPage)
          if (currentPage === 1) {
            setUser(response)
          } else {
            setUser((user) => {
              return { ...user, books: [...user.books, ...response.books] }
            })
          }
          setLoading(false)
      } catch (error) {
        setLoading(false)
        if(user.books.length === user.book_count) {
          toastError('No more books to load')
        } else {
          toastError(error.message)
        }
      }
    }
    fetchUserData()
  }, [username, currentPage])

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1)
  }

  return (
    <div>
      <NavbarLayout user={user} setUser={setUser} />
      <User user={user} setUser={setUser} />
      {user.books && <Books books={user.books} setUser={setUser} />}
      <>
        <Container>
          <Row>
            <Col md={4}></Col>
            <Col align="center">
              {isLoading ? (
                <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-gray-950 hover:bg-gray-800 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25 stroke-4" cx="12" cy="12" r="10" stroke="currentColor"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </button>
              ) : (
                <button onClick={handleMoreClick} type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-gray-950 hover:bg-gray-800 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
                  Load More
                </button>
              )}
            </Col>
            <Col md={4}></Col>
          </Row>
          <br/>
        </Container>
      </>
    </div>
  )
}
