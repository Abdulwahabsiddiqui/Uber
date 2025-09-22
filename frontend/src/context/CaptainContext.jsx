import React, { createContext, useState } from 'react';

export const CaptainContext = createContext();

export const CaptainProvider = ({ children }) => {
    const [captain, setCaptain] = useState({
        name: "",
        email: "",
        token: "",
        isAuthenticated: false,
    });

    return (
        <CaptainContext.Provider value={{ captain, setCaptain }}>
            {children}
        </CaptainContext.Provider>
    );
};