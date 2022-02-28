import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import NavButton from "./NavButton";

const NavBar = ({ openMenu, setOpenMenu, navigation }) => {
  const navigationHandler = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.nav}>
      <NavButton openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <Pressable onPress={() => navigationHandler("Browse")}>
        <Text style={styles.header}>MOXIE</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { color: "white", fontSize: 40, fontWeight: "bold" },
  nav: {
    width: "100%",
    height: 70,
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 6,
    top: 70,
    right: 0,
    height: 300,
    width: 310,
  },
});

export default NavBar;
