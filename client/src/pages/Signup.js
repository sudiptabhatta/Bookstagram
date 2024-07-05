import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { userSchema } from '../utils/ValidationSchema';
import { signupService } from '../services/AuthService'; 
import useToast from '../hooks/useToast';
import usePasswordVisibility from '../hooks/usePasswordVisibility';

export default function Signup() {

    const { toastSuccess, toastError } = useToast(); 

    const passwordToggle = usePasswordVisibility(); // instance of usePasswordVisibility hook for password field
    const confirmPasswordToggle = usePasswordVisibility(); // instance of usePasswordVisibility hook for password field

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
                toastSuccess(response.message)
                resetForm({ values: '' })
            } catch(error) {
                toastError(error.message)

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
                        <Form.Group className="mb-3 px-5 position-relative" controlId="password">
                            <Form.Control type={passwordToggle.passwordType} name="password" value={formik.values.password} placeholder="Password" onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.password && !!formik.errors.password} />
                            <span className="absolute right-16 top-2 mr-5 cursor-pointer" onClick={passwordToggle.togglePasswordVisibility}>
                                {passwordToggle.toggleIcon}
                            </span>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 px-5 position-relative" controlId="confirm_password">
                            <Form.Control type={confirmPasswordToggle.passwordType} name='confirm_password' value={formik.values.confirm_password} placeholder="Confirm Password" onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.confirm_password && !!formik.errors.confirm_password} />
                            <span className="absolute right-16 top-2 mr-5 cursor-pointer" onClick={confirmPasswordToggle.togglePasswordVisibility}>
                                {confirmPasswordToggle.toggleIcon}
                            </span>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.confirm_password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className='px-5'>
                            <Button variant="secondary" type="submit" className="w-full py-2 mt-3">Sign Up</Button>
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
