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
import { BrowserRouter as Router, Route , Link  } from "react-router-dom";



class Header extends React.Component{
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
    render(){
        return(
            <div>
                <Navbar fixed="top" light style={{backgroundColor:'#cfd8dc',direction:"rtl"}}  expand="md">
                    <Link to='/' style={{ textDecoration: 'none' }}>
                    <NavbarBrand style={{ WebkitTextFillColor:'#676c6e' }}>
                     داشبورد مدیریت
                    </NavbarBrand>
                    </Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                            مشتریان 
                            </DropdownToggle>
                            <DropdownMenu right>
                            <Link to='/users' style={{ textDecoration: 'none' }}>
                            <DropdownItem>
                                لیست مشتریان
                            </DropdownItem>
                            </Link>
                            <Link to='/users/create' style={{ textDecoration: 'none' }}>
                            <DropdownItem>
                                ایجاد مشتری جدید
                            </DropdownItem>
                            </Link>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                            دوره های آموزشی 
                            </DropdownToggle>
                            <DropdownMenu right>
                            <Link to='/classes' style={{ textDecoration: 'none' }}>
                            <DropdownItem>
                                لیست دوره ها
                            </DropdownItem>
                            </Link>
                            <Link to='/classes/create' style={{ textDecoration: 'none' }}>
                            <DropdownItem>
                                ایجاد دوره جدید
                            </DropdownItem>
                            </Link>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                            دانشجویان
                            </DropdownToggle>
                            <DropdownMenu right>
                            <Link to='/students' style={{ textDecoration: 'none' }}>
                            <DropdownItem>
                                لیست دانشجو ها
                            </DropdownItem>
                            </Link>
                            <Link to='/students/create' style={{ textDecoration: 'none' }}>
                            <DropdownItem>
                             ثبت دانشجو جدید
                            </DropdownItem>
                            </Link>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        </Nav>                        
                    </Collapse>
                    <UncontrolledDropdown >
                        <DropdownToggle nav caret>
                        <img src={require('../assets/images/profilePic.png')} width="25px" alt="profile-img"/>
                        {" "} نام کاربری 
                        
                        </DropdownToggle>
                            <DropdownMenu left="true">
                            <DropdownItem onClick={this.logOut}>
                                خروج  
                            </DropdownItem>
                            </DropdownMenu>
                    </UncontrolledDropdown>
                </Navbar>
            </div>
        );
    }
}


export default Header;
