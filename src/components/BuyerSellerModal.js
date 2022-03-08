import React from "react";
import {
  Modal,
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import { StarRating } from "./StarRating";

const BuyerSellerModal = ({
  buyerSellerSelector,
  modalVisible,
  setModalVisible,
  product,
  buyerInfo,
}) => {
  return (
    <Modal visible={modalVisible} animationType={"fade"} transparent={true}>
      <View style={styles.modalContainer}>
        <Text>
          {buyerSellerSelector === "winner" ? "Seller" : "Winner"} information
        </Text>
        <Text style={styles.productName}>{product.name}</Text>
        <Image
          style={styles.userPicture}
          source={
            buyerSellerSelector === "winner"
              ? { uri: product.user.picture }
              : { uri: buyerInfo.picture }
          }
        />
        <Text style={styles.username}>
          {buyerSellerSelector === "winner"
            ? product.user.username
            : buyerInfo.username}
        </Text>
        <View>
          <Text>
            {buyerSellerSelector === "winner" ? "Seller" : "Buyer"} Rating:
          </Text>
          <Text>
            {buyerSellerSelector === "winner"
              ? StarRating(product.user.seller_rating)
              : StarRating(buyerInfo.buyer_rating)}
          </Text>
        </View>

        <View>
          <Text>Message: </Text>
          <TextInput
            style={styles.textInput}
            maxLength={1000}
            numberOfLines={5}
            placeholder="Messaging not yet implemented"
          />
        </View>
        <View style={styles.modalButtons}>
          <Pressable
            style={styles.cancelButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
          <Pressable
            style={styles.confirmButton}
            onPress={() => alert("Not yet implemented.")}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: "80%",
    height: 470,
    backgroundColor: "white",
    position: "absolute",
    left: "10%",
    top: "15%",
    padding: "5%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    borderRadius: 10,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    marginVertical: 10,
  },
  userPicture: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 1000,
  },
  username: {
    fontWeight: "bold",
    fontSize: 18,
  },
  textInput: {
    height: 100,
    width: 250,
    borderWidth: 0.5,
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  modalButtons: { flexDirection: "row" },
  cancelButton: {
    width: 100,
    height: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    borderRadius: 20,
    margin: 10,
  },
  confirmButton: {
    width: 100,
    height: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 20,
    margin: 10,
  },
  buttonText: { color: "white" },
});

export default BuyerSellerModal;
