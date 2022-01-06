import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import logo from "./assets/logo.png";

export default function App() {
  return (
    <View style={styles.container}>
      {/*
        Adding a image tag to display image from assets
      */}
      <Image source={logo} />

      {/*
        Going to change OG text to instruct our users how to use the app
        Adding style by adding an obj that contains styling
      */}
      <Text style={{ color: "#888", fontSize: 18 }}>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>

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
});
