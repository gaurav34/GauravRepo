import React, {Component} from 'react';
import { Route, Link, withRouter } from "react-router-dom";

import {
  Nav,
  NavItem,
  NavbarToggler,
  NavbarBrand,
  NavLink
} from 'reactstrap';

class Header extends Component {

  constructor(props) {
    super(props);
  }
  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }


  onClickLogout(e) {
    e.preventDefault();
    localStorage.setItem('isLogin', 'false');
    this.props.history.push('/login');
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
         <NavbarBrand href="#"></NavbarBrand>
        <NavbarToggler className="d-md-down-none mr-auto" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <Nav navbar>
    
          <NavItem className="px-3">
            <NavLink href="#" onClick={(e) => this.onClickLogout(e)}>Logout</NavLink>
          </NavItem>
        </Nav>
        <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
          <span className="navbar-toggler-icon"></span> 
        </NavbarToggler>
      </header>
    );
  }
}

export default withRouter(Header);
