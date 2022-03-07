import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";

const FilterModal = ({
  modalVisible,
  setModalVisible,
  setSearch,
  submitFilterHandler,
}) => {
  const searchHandler = (e) => {
    setSearch(e);
  };

  return (
    <Modal
      visible={modalVisible}
      animationType={"fade"}
      transparent={true}
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <View>
          <Text>FilterModal</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Search Titles and Keywords"
            maxLength={50}
            onChangeText={(e) => searchHandler(e)}
            onFocus={() => searchHandler("")}
          />
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
              submitFilterHandler();
              setModalVisible(false);
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
    height: 350,
    borderRadius: 10,
    flex: 1,
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
  modalButtons: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
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
  closeText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default FilterModal;
