import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import mainColors from '../styles/main-colors';
import backgroundImage from '../../assets/images/star-wars-unsplash.jpg';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faComments} from '@fortawesome/free-solid-svg-icons/';
import CustomButtom from '../shared/custom-buttom';
import logoImage from '../../assets/images/logo.png';

export default function InitialScreen({navigation: {navigate}}) {
  const onPress = () => {
    navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.image}>
        <SafeAreaView style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logoContainer}>
              <Image source={logoImage} style={styles.logo} />
              <Text style={styles.text}>Chat App</Text>
            </View>
          </View>
          <View style={styles.buttomContainer}>
            <CustomButtom title="Get started" onPress={onPress} />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 30,
    flex: 0.5,
    alignItems: 'center',
  },
  buttomContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  text: {
    color: mainColors.lightGray,
  },
  button: {
    backgroundColor: mainColors.lightBlue,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
