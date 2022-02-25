import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

const NavButton = ({ openMenu, setOpenMenu }) => {
  return (
    <>
      <Pressable
        onPress={() => {
          setOpenMenu(!openMenu);
        }}
        style={styles.container}
      >
        <View style={styles.bar} />
        <View style={styles.bar} />
        <View style={styles.bar} />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    right: 0,
    marginRight: 5,
  },
  bar: {
    width: 30,
    height: 3,
    marginVertical: 3,
    marginRight: 10,
    backgroundColor: "white",
  },
});

export default NavButton;
