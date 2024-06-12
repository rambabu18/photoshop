import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function Navigation() {

    const history = useNavigate();
    const handleLogout = () => {
        window.localStorage.clear();
        history("/login");
    }

    const user = localStorage.getItem("user");
    return (
        <Navbar collapseOnSelect expand="lg" className="dash_nav">
            <Container fluid>
                <Navbar.Brand className='navbar_register_title' href="#home">
                    <picture>
                        <source media="(min-width:650px)" srcset="/images/logo.png"></source>
                        <source media="(min-width:465px)" srcset="/images/logo.png"></source>
                        <img className='nav-logo' src='/images/logo.png' />
                    </picture>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto ">
                        {/* <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link> */}
                        <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/customer-form">Add Data</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link> <div><img className='user-logo' src='/images/user.jpg' alt='user' /> {user ? user : "Guest"} </div> </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation