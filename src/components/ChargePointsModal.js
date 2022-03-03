import React, { useState } from "react";
import {
  Modal,
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";

const ChargePointsModal = ({
  modalVisible,
  setModalVisible,
  user,
  setUser,
}) => {
  const [points, setPoints] = useState(0);
  const [selectorId, setSelectorId] = useState(0);
  const chargePoints = (value, id) => {
    fetch(
      `https://boiling-forest-19458.herokuapp.com/users/charge_points/${user.id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          charge: value,
          points_id: id,
        }),
      }
    ).then(() => {
      //Updates Points
      const finalValue = user.points + value;
      const updatedUser = { ...user, points: finalValue };
      setUser(updatedUser);
      setModalVisible(false);
    });
  };

  return (
    <Modal
      visible={modalVisible}
      animationType={"fade"}
      transparent={true}
      style={styles.modalContainer}
    >
      <View style={styles.modal}>
        <View style={styles.chargeContentContainer}>
          <Pressable
            style={points === 500 ? styles.selected : styles.chargeSelector}
            onPress={() => {
              setPoints(500);
              setSelectorId(1);
            }}
          >
            <Text style={styles.chargeSelectorText}>Charge 500 points</Text>
          </Pressable>
          <Pressable
            style={points === 1000 ? styles.selected : styles.chargeSelector}
            onPress={() => {
              setPoints(1000);
              setSelectorId(2);
            }}
          >
            <Text style={styles.chargeSelectorText}>Charge 1000 points</Text>
          </Pressable>
          <Pressable
            style={points === 5000 ? styles.selected : styles.chargeSelector}
            onPress={() => {
              setPoints(5000);
              setSelectorId(3);
            }}
          >
            <Text style={styles.chargeSelectorText}>Charge 5000 points</Text>
          </Pressable>
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
              chargePoints(points, selectorId);
              setModalVisible(!modalVisible);
              setPoints(0);
              setSelectorId(0);
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
  modalContainer: {
    width: Dimensions.get("window").width,
  },
  modal: {
    backgroundColor: "white",
    width: 300,
    height: 350,
    alignSelf: "center",
    marginTop: 200,
    borderRadius: 10,
    elevation: 5,
    padding: 10,
  },
  chargeContentContainer: {
    flex: 4,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  chargeSelector: {
    backgroundColor: "#f26867",
    width: "90%",
    justifyContent: "center",
    margin: 1,
    height: 70,
    paddingLeft: 20,
  },
  selected: {
    backgroundColor: "#f26867",
    width: "90%",
    justifyContent: "center",
    margin: 1,
    height: 70,
    paddingLeft: 20,
    opacity: 0.7,
  },
  chargeSelectorText: { color: "white", fontWeight: "bold", fontSize: 15 },
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

export default ChargePointsModal;
