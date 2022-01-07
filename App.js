import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import uploadToAnonymousFilesAsync from "anonymous-files";
import logo from "./assets/logo.png";

export default function App() {
  // initializes a variable to hold our selected pic and the function that sets it for us
  const [selectedImage, setSelectedImage] = React.useState(null);

  // func asks for permission to access camera roll
  const openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // results obj that comes from selecting the picture in Camera Roll
    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    // checks if the operating system using the App is from a browser or anything else since browsers cannot access localUris
    if (Platform.OS === "web") {
      // if browser, will upload the file to the anonymous files expo api and place it in the selectedImage obj as another key value pair (remotUri) to be accessed through the web
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    } else {
      // sets selectedImage from React.useState with the selected picture
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
    }
  };

  //func shares the selected image if the device is capable of sharing
  const openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(
        `Uh oh, sharing isn't available for sharing at: ${selectedImage.remoteUri}`
      );
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  // shows the selected image on screen if there is one
  if (selectedImage) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />

        {/* when button is clicked, the function will share the selected image */}
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/*
        Adding a image tag to display image from assets
        or can use {uri: <link to image from web>}
      */}
      <Image
        source={{ uri: "https://i.imgur.com/TkIrScD.png" }}
        style={styles.image}
      />

      {/*
        Going to change OG text to instruct our users how to use the app
        Adding style by adding an obj that contains styling
      */}
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>

      {/*
        Creating a button with interactiveity
        onPress is like an onClick for React
        when clicked, the function will access camera roll and select an image to save on to state
      */}
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0ffff",
    alignItems: "center",
    justifyContent: "center",
  },
  // marginBottom to have some space between image and text
  image: { width: 305, height: 159, marginBottom: 15 },

  // marginHorizontal to have some space around the edges of the screen
  instructions: {
    color: "#888",
    fontSize: 25,
    marginHorizontal: 30,
    marginBottom: 15,
  },

  /*
    adding padding gives the button a bigger area for people to click
    borderRadius helps round out the corners on your buttons
  */
  button: { backgroundColor: "pink", padding: 20, borderRadius: 5 },

  buttonText: { fontSize: 30, color: "#fff" },

  /*
    giving selected pic a fixed width and height
    resizeModel, image style property that lets us control how the image is resized to fit given dimensions
  */
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 15,
  },
});
