import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

export default function NavbarLayout() {

    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove("accessToken")
        Cookies.remove("refreshToken")
        navigate('/login')

    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary" sticky='top'>
            <Container>
                <Navbar.Brand href="#" className="!text-red-500 text-xl pt-0 font-bold">Bookstagram<span className='text-3xl text-orange-400'>.</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#">Profile</Nav.Link>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="dark">Search</Button>
                        </Form>
                    </Nav>
                    <DropdownButton drop="start" variant="dark" title="Menu" className="my-2">
                        <Dropdown.Item>Signed in as: <span className='font-semibold'>username</span></Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>Sign Out</Dropdown.Item>
                    </DropdownButton>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
