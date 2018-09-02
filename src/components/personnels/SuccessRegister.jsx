import React from 'react';
import { 
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Row,
    Col
 } from 'reactstrap';

class SuccessRegister extends React.Component{
    accept =()=>{
        window.location.assign('/personnels');
    }
    render(){
        return(
            <div>
                <Modal isOpen={true} toggle={this.props.toggle} className={this.props.className}>
                    <ModalHeader className = "rtl" > پیام </ModalHeader>
                        <ModalBody>
                            پرسنل جدید با موفقیت ثبت شد<br/>
                           نام کاربری:   {this.props.item.username}<br/>
                           رمز عبور :  {this.props.item.password}
                        </ModalBody>
                    <ModalFooter>
                        <Button block color="secondary" onClick={this.accept}>تایید</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default SuccessRegister;