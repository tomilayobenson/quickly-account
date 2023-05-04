import { useState } from "react";
import { Navbar, Collapse, NavbarToggler, NavItem, Nav } from "reactstrap";
import { NavLink } from "react-router-dom";


const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div>
            <Navbar dark color="dark" sticky='top' expand='md' className="justify-content-center">
                <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} />
                <Collapse isOpen={menuOpen} navbar>
                    <Nav navbar>
                        <NavItem className="mr-5">
                            <NavLink className='nav-link' to='/' >
                                <i className='fa fa-sign-in fa-lg' /> Login
                            </NavLink>
                        </NavItem>
                        <NavItem className="mr-5">
                            <NavLink className='nav-link' to='/signup' >
                                <i className='fa fa-id-card fa-lg' /> Signup
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/profile' >
                                <i className='fa fa-user fa-lg' /> Profile
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default Header;
