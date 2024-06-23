import { Link, useNavigate } from "react-router-dom";
import './Register.css'
import axios from "axios";
import { useEffect,useState } from "react";
import * as yup  from 'yup'
import { Formik } from "formik";
function Register() {
    const navigate = useNavigate()
    const [error,setError] = useState('');

    const isRegistered = () => {
      return localStorage.getItem('knoz-user') ? true : false;
    }
  
    useEffect(() => {
      isRegistered() ? navigate('/') : null
    },[])

    const validationSchema = yup.object({
      name: yup
      .string()
      .required("Please enter an username"),
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
            const res = await axios.post("account/register", values)
            localStorage.setItem('knoz-user',JSON.stringify(res.data))
          //  JSON.parse(localStorage.getItem('knoz-user')).user.email == "admin@gmail.com" || JSON.parse(localStorage.getItem('knoz-user')).user.email == "bigBoss@gmail.com" ? setAdmin(true) : setAdmin(false);
                navigate("/");
              }
         catch (error) {
            setError(error.msg)
        }
    }
  return (
    <div className="register-page-container">
      <div className="register-form">
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onsubmit(values);
            resetForm({ values: null });
          }}
        >
          {(formikProps) => (
            <form
              className="inputs"
              onSubmit={formikProps.handleSubmit}
            >
              <h1>Sign up in Knoz Academy account</h1>
              <p className="error">
                {formikProps.touched.name && formikProps.errors.name}
              </p>
              <input
                name="name"
                type="text"
                value={formikProps.values.name}
                placeholder="Username"
                onChange={formikProps.handleChange}
              />
              <p className="error">
                {formikProps.touched.email && formikProps.errors.email}
              </p>
              <input
                name="email"
                type="email"
                value={formikProps.values.email}
                placeholder="Email"
                onChange={formikProps.handleChange}
              />
              <p className="error">
                {formikProps.touched.password && formikProps.errors.password}
              </p>
              <input
                name="password"
                type="password"
                value={formikProps.values.password}
                placeholder="Password"
                className="password-input"
                onChange={formikProps.handleChange}
              />
              <button className="register-page-btn">Create account</button>
            </form>
          )}
        </Formik>
        <Link className="register-page-createAccount-btn" to='/account/login'>Sign in</Link>
      </div>
      <p className="register-page-footer">&copy; 2024 Knoz Academy</p>
    </div>
  );
}

export default Register;
