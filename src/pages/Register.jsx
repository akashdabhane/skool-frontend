import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Google from "../images/google.png";
import Facebook from "../images/facebook.png";
import Twitter from "../images/twitter.png";
import Logo from "../images/logo.png";
import { useFormik } from "formik";
import { registrationSchema } from "../validationSchema/registrationSchema";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../utils/helper";

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

// Form fields for registration
const formFields = [
  {
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    name: "name",
  },
  {
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    name: "email",
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Create a password",
    name: "password",
  },
  {
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
    name: "confirmPassword",
  },
];

function Register() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // using formik for handling input fields
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // values, handleBlur, handleChange, handleSubmit, errors, touched
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    validateOnChange: true,
    validateOnBlur: false,
    // By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      // setFormData(values);
      handleRegistration(values);

      // to get rid of all the values after submitting the form
      action.resetForm();
    }
  })

  const handleRegistration = (formData) => {
    try {
      axios.post(`${baseUrl}/users/register`, formData, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${Cookies.get('accessToken')}`,
        }
      })
        .then((data) => {
          setError('registration successful!');
          navigate("/login");
        })
        .catch((error) => {
          alert(error);
        });

      // upload image to the cloudinary
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-teal-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <img
            src={Logo}
            alt="Google Classroom"
            className="w-20 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">Create Your Account</h1>
          <p className="text-gray-600 mb-6">Sign up to start learning</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {
            formFields.map((field, index) => (
              <div className="mb-4" key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <input
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {
                  (formik.touched[field.name] && formik.errors[field.name]) &&
                  <p className="text-red-600">{formik.errors[field.name]}</p>
                }
              </div>
            ))
          }

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-500 font-medium hover:underline">
              Sign in here
            </Link>
          </p>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          {
            socialLogins.map((social, index) => (
              <button
                key={index}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow-md"
                aria-label={`Sign up with ${social.name}`}
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

export default Register;
