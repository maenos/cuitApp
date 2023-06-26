import React from "react";
import { Text, View } from "react-native";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { style } from "./fsStyle";
import { useGetAPI } from "../../myHook/useApi";
import config from "./../../config";
import ModalPoup from "../plg/modalPop";
import { useEffect } from "react";

function FirstScreen({ navigation }) {
  const { data, loading, error } = useGetAPI(config.API_URL + "/check");

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
    </View>;
  }


  
  setTimeout(() => {
    navigation.replace("Auth");
  }, 3000);
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

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
export default FirstScreen;
