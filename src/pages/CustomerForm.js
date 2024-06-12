import React, { useState } from 'react'
import Axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Button, Card, Form } from 'react-bootstrap'
import { useFormik, useFormikContext } from 'formik';
import * as yup from 'yup';

function CustomerForm() {
    const [loading, setLoading] = useState(false);
    const [error, setErrorMessage] = useState(false);
    const [image, setImage] = useState()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/admin";

    const user = localStorage.getItem("user");

    const convertToBase64 = (e) => {

        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setImage(reader.result)
        }
        reader.onerror = error => {
            console.log("Error", error)
        }
    }

    const validationSchema = yup.object({
        title: yup
            .string('Enter title')
            .required('Title is required'),
        username: yup
            .string('Enter your username')
            .required('User Name is required'),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            username: user,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = {
                title: values.title,
                username: values.username,
                base64: image
            }
            setLoading(true)
            Axios({
                url: '/upload-image',
                method: 'POST',
                data: data
            })
                .then((res) => {
                    setLoading(false)
                    console.log(res)
                    navigate("/admin")
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
        <Container className='dashborad-container'>
            <Row>
                <Col className='customer-form-title'>
                    <h2> Customer Form </h2>
                    <p> Please fill the below form </p>
                </Col>
            </Row>
            <Row className='custom-form-col'>
                <Col xl={6}>
                    <Form className="mb-1 justify-content-center contact-form" noValidate>
                        <Row className="mb-2 justify-content-center">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className='login_label'>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Title"
                                    className='form_input'
                                    value={formik.values.title}
                                    onChange={formik.handleChange('title')}
                                    error={formik.touched.title && Boolean(formik.errors.title)}
                                    helpertext={formik.touched.title && formik.errors.title}
                                />
                                {formik.errors.title ? <div style={{ color: 'red', marginTop: '5px', marginLeft: '5px', fontSize: '14px' }} > {formik.errors.title} </div> : null}

                            </Form.Group>
                        </Row>
                        <Row className="mb-2 justify-content-center">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className='login_label'>User Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    disabled
                                    className='form_input'
                                    value={formik.values.username}
                                    onChange={formik.handleChange('username')}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    helpertext={formik.touched.username && formik.errors.username}
                                />
                                {formik.errors.username ? <div style={{ color: 'red', marginTop: '5px', marginLeft: '5px', fontSize: '14px' }} > {formik.errors.username} </div> : null}

                            </Form.Group>
                        </Row>
                        <Row className="mb-2 justify-content-center">
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className='login_label'>Upload</Form.Label>
                                <Form.Control
                                    placeholder="Upload Image"
                                    className='form_input'
                                    type="file"
                                    onChange={convertToBase64}
                                    label="Upload Image"
                                />
                                {formik.errors.image ? <div style={{ color: 'red', marginTop: '5px', marginLeft: '5px', fontSize: '14px' }} > {formik.errors.image} </div> : null}

                            </Form.Group>

                            <div>
                                {image && <img width={50} height={50} src={image} />}
                            </div>

                        </Row>

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
                </Col>
            </Row>
        </Container>
    )
}

export default CustomerForm