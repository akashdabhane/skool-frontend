import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/helper";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setMessage("");

    axios.post(`${baseUrl}users/forgot-password`, { email: email.trim() })
      .then(() => {
        setMessage("If the email exists, a reset link has been sent.");
        setEmail("");
      })
      .catch((err) => {
        setError(err?.response?.data?.message || "Failed to send reset link");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen app-gradient flex items-center justify-center">
      <div className="app-card p-8 w-full max-w-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Forgot password</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Enter your email to receive a reset link.</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full app-input"
          />
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
        </div>

        <button
          className="w-full app-button-primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send reset link"}
        </button>

        <div className="mt-6 text-center">
          <Link to="/login" className="app-link text-sm">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
