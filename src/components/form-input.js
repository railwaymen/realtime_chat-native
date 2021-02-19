import React, {useState, usestate} from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';
import mainColors from '../styles/main-colors';

export default function FormInput({
  onChange,
  placeholder,
  value,
  label = '',
  inputContainerStyle = {},
  customInputBorder = '',
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          inputContainerStyle,
          {
            borderColor: isFocused
              ? mainColors.sand
              : mainColors[customInputBorder || 'darkGray'],
          },
        ]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
  },
  label: {
    color: mainColors.creamy,
    marginLeft: 15,
    fontSize: 12,
  },
  inputContainer: {
    textAlign: 'center',
    borderWidth: 2,
    borderColor: mainColors.lightGray,
    borderRadius: 20,
  },
  textInput: {
    margin: 10,
    marginHorizontal: 20,
    color: mainColors.lightBlue,
  },
});
