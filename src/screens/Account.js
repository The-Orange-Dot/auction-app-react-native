import React, { useContext } from "react";
import { Text, View, ScrollView, StyleSheet, Image } from "react-native";
import { UserContext } from "../../App";
import NavMenu from "../components/NavMenu";

const Account = ({ navigation }) => {
  const { userContext, loggedInContext } = useContext(UserContext);
  const loggedIn = loggedInContext[0];
  const setLoggedIn = loggedInContext[1];
  const user = userContext[0];

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
      />

      <View style={styles.body}>
        <Image
          style={styles.profilePicture}
          source={require("../../images/default-profile-pic.jpeg")}
        />
        <Text>Account Information: </Text>
        <Text style={styles.textContainer}>
          <Text style={styles.text}>Name: </Text>
          <Text>
            {user.firstName} {user.lastName}
          </Text>
        </Text>
        <Text style={styles.textContainer}>
          <Text style={styles.text}>Date of Birth: </Text>
          <Text>{`${user_month} ${String(user.created_at).slice(
            8,
            10
          )} , ${String(user.created_at).slice(0, 4)}`}</Text>
        </Text>
        <Text style={styles.textContainer}>
          <Text style={styles.text}>Email: </Text>
          {user.email}
          <Text></Text>
        </Text>
        <View style={styles.address}>
          <Text style={styles.text}>Shipping Address: </Text>
          <Text>
            {user.address !== null && user.address !== " "
              ? user.address
              : "Shipping address hasn't been added yet"}
          </Text>
        </View>
        <View style={styles.address}>
          <Text style={styles.text}>Billing Address: </Text>
          <Text>
            {user.billing_address !== null && user.billing_address !== " "
              ? user.billing_address
              : "Billing address hasn't been added yet."}
          </Text>
        </View>
        <Text style={styles.textContainer}>
          <Text style={styles.text}>Payment info: </Text>
          <Text>********************</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: "15%",
    marginTop: 40,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: 600,
  },
  profilePicture: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 1000,
    alignSelf: "center",
    marginBottom: 20,
  },
  address: {
    width: "100%",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  text: { fontWeight: "bold" },
  textContainer: { marginVertical: 10 },
});

export default Account;
