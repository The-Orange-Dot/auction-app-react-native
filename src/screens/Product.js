import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import moment from "moment";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const Product = ({ product, navigation, setProducts }) => {
  const productViewHandler = (product) => {
    navigation.navigate("Product", {
      product: product,
      setProducts: setProducts,
    });
  };

  //Moment.js - checks if the product is new (created at least 3 days ago)
  const days = moment().diff(product.created_at, "days");
  const newProduct = days < 3;

  return (
    <View style={styles.body}>
      <Pressable
        onPress={() => {
          productViewHandler(product);
        }}
      >
        {/* {product.user.verified ? (
          <Text style={styles.verified}>Verified</Text>
        ) : null} */}
        <View style={styles.container}>
          <Image style={styles.images} source={{ uri: product.images }} />

          <Text style={styles.name}>{product.name}</Text>
        </View>
        {newProduct ? <Text style={styles.newBanner}>New</Text> : null}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderWidth: 0.5,
    borderColor: "rgb(241, 241, 241)",
    backgroundColor: "white",
    overflow: "hidden",
  },
  container: {
    height: 200,
    width: 150,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 15,
  },
  images: {
    height: 150,
    width: 150,
    resizeMode: "cover",
    marginBottom: 10,
  },
  name: {
    width: 150,
    textAlign: "center",
    fontWeight: "bold",
  },
  newBanner: {
    position: "absolute",
    right: -30,
    top: 10,
    backgroundColor: "#f26867",
    width: 100,
    textAlign: "center",
    transform: [{ rotate: "45deg" }],
    color: "white",
  },
  verified: {
    position: "absolute",
    bottom: 65,
    zIndex: 1,
    left: 60,
    backgroundColor: "#f26867",
    paddingHorizontal: 15,
    paddingVertical: 3,
    color: "white",
    borderRadius: 20,
    fontSize: 10,
  },
});

export default Product;
