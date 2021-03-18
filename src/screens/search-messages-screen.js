import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import mainColors from '../styles/main-colors';
import FormInput from '../components/form-input';
import CustomButton from '../shared/custom-buttom';
import MessagesService from '../services/messages-service';
import ChatMessagesList from '../components/messages/chat-messages-list';

export default function SearchMessagesScreen({
  route: {
    params: {roomId},
  },
}) {
  const [searchData, setSearchData] = useState({
    responseResult: [],
    phrase: '',
  });
  const {responseResult, phrase} = searchData;

  const updateSearchData = ({name, value}) => {
    setSearchData((prevState) => ({...prevState, [`${name}`]: value}));
  };

  const onSearch = () => {
    console.log(roomId);
    return MessagesService.searchMessagesForCurrentRoom({
      phrase,
      lastMessageId: null,
      roomId,
    }).then((response) => {
      console.log(response);
      updateSearchData({name: 'responseResult', value: response});
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FormInput
        onChange={updateSearchData}
        placeholder="Enter Message Phrase"
        value={phrase}
        name="phrase"
        label="Message Phrase"
        multiline
        labelStyle={styles.labelStyle}
        inputTextColor={mainColors.darkGray}
      />
      <CustomButton title="Search" onPress={onSearch} />

      <ChatMessagesList
        messages={responseResult}
        // onEndReached={onEndReached}
        inverted={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.black,
    flex: 1,
    flexDirection: 'column',
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    color: mainColors.darkGray,
  },
});
