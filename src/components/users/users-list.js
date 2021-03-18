import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';

import mainColors from '../../styles/main-colors';
import UserContainer from '../users/user-container';
import SearchInput from './search-input';

export default function UsersList({
  users = [],
  onPress,
  isMarkEnabled,
  deleteEnabled,
  isSingleSelection,
  singleSelectonId,
}) {
  const initialValues = {
    foundUsers: users,
    inputValue: '',
  };

  const [searchResult, setSearchResult] = useState(initialValues);
  const {foundUsers, inputValue} = searchResult;

  onChange = (inputValue) => {
    const lowerCaseValue = inputValue.split(' ').map((e) => e.toLowerCase());

    const foundUsers = users.filter((user) => {
      return user.username.toLowerCase().match(lowerCaseValue);
    });

    setSearchResult({inputValue, foundUsers});
  };

  onReset = () => {
    setSearchResult(initialValues);
  };

  return (
    <View style={styles.container}>
      <SearchInput onChange={onChange} onReset={onReset} value={inputValue} />
      <FlatList
        data={foundUsers}
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
