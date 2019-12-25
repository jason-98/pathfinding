
import React from "react";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Button
} from "shards-react";

import './Header.css';
import logo from './path_icon_white.png';



class Header extends React.Component {

  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }

  render() {
    return (
      <Navbar className="custom-navbar" type="dark" expand="md">
        <img className="d-inline-block align-top mr-3" src={logo} width="30" height="30"  alt="">
        </img>
        <NavbarBrand href="#"> Pathfinding Algorithm Visualisation</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />

        <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar>

          </Nav>

        </Collapse>
      </Navbar>
    );
  }
}


export default Header;
