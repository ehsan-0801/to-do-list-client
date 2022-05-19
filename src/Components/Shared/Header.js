import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Header = () => {
    const [user] = useAuthState(auth);

    const handleSignOut = () => {
        signOut(auth);
    }

    return (
        <>
            <Navbar sticky="top" bg="secondary" expand="lg">
                <Container>
                    <Navbar.Brand as={ Link } to="/" className="text-white">TO-DO-LIST</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto" >
                            {
                                user && <>
                                    <Nav.Link as={ Link } className="text-white mx-5" to="/addtask">ADD TASK</Nav.Link>
                                </>
                            }

                            {
                                user ?
                                    <button className='btn btn-link text-white mx-5 text-decoration-none' onClick={ handleSignOut }>SIGN OUT</button>
                                    :
                                    <Nav.Link className="text-white mx-5" as={ Link } to="login">
                                        LOGIN
                                    </Nav.Link> }
                            <Nav.Link as={ Link } className="text-white mx-5" to="/signup">SIGNUP</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;