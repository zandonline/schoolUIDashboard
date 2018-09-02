import React from 'react';
import { URL,TOKEN } from '../../constants/api';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import CurrencyInput from 'react-currency-input';

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
            card_num:'',
            errorAddItem:false,
            success:false,
            amount:'0',
            cheks:[
                {
                    type:'check',
                    status:'pending',
                    amount:0,
                    check_number:'',
                    chekYear:'',
                    chekMonth:'',
                    chekDay:'',
                }
            ],
            };
    }
    getCustomer = () => {
        fetch(`${URL}customers?select=firstname=1,lastname=1,national_code=1`,{
            method:'GET',
            headers:{
                "Authorization":`Bearer ${TOKEN}`
            }
        })
        .then( resp => resp.json() )
        .then( resp => {
            var customers = [];
            resp.map((item)=>{
                customers.push({label:item.firstname+' '+item.lastname,value:item._id,firstname:item.firstname,lastname:item.lastname,national_code:item.national_code})
            })
            this.setState({ customers });
        })
        .catch( err =>{
            console.log(err);
        });
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
        this.getCustomer();

    }
    addItem = () => {
        this.setState({errorAddItem:false,success:false})
        var item = this.state.item;
        item.customerid = this.state.customerValue.value;
        item.transactions =[];
        var re = /,/gi; 

        item.card_num = this.state.card_num;
            if(this.state.pay){
                item.transactions[0]={type:this.state.type,status:'payed',amount:this.state.classValue.price};
            }else{
                item.transactions[0]={type:'cash',status:'payed',amount:parseInt(this.state.amount.toString().replace(re,''))};
                this.state.cheks.map((t)=>{
                    t.due_date = t.chekYear+"/"+t.chekMonth+"/"+t.chekDay;
                    item.transactions.push({due_date:t.due_date,type:t.type,amount:parseInt(t.amount.toString().replace(re,'')),status:t.status,check_number:t.check_number});
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
    onKeyPress(event) {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        if (!/^[0-9]*$/.test(keyValue))
          event.preventDefault();
    }
    renderTransaction=()=>{
        if( this.state.pay ){
            return  (   <div>
                        <Row style={{marginRight:'0'}}>
                            <Col sm="4">
                                <Input type="radio" name="radio2" onChange={()=>this.setState({ type:'pos' })}/>Pose{' '}  
                            </Col>
                            <Col  sm="4">
                                <Input type="radio" name="radio2" onChange={()=>this.setState({ type:'cart2cart' })}/>کارت به کارت{' '}
                            </Col>
                            <Col  sm="4">
                                <Input type="radio" name="radio2" onChange={()=>this.setState({ type:'cash' })}/>وجه نقد{' '}
                            </Col>
                        </Row>{this.state.type ==='cart2cart' || this.state.type ==='pos'?
                        <div>
                            <FormGroup row>
                                    <Label for="card_num" sm={3}>شماره کارت</Label>
                                    <Col sm={9}>
                                        <Input 
                                            type="text"
                                            name="card_num" 
                                            id="card_num"
                                            onKeyPress={this.onKeyPress} 
                                            onChange={(e)=>this.setState({card_num:e.target.value})} />
                                    </Col>
                            </FormGroup>
                            <FormGroup row>
                                    <Label for="teacher" sm={3}>شماره پیگیری</Label>
                                    <Col sm={9}>
                                        <Input 
                                            type="text"
                                            name="track_code" 
                                            id="track_code" 
                                            onKeyPress={this.onKeyPress}
                                            onChange={(e)=>this.setState({track_code:e.target.value})} />
                                    </Col>
                            </FormGroup>
                        </div>
                        :null }
                        </div> 
            )
        }else{
            var re = /,/gi; 
            var str = this.state.amount.toString(); 
            var newstr = str.replace(re,''); 
            var sum =  parseInt(newstr);
            this.state.cheks.map((item)=>{
                sum=sum+parseInt(item.amount.toString().replace(re,''))
            })
            console.log("sum is",sum)
            var total = this.state.classValue.price - sum;
            console.log(total)
            return (
                <div>
                باقیمانده : {total.toLocaleString() }
                <FormGroup>
                    <Label for="prepayment" > پیش پرداخت </Label>
                        <CurrencyInput 
                            className="form-control"
                            precision="0"
                            value={this.state.amount}
                            onChangeEvent={(e)=>this.setState({ amount:e.target.value })} />
                </FormGroup>
                {
                                this.state.cheks.map( (item,index)=>{
                                    return(
                                        <div>
                                        <FormGroup>
                                            <Label for="amount" > مبلغ قسط </Label>
                                                <CurrencyInput 
                                                    className="form-control"
                                                    precision="0"
                                                    value={item.amount}
                                                    onChangeEvent={(e)=>this.chekSet(index,'amount',e.target.value)} />
                                        </FormGroup>
                                        <FormGroup row style={{ fontSize:"13px" }}>
                                            <Col sm={2}>
                                                <Input 
                                                    type="text"
                                                    placeholder="روز"
                                                    name="endYear" 
                                                    id="endYear" 
                                                    onKeyPress={this.onKeyPress}
                                                    onChange={(e)=>this.chekSet(index,'chekDay',e.target.value)} />
                                            </Col>
                                            <Col sm={2}>
                                                <Input 
                                                    type="text"
                                                    placeholder="ماه"
                                                    name="endMonth" 
                                                    id="endMonth" 
                                                    onKeyPress={this.onKeyPress}
                                                    onChange={(e)=>this.chekSet(index,'chekMonth',e.target.value)} />
                                            </Col>
                                            <Col sm={3}>
                                                <Input 
                                                    type="text"
                                                    placeholder="سال"
                                                    name="endYear" 
                                                    id="endYear" 
                                                    onKeyPress={this.onKeyPress}
                                                    onChange={(e)=>this.chekSet(index,'chekYear',e.target.value)} />
                                            </Col>
                                            <Col sm={5}>
                                                <Input 
                                                    type="text"
                                                    name="name"
                                                    placeholder="شماره چک" 
                                                    id="name" 
                                                    onKeyPress={this.onKeyPress}
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