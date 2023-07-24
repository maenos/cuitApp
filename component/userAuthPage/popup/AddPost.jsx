import {
  View,
  Text,

  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Entypo";

import { Button } from "react-native-paper";
import {
  pickImageFromPhone,
  takePhotoFromCamera,
} from "../../../myHook/ImageTake";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../../store/post/action";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import useLocation from "../../../myHook/useLocation";
const AddPost = () => {

  const dispatch = useDispatch();

  const { latitude, longitude, adresse, errorMsg } = useLocation();

  const [err1, setErr1] = useState("");
  const [image, setImage] = useState([]);

  const [describe, setDescribe] = useState("");
  const [location, setLocation] = useState(true);
  const [locationText, setText] = useState("");
  const [avalaible1, setAvalaible1] = useState(false);
  const [avalaible2, setAvalaible2] = useState(false);
  const [privatePost, setPrivate] = useState(false);
  const [name, setName] = useState("");
  const selectImage = async () => {
    const { selectedImage, permissionError, cancelled } =
      await pickImageFromPhone();

    if (permissionError) {
    }
    if (cancelled) {
    }
    if (selectedImage) {
      console.log(selectedImage)
      if (image.length <= 2) {
       
        const imageObject = {
          uri: selectedImage,
          name: `photo-${image.length}.jpg`,
          type: 'image/jpeg',
        };
        setImage([...image, imageObject]);
      } else {
        setErr1("Maximum 3 images");
      }
    }
  };
  const TakePick = async () => {
    const { selectedImage, permissionError, cancelled } =
      await takePhotoFromCamera();
    if (permissionError) {
    }
    if (cancelled) {
    }
    if (selectedImage) {
      console.log(selectedImage)
      if (image.length <= 2) {
        const imageObject = {
          uri: selectedImage,
          name: `photo-${image.length}.jpg`,
          type: 'image/jpeg',
        };
        setImage([...image, imageObject]);
      } else {
        setErr1("Maximum 3 images");
      }
    }
  };
  const handleSwitchLocation = (value) => {
    setLocation(value);
  };
  const handleSwitchAvailable1 = (value) => {
    setAvalaible1(value);
  };
  const handleSwitchAvailable2 = (value) => {
    setAvalaible2(value);
  };
  const handleSwitchAvailable3 = (value) => {
    setPrivate(value);
  };
  const handleSubmit = async () => {
    let available = {
      odon: avalaible1,
      gozem: avalaible2,
    };
    let loc = "";
    if (location) {
      loc = {
        latitude: latitude,
        longitude: longitude,
      };
    } else {
      loc = {
        latitude: 0,
        longitude: 0,
        data: locationText,
      };
    }

    let formData = new FormData();

    try {
      if (name && describe && loc && image) {
       

        if (location || locationText) {
          formData.append("name", name);
          formData.append("description", describe);
          formData.append("available", JSON.stringify(available));
          formData.append("location", JSON.stringify(loc));
          formData.append("privat", privatePost);
          image.forEach((imageObject, index) => {
            formData.append(`photos[${index}]`, imageObject);
          });

        

           await dispatch(addPost(formData));
       
        } else {
          setErr1("localisation obligatoire");
        }
      }else{
        setErr1("remplissez tous les champs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView>
      <View style={style.container}>
        <Text style={{ fontWeight: "bold", marginTop: 20, fontSize: 17 }}>
          Faire Une publication
        </Text>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 25 }}
        >
          <Text
            style={{ fontWeight: "bold", color: "#f96", marginVertical: 30 }}
          >
            Uniquement pour mes followers
          </Text>
          <Switch
            onValueChange={handleSwitchAvailable3}
            value={privatePost}
          ></Switch>
        </View>
        <TextInput
          label="le nom de la place"
          value={name}
          onChangeText={(text) => setName(text)}
          mode="outlined"
          dense={true}
          style={{
            height: 30,
            width: 300,
            backgroundColor: "#fff",
            color: "black",
          }}
          activeOutlineColor="black"
        />
        <TextInput
          label="decrivez le plat"
          value={describe}
          onChangeText={(text) => setDescribe(text)}
          mode="outlined"
          dense={true}
          style={{ height: 130, width: 345, backgroundColor: "#fff" }}
          activeOutlineColor="black"
          multiline={true}
        />

        <View
          style={{
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <Text style={{ fontWeight: "bold", marginHorizontal: 10 }}>
            Ajouter une image
          </Text>
          <Text style={{ fontWeight: "bold", color: "red", marginTop: 0 }}>
            {" "}
            {err1}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <TouchableOpacity
              style={{ marginHorizontal: 10, alignItems: "center" }}
              onPress={TakePick}
            >
              <Icon2 name="picasa" size={40} color="#f96"></Icon2>
              <Text style={{ fontSize: 15 }}>camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginHorizontal: 10, alignItems: "center" }}
              onPress={selectImage}
            >
              <Icon name="picture" size={40} color="#f96"></Icon>
              <Text style={{ fontSize: 15 }}>Gallerie</Text>
            </TouchableOpacity>
          </View>

          <Text>{`(${image.length}/3)`}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{ fontWeight: "bold", color: "#f96", marginVertical: 15 }}
          >
            Commande en ligne via Odon
          </Text>
          <Switch
            value={avalaible1}
            onValueChange={handleSwitchAvailable1}
          ></Switch>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{ fontWeight: "bold", color: "#f96", marginVertical: 10 }}
          >
            Commande en ligne via Gozem
          </Text>
          <Switch
            value={avalaible2}
            onValueChange={handleSwitchAvailable2}
          ></Switch>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{ fontWeight: "bold", color: "#f96", marginVertical: 10 }}
          >
            Utilisez ma localication actuelle
          </Text>
          <Switch
            value={location}
            onValueChange={handleSwitchLocation}
          ></Switch>
        </View>
        {!location && (
          <TextInput
            label="mettre le localisation"
            value={locationText}
            onChangeText={(text) => setText(text)}
            mode="outlined"
            dense={true}
            style={{
              height: 40,
              width: 230,
              backgroundColor: "#D9D9D9",
              marginVertical: 5,
              marginBottom: 20,
            }}
            activeOutlineColor="black"
          />
        )}

        <Button mode="contained" buttonColor="#FF8A65" onPress={handleSubmit}>
          Publier
        </Button>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
});

export default AddPost;
