import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Table } from 'reactstrap';
import { URL,TOKEN } from '../../constants/api';

class Payments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      items:false
    };
  }
  componentDidMount (){
    fetch(`${URL}transaction?customerid=${this.props.id}`,{
        method:'GET',
        headers:{
            "Authorization":`Bearer ${TOKEN}`
        }
    })
    .then( resp => resp.json() )
    .then( resp => {
          this.setState({ items:resp , status:''});
        }
        
      )
    .catch( err =>{
        console.log(err);
    });
  }
  toggle =()=> {
    this.props.toggle();
  }

  render() {
      console.log(this.state)
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>پرداخت ها</ModalHeader>
          <ModalBody>
            <Table hover>
                <thead>
                <tr>
                    <th>ردیف</th>
                    <th>تاریخ</th>
                    <th>مبلغ</th>
                    <th>وضعیت</th>
                </tr>
                </thead>
                <tbody>
                {      this.state.items?
                    this.state.items.map((item,index)=>{
                        this.state.paymentDate = item.payment_date;
                        if (!item.payment_date) {
                            this.state.paymentDate = item.due_date;

                        }
                    return(
                        <tr>
                            <th scope="row">{index+1}</th>
                            <td>{this.state.paymentDate}</td>
                            <td>{item.amount}</td>
                            <td>{item.status === 'payed'?"پرداخت شده":"پرداخت نشده"}</td>
                        </tr>
                    )
                }):null                    
                }                
                </tbody>
            </Table>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Payments;