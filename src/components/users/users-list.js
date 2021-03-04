import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import mainColors from '../../styles/main-colors';
import UserContainer from '../users/user-container';

export default function UsersList({
  users = [],
  onPress,
  isMarkEnabled,
  deleteEnabled,
  isSingleSelection,
  singleSelectonId,
}) {
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({item}) => (
          <UserContainer
            user={item}
            onPress={onPress}
            isMarkEnabled={isMarkEnabled}
            deleteEnabled={deleteEnabled}
            isSingleSelection={isSingleSelection}
            singleSelectonId={singleSelectonId}
          />
        )}
        keyExtractor={({id}) => id.toString()}
      />
    </View>
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
});
