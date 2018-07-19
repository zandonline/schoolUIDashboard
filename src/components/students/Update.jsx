import React from 'react';
import { URL,TOKEN } from '../../constants/api';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { 
    Button,
    FormGroup,
    Label,
    Input,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Row,
    Alert,
    CustomInput,
    FormText
 } from 'reactstrap';

class Update extends React.Component{
    constructor(props) {
        super(props);
            this.state = {
            item:{
                customerid:null,
                transactions:[{
                    type:false
                }],
            },
            type:this.props.item.type,
            customers:false,
            customerValue:{
                value:this.props.item.customer._id
            },
            classes:false,
            classValue:{
                value:this.props.item.class._id,
                price:this.props.item.class.price
            },
            pay:true,
            errorAddItem:false,
            success:false,
            amount:false,
            cheks:[
                {
                    type:'check',
                    status:'pending',
                    amount:'',
                    check_number:'',
                    chekYear:'',
                    chekMonth:'',
                    chekDay:'',
                }
            ],
            };
    }
    componentDidMount(){
        fetch(`${URL}class`,{
            method:'GET',
            headers:{
                "Authorization":`Bearer ${TOKEN}`
            }
        })
        .then( resp => resp.json() )
        .then( resp => {
            var classes = [];
            resp.map((item)=>{
                classes.push({label:item.name,value:item._id,price:item.price})
            })
            this.setState({ classes });
        })
        .catch( err =>{
            console.log(err);
        });
        fetch(`${URL}customers`,{
            method:'GET',
            headers:{
                "Authorization":`Bearer ${TOKEN}`
            }
        })
        .then( resp => resp.json() )
        .then( resp => {
            var customers = [];
            resp.map((item)=>{
                customers.push({label:item.firstname+' '+item.lastname,value:item._id})
            })
            this.setState({ customers });
        })
        .catch( err =>{
            console.log(err);
        });
    }
    addItem = () => {
        this.setState({errorAddItem:false,success:false})
        var item = this.state.item;
        item.customerid = this.state.customerValue.value;
        item.transactions =[];
            if(this.state.pay){
                item.transactions[0]={type:this.state.type,status:'payed',amount:this.state.classValue.price};
            }else{
                item.transactions[0]={type:'cash',status:'payed',amount:parseInt(this.state.amount)};
                this.state.cheks.map((t)=>{
                    t.due_date = t.chekYear+"/"+t.chekMonth+"/"+t.chekDay;
                    item.transactions.push({due_date:t.due_date,type:t.type,amount:parseInt(t.amount),status:t.status,check_number:t.check_number});
                })
                
            }
            console.log("item",item);
            if(this.state.classValue && this.state.classValue && item.transactions[0].type){
            axios({ method: 'PUT', url: `${URL}class/${this.state.classValue.value}`,headers: {
                "accept":"application/json",
                "content-type":"application/json",
                "Authorization":`Bearer ${TOKEN}`
                },data:item
            })
            .then((resp)=>{
                this.setState({errorAddItem:false,success:"کاربر جدید ثبت شد"})
                window.location.reload(); 
            })
            .catch(error=>{
                if(error.response.status === 400){
                    this.setState({errorAddItem:'جمع مبالغ با مبلغ کلاس انتخاب شده مغایرت ندارد'});
                }else{
                    this.setState({errorAddItem:'انتخاب تمامی فیلدها الزامی است'});
                }
                
            });
        }else this.setState({errorAddItem:'انتخاب تمامی فیلدها الزامی است'})
    }

    toggle = () =>{
        this.props.toggle();
      }
    renderTransaction=()=>{
        if( this.state.pay ){
            return  (   <Row style={{ marginRight:'0' }}>
                            <Col sm="4">
                                <Input type="radio" name="radio2" onChange={()=>this.setState({ type:'pos' })}/>پوز{' '}  
                            </Col>
                            <Col  sm="4">
                                <Input type="radio" name="radio2" onChange={()=>this.setState({ type:'card2card' })}/>کارت به کارت{' '}
                            </Col>
                            <Col  sm="4">
                                <Input type="radio" name="radio2" onChange={()=>this.setState({ type:'cash' })}/>وجه نقد{' '}
                            </Col>
                         </Row>
            )
        }else{
            return (
                <div>
                <FormGroup>
                    <Label for="prepayment" > پیش پرداخت </Label>
                        <Input 
                        type="text"
                        name="prepayment" 
                        id="prepayment" 
                        onChange={(e)=>this.setState({ amount:e.target.value })} />
                </FormGroup>
                {
                                this.state.cheks.map( (item,index)=>{
                                    return(
                                        <div>
                                        <FormGroup>
                                            <Label for="amount" > مبلغ قسط </Label>
                                                <Input 
                                                type="text"
                                                name="amount" 
                                                id="amount" 
                                                onChange={(e)=>this.chekSet(index,'amount',e.target.value)} />
                                        </FormGroup>
                                        <FormGroup row style={{ fontSize:"13px" }}>
                                            <Col sm={2}>
                                                <Input 
                                                    type="text"
                                                    placeholder="روز"
                                                    name="endYear" 
                                                    id="endYear" 
                                                    onChange={(e)=>this.chekSet(index,'chekDay',e.target.value)} />
                                            </Col>
                                            <Col sm={2}>
                                                <Input 
                                                    type="text"
                                                    placeholder="ماه"
                                                    name="endMonth" 
                                                    id="endMonth" 
                                                    onChange={(e)=>this.chekSet(index,'chekMonth',e.target.value)} />
                                            </Col>
                                            <Col sm={3}>
                                                <Input 
                                                    type="text"
                                                    placeholder="سال"
                                                    name="endYear" 
                                                    id="endYear" 
                                                    onChange={(e)=>this.chekSet(index,'chekYear',e.target.value)} />
                                            </Col>
                                            <Col sm={5}>
                                                <Input 
                                                    type="text"
                                                    name="name"
                                                    placeholder="شماره چک" 
                                                    id="name" 
                                                    onChange={(e)=>this.chekSet(index,'check_number',e.target.value)} />
                                            </Col>
                                        </FormGroup>
                                        </div>
                                    )
                                } )
                            }
                <Button color="success" onClick={this.addChek}>جهت افزودن روزهای دیگر کلیک کنید +</Button>
                <br/>
            </div>
            )
           
        }
    }
    chekSet = (index,item,value) =>{
        var cheks = this.state.cheks;
        if( item === 'chekDay' ){
            cheks[index].chekDay = value;
        }else if(item === 'chekMonth'){
            cheks[index].chekMonth = value;
        }else if( item === 'chekYear' ){
            cheks[index].chekYear = value;
        }else if( item === 'amount' ){
            cheks[index].amount = value;
        }else if( item === 'check_number' ){
            cheks[index].check_number = value;
        }

    this.setState({cheks});
    }
    addChek = () =>{
        var cheks = this.state.cheks;
        cheks.push({type:'check',
            status:'pending',
            amount:'',
            check_number:'',
            chekYear:'',
            chekMonth:'',
            chekDay:''});
        this.setState({cheks});
    }
    render(){
        return(
            <div>
                <Modal isOpen={true}  className={this.props.className} RTL >
                    <ModalHeader > ویرایش تراکنش  </ModalHeader>
                    <ModalBody>
                    <Form>
                    {
                        this.state.customers && this.state.classes?
                        <div>
                        <FormGroup>
                            <Label>  دانشجو  </Label>
                            <Select
                                id="state-select"
                                onBlurResetsInput={false}
                                onSelectResetsInput={false}
                                autoFocus
                                options={this.state.customers}
                                clearable={this.state.clearable}
                                name="selected-state"
                                value={this.state.customerValue.value}
                                onChange={(e)=>this.setState({customerValue:e})}
                                rtl={true}
                                searchable={true}
                            />
                        </FormGroup> 
                        <FormGroup>
                            <Label>  دوره  </Label>
                            <Select
                                id="state-select"
                                onBlurResetsInput={false}
                                onSelectResetsInput={false}
                                autoFocus
                                options={this.state.classes}
                                clearable={this.state.clearable}
                                name="selected-state"
                                value={this.state.classValue.value}
                                onChange={(e)=>this.setState({classValue:e})}
                                rtl={true}
                                searchable={true}
                            />
                        </FormGroup>  
                        </div>
                        :null
                    }
                        
                        <FormGroup row>
                            <Col sm="4">
                                <Label for="radio1">نحوه پرداخت</Label>  
                            </Col>
                            <Col  sm="4">
                                <Input type="radio" name="radio1" onChange={()=>this.setState({ pay:true })}/>نقدی{' '}
                            </Col>
                            <Col  sm="4">
                                <Input type="radio" name="radio1" onChange={()=>this.setState({ pay:false })}/>اقساطی{' '}
                            </Col>
                        </FormGroup>
                        <FormGroup>
                        { this.renderTransaction() }
                        </FormGroup>  
                        

                    </Form>
                    </ModalBody>
                    <ModalFooter>    
                    <Button  style={{ width:"48%" }} color="primary" onClick={this.addItem} >ثبت</Button>{' '}
                    <Button  style={{ width:"48%" }} color="secondary" onClick={this.props.toggle} >انصراف</Button>{' '}

                    <Alert isOpen={this.state.errorAddItem} color="danger" style={{ width:"100%",textAlign:'center' }}>
                        {this.state.errorAddItem}
                    </Alert>
                    <Alert isOpen={this.state.success} color="success" style={{ width:"100%",textAlign:'center' }}>
                                {this.state.success}
                    </Alert>
                    </ModalFooter>
                </Modal>                        
            </div>
        );
    }
}

export default Update;