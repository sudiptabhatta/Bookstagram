import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from "react-bootstrap/Dropdown";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavbarLayout(props) {

    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove("accessToken")
        Cookies.remove("refreshToken")
        navigate('/login')

    }

    return (
        <Navbar expand="lg" bg="danger" data-bs-theme="light" sticky='top'>
            <Container>
                <Navbar.Brand href="#" className="!text-red-700 text-xl pt-0 font-bold">Bookstagram<span className='text-3xl text-orange-400'>.</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2 !border-none"
                                aria-label="Search"
                            />
                            <Button className='!bg-rose-500 !border-none'>Search</Button>
                        </Form>
                    </Nav>
                    <NavDropdown title={props.username} className='text-white font-bold' id="basic-nav-dropdown">
                        <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">Create New Photo</NavDropdown.Item>
                        <Dropdown.Divider />
                        <NavDropdown.Item onClick={handleLogout}>
                            Sign Out
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
