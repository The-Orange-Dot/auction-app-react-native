import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import NavMenu from "../components/NavMenu";
const Home = ({ navigation }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigationHandler = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <NavMenu navigation={navigation} loggedIn={loggedIn} />

        <View style={styles.body}>
          <Pressable
            style={styles.button}
            onPress={() => navigationHandler("Browse")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </Pressable>
        </View>
        <Image source={require("../../images/happy.png")} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: "black",
    width: 150,
    height: 50,
    borderRadius: 50,
    marginVertical: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "white" },
  body: {
    height: 90,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
