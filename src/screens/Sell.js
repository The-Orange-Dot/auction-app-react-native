import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import NavMenu from "../components/NavMenu";
import { Picker } from "@react-native-picker/picker";

const Sell = ({
  navigation,
  products,
  setProducts,
  loggedIn,
  setLoggedIn,
  user,
  setUser,
}) => {
  const [selected, setSelected] = useState("");
  const [itemName, setItemName] = useState("");
  const [images, setImages] = useState("");
  const [price, setPrice] = useState(0);
  const [tickets, setTickets] = useState(0);
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [errorHandler, setErrorHandler] = useState("");

  const sellSubmitHandler = () => {
    if (itemName === "") {
      setErrorHandler("You must have a title.");
    } else if (selected === "") {
      setErrorHandler("You must select a category.");
    } else if (images === "") {
      setErrorHandler("You must include a picture.");
    } else if (price === 0 && price < 1000) {
      setErrorHandler("Listing must be at least 1000 points.");
    } else if (tickets === 0 && tickets < 5) {
      setErrorHandler("Listing must have at least 5 tickets.");
    } else if (description === "") {
      setErrorHandler("You must include a description.");
    } else {
      fetch("https://boiling-forest-19458.herokuapp.com/products", {
        method: "POST",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: itemName,
          category: selected,
          images: images,
          price: price,
          tickets: tickets,
          description: description,
          keywords: keywords,
          user: user,
          user_id: user.id,
        }),
      })
        .then((r) => r.json())
        .then((newProduct) => {
          setErrorHandler("");
          setProducts([...products, newProduct]);
          navigation.navigate("Browse");
        });
    }
  };

  return (
    <ScrollView scrollEnabled={false}>
      <NavMenu
        navigation={navigation}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        user={user}
        setUser={setUser}
      />
      <View style={styles.sellPageContainer}>
        <View style={styles.body}>
          <Text style={styles.sellHeader}>Sell on MOXIE!</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Title (Max length: 40 chars)"
            maxLength={40}
            onChangeText={(e) => {
              setItemName(e);
            }}
          />
          <Picker
            style={styles.picker}
            selectedValue={selected}
            onValueChange={(itemValue) => setSelected(itemValue)}
            mode={"dropdown"}
          >
            <Picker.Item label="---Category---" value="" />
            <Picker.Item label="Clothing/Fashion" value="clothing" />
            <Picker.Item label="Electronics" value="electronics" />
            <Picker.Item label="Video Games" value="games" />
            <Picker.Item label="Music" value="music" />
            <Picker.Item label="Vintage" value="vintage" />
            <Picker.Item label="Beauty" value="beauty" />
            <Picker.Item label="Sports" value="sports" />
            <Picker.Item label="Food/Drink" value="food/drink" />
            <Picker.Item label="Hobbies" value="hobbies" />
          </Picker>
          <TextInput
            style={styles.textInput}
            placeholder="Image link"
            onChangeText={(e) => {
              setImages(e);
            }}
          />
          <TextInput
            style={styles.textInput}
            contextMenuHidden={true}
            keyboardType="phone-pad"
            placeholder="Total Points"
            onChangeText={(e) => {
              setPrice(e);
            }}
          />
          <TextInput
            style={styles.textInput}
            contextMenuHidden={true}
            keyboardType="phone-pad"
            placeholder="Number of Tickets"
            onChangeText={(e) => {
              setTickets(e);
            }}
          />
          <TextInput
            style={styles.descriptionInput}
            multiline={true}
            placeholder="Description (Max length: 1000 chars)"
            numberOfLines={10}
            maxLength={1000}
            onChangeText={(e) => {
              setDescription(e);
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="KeyWords (Max length: 50 chars)"
            maxLength={50}
            onChangeText={(e) => {
              setKeywords(e);
            }}
          />
          <Text style={styles.errorText}>{errorHandler}</Text>
          <Pressable
            style={styles.confirmButton}
            onPress={() => {
              sellSubmitHandler();
            }}
          >
            <View>
              <Text style={styles.confirmText}>Confirm</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <Image
        style={styles.backgroundImage}
        source={require("../../images/sell-background.png")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sellPageContainer: {
    height: 760,
    paddingBottom: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    width: "90%",
    height: "95%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "15%",
    backgroundColor: "rgba(255, 255, 255, .9)",
    paddingBottom: 10,
    elevation: 2,
  },
  sellHeader: {
    fontSize: 25,
    margin: 20,
    fontWeight: "bold",
  },
  textInput: {
    height: 35,
    width: 250,
    borderWidth: 0.5,
    marginVertical: 5,
    padding: 5,
    backgroundColor: "rgba(255, 255, 255, .5)",
  },
  descriptionInput: {
    height: 150,
    width: 250,
    borderWidth: 0.5,
    marginVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "rgba(255, 255, 255, .5)",
  },
  picker: {
    height: 35,
    width: 250,
    borderWidth: 0.5,
    marginVertical: 5,
    padding: 5,
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, .5)",
  },
  confirmButton: {
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    alignSelf: "center",
    borderRadius: 20,
    margin: 5,
  },
  confirmText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    marginTop: 5,
    color: "red",
    flex: 1,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
  },
  backgroundImage: {
    position: "absolute",
    zIndex: -2,
    transform: [{ translateX: -300 }, { translateY: 0 }, { scale: 0.9 }],
  },
});

export default Sell;
