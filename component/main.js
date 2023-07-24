import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import FirstScreen from './fscreen/firstScreen';
import Auth from './auth/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getDataFromSecureStore } from './../myHook/Secure';
import { useDispatch } from "react-redux";
import { getMe } from '../store/auth/action';
import { initializeAuth, setToken } from '../store/auth/auth';

import { useGetAPI } from '../myHook/useApi';
import config from '../config';
import { View, Text } from 'react-native';
import ModalPoup from './plg/modalPop';
import { Image } from 'react-native';
import DrawerNav from './drawerNav';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const { data, loading, error } = useGetAPI(config.API_URL + "/check");


  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);




  useEffect(() => {
  dispatch(initializeAuth());
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, [setIsLoading]);

  

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);



  if (isLoading) {
    return <FirstScreen />

  }


  if (loading) {

    return null
  }
  if (error) {

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ModalPoup visible={true}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("./../assets/icons8-nerd-96.png")}
              style={{ height: 150, width: 150, marginVertical: 10 }}
            />
          </View>

          <Text
            style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}
          >
            Serveur Down: veuillez rechargez L'applicaton plus tard
          </Text>
        </ModalPoup>
      </View>
    );
  }

  if (data.status == "update") {

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ModalPoup visible={true}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("./../assets/icons8-nerd-96.png")}
              style={{ height: 150, width: 150, marginVertical: 10 }}
            />
          </View>

          <Text style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}>
            Nous somme désolés, nous effectuons une mise à jours
          </Text>
        </ModalPoup>
      </View>);
  }







  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        </Stack.Navigator>
      ) : (
        <DrawerNav />

      )}
    </NavigationContainer>
  );
};

export default AuthNavigator;



