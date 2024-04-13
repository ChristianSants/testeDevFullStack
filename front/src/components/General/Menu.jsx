import React, { useState } from "react";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { FaUser } from "react-icons/fa6";
import AuthService from "../../services/Auth";
import { NavLink, useNavigate } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";

const Menu = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        setIsLoading(true)

        AuthService.sair(token)
            .then(response => {
            })
            .catch(error => {
                console.log('ERROR', error);
            })
            .finally(() => {
                localStorage.clear();

                navigate('/login');

                setIsLoading(false);
            })
    }

    return (
        <>
            <LoadingOverlay loading={isLoading} />
            <Navbar bg="primary" data-bs-theme="dark" className="px-5">
                <Navbar.Brand as={NavLink} to="/">Senac</Navbar.Brand>

                <Nav className="ms-5">
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                </Nav>

                <Nav className="ms-auto">
                    <NavDropdown active drop="down" title={<span><FaUser className="me-1" /> {user.email} </span>} >
                        <NavDropdown.Item onClick={() => logout()}>Sair</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
        </>
    );
}

export default Menu;