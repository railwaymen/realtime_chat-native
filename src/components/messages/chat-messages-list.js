import React from 'react';
import {StyleSheet, FlatList} from 'react-native';

import SingleMessage from './single-message';

export default function ChatMessagesList({
  messages = [],
  onEndReached = () => {},
  setActionSheetVisibility = () => {},
  inverted = true,
}) {
  return (
    <FlatList
      data={messages}
      renderItem={(message) => (
        <SingleMessage
          message={message}
          setActionSheetVisibility={setActionSheetVisibility}
        />
      )}
      keyExtractor={({id}) => `${id}`}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      contentContainerStyle={styles.flatListContent}
      inverted={inverted}
    />
  );
}

const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: 10,
  },
});
