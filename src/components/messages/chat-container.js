import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import ChatInput from '../messages/chat-input';
import ChatAttachments from '../attachments/chat-attachments';
import ChatMessagesList from '../messages/chat-messages-list';

export default function ChatContainer({
  messages = [],
  attachments = [],
  inputMessage = '',
  updateInputMessage,
  sendMessage,
  isLoading = true,
  typingUser,
  onEndReached,
  onRemoveAttachment,
  setActionSheetVisibility,
}) {
  const isAttachmentsVisible = attachments.length > 0;

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
              <ChatMessagesList
                messages={messages}
                setActionSheetVisibility={setActionSheetVisibility}
                onEndReached={onEndReached}
              />
              {isAttachmentsVisible && (
                <ChatAttachments
                  attachments={attachments}
                  onRemoveAttachment={onRemoveAttachment}
                />
              )}
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
  flatListContent: {
    paddingBottom: 10,
  },
});
