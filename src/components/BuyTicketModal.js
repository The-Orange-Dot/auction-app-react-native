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

  const pricePerTicket = product.price / product.tickets;
  const hasEnoughPoints = user.points - pricePerTicket > 0;

  return (
    <Modal
      visible={modalVisible}
      animationType={"fade"}
      transparent={true}
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.confirmationContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.confirmationTextContainer}>
            <View style={styles.pricePerTicket}>
              <Text style={styles.pricePerTicketText}>
                Points for 1 ticket:{" "}
              </Text>
              <Text style={styles.pricePerTicketTextBold}>
                {numberWithCommas(pricePerTicket)} points.
              </Text>
            </View>

            <View style={styles.pricePerTicket}>
              <Text style={styles.pricePerTicketText}>You currently have:</Text>
              <Text style={styles.pricePerTicketTextBold}>
                {numberWithCommas(user.points)} points
              </Text>
            </View>
            {hasEnoughPoints ? (
              <>
                <Text>
                  You'll have {numberWithCommas(user.points - pricePerTicket)}{" "}
                  points left
                </Text>
                <Text style={styles.notEnoughPoints}>
                  Please confirm you purchase
                </Text>
              </>
            ) : (
              <Text style={styles.notEnoughPoints}>
                You don't have enough points!
              </Text>
            )}
          </View>
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
            style={
              hasEnoughPoints
                ? styles.confirmButton
                : styles.disabledConfirmButton
            }
            onPress={
              hasEnoughPoints
                ? () => {
                    buyTicket(product, ticketPrice);
                    setModalVisible(!modalVisible);
                  }
                : null
            }
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
    height: 350,
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    elevation: 5,
  },
  confirmationContainer: {
    height: "85%",
    alignItems: "center",
  },
  confirmationTextContainer: {
    width: "100%",
    height: "80%",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
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
  disabledConfirmButton: {
    width: 100,
    maxHeight: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 20,
    margin: 5,
    opacity: 0.5,
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
  productName: { textAlign: "center", fontSize: 20, fontWeight: "bold" },
  pricePerTicket: { alignItems: "center" },
  pricePerTicketText: { fontSize: 18 },
  pricePerTicketTextBold: { fontSize: 18, fontWeight: "bold" },
  notEnoughPoints: { fontWeight: "bold", fontSize: 15 },
});

export default BuyTicketModal;
