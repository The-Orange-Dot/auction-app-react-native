import React from "react";
import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import NavMenu from "../components/NavMenu";
import { StarRating } from "../components/StarRating";

const Profile = ({ navigation, loggedIn, setLoggedIn, user, setUser }) => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const user_month = month[parseInt(String(user.created_at).slice(5, 7)) - 1];

  return (
    <ScrollView>
      <NavMenu
        navigation={navigation}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        user={user}
        setUser={setUser}
      />

      <View style={styles.body}>
        <Image
          style={styles.profilePicture}
          source={require("../../images/default-profile-pic.jpeg")}
        />
        <Text style={styles.username}>{user.username}</Text>
        {user.verified ? (
          <View style={styles.verifiedContainer}>
            <Text style={styles.verifiedText}>Verified Seller</Text>
          </View>
        ) : null}
        <Text>
          <Text style={styles.text}>Account created: </Text>
          <Text> {`${user_month} ${String(user.created_at).slice(0, 4)}`}</Text>
        </Text>
        <Text>
          <Text style={styles.text}>Total Tickets Bought:</Text>{" "}
          <Text>{user.tickets_bought}</Text>
        </Text>
        <View style={styles.ratingContainer}>
          <View>
            <Text style={styles.text}>Buyer Rating</Text>
            {StarRating(user.buyer_rating)}
          </View>
          <View>
            <Text style={styles.text}>Seller Rating</Text>
            {StarRating(user.seller_rating)}
          </View>
        </View>
        <View style={styles.reviewContainer}>
          <Text style={styles.reviewHeaderText}>Buy Reviews: </Text>
          <ScrollView style={styles.reviews}>
            {user.buyer_reviews.map((review) => {
              return (
                <View style={styles.review} key={review.id}>
                  <Text>{review.review}</Text>
                  {StarRating(review.rating)}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    height: 600,
    marginTop: 40,
  },
  profilePicture: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 1000,
  },
  username: { fontSize: 25, fontWeight: "bold", marginBottom: 10 },
  text: { fontWeight: "bold" },
  verifiedContainer: {
    backgroundColor: "#f26867",
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  verifiedText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  ratingContainer: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  reviewContainer: {
    alignItems: "center",
    height: 400,
    overflow: "hidden",
  },
  reviewHeaderText: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  reviews: {
    borderTopWidth: 1,
  },
  review: {
    alignItems: "center",
    borderBottomWidth: 1,
  },
});

export default Profile;
