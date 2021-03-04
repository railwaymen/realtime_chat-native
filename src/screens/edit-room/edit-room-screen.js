import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import FormInput from '../../components/form-input';
import CustomButtom from '../../shared/custom-buttom';
import RoomsService from '../../services/rooms-service';
import NewRoomContext from '../../context/new-room-context';

import mainColors from '../../styles/main-colors';

export default function EditRoomScreen({
  navigation: {navigate},
  route: {params: {roomDetails = {}, editRoom = false} = {}},
}) {
  const {newRoom, assignNewRoomAttribiutes} = useContext(NewRoomContext);

  const [room, setRoom] = useState(editRoom ? roomDetails : newRoom);
  const {id: roomId, name, description, type} = room;

  const onChange = ({name, value}) => {
    setRoom((prevRoomState) => ({...prevRoomState, [name]: value}));
  };

  const onSave = () => {
    return RoomsService.updateRoom({
      roomId,
      name,
      description,
    }).then(() => {
      navigate('AutorizedTabs', {
        screen: 'MessagesScreen',
      });
    });
  };

  const onContinue = () => {
    assignNewRoomAttribiutes({...room});

    if (type === 'open') {
      return navigate('SummaryScreen');
    }

    return navigate('RoomMembersScreen');
  };

  return (
    <SafeAreaView style={styles.container} onPress={() => Keyboard.dismiss()}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          keyboardVerticalOffset={90}
          style={styles.keyboard}>
          <View style={styles.formContainer}>
            <View style={styles.formContent}>
              <FormInput
                onChange={onChange}
                placeholder="Room Name"
                value={name}
                name="name"
                label="Name"
                inputContainerStyle={styles.inputContainerStyle}
                customInputBorder="black"
              />
              <FormInput
                onChange={onChange}
                placeholder="Room Description"
                value={description}
                name="description"
                label="Description"
                inputContainerStyle={styles.inputContainerStyle}
                customInputBorder="black"
              />
            </View>
          </View>
          <CustomButtom
            title={editRoom ? 'Save' : 'Continue'}
            onPress={editRoom ? onSave : onContinue}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.darkGray,
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  formContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  formContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  inputContainerStyle: {
    borderColor: mainColors.black,
  },
});
