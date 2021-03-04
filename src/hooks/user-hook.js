import React, {useState} from 'react';
import UserContext from '../context/user-context';
import UserModel from '../models/user-model';

export default function UserHook({children}) {
  const [loggedUserProfile, setLoggedUserProfile] = useState(new UserModel({}));

  const updateRoomActivity = (roomId) => {
    return setLoggedUserProfile((prevState) => {
      prevState.roomsActivity[`${roomId}`] = Date.now();
      return prevState;
    });
  };

  return (
    <UserContext.Provider
      value={{
        loggedUserProfile,
        setLoggedUserProfile,
        updateRoomActivity,
      }}>
      {children}
    </UserContext.Provider>
  );
}
