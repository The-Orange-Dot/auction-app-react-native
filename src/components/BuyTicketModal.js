import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { numberWithCommas } from "./NumberWithCommas";

const BuyTicketModal = ({
  setModalVisible,
  modalVisible,
  product,
  user,
  setUser,
  setProducts,
  setTickets,
  tickets,
}) => {
  const ticketPrice = product.price / product.tickets;
  const buyTicket = (item, value) => {
    fetch(
      `https://boiling-forest-19458.herokuapp.com/users/buy_ticket/${user.id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          points: user.points,
          product_id: item.id,
          tickets_remaining: tickets,
        }),
      }
    )
      .then((r) => r.json())
      .then((boughtProduct) => {
        console.log(boughtProduct);
        //Updates Points
        // console.log(user);
        const finalValue = user.points - value;
        const ticketsBought = user.tickets_bought + 1;
        const updatedUser = {
          ...user,
          points: finalValue,
          tickets_bought: ticketsBought,
        };
        setUser(updatedUser);
        setTickets((product.ticketsRemaining = product.ticketsRemaining - 1));
        setProducts([...boughtProduct]);
      });
  };

  return (
    <Modal
      visible={modalVisible}
      animationType={"fade"}
      transparent={true}
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.confirmationContainer}>
          <Text>You're about to buy 1 ticket for: </Text>
          <Text>{product.name}</Text>
          <Text>
            for {numberWithCommas(product.price / product.tickets)} points.
          </Text>
          <Text>
            You currently have {numberWithCommas(user.points)} points.
          </Text>

          <Text>Please confirm you purchase</Text>
        </View>
        <View style={styles.modalButtons}>
          <Pressable
            style={styles.cancelButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <View>
              <Text style={styles.closeText}>Cancel</Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.confirmButton}
            onPress={() => {
              buyTicket(product, ticketPrice);
              setModalVisible(!modalVisible);
            }}
          >
            <View>
              <Text style={styles.closeText}>Confirm</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: 300,
    height: 100,
  },
  modalContainer: {
    position: "absolute",
    left: "9%",
    top: "25%",
    backgroundColor: "white",
    width: 320,
    height: 400,
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    elevation: 5,
  },
  confirmationContainer: {
    height: "85%",
  },
  cancelButton: {
    width: 100,
    maxHeight: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    borderRadius: 20,
    margin: 5,
  },
  confirmButton: {
    width: 100,
    maxHeight: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 20,
    margin: 5,
  },
  modalButtons: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
  },
  closeText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default BuyTicketModal;
