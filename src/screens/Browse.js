import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../../App";
import ChargePointsModal from "../components/ChargePointsModal";

const Browse = ({ navigation }) => {
  const { userContext, loggedInContext, userIdContext } =
    useContext(UserContext);
  const loggedIn = loggedInContext[0];
  const setLoggedIn = loggedInContext[1];
  const setUserId = userIdContext[1];
  const user = userContext[0];
  const setUser = userContext[1];
  const [products, setProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch("https://boiling-forest-19458.herokuapp.com/products")
      .then((r) => r.json())
      .then((products) => {
        setProducts(products);
        setProductsLoaded(true);
      });

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("user");
        if (value !== null) {
          return value;
        }
      } catch (error) {}
    };
    getData().then((thing) => setUserId);
  }, []);

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
      <ChargePointsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        user={user}
        setUser={setUser}
      />
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
