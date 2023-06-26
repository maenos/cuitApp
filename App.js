
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstScreen from './component/fscreen/firstScreen';
import { useEffect, useState, useLayoutEffect } from 'react';
import Loader from './component/loader';
import { loadFonts } from './assets/font/fontLoade';
import store from './store/store';
import { Provider } from 'react-redux';
import Auth from './component/auth/auth';
import Dashboard from './component/userAuthPage/Dashboard';
import AuthNavigator from './component/main';

export default function App() {


  const Stack = createNativeStackNavigator();
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useLayoutEffect(() => {
    const loadAppFonts = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAppFonts();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  })



  if (isLoading) {
    return <Loader />;

  }
  if (!fontsLoaded) {

    return null
  }



  return (

    <Provider store={store}>

    <AuthNavigator></AuthNavigator>
      
    </Provider>

  );
}
