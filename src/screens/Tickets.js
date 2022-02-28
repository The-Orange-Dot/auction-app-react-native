import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import NavMenu from "../components/NavMenu";
import { UserContext } from "../../App";

const Tickets = ({ navigation }) => {
  const { userContext, loggedInContext } = useContext(UserContext);
  const loggedIn = loggedInContext[0];
  const setLoggedIn = loggedInContext[1];
  const user = userContext[0];
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState("bidding");
  const [sellerProduct, setSellerProduct] = useState([]);
  const [loaded, setIsLoaded] = useState(false);

  //Fetches products and filters them to find user's items
  useEffect(() => {
    fetch("https://boiling-forest-19458.herokuapp.com/products")
      .then((r) => r.json())
      .then((products) => {
        if (products.length !== 0) {
          let filteredItems = products.filter(
            (product) =>
              product.buyers !== null && product.buyers.includes(`${user.id}`)
          );
          let sellerItems = products.filter((product) => {
            return product.user_id === user.id;
          });
          setProducts(filteredItems);
          setSellerProduct(sellerItems);
          setIsLoaded(true);
        }
      });
  }, []);

  //Maps through Buy Items
  const boughtProducts = products.map((product) => {
    const ticketsHeld = product.buyers
      .split(", ")
      .filter((num) => (num = String(product.user.id))).length;

    return (
      <View style={styles.buyerItemCard} key={product.id}>
        <View>
          <Image style={styles.image} source={{ uri: product.images }} />
        </View>
        <View>
          <View>
            <Text style={styles.name}>{product.name}</Text>
          </View>
          <View>
            {product.ticketsRemaining === 0 ? (
              <Text>Finished</Text>
            ) : (
              <Text>
                Tickets remaining: {product.ticketsRemaining}/{product.tickets}
              </Text>
            )}
            <Text>You're holding {ticketsHeld} tickets</Text>
          </View>
        </View>
      </View>
    );
  });

  //Maps through Sell Items
  const sellerProducts = sellerProduct.map((product) => {
    return (
      <View style={styles.buyerItemCard} key={product.id}>
        <View>
          <Image style={styles.image} source={{ uri: product.images }} />
        </View>
        <View>
          <View>
            <Text style={styles.name}>{product.name}</Text>
          </View>
          <View>
            <Text>Total Price: {product.price}</Text>
            <Text>
              Tickets remaining: {product.ticketsRemaining}/{product.tickets}
            </Text>
          </View>
        </View>
      </View>
    );
  });

  return (
    <ScrollView>
      <NavMenu
        navigation={navigation}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <View style={styles.body}>
        <Text style={styles.ticketHeader}>
          Your {selected === "bidding" ? "Buy" : "Sell"} List
        </Text>
        <ScrollView style={styles.boughtItemContainer}>
          {loaded ? (
            selected === "bidding" ? (
              boughtProducts
            ) : (
              sellerProducts
            )
          ) : (
            <View style={styles.loadingContainer}>
              <View style={styles.logoContainer}>
                <Text style={styles.logo}>M</Text>
              </View>
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <View style={styles.selectorContainer}>
        <Pressable
          style={selected === "bidding" ? styles.selected : styles.notSelected}
          onPress={() => {
            setSelected("bidding");
          }}
        >
          <Text
            style={
              selected === "bidding"
                ? styles.selectedText
                : styles.notSelectedText
            }
          >
            Bidding
          </Text>
        </Pressable>
        <Pressable
          style={selected === "selling" ? styles.selected : styles.notSelected}
          onPress={() => {
            setSelected("selling");
          }}
        >
          <Text
            style={
              selected === "selling"
                ? styles.selectedText
                : styles.notSelectedText
            }
          >
            Selling
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 650,
    width: Dimensions.get("window").width,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    marginRight: 10,
  },
  name: { fontWeight: "bold" },
  boughtItemContainer: { height: "100%", width: "100%" },
  buyerItemCard: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  selectorContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 40,
  },
  selected: {
    backgroundColor: "black",
    color: "white",
    height: "100%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedText: { color: "white" },
  notSelectedText: { color: "black" },
  notSelected: {
    height: "100%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efefef",
  },
  SellingText: { color: "black" },
  ticketHeader: {
    fontSize: 20,
    fontWeight: "bold",
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
});

export default Tickets;
