import React, { useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { loginService } from '../services/AuthService';
import useToast from '../hooks/useToast';
import Cookies from 'js-cookie';
import usePasswordVisibility from '../hooks/usePasswordVisibility';
import { jwtDecode } from "jwt-decode";

export default function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const { email, password } = credentials

    const { toastSuccess, toastError } = useToast();

    const navigate = useNavigate();

    const {passwordType, toggleIcon, togglePasswordVisibility} = usePasswordVisibility();

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await loginService(credentials)
            const { access, refresh } = response.data.tokens

            const decoded = jwtDecode(access);

            // Store the tokens in cookie for later use
            Cookies.set('accessToken', access)
            Cookies.set('refreshToken', refresh)

            toastSuccess(response.data.message)
            navigate(`/bookbrowse/profile/${decoded.username}`)
        } catch (error) {
            toastError(error.response.data.message)
            navigate('/login')
        }
    }

    return (
        <Container className="min-h-screen flex items-center justify-center">
            <Row className='w-full max-w-lg'>
                <Col className="shadow-md p-4 bg-white rounded-lg">
                    <div className="text-center mb-3">
                        <div className="text-red-500 text-xl font-bold">Bookstagram<span className='text-3xl text-orange-400'>.</span></div>
                    </div>
                    <div className="text-center mb-4">
                        <div className="text-sm font-thin">SHOW OFF YOUR BOOKISH ASTHEICS</div>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 px-5" controlId="email">
                            <Form.Control type="email" name='email' value={email} placeholder="Enter Email" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3 px-5 position-relative" controlId="password">
                            <Form.Control type={passwordType} name='password' value={password} placeholder="Enter Password" onChange={handleChange} />
                            <span className="absolute right-16 top-2 cursor-pointer" onClick={togglePasswordVisibility}>
                                {toggleIcon}
                            </span>
                        </Form.Group>
                        <div className='px-5'>
                            <Button variant="dark" type="submit" className="w-full py-2 mt-3">Sign In</Button>
                        </div>
                        <div className='mt-3 px-5'>
                            <Link to="/signup" className='mt-3 text-stone-500'>I'm New</Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
