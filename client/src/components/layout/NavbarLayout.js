import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from "react-bootstrap/Dropdown";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import NavDropdown from 'react-bootstrap/NavDropdown';
import BookCreate from '../common/BookCreate';
import { Link } from "react-router-dom";
import { UserSearchService } from '../../services/UserSearchService';
import useToast from '../../hooks/useToast';
import { jwtDecode } from 'jwt-decode';

export default function NavbarLayout(props) {

    const [bookUploadShow, setBookUploadShow] = useState(false);

    const [searchParam, setSearchParam] = useState('');
    const [searchResult, setSearchResult] = useState({ count: 0, results: [] });

    let [loggedinUsername, setLoggedinUsername] = useState("");

    const navigate = useNavigate();

    const { toastError } = useToast();

    const handleLogout = () => {
        Cookies.remove("accessToken")
        Cookies.remove("refreshToken")
        navigate('/login')
    }

    const handleBookUploadShow = () => {
        setBookUploadShow(true)
    }

    const handleSearchChange = (event) => {
        setSearchParam(event.target.value)
    }

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await UserSearchService(searchParam);
            setSearchResult(response.data);
            // second one is an object with a state property
            navigate(`/bookbrowse/users?search=${searchParam}`, { state: { searchResult: response.data } });
        } catch (error) {
            toastError(error)
        }
    }

    const handleProfileNavigation = () => {
        navigate(`/bookbrowse/profile/${loggedinUsername}`)
    }

    useEffect(() => {
        const accessToken = Cookies.get('accessToken')
        const decoded = jwtDecode(accessToken)
        setLoggedinUsername(decoded.username)
    }, [])

    return (
        <>
            <Navbar expand="lg" className="bg-indigo-500" data-bs-theme="light" sticky='top'>
                <Container>
                    <Navbar.Brand className="text-xl pt-0 font-bold">
                        <Link to={`/bookbrowse/profile/${loggedinUsername}`} className='no-underline text-indigo-700'>Bookstagram<span className='text-3xl text-orange-400'>.</span></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Form className="d-flex" onSubmit={handleSearchSubmit}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2 !border-none"
                                    aria-label="Search"
                                    name='searchParam'
                                    value={searchParam} onChange={handleSearchChange}
                                />
                                <Button className='!bg-indigo-400 !border-none' type='submit' >Search</Button>
                            </Form>
                        </Nav>
                        <NavDropdown title={loggedinUsername} className='text-white font-bold' id="basic-nav-dropdown">
                            <NavDropdown.Item className='no-underline text-black font-normal pl-2' onClick={handleProfileNavigation}>Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleBookUploadShow}>Create New Photo</NavDropdown.Item>
                            <Dropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>
                                Sign Out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <BookCreate bookUploadShow={bookUploadShow} setBookUploadShow={setBookUploadShow} user={props.user} setUser={props.setUser} />
        </>
    )
}
