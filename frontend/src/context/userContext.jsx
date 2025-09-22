import React, { useState ,createContext} from "react";

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    token: "",
    isAuthenticated: false,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
