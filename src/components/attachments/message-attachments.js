import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import AvatarPlaceholder from '../images/avatar-placeholder';

export default function MessageAttachments({
  attachments = [],
  iconColor,
  iconBackground,
}) {
  const isAttachmentVisible = attachments?.length;

  if (!isAttachmentVisible) {
    return null;
  }

  return (
    <View style={styles.attachments}>
      <FlatList
        data={attachments}
        renderItem={({item: {thumbUrl}}) => (
          <View style={styles.item}>
            <AvatarPlaceholder
              url={thumbUrl}
              iconColor={iconColor}
              iconSize={25}
              containerStyle={{
                ...styles.attachment,
                backgroundColor: iconBackground,
              }}
            />
          </View>
        )}
        keyExtractor={({id}) => `${id}`}
        horizontal
        inverted
      />
    </View>
  );
}

const styles = StyleSheet.create({
  attachments: {
    flex: 0.1,
    flexDirection: 'column',
  },
  item: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  attachment: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
