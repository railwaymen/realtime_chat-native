import React, {useState, useContext} from 'react';
import AuthContext from '../context/auth-context';
import CustomAsyncStorage from '../helpers/custom-async-storage';
import UserContext from '../context/user-context';
import UserModel from '../models/user-model';

export default function AuthHook({children}) {
  const [isAutorizedStack, setIsAutorizedStack] = useState(false);
  const {setLoggedUserProfile} = useContext(UserContext);

  const logout = async () => {
    await CustomAsyncStorage.clearStorage();
    setLoggedUserProfile(new UserModel({}));
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
