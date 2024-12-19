import React from "react";
import { Link } from "react-router-dom";

// Social media icons and labels
const socialLogins = [
  {
    name: "Google",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Google_Logo.svg",
  },
  {
    name: "Facebook",
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  },
  {
    name: "Twitter",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/44/Twitter_Logo.svg",
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Google_Classroom_logo.svg"
            alt="Google Classroom"
            className="w-20 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">Welcome to Classroom</h1>
          <p className="text-gray-600 mb-6">Sign in to continue</p>
        </div>

        <form>
          {formFields.map((field, index) => (
            <div className="mb-4" key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 font-medium hover:underline">
              Sign up here
            </Link>
          </p>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          {socialLogins.map((social, index) => (
            <button
              key={index}
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow-md"
              aria-label={`Sign in with ${social.name}`}
            >
              <img src={social.icon} alt={social.name} className="w-6" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Login;
