import * as ImagePicker from 'expo-image-picker';

const pickImageFromPhone = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    return { permissionError: 'Permission refusée pour accéder à la galerie de photos' };
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (result.canceled) {
    return { cancelled: true };
  }

  const selectedImage = result.assets[0].uri; // Accéder à l'URI de la première ressource sélectionnée

  return { selectedImage };
};

const takePhotoFromCamera = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    return { permissionError: 'Permission refusée pour accéder à la caméra' };
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (result.canceled) {
    return { cancelled: true };
  }

  const selectedImage = result.assets[0].uri; // Accéder à l'URI de la première ressource sélectionnée

  return { selectedImage };
};

export { pickImageFromPhone, takePhotoFromCamera };
