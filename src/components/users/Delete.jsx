import React from 'react';
import { 
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
 } from 'reactstrap';

class Delete extends React.Component{
    render(){
        return(
            <div>
                <Modal isOpen={true} toggle={this.props.toggle} className={this.props.className}>
                    <ModalHeader className = "rtl" > حذف لیست </ModalHeader>
                        <ModalBody>
                            آیا از حذف این لیست اطمینان دارید؟
                        </ModalBody>
                    <ModalFooter>
                        <Button  style={{ width:"46%",marginRight:"4%" }} color="secondary" onClick={this.props.toggle}>انصراف</Button>
                        <Button  style={{ width:"46%" }} color="danger" onClick={this.props.deleteItem} >حذف</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Delete;