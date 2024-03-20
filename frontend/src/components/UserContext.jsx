import { createContext } from "react";
const UserContext = createContext(null);
export default UserContext;

// import React, { createContext, useState, useEffect } from 'react';

// // Create a new context
// const UserContext = createContext();

// // Create a UserContext provider component
// const UserProvider = ({ children }) => {
//     // State to store user data
//     const [user, setUser] = useState(null);

//     // useEffect to initialize user state (optional)
//     useEffect(() => {
//         // Check if user data is available in localStorage or session storage
//         const userData = localStorage.getItem('userData');
//         if (userData) {
//             setUser(JSON.parse(userData));
//         }
//     }, []);

//     // Function to update user data
//     const updateUser = (userData) => {
//         setUser(userData);
//         // Save user data to localStorage or session storage
//         localStorage.setItem('userData', JSON.stringify(userData));
//     };

//     // Function to clear user data (logout)
//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem('userData');
//     };

//     // Provide the user object and functions to children components
//     return (
//         <UserContext.Provider value={{ user, updateUser, logout }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export { UserContext, UserProvider };
