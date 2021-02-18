import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import mainColors from '../../styles/main-colors';
import shadows from '../../styles/shadows';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import UserContext from '../../context/user-context';

export default function ChatInput({
  inputMessage = '',
  updateInputMessage,
  sendMessage,
  typingUser: {id = null, username = null},
}) {
  const {
    loggedUserProfile: {id: loggedUserId},
  } = useContext(UserContext);

  const isCurrentUserTyping = id === loggedUserId;
  return (
    <View style={styles.container}>
      <View style={[styles.textInputStyle]}>
        <View style={styles.isTypingContainer}>
          {!isCurrentUserTyping && username && (
            <Text style={styles.typingText}>{username} is typing...</Text>
          )}
        </View>
        <TextInput
          style={styles.textInput}
          value={inputMessage}
          onChangeText={(text) => updateInputMessage(text)}
          placeholder={'Message'}
          numberOfLines={4}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.icon} onPress={sendMessage}>
        <FontAwesomeIcon
          icon={faPaperPlane}
          size={30}
          color={mainColors.darkGray}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  textInputStyle: {
    flex: 1,
    justifyContent: 'center',
    maxHeight: 100,
  },
  textInput: {
    minHeight: 40,
    borderColor: mainColors.darkGray,
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 8,
    paddingBottom: 4,
    fontSize: 16,
    justifyContent: 'center',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  isTypingContainer: {
    height: 20,
  },
  typingText: {
    fontSize: 12,
  },
});
