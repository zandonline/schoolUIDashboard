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
                "name":"",
                "category": "",
                "startdate": "",
                "enddate": "",
                "teacher": "",
                "point": 0,
                "credit": 0,
                "price": 0,
                
            },
            errorAddItem:false,
            success:false,
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
      }
    addItem = () => {
        this.setState({errorAddItem:false,success:false})
        var item = this.state.item;
        var date = this.state.date;
        if(date.startYear!=='' && date.startMonth !==''&&date.startDay !==''){    
           item.startdate=date.startYear+'/'+date.startMonth+'/'+date.startDay;
        }
        if(date.endYear!=='' && date.endMonth !==''&&date.endDay !==''){    
            item.birthday=date.endYear+'/'+date.endMonth+'/'+date.endDay
         }
         item.days = this.state.days;
 
            if(item.category){
            axios({ method: 'POST', url: `${URL}class`,headers: {
                "accept":"application/json",
                "content-type":"application/json",
                "Authorization":`Bearer ${TOKEN}`
                },data:item
            })
            .then((resp)=>{
                this.setState({errorAddItem:false,success:"دوره جدید ثبت شد"})
                window.location.reload();
            })
            .catch(error=>{
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
        console.log("stat",this.state)
        return(
            <div>
            <div style={{ width:"50%" }}>
            <Form>
                            <FormGroup row>
                                <Label for="teacher" sm={3}> نام و نام خانوادگی استاد</Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="teacher" 
                                        id="teacher" 
                                        onChange={(e)=>this.changeInput('teacher',false,e.target.value)} />
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
                                        onChange={(e)=>this.changeInput("category",false,e.target.value )} 
                                    >
                                        <option value={false}> یک گزینه را انتخاب کنید </option>
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
                                <Label for="name" sm={3}> نام دوره </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="name" 
                                        id="name" 
                                        onChange={(e)=>this.changeInput('name',false,e.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="point" sm={3}> امتیازات </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="point" 
                                        id="point" 
                                        onChange={(e)=>this.changeInput('point',false,e.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="price" sm={3}> قیمت </Label>
                                <Col sm={9}>
                                    <Input 
                                        type="text"
                                        name="price" 
                                        id="price" 
                                        onChange={(e)=>this.changeInput('price',false,e.target.value)} />
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
                                        onChange={(e)=>this.changeInput('startDay','date',e.target.value)} />
                                </Col>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="ماه"
                                        name="startMonth" 
                                        id="startMonth" 
                                        onChange={(e)=>this.changeInput('startMonth','date',e.target.value)} />
                                </Col>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="سال"
                                        name="startYear" 
                                        id="startYear" 
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
                                        onChange={(e)=>this.changeInput('endDay','date',e.target.value)} />
                                </Col>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="ماه"
                                        name="endMonth" 
                                        id="endMonth" 
                                        onChange={(e)=>this.changeInput('endMonth','date',e.target.value)} />
                                </Col>
                                <Col sm={3}>
                                    <Input 
                                        type="text"
                                        placeholder="سال"
                                        name="endYear" 
                                        id="endYear" 
                                        onChange={(e)=>this.changeInput('endYear','date',e.target.value)} />
                                </Col>
                            </FormGroup>
                            
                            {
                                this.state.days.map( (item,index)=>{
                                    return(
                                        <div>
                                        <FormGroup row style={{ fontSize:"13px" }}>
                                            <Label for="day_name" sm={2}>روز برگزاری</Label>
                                            <Col sm={2}>
                                                <CustomInput 
                                                    className="rtl"  
                                                    type="select" 
                                                    id="day_name" 
                                                    name="day_name"
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
                                                    onChange={(e)=>this.daysSet( index,"starttime",e.target.value )} />
                                            </Col>
                                            <Label for="price" sm={2}> ساعت پایان </Label>
                                            <Col sm={2}>
                                                <Input 
                                                    type="text"
                                                    name="endtime" 
                                                    id="endtime" 
                                                    onChange={(e)=>this.daysSet( index,"endtime",e.target.value )} />
                                            </Col>
                                        </FormGroup>
                            
                                        </div>
                                    )
                                } )
                            }
                            <Button color="success" onClick={this.addDays}>جهت افزودن روزهای دیگر کلیک کنید +</Button>                        </Form>
                        <Button  style={{ width:"100%",marginTop:"10px" }} color="primary" onClick={this.addItem} >ثبت</Button>{' '}

                        <Alert isOpen={this.state.errorAddItem} color="danger" style={{ width:"100%",textAlign:'center' }}>
                            {this.state.errorAddItem}
                        </Alert>
                        <Alert isOpen={this.state.success} color="success" style={{ width:"100%",textAlign:'center' }}>
                            {this.state.success}
                        </Alert>
            </div>                        
            </div>
        );
    }
}

export default Create;