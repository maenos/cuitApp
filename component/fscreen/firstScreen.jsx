import React from "react";
import { Text, View } from "react-native";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { style } from "./fsStyle";
import { useGetAPI } from "../../myHook/useApi";
import config from "./../../config";
import ModalPoup from "../plg/modalPop";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function FirstScreen({ navigation }) {


  

 


  
   
  return (
    <View style={style.container}>
      <Image
        source={require("../../assets/logodecuit-1.png")}
        style={style.image}
      />
      <Text style={style.text}>CUITFACE</Text>
    </View>
  );
}


export default FirstScreen;
