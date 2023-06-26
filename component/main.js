import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import FirstScreen from './fscreen/firstScreen';
import Auth from './auth/auth';
import Dashboard from './userAuthPage/Dashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    !isLoggedIn ?
                        <>
                            <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
                        </>
                        :
                        <>
                            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: true, title: 'for login use', animationTypeForReplace: isLoggedIn ? 'pop' : 'push' }} />
                        </>
                }



            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigator;



