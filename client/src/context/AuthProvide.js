import {createContext, useContext, useState} from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [signedInEmail, setSignedInEmail] = useState('');

  const signIn = (user) => {
    setSignedInEmail(user);
    // You can also perform other sign-in related logic here if needed
  };

  const signOut = () => {
    setSignedInEmail('');
    // You can perform other sign-out related logic here if needed
  };
    return (
        <AuthContext.Provider value={{auth, signedInEmail, setAuth, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;



  