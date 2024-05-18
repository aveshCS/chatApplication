// AccountProvider.js

import { createContext, useState, useRef, useEffect } from "react";
import { io } from 'socket.io-client';
import jwt_decode from "jwt-decode";
import { addUser } from "../service/api";

export const AccountContext = createContext(null);

const AccountProvider = ({ 
  children }) => {
  const [account, setAccount] = useState(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
     
      return jwt_decode(token);
    }
    return null;
  });

  const [person, setPerson] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [newMessageFlag, setnewMessageFlag] = useState(false);

  const socket = useRef();

  useEffect(() => {
    socket.current = io('ws://localhost:8025');
    // Clean up function to close socket connection on unmount or logout
    return () => {
      socket.current.disconnect();
    }
  }, []);

  const handleLoginSuccess = async (res) => {
    const decoded = jwt_decode(res.credential);
    setAccount(decoded);
    localStorage.setItem('authToken', res.credential); // Store token in localStorage
    await addUser(decoded);
  };

  const handleLogout = () => {
    setAccount(null);
    localStorage.removeItem('authToken'); // Remove token from localStorage on logout
  };

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        person,
        setPerson,
        socket,
        activeUsers,
        setActiveUsers,
        newMessageFlag,
        setnewMessageFlag,
        handleLoginSuccess,
        handleLogout
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
