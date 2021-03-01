import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import SingleMessage from '../messages/single-message';
import ChatInput from '../messages/chat-input';

export default function ChatContainer({
  messages = [],
  inputMessage = '',
  updateInputMessage,
  sendMessage,
  isLoading = true,
  typingUser,
  onEndReached,
}) {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        keyboardVerticalOffset={90}
        style={styles.keyboard}>
        <View style={styles.flatlist}>
          {isLoading ? (
            <ActivityIndicator style={styles.flatlistStyle} size={'large'} />
          ) : (
            <>
              <FlatList
                data={messages}
                renderItem={(message) => <SingleMessage message={message} />}
                keyExtractor={(message) => message.id.toString()}
                //   contentContainerStyle={styles.flatlistStyle}
                onEndReached={onEndReached}
                // contentContainerStyle={{flex: 1}}
                //  onEndReachedThreshold={0.5}
                inverted
              />
              <ChatInput
                inputMessage={inputMessage}
                updateInputMessage={updateInputMessage}
                sendMessage={sendMessage}
                typingUser={typingUser}
              />
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    flex: 1,
    width: '100%',
    flexGrow: 1,
  },
  flatlistStyle: {
    flexGrow: 1,
  },
  keyboard: {
    flex: 1,
  },
});
