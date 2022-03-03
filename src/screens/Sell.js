import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  Pressable,
} from "react-native";
import NavMenu from "../components/NavMenu";
import { UserContext } from "../../App";
import { Picker } from "@react-native-picker/picker";

const Sell = ({ navigation }) => {
  const { loggedInContext } = useContext(UserContext);
  const loggedIn = loggedInContext[0];
  const setLoggedIn = loggedInContext[1];
  const [selected, setSelected] = useState("");
  const [itemName, setItemName] = useState("");
  const [images, setImages] = useState("");
  const [price, setPrice] = useState("");
  const [tickets, setTickets] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  const sellSubmitHandler = (event) => {
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
      }),
    });
    //     .then((r) => r.json())
    //     .then((newProduct) => {
    //       setProducts([...products, newProduct]);
    //     });
  };

  return (
    <ScrollView>
      <NavMenu
        navigation={navigation}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
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
          keyboardType="phone-pad"
          placeholder="Total Points"
          onChangeText={(e) => {
            setPrice(e);
          }}
        />
        <TextInput
          style={styles.textInput}
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
      </View>
      <Pressable
        style={styles.confirmButton}
        onPress={() => sellSubmitHandler()}
      >
        <View>
          <Text style={styles.confirmText}>Confirm</Text>
        </View>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    width: Dimensions.get("window").width,
    height: 650,
    justifyContent: "center",
    alignItems: "center",
  },
  sellHeader: {
    fontSize: 25,
    margin: 20,
  },
  textInput: {
    height: 35,
    width: 250,
    borderWidth: 0.5,
    marginVertical: 5,
    padding: 5,
  },
  descriptionInput: {
    height: 150,
    width: 250,
    borderWidth: 0.5,
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  picker: {
    height: 35,
    width: 250,
    borderWidth: 0.5,
    marginVertical: 5,
    padding: 5,
    borderWidth: 1,
    backgroundColor: "#efefef",
  },
  confirmButton: {
    width: 100,
    height: 40,
    flex: 1,
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
});

export default Sell;
