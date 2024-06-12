import React, { useState } from 'react'
import Axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Button, Card, Form } from 'react-bootstrap'
import { useFormik } from 'formik';
import * as yup from 'yup';

function SignUp() {
    const [loading, setLoading] = useState(false);
    const [error, setErrorMessage] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/admin";

    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        mobile: yup
            .string('Enter your Mobile No')
            .min(10, 'Mobile No. should be of minimum 10 characters length')
            .max(10, 'Mobile No. should be of maximum 10 characters length')
            .required('Mobile No. is required'),
        name: yup
            .string('Enter your full name')
            .required('Full Name is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            mobile: '',
            name: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values)
            setLoading(true)
            Axios({
                url: '/register',
                method: 'POST',
                data: values
            })
                .then((res) => {
                    setLoading(false);
                    navigate("/success");
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false)
                    setErrorMessage(true)
                    setTimeout(() => {
                        setErrorMessage(false)
                    }, 3000)
                })
        },
    });
    return (
        <Container fluid className='login_container mb-5'>
            <Row>
                <Col>
                    <Row className='mt-4'>
                        <Col className='login_col'>
                            <h4 className='login_title'>Welcome</h4>
                        </Col>
                    </Row>

                    <Row className='mt-3' >
                        <Col className='login_col'>

                            <div className='contact-form-col col-xl-6' >
                                {
                                    error ?
                                        (
                                            <div className='login_error'>
                                                <span>Something Went Wrong/Try Again...</span>
                                            </div>
                                        ) : ""
                                }

                                <Row> <h3 className="home-contact-title-one text-center"> Register/SignUp </h3> </Row>
                                <Form className="mb-1 justify-content-center contact-form" noValidate>
                                    <Row className="mb-2 justify-content-center">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='login_label'>Full Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Your Full Name"
                                                className='form_input'
                                                value={formik.values.name}
                                                onChange={formik.handleChange('name')}
                                                error={formik.touched.name && Boolean(formik.errors.name)}
                                                helpertext={formik.touched.name && formik.errors.name}
                                            />
                                            {formik.errors.name ? <div style={{ color: 'red', marginTop: '5px', marginLeft: '5px', fontSize: '14px' }} > {formik.errors.name} </div> : null}

                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-2 justify-content-center">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='login_label'>Mobile</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Your Mobile Number"
                                                className='form_input'
                                                value={formik.values.mobile}
                                                onChange={formik.handleChange('mobile')}
                                                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                                helpertext={formik.touched.mobile && formik.errors.mobile}
                                            />
                                            {formik.errors.mobile ? <div style={{ color: 'red', marginTop: '5px', marginLeft: '5px', fontSize: '14px' }} > {formik.errors.mobile} </div> : null}

                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-2 justify-content-center">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='login_label'>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter Your Email"
                                                className='form_input'
                                                value={formik.values.email}
                                                onChange={formik.handleChange('email')}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helpertext={formik.touched.email && formik.errors.email}
                                            />
                                            {formik.errors.email ? <div style={{ color: 'red', marginTop: '5px', marginLeft: '5px', fontSize: '14px' }} > {formik.errors.email} </div> : null}

                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-2 justify-content-center">
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label className='login_label'>Password</Form.Label>
                                            <Form.Control
                                                placeholder="Enter Password"
                                                className='form_input'
                                                type={'password'}
                                                value={formik.values.password}
                                                onChange={formik.handleChange('password')}
                                                label="Password"
                                                error={formik.touched.password && Boolean(formik.errors.password)}
                                                helpertext={formik.touched.password && formik.errors.password}
                                            />
                                            {formik.errors.password ? <div style={{ color: 'red', marginTop: '5px', marginLeft: '5px', fontSize: '14px' }} > {formik.errors.password} </div> : null}

                                            <div className='forgot_pass'>
                                                <Link className='forgot_link' to="/forgot/password">Forgot password?</Link>
                                            </div>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-2 justify-content-center">
                                        <Col>
                                            <Button className="login-btn justify-content-center" type="submit" onClick={formik.handleSubmit} >
                                                {
                                                    loading
                                                        ?
                                                        <div className="spinner-border spinner-border-sm text-light" style={{ marginRight: '5px' }} role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                        :
                                                        " "
                                                }
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row >
        </Container >
    )
}

export default SignUp