import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../utils/helper";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReset = () => {
    if (!password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setMessage("");

    axios.patch(`${baseUrl}users/reset-password/${token}`, { password })
      .then(() => {
        setMessage("Password reset successfully. Redirecting...");
        setTimeout(() => navigate("/login"), 1500);
      })
      .catch((err) => {
        setError(err?.response?.data?.message || "Failed to reset password");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen app-gradient flex items-center justify-center">
      <div className="app-card p-8 w-full max-w-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Reset password</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Enter a new password for your account.</p>
        </div>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="New password"
          className="w-full app-input mb-3"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Confirm password"
          className="w-full app-input"
        />
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
        <button
          className="mt-4 w-full app-button-primary"
          onClick={handleReset}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Resetting..." : "Reset password"}
        </button>
        <div className="mt-4 text-center">
          <Link to="/login" className="app-link text-sm">Back to login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
