import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../utils/helper";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setMessage("");

    axios.post(`${baseUrl}users/change-password`,
      {
        oldPassword,
        newPassword,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        }
      })
      .then(() => {
        setMessage("Password changed successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        setError(err?.response?.data?.message || "Failed to change password");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen app-gradient flex items-center justify-center">
      <div className="app-card p-8 w-full max-w-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Change password</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Update your current password.</p>
        </div>
        <input
          type="password"
          value={oldPassword}
          onChange={(event) => setOldPassword(event.target.value)}
          placeholder="Current password"
          className="w-full app-input mb-3"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          placeholder="New password"
          className="w-full app-input mb-3"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Confirm new password"
          className="w-full app-input"
        />
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
        <button
          className="mt-4 w-full app-button-primary"
          onClick={handleChangePassword}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Change password"}
        </button>
        <div className="mt-4 text-center">
          <Link to="/settings" className="app-link text-sm">Back to settings</Link>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
