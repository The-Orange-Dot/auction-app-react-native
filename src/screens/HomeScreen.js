import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  StatusBar,
} from "react-native";
import NavMenu from "../components/NavMenu";

const HomeScreen = ({ navigation, loggedIn, setLoggedIn, user, setUser }) => {
  // Checks if user is logged in. if yes, skips welcome screen and navigates to browse page
  useEffect(() => {
    loggedIn ? navigation.navigate("Browse") : null;
  }, [loggedIn]);

  const navigationHandler = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView
      onScroll={(event) => {
        const trigger1 = event.nativeEvent.contentOffset.y;

        if (trigger1 > 100) {
          test();
        }
      }}
    >
      <StatusBar animated={true} backgroundColor="black" />
      <View style={styles.container}>
        <NavMenu
          navigation={navigation}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          user={user}
          setUser={setUser}
        />
        {/* Header text */}
        <View style={styles.headerText}>
          <Text style={styles.bringSomeExcitement}>
            Bring some excitement to your shopping
          </Text>
          <Text style={styles.findProducts}>
            Find thousands of products and pay only a fraction of the cost!
          </Text>

          {/* Get started Button */}
          <View style={styles.body}>
            <Pressable
              style={styles.button}
              onPress={() => navigationHandler("Browse")}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </Pressable>
            {loggedIn ? null : (
              <Pressable
                style={styles.button}
                onPress={() => navigationHandler("Login")}
              >
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>
            )}
          </View>
          {/* <Image
            style={styles.happyGirl}
            source={require("../../images/happy.png")}
          />
          <Image
            style={styles.box}
            source={require("../../images/present.png")}
          /> */}
        </View>

        <Image
          style={styles.backgroundImage}
          source={require("../../images/circus-wallpaper.jpeg")}
        />

        {/* GSAP doesn't work for animations, find alternative later */}
        {/* Ticket pictures */}
        {/* <View style={styles.ticketContainer}>
          <Image
            style={styles.ticket1}
            source={require("../../images/Ticket.png")}
          />
          <Image
            style={styles.ticket2}
            source={require("../../images/Ticket.png")}
          />
          <Image
            style={styles.ticket3}
            source={require("../../images/Ticket.png")}
          />
        </View> */}
        {/* <Text style={styles.howItWorks}>How it works</Text> */}

        {/* Info 1 text */}
        {/* <View style={styles.info1Container}>
          <Text style={styles.info1}>
            Just like any other e-commerce website, sellers put what they want
            to sell on the site, write a description, and list their price.
          </Text>
        </View> */}
        {/* Boy with lighter */}
        {/* <View>
          <Image
            style={styles.lighter}
            source={require("../../images/lighter.png")}
          />
          <Image
            style={styles.dollarSign}
            source={require("../../images/dollar-sign.png")}
          />
        </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: "black",
    width: 140,
    height: 55,
    borderRadius: 50,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 17 },
  body: {
    height: 300,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  headerText: { alignItems: "center", marginTop: "15%" },
  bringSomeExcitement: {
    width: "80%",
    fontSize: 60,
    fontWeight: "bold",
    lineHeight: 60,
  },
  findProducts: {
    width: "70%",
    fontSize: 25,
    lineHeight: 25,
    alignSelf: "flex-start",
    marginLeft: "10%",
    marginTop: 20,
  },
  ticketContainer: { alignItems: "center", marginVertical: 100 },
  ticket1: {
    position: "absolute",
    transform: [{ rotate: "25deg" }, { translateY: -25 }],
  },
  ticket2: {
    position: "absolute",
    transform: [{ rotate: "15deg" }, { translateY: -15 }],
  },
  ticket3: {
    position: "absolute",
    transform: [{ rotate: "5deg" }, { translateY: -5 }],
  },
  howItWorks: {
    marginTop: "20%",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  info1Container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "8%",
  },
  info1: {
    width: "70%",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
  lighter: {},
  dollarSign: { position: "absolute", right: "17%", top: "10%" },
  backgroundImage: {
    position: "absolute",
    zIndex: -2,
    opacity: 0.7,
    left: -500,
    top: -900,
    transform: [{ rotate: "20deg" }],
  },
  happyGirl: {
    position: "absolute",
    right: 80,
    top: 470,
    zIndex: -1,
    transform: [{ scale: 1.2 }, { scaleX: -1 }],
  },
  box: {
    position: "absolute",
    bottom: 0,
    right: "5%",
    transform: [{ rotate: "15deg" }],
  },
});

export default HomeScreen;
