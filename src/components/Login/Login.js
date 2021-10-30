import {React,useEffect,useState} from "react";
import LoginCSS from "./Login.module.css";
import Input from "../../UI/input/Input";
import Cookies from "universal-cookie";
import { useHistory } from "react-router";
// import { useFormik } from 'formik'

function Login() {
  const cookies = new Cookies()
  const history = useHistory()
  useEffect(()=>{
    const token = cookies.get('userJwt')
    if(token){
      history.push('/')
    }
  })
  return (
    <div className={LoginCSS.container}>
      <div className={LoginCSS.inner}>
        <h3 className={LoginCSS.text_grey}>Login</h3>
        <Input
          class={LoginCSS.input}
          name="email"
          type="email"
          placeholder="Email"
        ></Input>
        <Input
          class={LoginCSS.input}
          name="password"
          type="password"
          placeholder="Password"
        ></Input>
        <div className="submit-btn">
          <button className={`${LoginCSS.btn} ${LoginCSS.currentStyle}`}>
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
