import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React, { useMemo, useRef } from 'react'
import { DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import Dashboard from './userAuthPage/Dashboard';
import useLocation from '../myHook/useLocation';
import { style } from './userAuthPage/dashstyle';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Profile from './userAuthPage/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AddPost from './userAuthPage/popup/AddPost';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


const DrawerNav = () => {

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '85%', '100%', '120%'], []);
  const user = useSelector((state) => state.auth.user);

  const { location, adresse, errorMsg } = useLocation();

  const openPopUp = () => {
    bottomSheetModalRef.current?.present();
  }

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
        <Icon2 name="three-bars" size={25} color="#f96" style={style.HeaderLeftIcon} />

      </TouchableOpacity>
    );
  };
  const CustomHeaderRight = ({ navigation }) => {


    return (
      <TouchableOpacity onPress={openPopUp}>
        <Icon3 name="add-circle" size={25} color="#f96" style={style.HeaderLeftIcon} />

      </TouchableOpacity>
    );
  };
  function CustomDrawerContent(props) {
    return (

      <SafeAreaView>
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', marginVertical: 30 }}>
          <Image source={require("./../assets/pp.png")} style={style.image} />
          <Text style={{ marginTop: 20, fontWeight: 'bold' }}>{user.username}</Text>
        </View>

        <DrawerItemList   {...props} />
      </SafeAreaView>





    );
  }

  const Details = () => {

    return <Text>,kllkjkljk</Text>
  }

  const StackNavigator = () => {
    return (
      <BottomSheetModalProvider>
      <Stack.Navigator initialRouteName='home'>
        <Stack.Screen name="home" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
         <BottomSheetModal
      
      ref={bottomSheetModalRef}
      index={3}
      snapPoints={snapPoints}
      backgroundStyle={{ borderRadius: 50, borderColor: '#black',borderWidth: 2,backgroundColor: '#fff' }}
      >
        <AddPost  ></AddPost>
      </BottomSheetModal>
    </BottomSheetModalProvider>
    );
  };

  return (
    
      <Drawer.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ navigation }) => ({


          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            height: 70,
          },
          drawerLabelStyle: {

            marginLeft: 30,
            textAlign: 'center',

          },
          drawerActiveTintColor: '#f93',

          headerTitle: (props) => <CustomDrawerTitle {...props} />,
          headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
          headerRight: () => <CustomHeaderRight navigation={navigation} />,
        })}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="accueil" component={StackNavigator} />
        <Drawer.Screen name="Profile" component={Profile} options={{ headerRight: null }} />

      </Drawer.Navigator>

   

  )
}

export default DrawerNav