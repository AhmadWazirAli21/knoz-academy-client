
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import axios from 'axios';
import * as yup from 'yup'
import { useState,useEffect } from 'react';
import { Formik } from 'formik';
import { useCourses } from '../../context/CoursesContext';

function Login() {

  const navigate = useNavigate()
  const [error,setError] = useState('');
  const {admin,setAdmin} = useCourses();

  const isRegistered = () => {
    return localStorage.getItem('knoz-user') ? true : false;
  }

  useEffect(() => {
    isRegistered() ? navigate('/') : null
  },[])

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("You must enter a valid email")
      .required("Please enter an email"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 charachter")
      .required("Please enter a password"),
  });
  const onsubmit = async (values) => {
    try {
      await axios.post('/account/login' , values).then((res) =>{
        localStorage.setItem('knoz-user',JSON.stringify(res.data))
        if(res.status == 200) { 
          res.data.user.email == "admin@gmail.com" || res.data.user.email == "bigBoss@gmail.com" ? setAdmin(true) : null;
           navigate('/') 
          } else setError(res.message)
        // console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="login-page-container">
      <h3> {error ? error : ''}  </h3>
      <div className="login-form">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onsubmit(values),
            resetForm({values : null})
          }}
        >
          {(formikProps) => (
              <form className="inputs" onSubmit={formikProps.handleSubmit}>
                <h1>Sign in your Knoz Academy account </h1>
                <p className="error">{formikProps.touched.email && formikProps.errors.email}</p>
                <input
                  name='email'
                  type="email"
                  placeholder="Email"
                  value={formikProps.values.email}
                  onChange={formikProps.handleChange}
                />
                <p className="error">{formikProps.touched.password && formikProps.errors.password}</p>
                <input
                  name='password'
                  type="password"
                  placeholder="Password"
                  className="password-input"
                  value={formikProps.values.password}
                  onChange={formikProps.handleChange}
                />
                <button className="login-page-btn">Sign in</button>
              </form>
          )}
        </Formik>
        <Link className="login-page-createAccount-btn" to='/account/register'>Create account</Link>
      </div>
      <p className="login-page-footer">&copy; 2024 Knoz Academy</p>
    </div>
  );
}

export default Login
