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
import PhoneInput from "react-native-phone-number-input";
import { saveDataToSecureStore } from "../../myHook/Secure";

const AuthForm = ({ setUserExist, setUserData, setVef }) => {
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErr] = useState("");

  const handlePhoneNumberChange = (text) => {
    console.log(text);
    setPhoneNumber(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = async () => {
    if (
      phoneNumber &&
      password &&
      password.trim() !== "" &&
      phoneNumber.trim() !== ""
    ) {
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
                saveDataToSecureStore("_authToken", token);
                dispatch(getMe(token));
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
    } else {
      setErr("empty");
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
        Se connecter
      </Text>
      {error == "empty" ? (
        <Text style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
          veuillez remplir les champs
        </Text>
      ) : null}
      {error == "password" ? (
        <Text style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
          Mot de passe incorrect
        </Text>
      ) : null}

      <KeyboardAwareScrollView>
        <PhoneInput
          defaultValue={phoneNumber}
          defaultCode="TG"
          onChangeFormattedText={handlePhoneNumberChange}
          containerStyle={{
            borderColor: "#818181",
            borderWidth: 1,
            borderRadius: 12,
            marginTop: 10,
          }}
          placeholder="numéro de téléphone"
        ></PhoneInput>

        <Text style={{ textAlign: "right", marginVertical: 10 }}>
          Mots de passe oublier?
        </Text>

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
