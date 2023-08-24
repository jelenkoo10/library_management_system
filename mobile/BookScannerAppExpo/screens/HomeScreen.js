import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/library-bg.jpg")}
      style={styles.container}
      imageStyle={{ opacity: 0.9 }}
    >
      <Text style={styles.text}>Izaberite opciju</Text>
      <TouchableOpacity
        title="Zaduživanje knjige"
        onPress={() => navigation.navigate("Zaduživanje")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Zaduživanje knjige</Text>
      </TouchableOpacity>
      <TouchableOpacity
        title="Razduživanje knjige"
        onPress={() => navigation.navigate("Razduživanje")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Razduživanje knjige</Text>
      </TouchableOpacity>
      <TouchableOpacity
        title="Prikaz knjige"
        onPress={() => navigation.navigate("Prikaz knjige")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Prikaz knjige</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 24,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#C75D2C",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderColor: "#D76D3C",
    borderWidth: 2,
    borderRadius: 3,
    borderStyle: "solid",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
  },
});

export default HomeScreen;
