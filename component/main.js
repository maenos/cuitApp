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

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getData();
        setTimeout(() => {
            setIsLoading(false);
        },  2000)
    }, []);

    const getData = async () => {
        const value = await getDataFromSecureStore('_authToken');

        dispatch(getMe(value));
    };


    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if (isLoading) {
        return <FirstScreen />
        
    } 
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    !isLoggedIn ?
                        <>

                            <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
                        </>
                        :
                        <>
                            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: true, title: 'for login use' }} />
                        </>
                }



            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigator;



