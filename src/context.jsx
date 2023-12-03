import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState('');

    const updateUserEmail = (email) => {
        setUserEmail(email);
    }

    return (
        <UserContext.Provider value={{ userEmail, updateUserEmail }}>
            {children}
        </UserContext.Provider>
    );
};