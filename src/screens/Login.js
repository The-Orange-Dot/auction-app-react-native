import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import NavMenu from "../components/NavMenu";

const Login = ({ navigation }) => {
  return (
    <ScrollView>
      <NavMenu navigation={navigation} />
      <View style={styles.body}>
        <Text>Login</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 500,
  },
});

export default Login;
