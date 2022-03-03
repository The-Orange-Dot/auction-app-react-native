import React, { useContext, useState } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { UserContext } from "../../App";
import NavBar from "./NavBar";
import { numberWithCommas } from "./NumberWithCommas";

const NavMenu = ({ navigation, loggedIn, setUser, setLoggedIn }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigationHandler = (screen) => {
    navigation.navigate(screen);
    setOpenMenu(false);
  };
  const { userContext } = useContext(UserContext);
  const user = userContext[0];

  const logOutHandler = () => {
    fetch("https://boiling-forest-19458.herokuapp.com/logout", {
      method: "DELETE",

      headers: { "Content-Type": "application/json" },
    })
      .then(setLoggedIn(false))
      .then(navigation.navigate("Browse"));
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
          {loggedIn ? (
            <View style={styles.quickViewContainer}>
              <Text style={styles.quickViewText}>{user.username}</Text>
              <Text style={styles.quickViewText}>
                Points: {numberWithCommas(user.points)}
              </Text>
            </View>
          ) : null}
          <Pressable
            style={styles.button}
            onPress={() => {
              navigationHandler("Browse");
            }}
          >
            <Text style={styles.menuText}>Browse</Text>
          </Pressable>

          {loggedIn ? (
            <Pressable
              style={styles.button}
              onPress={() => {
                navigationHandler("Sell");
              }}
            >
              <Text style={styles.menuText}>Sell</Text>
            </Pressable>
          ) : null}
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
    width: 250,
    height: 320,
    padding: 2,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  menuLoggedOut: {
    position: "absolute",
    zIndex: 1,
    top: 70,
    right: 0,
    width: 280,
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
  quickViewContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  quickViewText: {
    color: "lightgray",
  },
});

export default NavMenu;
