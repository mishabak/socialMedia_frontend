import { React, useEffect, useState } from "react";
import LoginCSS from "./Login.module.css";
import Input from "../../UI/input/Input";
import Cookies from "universal-cookie";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
const server = "http://localhost:3001";
function Login() {
  const cookies = new Cookies();
  const history = useHistory();
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const validationSchema = yup.object({
    userName: yup.string().required("Username is required").min(3),
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
    onSubmit: (values) => {
      axios.post(`${server}/login`, values).then((response) => {
        {
          if (
            response.data.passwordError === undefined &&
            response.data.userNameError === undefined
          ) {
            cookies.set("userJwt", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("userName", response.data.userName);
            localStorage.setItem("userLogin", true);
            history.push('/')
          } else {
            console.log(
              "error",
              response.data.passwordError,
              response.data.userNameError
            );
          }
          // for show error messages using useStatehook and hide using setTimeout
          if (response.data.userNameError === false) {
            setUserNameError(true);
            setTimeout(() => {
              setUserNameError(false);
            }, 3000);
          } else if (response.data.passwordError === false) {
            setPasswordError(true);
            setTimeout(() => {
              setPasswordError(false);
            }, 3000);
          }
        }
      });
    },
  });
  console.log(formik.values)

  useEffect(() => {
    const token = cookies.get("userJwt");
    if (token) {
      history.push("/");
    }
  });

  return (
    <div className={LoginCSS.container}>
      <form method="POST" onSubmit={formik.handleSubmit}>
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

          {formik.errors && formik.touched.userName ? (
            <a>{formik.errors.userName}</a>
          ) : null}
          {userNameError ? <a>Invalid userName</a> : null}

          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            class={LoginCSS.input}
            name="password"
            type="password"
            placeholder="Password"
          ></Input>

          {formik.errors && formik.touched.password ? (
            <a>{formik.errors.password}</a>
          ) : null}

          {passwordError ? <a>Invalid password</a> : null}

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
