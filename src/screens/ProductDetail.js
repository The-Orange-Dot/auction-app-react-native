import React from "react";
import { ScrollView, Text, View, Image, StyleSheet } from "react-native";
import NavBar from "../components/NavBar";

const ProductDetail = ({ route }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <NavBar />
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: route.params.product.images }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{route.params.product.name}</Text>
          <Text>{route.params.product.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    height: 200,
    width: "90%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30,
  },
  imageContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: {
    minWidth: 350,
    maxWidth: 350,
    minHeight: 350,
    maxHeight: 350,
    resizeMode: "contain",
  },
});

export default ProductDetail;
