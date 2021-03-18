import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
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
import UserContext from '../context/user-context';
import CustomButtom from '../shared/custom-buttom';
import logoImage from '../../assets/images/logo.png';

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    email: 'user1@example.com',
    password: 'password',
  });
  const {email, password} = formData;
  const {setIsAutorizedStack} = useContext(AuthContext);
  const {setLoggedUserProfile} = useContext(UserContext);

  const onPress = () => {
    UserService.login({email, password})
      .then((authData) => {
        CustomAsyncStorage.assign(authData);
      })
      .finally(async () => {
        await getUserProfile();
        setIsAutorizedStack(true);
      });
  };

  const getUserProfile = () => {
    return UserService.getLoggedUserProfile().then(setLoggedUserProfile);
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
                onChange={setFormData}
                placeholder="Your Email"
                value={email}
                name="email"
                label="Email"
              />
              <FormInput
                onChange={setFormData}
                placeholder="Your Password"
                value={password}
                name="password"
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0.18,
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
