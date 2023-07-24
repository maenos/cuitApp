import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

const useImages = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [permissionError, setPermissionError] = useState(null);
const [result, setResult] = useState(null);
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        setPermissionError('Permission refusée pour accéder à la galerie de photos');
      }
    };

    requestPermissions();
  }, []);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result.uri);
      }
    } else {
      setPermissionError('Permission refusée pour accéder à la caméra');
    }
  };

  const selectFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        setResult(result);
        setSelectedImage(result.uri);
      }
    } else {
      setPermissionError('Permission refusée pour accéder à la galerie de photos');
    }
  };

  return { selectedImage, permissionError, takePhoto, selectFromGallery };
};

export default useImages;
