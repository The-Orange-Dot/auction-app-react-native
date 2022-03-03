import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import NavMenu from "../components/NavMenu";
import Product from "./Product";
import ChargePointsModal from "../components/ChargePointsModal";

const Browse = ({
  navigation,
  loggedIn,
  setLoggedIn,
  user,
  setUser,
  setProducts,
  products,
  setProductsLoaded,
  productsLoaded,
}) => {
  const product = products.map((product) => {
    return (
      <Product
        key={product.id}
        product={product}
        navigation={navigation}
        setProducts={setProducts}
      />
    );
  });

  return (
    <View>
      <ScrollView>
        <NavMenu
          navigation={navigation}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          user={user}
          setUser={setUser}
        />
        <View style={styles.body}>
          {productsLoaded ? (
            <Text>{product}</Text>
          ) : (
            <View style={styles.loadingContainer}>
              <View style={styles.logoContainer}>
                <Text style={styles.logo}>M</Text>
              </View>
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          )}
        </View>
      </ScrollView>
      {productsLoaded && loggedIn ? (
        <Pressable
          style={styles.charge}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text style={styles.chargeText}>Charge points</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
    backgroundColor: "#f26867",
    borderRadius: 6,
  },
  logo: { fontSize: 25, color: "white", fontWeight: "bold" },
  loadingContainer: {
    marginTop: 300,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: { fontWeight: "bold", fontSize: 15 },
});

export default Browse;
