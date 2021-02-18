import React, {useState} from 'react';
import AuthContext from '../context/auth-context';

export default function AuthHook({children}) {
  const [isAutorizedStack, setIsAutorizedStack] = useState(false);

  const logout = () => {
    setIsAutorizedStack(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAutorizedStack,
        setIsAutorizedStack,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
