import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import NavBar from "./NavBar";

const NavMenu = ({ navigation, loggedIn }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigationHandler = (screen) => {
    navigation.navigate(screen);
    setOpenMenu(false);
  };

  return (
    <>
      <NavBar openMenu={openMenu} setOpenMenu={setOpenMenu} />

      {openMenu ? (
        <View style={styles.menu}>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigationHandler("Browse");
            }}
          >
            <Text style={styles.menuText}>Browse</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              loggedIn
                ? navigationHandler("Profile")
                : navigationHandler("Login");
            }}
          >
            <Text style={styles.menuText}>
              {loggedIn ? "Profile" : "Login"}
            </Text>
          </Pressable>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    zIndex: 1,
    top: 70,
    right: 0,
    width: 300,
    height: 100,
    padding: 2,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  button: {
    backgroundColor: "black",
    width: "100%",
    height: 20,
    flex: 1,
    marginVertical: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: { color: "white" },
});

export default NavMenu;
