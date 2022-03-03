import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import BuyTicketModal from "../components/BuyTicketModal";
import NavMenu from "../components/NavMenu";
import { numberWithCommas } from "../components/NumberWithCommas";

const ProductDetail = ({
  route,
  navigation,
  loggedIn,
  setLoggedIn,
  user,
  setUser,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tickets, setTickets] = useState(route.params.product.ticketsRemaining);

  const pricePerTicket =
    route.params.product.price / route.params.product.tickets;
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <NavMenu
            navigation={navigation}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            user={user}
            setUser={setUser}
          />
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: route.params.product.images }}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{route.params.product.name}</Text>
            {route.params.product.user.verified ? (
              <View style={styles.verifiedTag}>
                <Text style={styles.verifiedText}>Verified Seller</Text>
              </View>
            ) : null}
            <ScrollView style={styles.descriptionContainer}>
              <Text>{route.params.product.description}</Text>
            </ScrollView>
          </View>
          <View style={styles.ticketInfoContainer}>
            {route.params.product.finished ? (
              <Text style={styles.finishedText}>FINISHED</Text>
            ) : (
              <View style={styles.ticketInfo}>
                <View style={styles.ticketPrice}>
                  <Text style={styles.ticketTitle}>Ticket Price: </Text>
                  <Text>{numberWithCommas(pricePerTicket)}</Text>
                </View>
                <View style={styles.ticketsRemaining}>
                  <Text style={styles.ticketTitle}>Tickets Remaining: </Text>
                  <Text>
                    {tickets} / {route.params.product.tickets}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {!loggedIn && !route.params.product.finished ? (
            <Pressable
              style={styles.loginContainer}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.login}>Login to buy a ticket!</Text>
            </Pressable>
          ) : (
            <View style={styles.loginContainer}>
              {route.params.product.finished ? null : (
                <Text style={styles.login}>This is your listing</Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.ticket}>
        {loggedIn ? (
          route.params.product.finished ||
          route.params.product.user.id === user.id ? null : (
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Image source={require("../../images/Ticket.png")} />
            </Pressable>
          )
        ) : null}
      </View>
      <BuyTicketModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        product={route.params.product}
        user={user}
        setUser={setUser}
        setProducts={route.params.setProducts}
        setTickets={setTickets}
        tickets={tickets}
      />
    </>
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
    height: 250,
    width: "90%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionContainer: {
    minHeight: 140,
    maxHeight: 140,
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 5,
  },
  imageContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
  verifiedTag: {
    marginBottom: 10,
    backgroundColor: "#f26867",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 50,
  },
  ticketInfoContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 20,
    marginLeft: 0,
  },
  ticketInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  verifiedText: {
    color: "white",
    fontWeight: "bold",
  },
  ticketPrice: {
    width: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ticketsRemaining: {
    width: 200,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ticketTitle: {
    fontWeight: "bold",
  },
  finishedText: { alignSelf: "center", fontSize: 25, fontWeight: "bold" },
  ticket: {
    position: "absolute",
    transform: [{ rotate: "90deg" }, { scale: 0.7 }],
    left: 10,
    bottom: -210,
  },
  loginContainer: {
    position: "absolute",
    right: 70,
    bottom: 30,
    width: 80,
  },
  login: { textAlign: "center", fontWeight: "bold" },
});

export default ProductDetail;
