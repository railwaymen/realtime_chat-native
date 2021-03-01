import React, {useState, useContext} from 'react';
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

import mainColors from '../../styles/main-colors';

export default function EditRoomScreen({
  navigation: {navigate},
  route: {
    params: {
      roomDetails: {id: roomId, name = '', description = ''},
    },
  },
}) {
  const [roomName, setRoomName] = useState(name);
  const [roomDescription, setRoomDescription] = useState(description);

  const onSave = () => {
    RoomsService.updateRoom({
      roomId,
      name: roomName,
      description: roomDescription,
    }).then((res) => {
      navigate('AutorizedTabs', {
        screen: 'MessagesScreen',
      });
    });
  };
  console.log(roomId);
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
                onChange={setRoomName}
                placeholder="Room Name"
                value={roomName}
                label="Name"
                inputContainerStyle={styles.inputContainerStyle}
                customInputBorder="black"
              />
              <FormInput
                onChange={setRoomDescription}
                placeholder="Room Description"
                value={roomDescription}
                label="Description"
                inputContainerStyle={styles.inputContainerStyle}
                customInputBorder="black"
              />
            </View>
          </View>
          <CustomButtom title="Save" onPress={onSave} />
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
