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
  render() {
    if( !this.state.isLoading ){
      return <div>is loading</div>
    }
    if( this.state.isLogin === null ){
      return <Login/>
    }
    return (
      <Container>
        <Routing/>               
      </Container>
    );
  }
}

export default Index;