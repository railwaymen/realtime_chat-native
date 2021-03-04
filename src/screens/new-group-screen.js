import React from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import mainColors from '../styles/main-colors';
import CustomButton from '../shared/custom-buttom';
import newGroupImage from '../../assets/images/new-group-unsplash.jpg';

export default function NewGroupScreen({navigation: {navigate}}) {
  const onPress = () => {
    navigate('NewGroupStack');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={newGroupImage} style={styles.image}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>new group screen</Text>
          <CustomButton title="Create New Room" onPress={onPress} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.black,
    flex: 1,
    flexDirection: 'column',
  },
  contentContainer: {
    flex: 0.8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: mainColors.creamy,
  },
});
