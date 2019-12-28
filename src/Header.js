
import React from "react";
import {
  Navbar,
  NavbarBrand,
} from "shards-react";

import './Header.css';
import logo from './path_icon_white.png';



class Header extends React.Component {


  render() {
    return (
      <Navbar className="custom-navbar" type="dark" expand="md">
        <img className="d-inline-block align-top mr-3" src={logo} width="30" height="30"  alt="">
        </img>
        <NavbarBrand href="#"> Pathfinding Algorithm Visualisation</NavbarBrand>

      </Navbar>
    );
  }
}


export default Header;
