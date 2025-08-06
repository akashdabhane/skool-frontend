import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Google from "../images/google.png";
import Facebook from "../images/facebook.png";
import Twitter from "../images/twitter.png";
import Logo from "../images/logo.png";
import { useFormik } from "formik";
import { loginSchema } from "../validationSchema/loginSchema";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../utils/helper";
import { useAuth } from "../contexts/AuthContext";

// Social media icons and labels
const socialLogins = [
  {
    name: "Google",
    icon: Google,
  },
  {
    name: "Facebook",
    icon: Facebook,
  },
  {
    name: "Twitter",
    icon: Twitter,
  },
];

// Form fields
const formFields = [
  {
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
];

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { setLoggedInUser } = useAuth();

  // using formik for handling input fields
  const initialValues = {
    email: "",
    password: "",
  };

  // values, handleBlur, handleChange, handleSubmit, errors, touched
  // By disabling validation onChange and onBlur formik will validate on submit.
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values, action) => {
      handleLogin(values);    // function to handle login 

      // to get rid of all the values after submitting the form
      action.resetForm();
    }
  })


  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(`${baseUrl}users/login`, formData);
      console.log(response);
      if (response?.status === 200) {
        setError('login successful!');
        Cookies.set('accessToken', response.data.data.accessToken, { expires: 1 }); // set token in cookies
        Cookies.set('refreshToken', response.data.data.refreshToken, { expires: 1 }); // set token in cookies

        setLoggedInUser(response.data.data.user)
        navigate("/c");
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.log(error)
      setError(error.message || 'Error occured while logging in');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <img
            src={Logo}
            alt="Google Classroom"
            className="w-20 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Welcome to Skool</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Sign in to continue</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {
            formFields.map((field, index) => (
              <div className="mb-4" key={index}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {field.label}
                </label>
                <input
                  value={formik.values[field.type]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type={field.type}
                  name={field.type}
                  id={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                />
                {
                  (formik.touched[field.type] && formik.errors[field.type]) &&
                  <p className="text-red-600">{formik.errors[field.type]}</p>
                }
              </div>
            ))
          }

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 font-medium hover:underline">
              Sign up here
            </Link>
          </p>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          {
            socialLogins.map((social, index) => (
              <button
                key={index}
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-950 p-2 rounded-full shadow-md"
                aria-label={`Sign in with ${social.name}`}
              >
                <img src={social.icon} alt={social.name} className="w-6" />
              </button>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Login;
