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

 
class Update extends React.Component{
    constructor(props) {
        super(props);
            this.state = {
            item:this.props.item,
            errorAddItem:false,
            date:{
                margingYear:'',
                margingMonth:'',
                margingDay:'',
                brithYear:'',
                brithMonth:'',
                brithDay:'',
            },
            phones:this.props.item.phones.length === 0?['']:this.props.item.phones,
            phone_numbers:this.props.item.phone_numbers
            };
    }
    componentDidMount(){
    const date =this.state.date;
    const item =this.state.item;
    if( item.marriage_date !== '' ){
        var res = item.marriage_date.split("/");
        date.margingDay=res[2];
        date.margingMonth=res[1];
        date.margingYear=res[0];
    }
    if( item.birthday !== '' ){
        var res = item.birthday.split("/");
        date.brithDay=res[2];
        date.brithMonth=res[1];
        date.brithYear=res[0];
    }
    this.setState({date})

    }
    addItem = () => {
        this.setState({errorAddItem:false,success:false})
        var item = this.state.item;
        var date = this.state.date;
        if(date.margingYear!=='' && date.margingMonth !==''&&date.margingDay !==''){    
           item.marriage_date=date.margingYear+'/'+date.margingMonth+'/'+date.margingDay
        }
        if(date.brithYear!=='' && date.brithMonth !==''&&date.brithDay !==''){    
            item.birthday=date.brithYear+'/'+date.brithMonth+'/'+date.brithDay
         }
         var f = item.favorites;
         item.favorites = [];
         item.favorites[0]=f;
         item.phone_numbers = this.state.phone_numbers;
         item.phones = this.state.phones;
         item.password = item.phone_numbers[0]; 
         item.username = item.phone_numbers[0];
            if(item.username){
            axios({ method: 'PATCH', url: `${URL}customers/${this.state.item._id}`,headers: {
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
        }else this.setState({errorAddItem:'لطفا تمامی فیلد ها رو پر کنید'})
    }
    changeInput = (value,id,field,index) => {
        let item = this.state.item;
        let date = this.state.date;
        if( field === 'company' ){
            item.company[id] = value;
        }else if(field === 'date'){
            date[id] = value;
        }else if(field === "education"){
            item.education[id] = value;
        }else {
            item[id] = value;
        }
        
        this.setState({ item,date });
    }
    toggle = () =>{
        this.props.toggle();
      }
      addPhone = () =>{
        var phones = this.state.phones;
        phones.push('');
        this.setState({phones});
    }
    addPhoneNumbers = () =>{
        var phone_numbers = this.state.phone_numbers;
        phone_numbers.push('');
        this.setState({phone_numbers});
    }
    setPhone = (index,value) =>{
        var phones = this.state.phones;
        phones[index] = value;
        this.setState({phones})
    }
    setPhoneNumbers = (index,value) =>{
        var phone_numbers = this.state.phone_numbers;
        phone_numbers[index] = value;
        this.setState({phone_numbers});
    }
    render(){
            const item = this.state.item;
            const date = this.state.date;
        return(
            <div>
                <Modal isOpen={true}  className={this.props.className} RTL >
                    <ModalHeader > ویرایش مشتری  </ModalHeader>
                    <ModalBody>
                        <Form>
                        <FormGroup row>
                                <Label for="firstname" sm={3}> نام <span className="required-star">*</span> </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="firstname" 
                                        id="firstname" 
                                        value={item.firstname}
                                        onChange={(e)=>this.changeInput(e.target.value,'firstname',false)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="lastname" sm={3}> نام خانوادگی <span className="required-star">*</span></Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="lastname" 
                                        id="lastname" 
                                        value={item.lastname}
                                        onChange={(e)=>this.changeInput(e.target.value,'lastname',false)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="father_name" sm={3}> نام پدر </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="father_name" 
                                        id="father_name" 
                                        value={item.father_name}
                                        onChange={(e)=>this.changeInput(e.target.value,'father_name',false)} />
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
                                        value={item.gender}
                                        onChange={(e)=>this.changeInput( e.target.value,"gender",false )} 
                                    >
                                        <option value="male"> آقا </option>
                                        <option value="female"> خانم </option>
                                    </CustomInput>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="shomare_shenasname" sm={3}> شماره شناسنامه </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        value={item.shomare_shenasname}
                                        name="shomare_shenasname" 
                                        id="shomare_shenasname" 
                                        value={item.shomare_shenasname}
                                        onChange={(e)=>this.changeInput(e.target.value,'shomare_shenasname',false)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="username" sm={3}> کد ملی  </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        maxlength="11"
                                        value={item.code_meli}
                                        name="national_code" 
                                        id="national_code" 
                                        value={item.national_code}
                                        onChange={(e)=>this.changeInput(e.target.value,'national_code',false)} />
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
                                        value={date.brithDay}
                                        onChange={(e)=>this.changeInput(e.target.value,'brithDay','date',2)} />
                                </Col>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="ماه"
                                        name="marriage_date" 
                                        id="marriage_date" 
                                        value={date.brithMonth}
                                        onChange={(e)=>this.changeInput(e.target.value,'brithMonth','date',1)} />
                                </Col>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="سال"
                                        name="birthname" 
                                        id="birthname"
                                        value={date.brithYear} 
                                        onChange={(e)=>this.changeInput(e.target.value,'brithYear','date',0)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="place_of_issue" sm={3}> محل صدور  </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        maxlength="11"
                                        name="place_of_issue" 
                                        id="place_of_issue" 
                                        value={item.place_of_issue}                                        
                                        onChange={(e)=>this.changeInput(e.target.value,'place_of_issue',false)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="field" sm={3}> رشته  </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        maxlength="11"
                                        name="field" 
                                        id="field" 
                                        value={item.education.field}
                                        onChange={(e)=>this.changeInput(e.target.value,'field','education')} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="degree" sm={3}> مدرک تحصیلی  </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        maxlength="11"
                                        name="degree" 
                                        id="degree" 
                                        value={item.education.degree}
                                        onChange={(e)=>this.changeInput(e.target.value,'field','education')} />                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="job" sm={3}> شغل  </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        maxlength="11"
                                        name="job" 
                                        id="job" 
                                        value={item.job}
                                        onChange={(e)=>this.changeInput(e.target.value,'job',false)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="company_name" sm={3}> نام شرکت محل کار  </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        maxlength="11"
                                        name="company_name" 
                                        id="company_name" 
                                        value={item.company_name}
                                        onChange={(e)=>this.changeInput(e.target.value,'company_name',false)} />
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
                                        value={item.mariage_status}
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
                                        value={date.margingDay}
                                        onChange={(e)=>this.changeInput(e.target.value,'margingDay','date',2)} />
                                </Col>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="ماه"
                                        name="marriage_date" 
                                        id="marriage_date" 
                                        value={date.margingMonth}
                                        onChange={(e)=>this.changeInput(e.target.value,'margingMonth','date',1)} />
                                </Col>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="سال"
                                        name="marriage_date" 
                                        id="marriage_date"
                                        value={date.margingYear}
                                        onChange={(e)=>this.changeInput(e.target.value,'margingYear','date',0)} />
                                </Col>
                            </FormGroup>
                            {
                                this.state.phone_numbers.map((phone,index)=>{
                                    return (
                                        <FormGroup row>
                                            <Label for="phone_number" sm={3}> تلفن همراه</Label>
                                            <Col sm={9}>
                                                <Input 
                                                    type="text"
                                                    maxlength="13"
                                                    name="phone_number" 
                                                    id="phone_number" 
                                                    value={phone}
                                                    onChange={(e)=>this.setPhoneNumbers(index,e.target.value)} />
                                            </Col>
                                        </FormGroup>
                                    )
                                })

                            }
                            <FormGroup>
                                <Button color="success" onClick={this.addPhoneNumbers}>جهت افزودن شماره موبایل کلیک کنید +</Button>
                            </FormGroup>
                            {
                                this.state.phones.map((phone,index)=>{
                                    return(
                                        <FormGroup row>
                                        <Label for="phone_number" sm={3}> تلفن ثابت </Label>
                                        <Col sm={9}>
                                            <Input 
                                                type="text"
                                                name="phone_number"
                                                maxlength="13" 
                                                id="phone_number" 
                                                value={phone}
                                                onChange={(e)=>this.setPhone(index,e.target.value)} />
                                        </Col>
                                    </FormGroup>
                                    )
                                })
                            }
                           
                            <FormGroup>
                                <Button color="success" onClick={this.addPhone}>جهت افزودن شماره تلفن ثابت کلیک کنید +</Button>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="address" sm={3}> آدرس  </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="address" 
                                        id="address" 
                                        value={item.address}
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
                                        value={item.postal_code}
                                        onChange={(e)=>this.changeInput(e.target.value,'postal_code',false)} />
                                </Col>
                            </FormGroup>
                            
                            
                            
                        
                            <FormGroup row>
                                <Label for="favorites" sm={3}> علایق  </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="favorites" 
                                        id="favorites" 
                                        value={item.favorites}
                                        onChange={(e)=>this.changeInput(e.target.value,'favorites',false)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="method_of_introduction" sm={3}> نحوه آشنایی با موسسه </Label>
                                <Col sm={9}>
                                    <CustomInput 
                                        className="rtl"  
                                        type="select" 
                                        id="method_of_introduction" 
                                        name="method_of_introduction"
                                        value={item.method_of_introduction}
                                        onChange={(e)=>this.changeInput( e.target.value,"method_of_introduction",false )} 
                                    >
                                        <option value="مراجعه حضوری"> مراجعه حضوری </option>
                                        <option value="تماس تلفنی"> تماس تلفنی </option>
                                        <option value=" مراجعه به سایت فنی و حرفه ای ">  مراجعه به سایت فنی و حرفه ای  </option>
                                        <option value="معرفی دوستان"> معرفی دوستان </option>
                                        <option value="تابلو آموزشگاه"> تابلو آموزشگاه </option>
                                        <option value="118"> 118 </option>
                                        <option value="سمینار آموزشی"> سمینار آموزشی </option>
                                        <option value="جستجو در اینترنت"> جستجو در اینترنت </option>
                                        <option value="سایر موراد"> سایر موراد </option>

                                    </CustomInput>
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

export default Update;