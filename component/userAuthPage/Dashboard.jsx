import { View, Text } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../loader";
import useLocation from "../../myHook/useLocation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Actu from "./Dashboard/Actu";
import Follow from "./Dashboard/Follow";
import MyTabBar from "./Dashboard/MyTabBar";
import { SearchBar } from "react-native-elements";

const Tab = createBottomTabNavigator();

const Dashboard = () => {
 

  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  updateSearch = (search) => {
    setSearch(search);
    console.log(search);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  },[setIsLoading]);
  if (isLoading) {
    return <Loader />;
  }
  const CustomHeader = () => {
    return (
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          justifyContent: "center",
        }}
      >
        <SearchBar
          placeholder="envie de ."
          onChangeText={this.updateSearch}
          value={search}
          lightTheme={true}
          containerStyle={{
            backgroundColor: "#fff",
            marginVertical: 15,
            borderColor: "#fff",
          }}
          inputStyle={{
            color: "#333",
            backgroundColor: "#D9D9D9CF",
            borderRadius: 10,
          }}
          inputContainerStyle={{
            color: "#333",
            backgroundColor: "#D9D9D9CF",
            borderRadius: 20,
            width: 280,
            height: 35,
          }}
        />
      </View>
    );
  };
 
  

  return (
    <Tab.Navigator
      initialRouteName="Actu"
      screenOptions={{
        header: CustomHeader,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Actualites" component={Actu} />

      <Tab.Screen name="Suivis" component={Follow}  />

    </Tab.Navigator>
  );
};

export default Dashboard;
