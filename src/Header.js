
import React from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "shards-react";

import './Header.css';
import logo from './path_icon_white.png';


/**
 * Class representing header that is shown at the top of the screen.
 */
class Header extends React.Component {

  /**
   * Renders header.
   */
  render() {
    return (
      <Navbar className="custom-navbar" type="dark" expand="md">
        <img className="d-inline-block align-top mr-3" src={logo} width="30" height="30"  alt="">
        </img>
        <NavbarBrand href="#"> Pathfinding Algorithm Visualisation</NavbarBrand>
        <Nav navbar className="ml-auto">
            <NavItem>
              <NavLink active href="#">
                <b> <u> more projects... </u> </b>
              </NavLink>
            </NavItem>
          </Nav>
      </Navbar>
    );
  }
}


export default Header;
