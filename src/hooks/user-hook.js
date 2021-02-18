import React, {useState} from 'react';
import UserContext from '../context/user-context';
import UserModel from '../models/user-model';

export default function UserHook({children}) {
  const [loggedUserProfile, setLoggedUserProfile] = useState(new UserModel({}));

  return (
    <UserContext.Provider
      value={{
        loggedUserProfile,
        setLoggedUserProfile,
      }}>
      {children}
    </UserContext.Provider>
  );
}
