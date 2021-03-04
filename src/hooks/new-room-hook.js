import React, {useState, useContext} from 'react';
import NewRoomContext from '../context/new-room-context';
import RoomModel from '../models/room-model';

export default function NewRoomHook({children}) {
  const [newRoom, setNewRoom] = useState(new RoomModel({}));
  const {name, description, type, usersIds = ''} = newRoom;

  const assignNewRoomAttribiutes = (attribiutes) => {
    setNewRoom((prevState) => ({...prevState, ...attribiutes}));
  };

  const newRoomToRequestParams = () => ({
    name,
    description,
    type,
    users_ids: usersIds,
  });

  return (
    <NewRoomContext.Provider
      value={{
        newRoom,
        assignNewRoomAttribiutes,
        newRoomToRequestParams,
      }}>
      {children}
    </NewRoomContext.Provider>
  );
}
