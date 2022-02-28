import React from "react";
import { Text, View } from "react-native";

export const StarRating = (sellerRating) => {
  const userRating = sellerRating;
  let rating = null;

  if (userRating < 1) {
    rating = <Text>&#9734;&#9734;&#9734;&#9734;&#9734;</Text>;
  } else if (userRating < 2) {
    rating = <Text>&#9733;&#9734;&#9734;&#9734;&#9734;</Text>;
  } else if (userRating < 3) {
    rating = <Text>&#9733;&#9733;&#9734;&#9734;&#9734;</Text>;
  } else if (userRating < 4) {
    rating = <Text>&#9733;&#9733;&#9733;&#9734;&#9734;</Text>;
  } else if (userRating < 5) {
    rating = <Text>&#9733;&#9733;&#9733;&#9733;&#9734;</Text>;
  } else {
    rating = <Text>&#9733;&#9733;&#9733;&#9733;&#9733;</Text>;
  }

  return <View>{rating}</View>;
};
