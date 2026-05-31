import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../utils/helper";

function JoinClassByLink() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Joining classroom...");

  useEffect(() => {
    axios.patch(`${baseUrl}class/join-by-link/${token}`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        }
      })
      .then(() => {
        setMessage("Classroom joined successfully. Redirecting...");
        setTimeout(() => navigate("/c"), 1200);
      })
      .catch((error) => {
        setMessage(error?.response?.data?.message || "Failed to join classroom");
      });
  }, [navigate, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}

export default JoinClassByLink;
