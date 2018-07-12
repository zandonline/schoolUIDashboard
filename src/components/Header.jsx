import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  logOut(){
    localStorage.removeItem('token56266956');
    sessionStorage.removeItem('token56266956');
    window.location.reload();
}
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md" RTL>
          <NavbarBrand href="/"> داشبورد مدیریت تفریح من </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>کاربران</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.logOut}>خروج</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
