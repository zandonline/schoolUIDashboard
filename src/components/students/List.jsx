import React, { Component } from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import { URL,TOKEN } from '../../constants/api'
import Create from './Create';
import Update from './Update';
import Delete from './Delete';
class List extends Component {
  constructor(props) {
    super(props); 
    this.state = {
       items:false,
       status:'',
       itemSelected:false,
     };
  }
  componentDidMount(){
    this.getItems();
  }
  getItems =()=> {
      fetch(`${URL}transaction`,{
          method:'GET',
          headers:{
              "Authorization":`Bearer ${TOKEN}`
          }
      })
      .then( resp => resp.json() )
      .then( resp => {
          this.setState({ items:resp , status:'' });
      })
      .catch( err =>{
          console.log(err);
      });
  }
  deleteItem(id){
    fetch(`${URL}customers/${id}`,{
        method:'DELETE',
        headers:{
            "Authorization":`Bearer ${TOKEN}`
        }
    })
    .then(resp => {
        if(resp.status === 200){
            this.getItems();
            
        }
    })
    .catch(err => {
        console.log( err );
    })
  }
  renderBox (status){
    switch(status){
        case "create":
            return <Create toggle={()=> this.setState({status:''})}
                  getItems={this.getItems}/>;
        case "update":
            return <Update toggle={()=> this.setState({status:''})}
                item={this.state.items[this.state.itemSelected]}
                getItems={this.getItems}/>;                
        case "delete":
            return <Delete toggle={()=> this.setState({status:''})}
                deleteItem={()=>this.deleteItem(this.state.itemSelected)}/>;
        default:
            return <div/>;
    }
  }
  render() {

    return (
      <Container>
        {
          this.renderBox(this.state.status)
        }
        <br/>
        <br/>
        <Row>
          <Table hover style={{ textAlign:'center' }}>
            <thead>
                <tr>
                  <th>ردیف</th>
                  <th>نام و نام خانوادگی</th>
                  <th>تاریخ شروع کلاس</th>
                  <th> تاریخ پایان کلاس </th>
                  <th>نوع پرداخت</th>
                  <th>مبلغ پرداختی </th>
                  <th>تاریخ پرداخت</th>
                </tr>
              </thead>
              <tbody>
              {this.state.items?
                this.state.items.map( (item,index) =>{
                  return (
                    <tr>
                      <th scope="row">{index+1}</th>
                      <td>{item.customer.firstname+' '+item.customer.lastname}</td>
                      <td>{item.class.startdate}</td>
                      <td>{item.class.enddate}</td>
                      <td>{item.type}</td>        
                      <td>{item.amount}</td>   
                      <td>{item.payment_date}</td>                
                    </tr>
                  )
                } ) :null
              }                
            </tbody>
        </Table>
        </Row>
      </Container>
    );
  }
}

export default List;