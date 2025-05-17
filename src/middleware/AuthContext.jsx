import React, { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("jwt"); // Fetch token
        if (token) {
            const decoded = jwtDecode(token); // Decode token
            setUser({ id: decoded.id, role: decoded.role ,name: decoded.name, email: decoded.email }); // Set user state
        }
    }, []);

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
