import 'react-native-gesture-handler';
import { SafeAreaView, StatusBar } from 'react-native';
import { useEffect, useState, useLayoutEffect } from 'react';
import Loader from './component/loader';
import { loadFonts } from './assets/font/fontLoade';
import store from './store/store';
import { Provider } from 'react-redux';
import AuthNavigator from './component/main';
import { useGetAPI } from './myHook/useApi';
import { Text, View } from "react-native";
import config from './config';
import ModalPoup from './component/plg/modalPop';
import { Image } from 'react-native';

export default function App() {


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

      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <SafeAreaView style={{ flex: 1, height: '100%' }}>
        <AuthNavigator></AuthNavigator>
      </SafeAreaView>


    </Provider>

  );
}
