import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
   Form, FormGroup, Label, Input, CustomInput,Alert  } from 'reactstrap';
import { URL } from '../../constants/api';
import axios from 'axios';
class Login extends Component {
  constructor(props) {
     super(props); 
     this.state = {
        modal: true,
        username:'',
        password:'',
        errorLogin:false,
        remember:false,
      };
  }
  login = () => {
    const { username,password } = this.state;
    if( username !== '' && password !== '' )
      {axios({ method: 'POST', url: `${URL}login`,headers: {
        "accept":"application/json",
        "Content-Type":"application/json"}, data:{
          username,password
      }})
      .then((resp)=>{
        this.state.remember ?
        localStorage.setItem('token56266956',resp.data.token):
        sessionStorage.setItem('token56266956',resp.data.token);
        window.location.reload();
      })
      .catch(error=>{
        console.log('error')
        this.setState({ errorLogin:'نام کاربری یا رمز عبور اشتباه وارد شده است' })
      })}else{
        this.setState({ errorLogin:' لطفا نام کاربری و رمز عبور خود را وارد نمایید ' })
      }
  }
  render() {
    return (
      <div className="App">
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>ورود به سیستم</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">نام کاربری</Label>
                <Input type="text"
                  name="username"
                  id="username" 
                  placeholder=" لطفا نام کاربری خود را وارد نمایید "
                  onChange={(e)=>this.setState({ username:e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">رمز عبور</Label>
                <Input type="password" 
                  name="pass" 
                  id="pass" 
                  placeholder=" لطفا نام کاربری خود را وارد نمایید "
                  onChange={(e)=>this.setState({ password:e.target.value })} />
              </FormGroup>
              <CustomInput 
              type ="checkbox" 
              id ="remember" 
              label ="مرا بخاطر بسپار"
              onChange = {(e)=>this.setState({ remember:e.target.checked })}
              />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" outline block
              onClick={ this.login }>ورود</Button>{' '}
          </ModalFooter>
          <ModalFooter>
          <Alert isOpen={this.state.errorLogin} color="danger" style={{ width:"100%",textAlign:'center' }}>
              {this.state.errorLogin}
            </Alert>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Login;