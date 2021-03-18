import React, {useState, usestate} from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';
import mainColors from '../styles/main-colors';

export default function FormInput({
  onChange,
  placeholder,
  value,
  name,
  label = '',
  inputContainerStyle = {},
  labelStyle = {},
  customInputBorder = '',
  multiline = false,
  inputTextColor,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
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
          onChangeText={(v) => onChange({name, value: v})}
          placeholder={placeholder}
          selectionColor={mainColors.creamy}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          color={inputTextColor || mainColors.creamy}
          multiline={multiline}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignSelf: 'center',
    maxHeight: 150,
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
  },
});
