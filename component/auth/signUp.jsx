import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { Button } from "react-native-paper";
import { style } from "./authStyle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useDispatch, useSelector } from "react-redux";
import { unwrapResult, registerAndLogin,getMe } from "../../store/auth/action";
import { apiPost } from "../../myHook/apiFunk";
import config from "../../config";

const SignUp = ({ userData, VefCode, setUserExist,navigation }) => {
    const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [matchCode, setMatch] = useState("");
  const [error, setErr] = useState("");

  console.log(VefCode);
  const setUserExistFalse = () => {
    setUserExist(false);
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
  };
  const handleVefCodeChange = (text) => {
    setMatch(text);
  };
  const handleSubmit = async () => {
    const body = { ...userData, username: username };

    if (VefCode === matchCode) {
      try {

        const res = await dispatch(registerAndLogin(body));
        if (res) {
            console.log(res)
            const token = res.payload.token;
           try {
            const resp =  await dispatch(getMe(token));
            if (resp) {
                navigation.replace('Dashboard');
            }
           } catch (error) {
            console.log(error)
           }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setErr("code");
    }
  };

  return (
    <View style={style.container2}>
      <Text
        style={{
          color: "#630",
          textAlign: "center",
          fontSize: 15,
          fontFamily: "Inter",
          fontWeight: "bold",
          textTransform: "uppercase",
          marginVertical: 40,
          marginBottom: 30,
        }}
      >
        dernier etape
      </Text>

      {error == "code" ? (
        <Text style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
          code erroner
        </Text>
      ) : null}

      <KeyboardAwareScrollView>
        <TextInput
          placeholder="Enter votre nom utilisateur"
          style={style.Input}
          value={username}
          onChangeText={handleUsernameChange}
        />

        <TextInput
          placeholder="Entre le code de verification "
          style={style.Input}
          value={matchCode}
          keyboardType="number-pad"
          onChangeText={handleVefCodeChange}
        />

        <Button
          mode="contained"
          buttonColor="#630"
          uppercase={true}
          style={{ marginTop: 20 }}
          onPress={handleSubmit}
        >
          Connection
        </Button>

        <TouchableOpacity onPress={setUserExistFalse}>
          <Text
            style={{
              textAlign: "center",
              color: "black",
              fontWeight: "bold",
              marginTop: 40,
              fontSize: 20,
              textDecorationLine: "underline",
            }}
          >
            retour
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUp;
