import * as SecureStore from 'expo-secure-store';

export const getDataFromSecureStore = async (key) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    console.log('Error retrieving data from secure store:', error);
    return null;
  }
};

export const saveDataToSecureStore = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log('Data saved to secure store successfully.');
  } catch (error) {
    console.log('Error saving data to secure store:', error);
  }
};

export const clearDataFromSecureStore = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log('Data cleared from secure store.');
  } catch (error) {
    console.log('Error clearing data from secure store:', error);
  }
};
