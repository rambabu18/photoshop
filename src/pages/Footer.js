import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function Footer() {
    return (
        <Navbar collapseOnSelect expand="lg" className="footer_nav">
            <Container fluid>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <span> © Copy Rights 2024 </span>
            </Container>
        </Navbar>
    )
}

export default Footer