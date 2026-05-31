import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [showBar, setShowBar] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const toggleBar = () => setShowBar(!showBar);

    return (
        <StateContext.Provider
            value={{
                showBar,
                setShowBar,
                toggleBar,
                notifications,
                setNotifications,
                unreadCount,
                setUnreadCount,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);