import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../utils/helper";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { loggedInUser, setLoggedInUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${baseUrl}users/current-user`,
            {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            })
            .then((response) => {
                setLoggedInUser(response.data.data.user);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])

    // Show a loading spinner or nothing while fetching user data
    if (isLoading) {
        return <div className="text-center font-bold text-white text-4xl p-10">Loading...</div>; // Or a proper spinner
    }

    return loggedInUser !== null ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;