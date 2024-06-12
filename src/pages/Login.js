import React, { useState } from 'react'
import Axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Button, Card, Form } from 'react-bootstrap'
import { useFormik } from 'formik';
import * as yup from 'yup';

function Login() {
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
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values)
            setLoading(true)
            Axios({
                url: '/login',
                method: 'POST',
                data: values
            })
                .then((res) => {
                    console.log(res.data.token);
                    // localStorage.setItem("token", res.data.accessToken);
                    if (res.data.token) {
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("user", res.data.user);
                        setLoading(false)
                        // history("/admin")
                        navigate(from, { replace: true });
                    } else {
                        setErrorMessage(true)
                        setLoading(false)
                        setTimeout(() => {
                            setErrorMessage(false)
                        }, 3000)
                    }

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
        <Container fluid className='login_container'>
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
                                                <span>Invalid Credential/Try Again...</span>
                                            </div>
                                        ) : ""
                                }

                                <Row> <h3 className="home-contact-title-one text-center"> LogIn/SignIn </h3> </Row>
                                <Form className="mb-1 justify-content-center contact-form" noValidate>
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
                                            <div>
                                                 <span className='no-account'>Don't have an Account ? </span>
                                                <Link className='signup_link' to="/register">Register/SignUp</Link>
                                            </div>
                                        </div>
                                    </Form.Group>

                                    <Row className="mb-3 justify-content-center">
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
            </Row>
        </Container>
    )
}

export default Login