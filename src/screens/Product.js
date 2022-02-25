import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";

const Product = ({ product, navigation }) => {
  const productViewHandler = (product) => {
    navigation.navigate("Product", { product: product });
  };

  const newProduct =
    parseInt(Date().slice(7, 10) - product.created_at.slice(8, 10)) <= 3;

  return (
    <View style={styles.body}>
      <Pressable
        onPress={() => {
          productViewHandler(product);
        }}
      >
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
    marginHorizontal: 15,
    marginVertical: 25,
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
});

export default Product;
