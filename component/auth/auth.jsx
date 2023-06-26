import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { style } from "./authStyle";
import AuthForm from "./AuthForm";
import { useKeyboard } from "@react-native-community/hooks";
import SignUp from "./signUp";

const Auth = ( {navigation}) => {
   const [userExist, setUserExist] = useState(false);
   const [userData, setUserData] = useState(null);
   const [VefCode, setVef] = useState('');

  const keyboard = useKeyboard();

  const keyBoardShow = () => {
    if (!keyboard.keyboardShown) {
      return(
      <Image
        source={require("../../assets/logodecuit-1.png")}
        style={style.image2}
      />);
    }
  };

  useEffect(() => {
     console.log(userData);
  },[userExist]);

  return (
    <View style={style.container}>
      <View style={style.rectangle}>
        <Image
          source={require("../../assets/rectangle-28.png")}
          style={style.image}
        />
        <Text
          style={{
            marginVertical: 18,
            fontSize: 24,
            textAlign: "center",
            color: "#fff",
            fontFamily: "Inter",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          Bienvenue sur cuit
        </Text>
      </View>

      




      {
        userExist === "touver" ?  <Text>Vous j'existe</Text> : userExist === "non trouver" ? <SignUp userData={userData} VefCode={VefCode} setUserExist={setUserExist} navigation={navigation}> </SignUp> : <AuthForm setUserExist={setUserExist} setUserData={setUserData} setVef={setVef}> </AuthForm>
      }

      {keyBoardShow()}
    </View>
  );
};

export default Auth;
