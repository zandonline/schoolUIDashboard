import React, { Component } from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import { URL,TOKEN } from '../../constants/api';
import InfiniteScroll from 'react-infinite-scroll-component';

import Create from './Create';
import Update from './Update';
import Delete from './Delete';
class List extends Component {
  constructor(props) {
    super(props); 
    this.state = {
       items:[],
       status:'',
       page:1,
       hasMore:true,
       itemSelected:false,
     };
  }
  componentDidMount(){
    this.getItems(this.state.page);
  }
  nextPage = ()=>{
    this.getItems(this.state.page);
  }
  getItems =(page)=> {
      fetch(`${URL}customers?pagesize=20&pagenum=${page}`,{
          method:'GET',
          headers:{
              "Authorization":`Bearer ${TOKEN}`
          }
      })
      .then( resp => resp.json() )
      .then( resp => {
        if(resp.length === 0){
          console.log(resp);
          this.setState({status:'',hasMore:false});
        }else{
          var items = this.state.items;
          resp.map(res=>{
            items.push(res)
          })
          this.setState({ items , status:'',page:this.state.page+1 });
        }
        
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
            this.getItems(1);
            
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
        default:
            return <div/>;
    }
  }
  render() {
    let items =(
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
              {
                this.state.items?
    this.state.items.map( (item,index) =>{
      return (
        <tr>
          <th scope="row">{index+1}</th>
          <td>{item.firstname+' '+item.lastname}</td>
          <td>{item.phone_numbers[0]}</td>
          <td>{item.received_point}</td>
          <td>
              <Row>
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
      )
    } ) :null
              }
            </tbody>
        </Table>
    ) 
    items = (<div>
      <InfiniteScroll
                scrollThreshold={0.6}
                next={this.nextPage}
                hasMore={true}>
                {items}    
              </InfiniteScroll>
              </div>)
    return (
      <Container>
        {
          this.renderBox(this.state.status)
        }
        <br/>
        <br/>
        {items}
        <Row>
          
        </Row>
      </Container>
    );
  }
}

export default List;