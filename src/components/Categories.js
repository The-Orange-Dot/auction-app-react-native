import React, { useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const Categories = ({ category, categorySelected, setCategorySelected }) => {
  const [selected, setSelected] = useState(false);

  return (
    <Pressable
      style={selected ? styles.selected : styles.notSelected}
      onPress={() => {
        setSelected(!selected);

        categorySelected !== "" && categorySelected.includes(category.value)
          ? setCategorySelected(categorySelected.replace(category.value, ""))
          : setCategorySelected(categorySelected + category.value);
      }}
    >
      <Text style={selected ? styles.selectedText : styles.notSelectedText}>
        {category.text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  notSelected: {
    minHeight: 40,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    minHeight: 40,
    width: "100%",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  notSelectedText: { color: "black" },
  selectedText: { color: "white" },
});
export default Categories;
