import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";

import Button from "./components/Button";
import CircleButton from "./components/CircleButton";
import IconButton from "./components/IconButton";
import ImageViewer from "./components/ImageViewer";

import PlaceholderImage from "./../assets/images/background-image.png";

export default function App() {

  const [ selectedImage, setSelectedImage ] = useState(null);
  const [ showAppOptions, setShowAppOptions ] = useState(false);

  const pickImageAsync = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      alert("You did not select any image.");
      return;
    }

    setSelectedImage(result.assets[0].uri);
    setShowAppOptions(true);

  };

  const onUsePhoto = () => {
    setShowAppOptions(true);
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    // we will implement this later
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      
      {
        showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button label="Choose a photo" theme="primary" onPress={pickImageAsync} />
            <Button label="Use this photo" onPress={onUsePhoto} />
          </View>
        )
      }
      
      <StatusBar style="auto" />
    
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
