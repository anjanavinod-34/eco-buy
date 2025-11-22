import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
function Header() {
    return (
        <> <Navbar expand="lg"style={{backgroundColor:"beige"}} className='fixed-top'>

            <Navbar.Brand href="/">
            <img style={{backgroundColor:"beige"}} className='rounded-5' width={'79px'} height={'60px'} src={logo} alt="ecobuy logo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto me-4 ">
                    <Link to={'/purchase'} className='me-4 btn bg-secondary'>PURCHASE</Link>
                    <Link to={'/add'} className='me-4 btn bg-secondary'>ADD</Link>
                    <Link to={'/impact'} className='me-4 btn bg-secondary'>IMPACT</Link>



                </Nav>
            </Navbar.Collapse>

        </Navbar></>
    )
}

export default Header