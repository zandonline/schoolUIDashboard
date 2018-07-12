import React from 'react';
import { URL,TOKEN } from '../../constants/api';
import axios from 'axios';

import { 
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    FormGroup,
    Label,
    Input,
    Col,
    Form,
    Row,
    Alert,
    CustomInput,
    FormText
 } from 'reactstrap';

 
class Create extends React.Component{
    constructor(props) {
        super(props);
            this.state = {
            item:{
                company:{
                    name:'',
                    phone:''
                },
                username:false,
                gender:'male',
                marriage_date:'',
                phones:[null,null,null],
                phone_numbers:[null,null,null],
            },
            errorAddItem:false,
            date:{
                margingYear:'',
                margingMonth:'',
                margingDay:'',
                brithYear:'',
                brithMonth:'',
                brithDay:'',
            }
            };
    }
    addItem = () => {
        var item = this.state.item;
        var date = this.state.date;
        if(date.margingYear!=='' && date.margingMonth !==''&&date.margingDay !==''){    
           item.marriage_date=date.margingYear+'/'+date.margingMonth+'/'+date.margingDay
        }
        if(date.brithYear!=='' && date.brithMonth !==''&&date.brithDay !==''){    
            item.birthday=date.brithYear+'/'+date.brithMonth+'/'+date.brithDay
         }
         item.password = item.phone_numbers[0]; 
            if(item.username && item.password !== null && item.firstname && item.lastname){
            axios({ method: 'POST', url: `${URL}customers`,headers: {
                "accept":"application/json",
                "content-type":"application/json",
                "Authorization":`Bearer ${TOKEN}`
                },data:item
            })
            .then((resp)=>{
                this.setState({errorAddItem:false})
                this.props.getItems();
            })
            .catch(error=>{
                if(error.response.status === 412){
                    this.setState({errorAddItem:'کد ملی وارد شده تکراری می باشد'});

                }else{
                    this.setState({errorAddItem:'لطفا تمامی فیلد ها رو پر کنید'});
                }
                
            });
        }else this.setState({errorAddItem:'لطفا تمامی فیلد های الزامی را  پر کنید'})
    }
    changeInput = (value,id,field,index) => {
        let item = this.state.item;
        let date = this.state.date;
        if( field === 'company' ){
            item.company[id] = value;
        }else if(field === 'date'){
            date[id] = value;
        }else if(field === 'phone_numbers'){
            item.phone_numbers[index] = value;
        }else if(field === 'phones'){
            item.phones[index] = value;
        }else {
            item[id] = value;
        }
        
        this.setState({ item,date });
    }
    toggle = () =>{
        this.props.toggle();
      }
    render(){
        return(
            <div>
                <Modal isOpen={true}  className={this.props.className} RTL >
                    <ModalHeader > کاربر جدید </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label for="firstname" sm={3}> نام (الزامی) </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="firstname" 
                                        id="firstname" 
                                        onChange={(e)=>this.changeInput(e.target.value,'firstname',false)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="lastname" sm={3}> نام خانوادگی (الزامی)</Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="lastname" 
                                        id="lastname" 
                                        onChange={(e)=>this.changeInput(e.target.value,'lastname',false)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="username" sm={3}> کد ملی (الزامی) </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="username" 
                                        id="username" 
                                        onChange={(e)=>this.changeInput(e.target.value,'username',false)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="gender" sm={3}>جنسیت</Label>
                                <Col sm={9}>
                                    <CustomInput 
                                        className="rtl"  
                                        type="select" 
                                        id="gender" 
                                        name="gender"
                                        onChange={(e)=>this.changeInput( e.target.value,"gender",false )} 
                                    >
                                        <option value="male"> آقا </option>
                                        <option value="female"> خانم </option>
                                    </CustomInput>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="username" sm={3}>تاریخ تولد</Label>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="روز"
                                        name="birthday" 
                                        id="birthday" 
                                        onChange={(e)=>this.changeInput(e.target.value,'brithDay','date',2)} />
                                </Col>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="ماه"
                                        name="marriage_date" 
                                        id="marriage_date" 
                                        onChange={(e)=>this.changeInput(e.target.value,'brithMonth','date',1)} />
                                </Col>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="سال"
                                        name="birthname" 
                                        id="birthname" 
                                        onChange={(e)=>this.changeInput(e.target.value,'brithYear','date',0)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="gender" sm={3}>وضعیت تاهل</Label>
                                <Col sm={9}>
                                    <CustomInput 
                                        className="rtl"  
                                        type="select" 
                                        id="mariage_status" 
                                        name="mariage_status"
                                        onChange={(e)=>this.changeInput( e.target.value,"mariage_status",false )} 
                                    >
                                        <option value="single"> مجرد </option>
                                        <option value="married"> متاهل </option>
                                    </CustomInput>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="username" sm={3}>تاریخ ازدواج</Label>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="روز"
                                        name="marriage_date" 
                                        id="marriage_date" 
                                        onChange={(e)=>this.changeInput(e.target.value,'margingDay','date',2)} />
                                </Col>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="ماه"
                                        name="marriage_date" 
                                        id="marriage_date" 
                                        onChange={(e)=>this.changeInput(e.target.value,'margingMonth','date',1)} />
                                </Col>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="سال"
                                        name="marriage_date" 
                                        id="marriage_date" 
                                        onChange={(e)=>this.changeInput(e.target.value,'margingYear','date',0)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="address" sm={3}>آدرس</Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="address" 
                                        id="address" 
                                        onChange={(e)=>this.changeInput(e.target.value,'address',false)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="postal_code" sm={3}>کد پستی</Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="postal_code" 
                                        id="postal_code" 
                                        onChange={(e)=>this.changeInput(e.target.value,'postal_code',false)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="phone_number" sm={3}>  موبایل 1(الزامی) </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="phone_number" 
                                        id="phone_number" 
                                        onChange={(e)=>this.changeInput(e.target.value,false,'phone_numbers',0)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="phone_number" sm={3}> موبایل 2 </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="phone_number" 
                                        id="phone_number" 
                                        onChange={(e)=>this.changeInput(e.target.value,false,'phone_numbers',1)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="phone_number" sm={3}> موبایل 3 </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="phone_number" 
                                        id="phone_number" 
                                        onChange={(e)=>this.changeInput(e.target.value,false,'phone_numbers',2)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="phone_number" sm={3}> تلفن ثابت 1 </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="phone_number" 
                                        id="phone_number" 
                                        onChange={(e)=>this.changeInput(e.target.value,false,'phones',0)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="phone_number" sm={3}> تلفن ثابت 2 </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="phones" 
                                        id="phones" 
                                        onChange={(e)=>this.changeInput(e.target.value,false,'phones',1)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="phones" sm={3}>تلفن ثابت 3 </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="phones" 
                                        id="phones" 
                                        onChange={(e)=>this.changeInput(e.target.value,false,'phones',2)} />
                                </Col>
                            </FormGroup>
                            
                            
                            
                            <FormGroup row>
                                <Label for="name" sm={3}>نام شرکت محل کار </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="name" 
                                        id="name" 
                                        onChange={(e)=>this.changeInput(e.target.value,'company_name',false)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="phone" sm={3}> شغل  </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="phone" 
                                        id="phone" 
                                        onChange={(e)=>this.changeInput(e.target.value,'job',false)} />
                                </Col>
                            </FormGroup>
                        </Form>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button  style={{ width:"46%",marginRight:"4%" }} color="secondary" onClick={this.toggle}>انصراف</Button>
                        <Button  style={{ width:"46%" }} color="primary" onClick={this.addItem} >ثبت</Button>{' '}
                    </ModalFooter>
                    <ModalFooter>
                        <Alert isOpen={this.state.errorAddItem} color="danger" style={{ width:"100%",textAlign:'center' }}>
                            {this.state.errorAddItem}
                        </Alert>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Create;