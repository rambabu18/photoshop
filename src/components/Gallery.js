import React from 'react'
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import { Col, Container, Figure, Row } from 'react-bootstrap';

function Gallery({ data }) {
    return (
        <Container className='mt-5'>
            <Row className="justify-content-center gallery-row">
                <Col className='gallery-col' >
                    <h2 className="gallery-col-title"> Gallery </h2>
                </Col>
            </Row>
            <LightGallery
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
            >

                {
                    data.map((d) => (
                                <Figure  className='gallery-img' >
                                    <Figure.Image
                                        alt="Loading"
                                        src={`${d.image}`}
                                    />
                                    <Figure.Caption>
                                       <b>Title</b> : {d.title}
                                    </Figure.Caption>
                                    <Figure.Caption>
                                       <b>User</b> : {d.username}
                                    </Figure.Caption>
                                </Figure>
                    ))
                }
            </LightGallery>
        </Container>
    )
}

export default Gallery