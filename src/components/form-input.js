import React, {useState, usestate} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import mainColors from '../styles/main-colors';

export default function FormInput({onChange, placeholder, value}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={onChange}
        placeholder={placeholder}
        selectionColor={mainColors.creamy}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        color={mainColors.creamy}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    color: mainColors.lightBlue,
  },
});
