import React,{useState,useEffect} from "react";
import "./SignUp.css";
import Input from '../../UI/input/Input'
import Select from "../../UI/select/Select";
import Option from "../../UI/select/Option";
import Button from "../../UI/button/Button";
import {useFormik} from"formik";
import axios from 'axios'
import Cookies from 'universal-cookie'
import { Link, useHistory } from 'react-router-dom'

const cookies =new Cookies()
const server = 'http://localhost:3001'

function SignUp() {
 const history = useHistory();
  const moment = require('../../../node_modules/moment');
  const [currentEmail,stateEmail]=useState(null)
  const [validEmail,setValidEmail]=useState(false)
  const [currentPhone,statePhone]=useState(null)
  const [validPhone,setValidPhone]=useState(false)

  let monthOption =moment.monthsShort()
  let dayOption = []
  let yearOption = []

  for(var j=1905;j<=new Date().getFullYear();j++){
   yearOption.push(j)
  }
  for(var i=1;i<=31;i++){
    dayOption.push(i)
  }
  // initial values
  const initialValues={
    firstName:'',
    lastName:'',
    phone:'',
    email:'',
    password:'',
    day:'',
    month:'',
    year:'',
    gender:'',
    reEnterPassword:''
  }
  const onSubmit =(values)=>{
    axios.post(`${server}/sign-up`,values).then((response)=>{
      // console.log(response.data.userId);
    cookies.set('userJwt',response.data.token)
    localStorage.setItem('userId',response.data.userId)
    localStorage.setItem('userName',response.data.userName)
    localStorage.setItem('userLogin',true)
    history.push('/')
    })
  }
  useEffect(()=>{
    var data ={email:formic.values.email}
    axios.post(`${server}/exist-email`,data).then(()=>{
      setValidEmail(true)
    }).catch(()=>{
      setValidEmail(false)
    })
  },[currentEmail])
  
  useEffect(()=>{
    var data ={phone:`+91${formic.values.phone}`}
    axios.post(`${server}/exist-phone`,data).then(()=>{
      setValidPhone(true)
    }).catch(()=>{
      setValidPhone(false)
    })
  },[currentPhone])

  // useEffect(()=>{
  //   const token = cookies.get('userJwt')
  //   if(token){
  //     history.push('/')
  //   }
  // })
  const validation =values =>{
    const error ={}
    // for validate required elements
    if(!values.firstName){
      error.firstName = 'name is requrired'
    }
    if(!values.lastName){
      error.lastName = 'last name is requrired'
    }
    if(!values.phone){
      error.phone = 'phone number is required'
    }else if(values.phone.toString().length>10){
      error.phone ='max length is 10'
    }else if (values.phone.toString().length<10){
      error.phone='min length is 10'
    }
    if(values.phone.toString().length===10){
      statePhone(formic.values.phone)
      if(validPhone){
        error.phone='number is already used'
      }
    }
    if(!values.email){
      error.email = 'email is requrired'
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      error.email = 'Invalid email format'
      }
      if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
       stateEmail(formic.values.email)
        if(validEmail){
          error.email='Email is already used'
        }
      } 

    if(!values.password){
      error.password = 'password is required'
    }
    if(!values.reEnterPassword){
      error.reEnterPassword = 're-enter password'
    }
    if(values.password!==values.reEnterPassword){
      error.reEnterPassword = 'invalid password'
    }
    if(!values.day || !values.month || !values.year){
      error.day ="date of birth is required"
      // error.month='sfd'
      // error.year='ueaar'
    }
    if(!values.gender){
      error.gender='gender is required'
    }
    return error;
  }

  const formic = useFormik({
    initialValues:initialValues,
    validate:validation,
    onSubmit:onSubmit
  })  
  


 
  
  let  inputObject=[
        { onChange:formic.handleChange, onblur:formic.handleBlur, name:'firstName', placeholder:'First name',type:"text",},
        { onChange:formic.handleChange, onblur:formic.handleBlur, name:'lastName', placeholder:'Last name',type:"text",},
        { onChange:formic.handleChange, onblur:formic.handleBlur, name:'phone', placeholder:'Phone',type:"number",},
        { onChange:formic.handleChange, onblur:formic.handleBlur, name:'email', placeholder:'Email',type:"email",},
        { onChange:formic.handleChange, onblur:formic.handleBlur, name:'password', placeholder:'Password',type:"password",},
        { onChange:formic.handleChange, onblur:formic.handleBlur, name:'reEnterPassword', placeholder:'Re-enter password',type:"password",}
    ]
  let selectObject=[
        { onChange:formic.handleChange,onblur:formic.handleBlur, name:'day'},
        { onChange:formic.handleChange,onblur:formic.handleBlur, name:'month'},
        { onChange:formic.handleChange,onblur:formic.handleBlur, name:'year'}
    ]
    let errors=[
      formic.errors && formic.touched.firstName ?<div style={{fontSize:'12px',color:'#808ea2'}} >{formic.errors.firstName}</div>:null,
      formic.errors && formic.touched.lastName ?<div style={{fontSize:'12px',color:'#808ea2'}} >{formic.errors.lastName}</div>:null,
      formic.errors && formic.touched.phone ?<div style={{fontSize:'12px',color:'#808ea2'}} >{formic.errors.phone}</div>:null,
      formic.errors && formic.touched.email ?<div style={{fontSize:'12px',color:'#808ea2'}} >{formic.errors.email}</div>:null,
      formic.errors && formic.touched.password ?<div style={{fontSize:'12px',color:'#808ea2'}} >{formic.errors.password}</div>:null,
      formic.errors && formic.touched.reEnterPassword ?<div style={{fontSize:'12px',color:'#808ea2'}} >{formic.errors.reEnterPassword}</div>:null,
    ]
  
  return (
    <div className="container ">
      <div style={{display:'flex',}} className="justify-content-center ">
        <div className="form-background">
          <form method='POST'  onSubmit={formic.handleSubmit}>
            <h3 className='text-align-center text-grey'>Create an account</h3>
            <div className="firstFiveInput margin">
            {inputObject.map((obj,index)=>{  return <div> <Input class='signup-input' onBlur={obj.onblur} name={obj.name} onChange={obj.onChange} placeholder={obj.placeholder} type={obj.type} /><br />{errors[index]}  </div>})}
            </div>
            <h5 className="text-grey birthday">Birthday</h5>
            <div class='date'>
               <Select class="date-input" onChange={selectObject[0].onChange} name={selectObject[0].name}>{dayOption.map((obj)=>{return <Option text={obj}></Option>})}</Select>
               <Select class="date-input" onChange={selectObject[1].onChange} name={selectObject[1].name}>{monthOption.map((obj)=>{return <Option text={obj}></Option>})}</Select>
               <Select class="date-input" onChange={selectObject[2].onChange} name={selectObject[2].name}>{yearOption.map((obj)=>{return <Option text={obj}></Option>})}</Select>       
            </div>
            {formic.errors && formic.touched.day && formic.touched.month && formic.touched.year?<h1 style={{fontSize:'12px',color:'#808ea2',textAlign:'center'}}>{formic.errors.day}</h1>:null}
            <h5 className="text-grey birthday">Gender</h5>
            <div class='date'>
              <Input onChange={formic.handleChange} onBlur={formic.handleBlur}  name='gender' value='male' class='radio' type="radio"></Input>
              <label className="text-grey birthday" htmlFor="">Male</label>
              <Input onChange={formic.handleChange} onBlur={formic.handleBlur} name='gender'  value='female' class='radio'  type="radio"></Input>
              <label className="text-grey " htmlFor="">Female</label>
            </div>
           {formic.errors && formic.touched.gender?<h1 style={{fontSize:'12px',color:'#808ea2',textAlign:'center'}} >{formic.errors.gender}</h1>:null} 
            <div className='submit-btn'>
            <Button  class='currentStyle btn' type='submit'text='SIGN UP'/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
