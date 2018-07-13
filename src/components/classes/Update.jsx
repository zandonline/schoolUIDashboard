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
            classCategory:[],
            days:[
                {
                    starttime:'',
                    endtime:'',
                    day_name:''
                }
            ],
            date:{
                startYear:'',
                startMonth:'',
                startDay:'',
                endYear:'',
                endMonth:'',
                endDay:'',
            }
            };
    }
    componentDidMount(){
        fetch(`${URL}class_category`,{
            method:'GET',
            headers:{
                "Authorization":`Bearer ${TOKEN}`
            }
        })
        .then( resp => resp.json() )
        .then( resp => {
            this.setState({ classCategory:resp });
        })
        .catch( err =>{
            console.log(err);
        });
        const date =this.state.date;
        const item =this.state.item;
        var days = this.state.item.days;
        if( item.startdate !== '' ){
            var res = item.startdate.split("/");
            date.startDay=res[2];
            date.startMonth=res[1];
            date.startYear=res[0];
        }
        if( item.enddate !== '' ){
            var res = item.enddate.split("/");
            date.endDay=res[2];
            date.endMonth=res[1];
            date.endYear=res[0];
        }
        this.setState({date,days});
      }
    addItem = () => {
        var item = this.state.item;
        var date = this.state.date;
        if(date.startYear!=='' && date.startMonth !==''&&date.startDay !==''){    
           item.startdate=date.startYear+'/'+date.startMonth+'/'+date.startDay;
        }
        if(date.endYear!=='' && date.endMonth !==''&&date.endDay !==''){    
            item.birthday=date.endYear+'/'+date.endMonth+'/'+date.endDay
         }
         item.days = this.state.days;
         item.category = item.category._id;
 
            if(item.category){
                console.log("items",item)
            axios({ method: 'PATCH', url: `${URL}class/${this.state.item._id}`,headers: {
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
                console.log(error);
                if(error.response.status === 412){
                    this.setState({errorAddItem:'اطلاعات وارد شده نا معتبر می باشد'});

                }else{
                    this.setState({errorAddItem:'لطفا تمامی فیلد ها رو پر کنید'});
                }
                
            });
        }else this.setState({errorAddItem:'لطفا تمامی فیلد های الزامی را  پر کنید'})
    }
    changeInput = (id,field,value) => {
        let item = this.state.item;
        let date = this.state.date;
        if(field === 'date'){
            date[id] = value;
        }else {
            item[id] = value;
        }
        
        this.setState({ item,date });
    }
    toggle = () =>{
        this.props.toggle();
      }
    daysSet = (index,item,value) =>{
        var days = this.state.days;
        if( item === 'starttime' ){
            days[index].starttime = value;
        }else if(item === 'endtime'){
            days[index].endtime = value;
        }else if( item === 'day_name' ){
            days[index].day_name = value;
        }
    this.setState({days});
    }
    addDays = () =>{
        var days = this.state.days;
        days.push({starttime:'',endtime:'',day_name:''});
        this.setState({days});
    }
    render(){
        const item = this.state.item;
        const date = this.state.date;
        return(
            <div>
            <Modal isOpen={true}  className={this.props.className} RTL >
            <ModalHeader > ویرایش دوره  </ModalHeader>
            <ModalBody>

            <Form>
                            <FormGroup row>
                                <Label for="name" sm={3}> نام دوره </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="name" 
                                        id="name" 
                                        value={item.name}
                                        onChange={(e)=>this.changeInput('name',e.target.value,false)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="teacher" sm={3}> نام و نام خانوادگی استاد</Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="teacher" 
                                        id="teacher" 
                                        value={item.teacher}
                                        onChange={(e)=>this.changeInput('teacher',false,e.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="price" sm={3}> قیمت </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="price" 
                                        id="price" 
                                        value={item.price}
                                        onChange={(e)=>this.changeInput('price',false,e.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="point" sm={3}> امتیازات </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="point" 
                                        id="point" 
                                        value={item.point}
                                        onChange={(e)=>this.changeInput('point',false,e.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="gender" sm={3}>دسته بندی دوره</Label>
                                <Col sm={9}>
                                    <CustomInput 
                                        className="rtl"  
                                        type="select" 
                                        id="category" 
                                        name="category"   
                                        value={item.category}                                     
                                        onChange={(e)=>this.changeInput("category",false,e.target.value )} 
                                    >
                                    {
                                        this.state.classCategory.length > 0?
                                        this.state.classCategory.map((item)=>{
                                            return(
                                                <option value={item._id}> {item.name} </option>
                                            )
                                        })
                                        :null
                                    }
                                        
                                    </CustomInput>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="stateDate" sm={3}>تاریخ  شروع </Label>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="روز"
                                        name="startDay" 
                                        id="startDay" 
                                        value={date.startDay}
                                        onChange={(e)=>this.changeInput('startDay','date',e.target.value)} />
                                </Col>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="ماه"
                                        name="startMonth" 
                                        id="startMonth" 
                                        value={date.startMonth}
                                        onChange={(e)=>this.changeInput('startMonth','date',e.target.value)} />
                                </Col>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="سال"
                                        name="startYear" 
                                        id="startYear" 
                                        value={date.startYear}
                                        onChange={(e)=>this.changeInput('startYear','date',e.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="endDate" sm={3}>تاریخ پایان</Label>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="روز"
                                        name="endYear" 
                                        id="endYear" 
                                        value={date.endDay}
                                        onChange={(e)=>this.changeInput('endDay','date',e.target.value)} />
                                </Col>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="ماه"
                                        name="endMonth" 
                                        id="endMonth" 
                                        value={date.endMonth}
                                        onChange={(e)=>this.changeInput('endMonth','date',e.target.value)} />
                                </Col>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="سال"
                                        name="endYear" 
                                        id="endYear" 
                                        value={date.endYear}
                                        onChange={(e)=>this.changeInput('endYear','date',e.target.value)} />
                                </Col>
                            </FormGroup>
                            {
                                this.state.days.map( (day,index)=>{
                                    return(
                                        <div>
                                        <FormGroup row style={{ fontSize:"13px" }}>
                                            <Label for="day_name" sm={1}>روز برگزاری</Label>
                                            <Col sm={3}>
                                                <CustomInput 
                                                    className="rtl"  
                                                    type="select" 
                                                    id="day_name" 
                                                    name="day_name"
                                                    value={day.day_name}
                                                    onChange={(e)=>this.daysSet( index,"day_name",e.target.value )} 
                                                >
                                                    <option value="شنبه"> شنبه </option>
                                                    <option value="یکشنبه"> یکشنبه </option>
                                                    <option value="دوشنبه"> دوشنبه </option>
                                                    <option value="سه شنبه"> سه شنبه </option>
                                                    <option value="چهارشنبه"> چهارشنبه </option>
                                                    <option value="پنج شنبه"> پنج شنبه </option>
                                                    <option value="جمعه"> جمعه </option>
                                                    
                                                </CustomInput>
                                            </Col>
                                            <Label for="starttime" sm={2}> ساعت شروع </Label>
                                            <Col sm={2}>
                                                <Input 
                                                    type="text"
                                                    name="starttime" 
                                                    id="starttime" 
                                                    value={day.starttime}
                                                    onChange={(e)=>this.daysSet( index,"starttime",e.target.value )} />
                                            </Col>
                                            <Label for="price" sm={2}> ساعت پایان </Label>
                                            <Col sm={2}>
                                                <Input 
                                                    type="text"
                                                    name="endtime" 
                                                    id="endtime" 
                                                    value={day.endtime}
                                                    onChange={(e)=>this.daysSet( index,"endtime",e.target.value )} />
                                            </Col>
                                        </FormGroup>
                            
                                        </div>
                                    )
                                } )
                            }
                            <Button color="success" onClick={this.addDays}>جهت افزودن روزهای دیگر کلیک کنید +</Button>                        
                        </Form>
                        </ModalBody>
                        <ModalFooter>

                        <Button  style={{ width:"46%",marginRight:"4%" }} color="secondary" onClick={this.toggle}>انصراف</Button>
                        <Button  style={{ width:"46%" }} color="primary" onClick={this.addItem} >ثبت</Button>{' '}

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