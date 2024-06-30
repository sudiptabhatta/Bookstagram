import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { userSchema } from '../utils/ValidationSchema';
import signupService from '../services/AuthService';

export default function Signup() {
    const formik = useFormik({
        initialValues: {
            email: '',
            fullname: '',
            username: '',
            password: '',
            confirm_password: '',
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await signupService(values)
                console.log(response)
                resetForm({ values: '' })
            } catch(error) {
                console.log(error.response.data.errors[0])
            }
        },
        validationSchema: userSchema
    })
    
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
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3 px-5" controlId="email">
                            <Form.Control type="email" name='email' value={formik.values.email} placeholder="Email" onChange={formik.handleChange} onBlur={formik.handleBlur} // When the field loses focus, handleBlur is called
                                isInvalid={formik.touched.email && !!formik.errors.email} // Shows error if field is touched and has an error
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 px-5" controlId="fullname">
                            <Form.Control type="text" name='fullname' value={formik.values.fullname} placeholder="Full Name" onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.fullname && !!formik.errors.fullname} />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.fullname}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 px-5" controlId="username">
                            <Form.Control type="text" name='username' value={formik.values.username} placeholder="Username" onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.username && !!formik.errors.username} />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 px-5" controlId="password">
                            <Form.Control type="password" name="password" value={formik.values.password} placeholder="Password" onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.password && !!formik.errors.password} />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 px-5" controlId="confirm_password">
                            <Form.Control type="password" name='confirm_password' value={formik.values.confirm_password} placeholder="Confirm Password" onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.confirm_password && !!formik.errors.confirm_password} />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.confirm_password}
                            </Form.Control.Feedback>
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
