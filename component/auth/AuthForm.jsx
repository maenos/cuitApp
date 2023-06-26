import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

import { Button } from "react-native-paper";
import { style } from "./authStyle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useDispatch } from "react-redux";
import { authUser, getMe } from "../../store/auth/action";
import { apiPost } from "../../myHook/apiFunk";
import config from "../../config";
import codeGen from "../plg/codeGen";

const AuthForm = ({ setUserExist, setUserData, setVef }) => {
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErr] = useState("");

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = async () => {
    const body = {
      phoneNumber: phoneNumber,
      password: password,
    };
    try {
      const response = await apiPost(config.API_URL + "/checkUser", body);

      if (response.status) {
        try {
          const actionResult = await dispatch(authUser(body));

          if (actionResult) {
            const token = actionResult.payload.token;
            try {
              const resp = await dispatch(getMe(token));
             
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          setErr("password");
        }
      } else {
        setUserExist("non trouver");
        setUserData(body);

        const code = codeGen;
        setVef(code);
        console.log(code);
      }
    } catch (error) {
      console.log(error);
    }
    console.log("Phone Number:", phoneNumber);
    console.log("Password:", password);
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
        Se connecter
      </Text>
      {error == "password" ? (
        <Text style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
          Mot de passe incorrect
        </Text>
      ) : null}

      <KeyboardAwareScrollView>
        <TextInput
          placeholder="Enter Phone Number (22...)"
          style={style.Input}
          value={phoneNumber}
          keyboardType="number-pad"
          onChangeText={handlePhoneNumberChange}
        />

        <Text style={{ textAlign: "right" }}>Mots de passe oublier?</Text>

        <TextInput
          placeholder="Entrer un Mots de passe"
          style={style.Input}
          value={password}
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
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
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AuthForm;
