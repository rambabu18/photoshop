import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import { galleryData } from '../utils/data/gallery/galleryData';
import Gallery from '../components/Gallery';
import Axios  from 'axios';

function Dashboard() {
const [galleryData, setGalleryData] = useState([])
const[loading, setLoading] = useState(false);

const AUTH_TOKEN = localStorage.getItem("token");
const config = {
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
};


  useEffect(() => {
    Axios({
      url: "/upload-image",
      method: "GET",
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
    })
      .then((res) => {
        console.log(res);
        setGalleryData(res.data)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [])

  return (
    <Container className='dashborad-container'>
      <Row>
        <Col className='nodata-col'>
          {
            galleryData.length === 0 ? (
              <div className='nodata-col-one'>
                <h6> No Data Found </h6>
                <span> Please add data </span>
                <div className='mt-3'>
                  <Link to="/customer-form" className='add-btn'> Add Data </Link>
                </div>
              </div>
            )
              :
              (
                <div>
                  <Gallery data={galleryData} />
                </div>
              )
          }

        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard