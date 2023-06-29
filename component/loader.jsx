import React from "react";
import { View, StyleSheet,Image } from "react-native";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const Loader = () => {
  return (
    <View style={styles.container}>
    <ActivityIndicator animating={true} color={MD2Colors.red800} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image:{
    width: 200,
    height: 160
  }
});

export default Loader;
