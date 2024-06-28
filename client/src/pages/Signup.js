import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function Signup() {
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
                    <Form>
                        <Form.Group className="mb-3 px-5" controlId="email">
                            <Form.Control type="email" placeholder="Email" />
                        </Form.Group>
                        <Form.Group className="mb-3 px-5" controlId="fullname">
                            <Form.Control type="text" placeholder="Full Name" />
                        </Form.Group>
                        <Form.Group className="mb-3 px-5" controlId="username">
                            <Form.Control type="text" placeholder="Username" />
                        </Form.Group>
                        <Form.Group className="mb-3 px-5" controlId="password">
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3 px-5" controlId="password">
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </Form.Group>
                        <div className='px-5'>
                            <Button variant="secondary" type="submit" className="w-full py-2 mt-3">Sign In</Button>
                        </div>
                        <div className='mt-3 px-5'>
                            <Link to="/login" className='mt-3 text-stone-500'>I have an account</Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
