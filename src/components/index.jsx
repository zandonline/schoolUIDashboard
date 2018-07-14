import React, { Component } from 'react';
import Login from './account/Login';
import Users from './users/List';
import { Container, Row, Col } from 'reactstrap';
import { TOKEN } from '../constants/api';
import Header from './Header';
import Routing from './Routing';
class Index extends Component {
  constructor(props) {
    super(props);
        this.state = {
        isLogin:TOKEN,
        isLoading:true,
        };
  }
  renderLogin = () =>{
    
    if( this.state.isLogin === null ){
      return <Login/>
    }
  }
  render() {
    if( !this.state.isLoading ){
      return <div>is loading</div>
    }
    return (
      <Container>
      { this.renderLogin() } 
        <Routing/>                      
      </Container>
    );
  }
}

export default Index;