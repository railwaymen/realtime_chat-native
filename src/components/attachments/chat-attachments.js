import React from 'react';
import {View, Text, FlatList} from 'react-native';
import SingleAttachment from '../attachments/single-attachment';

export default function ChatAttachments({
  attachments = [],
  onRemoveAttachment,
}) {
  return (
    <FlatList
      data={attachments}
      renderItem={({item}) => (
        <SingleAttachment
          attachment={item}
          onRemoveAttachment={onRemoveAttachment}
        />
      )}
      keyExtractor={(_item, index) => `${index}`}
      horizontal
      inverted
    />
  );
}
