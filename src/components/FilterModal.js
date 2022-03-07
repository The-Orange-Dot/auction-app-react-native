import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import Categories from "./Categories";

const FilterModal = ({
  modalVisible,
  setModalVisible,
  setSearch,
  submitFilterHandler,
  setProducts,
  setCategorySelected,
  categorySelected,
}) => {
  const searchHandler = (e) => {
    setSearch(e);
  };

  //Broken FIX THISSSSS
  const filterHandler = () => {
    // fetch("https://boiling-forest-19458.herokuapp.com/products")
    //   .then((res) => res.json())
    //   .then((products) => {
    //     const categoryFiltered =
    //       categorySelected.length === 0
    //         ? products
    //         : products.filter((product) => {
    //             return categorySelected.includes(product.category);
    //           });
    //     setProducts(categoryFiltered);
    //
    //   });
    submitFilterHandler();
    setModalVisible(false);
    console.log(categorySelected);
  };

  const categories = [
    { text: "Clothing/Fashion", value: "clothing " },
    { text: "Electronics", value: "electronics " },
    { text: "Video Games", value: "games " },
    { text: "Music", value: "music " },
    { text: "Vintage", value: "vintage " },
    { text: "Beauty", value: "beauty " },
    { text: "Sports", value: "sports " },
    { text: "Food/Drink", value: "food/drink " },
    { text: "Hobbies", value: "hobbies " },
  ];

  const categorySelectors = categories.map((category) => (
    <Categories
      category={category}
      key={category.value}
      categorySelected={categorySelected}
      setCategorySelected={setCategorySelected}
    />
  ));

  return (
    <Modal
      visible={modalVisible}
      animationType={"fade"}
      transparent={true}
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <View>
          <Text>Filter products</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Search Titles and Keywords"
            maxLength={50}
            onChangeText={(e) => searchHandler(e)}
            onFocus={() => searchHandler("")}
          />
        </View>

        <View style={styles.pickerContainer}>
          <Text>Category: </Text>
          <ScrollView style={styles.picker}>{categorySelectors}</ScrollView>
        </View>

        <View style={styles.modalButtons}>
          <Pressable
            style={styles.cancelButton}
            onPress={() => setModalVisible(false)}
          >
            <View>
              <Text style={styles.closeText}>Cancel</Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.confirmButton}
            onPress={() => {
              filterHandler();
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
  modal: {},
  modalContainer: {
    position: "absolute",
    left: "10%",
    top: "25%",
    backgroundColor: "white",
    width: "80%",
    height: 380,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    elevation: 5,
  },
  textInput: {
    height: 35,
    width: 250,
    borderWidth: 0.5,
    marginVertical: 5,
    padding: 5,
    backgroundColor: "rgba(255, 255, 255, .5)",
  },
  pickerContainer: { maxHeight: "60%" },
  picker: {
    maxHeight: "100%",
    width: 250,
    borderWidth: 0.5,
    backgroundColor: "rgba(255, 255, 255, .5)",
  },
  modalButtons: {
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
  },
  cancelButton: {
    width: 100,
    minHeight: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    borderRadius: 20,
    margin: 5,
  },
  confirmButton: {
    width: 100,
    minHeight: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 20,
    margin: 5,
  },
  closeText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default FilterModal;
