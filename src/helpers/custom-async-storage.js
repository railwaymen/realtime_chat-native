import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CustomAsyncStorage {
  static get = async () => {
    const stringValues = await AsyncStorage.getItem('authDetails');

    return JSON.parse(stringValues);
  };

  static assign = async (values) =>
    AsyncStorage.setItem('authDetails', JSON.stringify(values));

  static clearStorage = async () => AsyncStorage.removeItem('authDetails');
}
