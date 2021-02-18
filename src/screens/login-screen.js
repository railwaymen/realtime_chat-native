import React, {useState, useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import UserService from '../services/user-service';
import mainColors from '../styles/main-colors';
import FormInput from '../components/form-input';
import CustomAsyncStorage from '../helpers/custom-async-storage';
import AuthContext from '../context/auth-context';
import UserContext from '../context/user-context';
import CustomButtom from '../shared/custom-buttom';

export default function LoginScreen({navigation: {navigate}}) {
  const [email, setEmail] = useState('user1@example.com');
  const [password, setPassword] = useState('password');
  const {setIsAutorizedStack} = useContext(AuthContext);
  const {setLoggedUserProfile} = useContext(UserContext);

  const onPress = () => {
    UserService.login({email, password})
      .then(async (authData) => {
        // console.log(authData);
        await CustomAsyncStorage.assign(authData);
      })
      .finally(() => {
        setIsAutorizedStack(true);
      });
    // .catch((res) => console.log(res));

    //  navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Text>Login Panel</Text>
      <FormInput onChange={setEmail} placeholder="Your Email " value={email} />
      <FormInput
        onChange={setPassword}
        placeholder="Your Password"
        value={password}
      />
      <CustomButtom title="Get started" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.black,
    flex: 1,
    flexDirection: 'column',
  },
});
