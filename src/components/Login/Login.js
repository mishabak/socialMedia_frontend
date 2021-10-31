import { React, useEffect, useState } from "react";
import LoginCSS from "./Login.module.css";
import Input from "../../UI/input/Input";
import Cookies from "universal-cookie";
import { useHistory } from "react-router";
import { useFormik} from "formik";
import * as yup from "yup";
import axios from "axios";
const server = 'http://localhost:3001'
function Login() {
  // const cookies = new Cookies()
  // const history = useHistory()
  // useEffect(()=>{
  //   const token = cookies.get('userJwt')
  //   if(token){
  //     history.push('/')
  //   }
  // })
  const validationSchema = yup.object({
    userName: yup
    .string()
    .required("Username is required")
    .min(3),
    password: yup
      .string()
      .required("Password is required")
      .max(10, "max length is 10"),
  });
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: values=> {
      axios.post(`${server}/login`,values).then(()=>{{

      }}).catch(()=>{
        
      })
    },
    
  });
  if(formik.touched.password){
    console.log('hello')
  }
    return (
    <div className={LoginCSS.container}>
      <form method='POST' onSubmit={formik.handleSubmit}>
        <div className={LoginCSS.inner}>
          <h3 className={LoginCSS.text_grey}>Login</h3>
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            class={LoginCSS.input}
            name="userName"
            type="text"
            placeholder="Username"
          ></Input>
          { formik.errors && formik.touched.userName?<a href="">{formik.errors.userName}</a>:null}
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            class={LoginCSS.input}
            name="password"
            type="password"
            placeholder="Password"
          ></Input>
          <a href="">
          { formik.errors && formik.touched.password?<a href="">{formik.errors.password}</a>:null}
          </a>
          <div className="submit-btn">
            <button
              type="submit"
              className={`${LoginCSS.btn} ${LoginCSS.currentStyle}`}
            >
              SIGN IN
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
