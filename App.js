import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import logo from "./assets/logo.png";

export default function App() {
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
      */}
      <TouchableOpacity
        onPress={() => alert("Hello, world!")}
        style={styles.button}
      >
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
});
