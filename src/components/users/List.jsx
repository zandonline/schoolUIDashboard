import React, { Component } from 'react';
import { Container, Row, Col, Table, Button,FormGroup,Label,Input } from 'reactstrap';
import { URL,TOKEN } from '../../constants/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BrowserRouter as Router , Route , Link  } from "react-router-dom";


import Create from './Create';
import Update from './Update';
import Delete from './Delete';
import Payments from './Payments';

class List extends Component {
  constructor(props) {
    super(props); 
    this.state = {
       items:[],
       status:'',
       page:1,
       hasMore:true,
       itemSelected:false,
       firstname:'',
       lastname:'',
       loading:true,
     };
  }
  componentDidMount(){
    this.getItems(this.state.page);
  }
  nextPage = ()=>{
    this.getItems(this.state.page);
  }
  getItems =(page,search)=> {
      this.setState({ loading:true });
      fetch(`${URL}customers?pagesize=20&pagenum=${page}&firstname=${this.state.firstname}&lastname=${this.state.lastname}`,{
          method:'GET',
          headers:{
              "Authorization":`Bearer ${TOKEN}`
          }
      })
      .then( resp => resp.json() )
      .then( resp => {
        var items =search?[]: this.state.items;
        if(resp.length === 0){
          console.log(resp);
          this.setState({status:'',hasMore:false,loading:false});
        }else{
          resp.map(res=>{
            items.push(res)
          })
          this.setState({ items , status:'',page:this.state.page+1,loading:false });
        }
        this.setState({items})
      })
      .catch( err =>{
          console.log(err);
          this.setState({ loading:false });

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
            this.getItems(1,true);
            
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
                getItems={()=>this.getItems(1)}/>;                
        case "delete":
            return <Delete toggle={()=> this.setState({status:''})}
                deleteItem={()=>this.deleteItem(this.state.itemSelected)}/>;
        case "payments":
        return <Payments toggle={()=> this.setState({status:''})}
            id={this.state.itemSelected}/>;
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
        <Row>
        <FormGroup row>
          <Label for="firstname" sm={2}> نام</Label>
            <Col sm={4}>
              <Input 
                type="text"
                name="firstname" 
                id="firstname" 
                onChange={(e)=>this.setState({firstname:e.target.value},()=>{
                  this.getItems(1,true);
                })} />
            </Col>
            <Label for="lastname" sm={2}> نام خانوادگی </Label>
            <Col sm={4}>
              <Input 
                type="text"
                name="lastname" 
                id="lastname" 
                onChange={(e)=>this.setState({lastname:e.target.value},()=>{
                  this.getItems(1,true);
                })} />            </Col>
        </FormGroup>
        </Row>
        <Row>
        <Col>
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.nextPage}
          hasMore={this.state.hasMore}
          loader={this.state.loading?<h5>در حال دریافت اطلاعات ...</h5>:null}
        >
        <Table hover style={{ textAlign:'center' }}>
            <thead>
                <tr>
                  <th>ردیف</th>
                  <th>نام و نام خانوادگی</th>
                  <th>شماره تماس</th>
                  <th> امتیاز </th>
                  <th>مدیریت</th>
                </tr>
              </thead>
              <tbody>
          
          {this.state.items.map((item, index) => (
            <tr>
          <th scope="row">{index+1}</th>
          <td>{item.firstname+' '+item.lastname}</td>
          <td>{item.phone_numbers[0]}</td>
          <td>{Math.round(item.received_point)}</td>
          <td>
              <Row>
                  <Col>
                    <Link to={`/user/${item._id}/payments`} style={{ textDecoration: 'none' }}>
                      <Button  outline size="sm" color="primary" block
                              >پرداخت ها</Button>
                    </Link>
                  </Col>
                  <Col>
                    <Button  outline size="sm" color="success" block
                             onClick={()=>this.setState({ status:"update",itemSelected:index})} >ویرایش</Button>
                  </Col>
                  <Col>
                    <Button  outline size="sm" color="danger" block
                              onClick={()=>this.setState({ status:"delete",itemSelected:item._id })}>حذف</Button>
                  </Col>
              </Row>
        </td>                     
        </tr>
       

          ))} 
          </tbody>
          </Table>
        </InfiniteScroll>            
  </Col>
        </Row>
      </Container>
    );
  }
}

export default List;