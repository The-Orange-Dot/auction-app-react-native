import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, StyleSheet, Pressable } from "react-native";
import NavMenu from "../components/NavMenu";
import Product from "./Product";

const Browse = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);

  useEffect(() => {
    fetch("https://boiling-forest-19458.herokuapp.com/products")
      .then((r) => r.json())
      .then((products) => {
        setProducts(products);
        setProductsLoaded(true);
      });
  }, []);

  const product = products.map((product) => {
    return (
      <Product key={product.id} product={product} navigation={navigation} />
    );
  });

  return (
    <View>
      <ScrollView>
        <NavMenu navigation={navigation} />
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
      {productsLoaded ? (
        <Pressable
          style={styles.charge}
          onPress={() => {
            alert("Charge pressed");
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
  charge: {
    position: "absolute",
    right: 5,
    bottom: 0,
    width: 100,
    height: 50,
    backgroundColor: "#f26867",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  chargeText: {
    color: "white",
  },
});

export default Browse;
