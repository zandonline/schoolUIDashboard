import React from 'react';
import {URL, TOKEN} from '../../constants/api';
import axios from 'axios';

import {
    Button,
    FormGroup,
    Label,
    Input,
    Col,
    Form,
    Row,
    Alert,
    CustomInput,
    FormText,
    FormFeedback
} from 'reactstrap';
import SuccessRegister from './SuccessRegister';

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                username: '',
                password: '',
                firstname: '',
                lastname: '',
                phone: '',
                repeatPass: '',
                saveAccount: ''
            },
            SuccessRegister: false,
            waiting: false,
            errors: {
                username: false,
                password: false,
                firstname: false,
                lastname: false,
                phone: false,
                addItem: false,
                saveAccount: ''
            }
        }
    }

    addItem = () => {
        let {username, password, repeatPassword, firstname, lastname, phone, saveAccount} = this.state.item;
        let errors = this.state.errors;
        var patternUsername = /^[a-zA-Z0-9]*$/.test(username);
        let data = {username, password, firstname, lastname, phone};
        if (saveAccount && patternUsername && username !== '' && password !== '' && password === repeatPassword) {
            this.setState({waiting: true});
            axios({
                method: 'POST', url: `${URL}register`, headers: {
                    "accept": "application/json",
                    "content-type": "application/json",
                    "Authorization": `Bearer ${TOKEN}`
                }, data: data
            })
                .then(res => {
                    this.setState({successRegister: true, waiting: false});
                })
                .catch(err => {
                    errors.addItem = 'نام کاربری تکراری است';
                    this.setState({waiting: false});

                });
        } else if (username === '') {
            errors.username = "لطفا نام کاربری خود را وارد نمایید"
        }
        if (password === '') {
            errors.password = "لطفا رمز عبور را وارد نمایید"
        }
        if (password !== repeatPassword) {
            errors.repeatPassword = "لطفا رمز عبور خود را مجددا وارد نمایید"
        }
        if (!patternUsername) {
            errors.username = "لطفا نام کاربری خود را بدرستی وارد نمایید"
        }
        if (!saveAccount) {
            errors.saveAccount = true;
        }
        this.setState({errors});
    }

    onKeyPress(event) {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        if (!/^[0-9]*$/.test(keyValue))
            event.preventDefault();
    }

    changeInput = (value, id) => {
        var {item, errors} = this.state;
        item[id] = value;
        errors[id] = false;
        this.setState({item, errors});
    }

    render() {
        if (this.state.waiting) {
            return <div className="loader-background">
                <div className="loader"></div>
            </div>
        }
        const errors = this.state.errors;
        return (
            <div>
                {
                    this.state.successRegister ?
                        <SuccessRegister item={this.state.item}/> : null
                }
                <Row>
                    <Col lg={9} sm={12} md={12}>
                        <FormGroup row>
                            <Label for="username" sm={2}>نام کاربری</Label>
                            <Col sm={4}>
                                <Input
                                    type="text"
                                    name="username"
                                    id="username"
                                    invalid={ errors.username }
                                    onChange={(e) => this.changeInput(e.target.value, 'username')}/>
                                <FormFeedback>{ errors.username }</FormFeedback>
                                <FormText>حروف انگلیسی یا عدد و حداقل 5 کاراکتر</FormText>
                            </Col>

                        </FormGroup>
                        <FormGroup row>
                            <Label for="password" sm={2}>رمز عبور</Label>
                            <Col sm={3}>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    invalid={ errors.password }
                                    onChange={(e) => this.changeInput(e.target.value, 'password')}/>
                                <FormFeedback>{ errors.password }</FormFeedback>
                                <FormText>حداقل 6 کاراکتر</FormText>
                            </Col>
                            <Label for="repeatPassword" sm={2}>تکرار رمز عبور</Label>
                            <Col sm={3}>
                                <Input
                                    type="password"
                                    name="repeatPassword"
                                    id="repeatPassword"
                                    invalid={ errors.repeatPassword }
                                    onChange={(e) => this.changeInput(e.target.value, 'repeatPassword')}/>
                                <FormFeedback>{ errors.repeatPassword }</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>

                        </FormGroup>
                        <FormGroup row>
                            <Label for="firstname" sm={2}>نام </Label>
                            <Col sm={3}>
                                <Input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    invalid={ errors.firstname }
                                    onChange={(e) => this.changeInput(e.target.value, 'firstname')}/>
                            </Col>
                            <Label for="lastname" sm={2}>نام خانوادگی</Label>
                            <Col sm={3}>
                                <Input
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    invalid={ errors.lastname }
                                    onChange={(e) => this.changeInput(e.target.value, 'lastname')}/>
                            </Col>
                        </FormGroup>
                        <FormFeedback>{ errors.firstname }</FormFeedback>
                        <FormGroup row>

                        </FormGroup>
                        <FormFeedback>{ errors.lastname }</FormFeedback>
                        <FormGroup row>
                            <Label for="phone" sm={2}>شماره تماس</Label>
                            <Col sm={3}>
                                <Input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    invalid={ errors.phone }
                                    onKeyPress={this.onKeyPress}
                                    onChange={(e) => this.changeInput(e.target.value, 'phone')}/>
                            </Col>
                        </FormGroup>
                        <FormFeedback>{ errors.phone }</FormFeedback>
                        <FormGroup row>
                            <CustomInput
                                type="checkbox"
                                id="saveAccount"
                                invalid={errors.saveAccount}
                                label="نام کاربری و رمز عبور را در جایی امن نگهداری نمایید و از افشای آن خوداری کنید"
                                onChange={(e) => this.changeInput(e.target.checked, 'saveAccount')}
                            />
                        </FormGroup>
                        <Col sm={3}>
                            <Button  block color="primary" onClick={this.addItem}>ثبت</Button>{' '}
                        </Col>
                    </Col>
                </Row>
                <Alert color="danger" isOpen={errors.addItem} toggle={() => this.changeInput(false, 'addItem')}
                       fade={false}>{errors.addItem}</Alert>
            </div>
        );
    }
}

export default Create;