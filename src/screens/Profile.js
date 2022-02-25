import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import NavMenu from "../components/NavMenu";

const Profile = ({ navigation }) => {
  return (
    <ScrollView>
      <NavMenu navigation={navigation} />

      <View style={styles.body}>
        <Text>Profile</Text>
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

export default Profile;
