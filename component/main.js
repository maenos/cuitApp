import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import FirstScreen from './fscreen/firstScreen';
import Auth from './auth/auth';
import Dashboard from './userAuthPage/Dashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getDataFromSecureStore } from './../myHook/Secure';
import { useDispatch } from "react-redux";
import { getMe } from '../store/auth/action';
import { useGetAPI } from '../myHook/useApi';
import config from '../config';
import { View, Text } from 'react-native';
import ModalPoup from './plg/modalPop';
import { Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AuthNavigator = () => {
  const { data, loading, error } = useGetAPI(config.API_URL + "/check");

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);




  useEffect(() => {
    getData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, []);

  const getData = async () => {
    const value = await getDataFromSecureStore('_authToken');

    dispatch(getMe(value));
  };

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
      <Drawer.Screen name="Stack">
        {() => (
          <Stack.Navigator>
            {!isLoggedIn ? (
              <>
                <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
              </>
            ) : (
              <>
                <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: true, title: 'for login use' }} />
              </>
            )}
          </Stack.Navigator>
        )}
      </Drawer.Screen>
    </NavigationContainer>
  );
};

export default AuthNavigator;



