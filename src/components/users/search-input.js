import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';

import mainColors from '../../styles/main-colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons/';

export default function SearchInput({onChange, onReset, value}) {
  const [isFocused, setIsFocused] = useState(false);

  const isCloseIconVisible = value.length > 0;

  const elementsColor = isFocused ? mainColors.lightGray : mainColors.sand;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: elementsColor,
          },
        ]}>
        <View style={styles.icon}>
          <FontAwesomeIcon icon={faSearch} color={elementsColor} size={25} />
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={onChange}
          placeholder="Find User"
          placeholderTextColor={mainColors.sand}
          selectionColor={mainColors.lightGray}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          color={mainColors.creamy}
        />
        {isCloseIconVisible && (
          <TouchableOpacity style={styles.closeIcon} onPress={onReset}>
            <FontAwesomeIcon
              icon={faTimes}
              color={mainColors.darkRed}
              size={25}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: mainColors.lightGray,
    borderRadius: 20,
  },
  closeIcon: {
    alignSelf: 'center',
    marginRight: 10,
  },
  textInput: {
    marginVertical: 8,
    marginHorizontal: 20,
    color: mainColors.sand,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
});
