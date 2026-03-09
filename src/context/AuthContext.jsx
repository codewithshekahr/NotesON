import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the Auth Context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    // Load user from localStorage on initial mount
    useEffect(() => {
        const storedUser = localStorage.getItem('noteson_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (name, email) => {
        // Determine role. If Shekhar Kashyap, make them admin.
        const isAdmin = name.toLowerCase() === 'shekhar kashyap' || email.toLowerCase() === 'shekhar@example.com';

        const userData = {
            name,
            email,
            role: isAdmin ? 'admin' : 'student',
            id: Date.now().toString() // Generate a simple mock ID
        };

        setUser(userData);
        localStorage.setItem('noteson_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('noteson_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoginModalOpen, setIsLoginModalOpen }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for consuming the context
export const useAuth = () => useContext(AuthContext);
