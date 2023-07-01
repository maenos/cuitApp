import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const MyTabBar = ({ state, descriptors, navigation, insets }) => {
  return (
    <View style={style.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        const iconName = options.tabBarIcon? options.tabBarIcon : null;
        return (
          <TouchableOpacity
          key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          
          >
          <View style={[route.name === 'Actualites' && { borderRightWidth: 2, paddingHorizontal: 60 }, style.tabContent]}>

            
            {    iconName &&
                <Icon name={iconName} size={24} color={isFocused ? "#630" : "#000"} />

            }
             
              <Text
                style={{ color: isFocused ? "#630" : "#000", fontSize: 16, fontWeight: "bold" }}
              >
                {label}
              </Text>
            
            </View>
           
         
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "#630",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderRadius: 26,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
 
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
   
  },
 
});

export default MyTabBar;
