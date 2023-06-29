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
  const { data, loading, error } = useGetAPI(config.API_URL + "/check");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


  if (loading) {
    return null;
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ModalPoup visible={true}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("./../../assets/icons8-nerd-96.png")}
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
    return(
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ModalPoup visible={true}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("./../../assets/icons8-nerd-96.png")}
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
