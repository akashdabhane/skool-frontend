import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [showBar, setShowBar] = useState(false);
    const toggleBar = () => setShowBar(!showBar);

    return (
        <StateContext.Provider
            value={{ showBar, setShowBar, toggleBar }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);