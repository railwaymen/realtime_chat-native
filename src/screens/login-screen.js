import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import UserService from '../services/user-service';
import mainColors from '../styles/main-colors';
import FormInput from '../components/form-input';
import CustomAsyncStorage from '../helpers/custom-async-storage';
import AuthContext from '../context/auth-context';
import CustomButtom from '../shared/custom-buttom';
import logoImage from '../../assets/images/logo.png';

export default function LoginScreen() {
  const [email, setEmail] = useState('user1@example.com');
  const [password, setPassword] = useState('password');
  const {setIsAutorizedStack} = useContext(AuthContext);

  const onPress = () => {
    UserService.login({email, password})
      .then((authData) => CustomAsyncStorage.assign(authData))
      .finally(() => {
        setIsAutorizedStack(true);
      });
  };

  return (
    <SafeAreaView style={styles.container} onPress={() => Keyboard.dismiss()}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          keyboardVerticalOffset={90}
          style={styles.keyboard}>
          <View style={styles.formContainer}>
            <View style={styles.logoContainer}>
              <Image source={logoImage} style={styles.logo} />
            </View>
            <View style={styles.formContent}>
              <FormInput
                onChange={setEmail}
                placeholder="Your Email"
                value={email}
                label="Email"
              />
              <FormInput
                onChange={setPassword}
                placeholder="Your Password"
                value={password}
                label="Password"
              />
            </View>
          </View>
          <CustomButtom title="Login" onPress={onPress} />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.black,
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  formContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  formContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboard: {
    flex: 1,
  },
  logoContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
});
