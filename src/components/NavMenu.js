import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import NavBar from "./NavBar";

const NavMenu = ({ navigation, loggedIn, user, setUser, setLoggedIn }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigationHandler = (screen) => {
    navigation.navigate(screen);
    setOpenMenu(false);
  };

  const logOutHandler = () => {
    fetch("https://boiling-forest-19458.herokuapp.com/logout", {
      method: "DELETE",

      headers: { "Content-Type": "application/json" },
    }).then(setLoggedIn(false));
  };

  return (
    <>
      <NavBar
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        navigation={navigation}
        setUser={setUser}
        user={user}
      />

      {openMenu ? (
        <View style={loggedIn ? styles.menuLoggedIn : styles.menuLoggedOut}>
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
          {loggedIn ? (
            <Pressable
              style={styles.button}
              onPress={() => {
                navigationHandler("Account");
              }}
            >
              <Text style={styles.menuText}>Account</Text>
            </Pressable>
          ) : null}

          {loggedIn ? (
            <Pressable
              style={styles.button}
              onPress={() => {
                navigationHandler("Tickets");
              }}
            >
              <Text style={styles.menuText}>Tickets</Text>
            </Pressable>
          ) : null}

          {loggedIn ? (
            <Pressable style={styles.button} onPress={logOutHandler}>
              <Text style={styles.menuText}>Log out</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  menuLoggedIn: {
    position: "absolute",
    zIndex: 1,
    top: 70,
    right: 0,
    width: 300,
    height: 250,
    padding: 2,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  menuLoggedOut: {
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
