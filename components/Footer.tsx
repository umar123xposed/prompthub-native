import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image} from "react-native";
import { useRouter } from "expo-router";


export default function Footer() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/home")} // Navigate to the home screen
      >
        <Image source={require("../assets/icons/home.png")} style={styles.home}></Image>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    alignItems: "center",
  },
  home:{
    width: 23,
    height: 23
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    border: "1px solid #ff7f00",
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
