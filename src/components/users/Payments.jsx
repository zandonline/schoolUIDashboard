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
    fetch(`${URL}transaction?customerid=${this.props.match.params.id}`,{
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
  paymentTransaction = (id) => {
    fetch(`${URL}transaction/${id}/payed`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${TOKEN}`
        }
    })
    .then (resp => {
        if(resp.status === 200){
            window.location.reload();
        }
    })
    .catch(err => console.log(err));
  }

  render() {
      if( !this.state.items ){
          return (
              <div>
                  در حال دریافت اطلاعات از سرور ....
              </div>
           )
      }
    return (
      <div>
            <Table hover>
                <thead>
                <tr>
                    <th>ردیف</th>
                    <th>تاریخ</th>
                    <th>مبلغ</th>
                    <th>وضعیت</th>
                    <th>مدیریت</th>
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
                            <td>{item.status === 'payed'?"پرداخت شده":<span style={{WebkitTextFillColor:'red'}}>پرداخت نشده</span>}</td>
                            <td>
                            <Button  outline={item.status === 'payed' } size="sm" color="success" block disabled = {item.status === 'payed' }
                             onClick={()=>this.paymentTransaction(item._id)} > پرداخت  </Button>
                            </td>
                        </tr>
                    )
                }):null                    
                }                
                </tbody>
            </Table>
      </div>
    );
  }
}

export default Payments;