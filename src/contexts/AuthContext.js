import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [showPage, setShowPage] = useState(1)

    return (
        <AuthContext.Provider
            value={{ loggedInUser, setLoggedInUser, showPage, setShowPage }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);