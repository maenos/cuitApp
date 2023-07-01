import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import Dashboard from './userAuthPage/Dashboard';
import useLocation from '../myHook/useLocation';
import { style } from './userAuthPage/dashstyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Profile from './userAuthPage/profile';
const Drawer = createDrawerNavigator();


const DrawerNav = () => {
  const user = useSelector((state) => state.auth.user);
  const { location, adresse, errorMsg } = useLocation();
  const CustomDrawerTitle = () => {
    return (adresse &&
      <View style={style.HeaderTitle}>
        <Text style={style.HeaderText}>{user.username}</Text>
        <Text style={style.HeaderText2}>{adresse}</Text>
      </View>
    );
  };
  const CustomHeaderLeft = ({ navigation }) => {
    return (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon2 name="three-bars" size={35} color="#f96" style={style.HeaderLeftIcon} />

      </TouchableOpacity>
    );
  };
  const CustomHeaderRight = ({ navigation }) => {
    return (
      <TouchableOpacity onPress={() => alert("ajouter un elements")}>
        <Icon3 name="add-circle" size={35} color="#f96" style={style.HeaderLeftIcon} />

      </TouchableOpacity>
    );
  };
  function CustomDrawerContent(props) {
    return (




    null


    );
  }
  return (
    <Drawer.Navigator
    initialRouteName="Dashboard"
    screenOptions={({ navigation }) => ({
    
      
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#fff',
        height: 80,
      },
     
      headerTitle: (props) => <CustomDrawerTitle {...props} />,
      headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
      headerRight: () => <CustomHeaderRight navigation={navigation} />,
    })}
   // drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen name="Dashboard" component={Dashboard} />
    <Drawer.Screen name="Profile" component={Profile}  options={{ headerRight: null }} />

  </Drawer.Navigator>
  
  )
}

export default DrawerNav