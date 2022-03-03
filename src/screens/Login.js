import { useContext, useState } from "react";
import {
  TextInput,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import NavMenu from "../components/NavMenu";
import { UserContext } from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const { userContext, loggedInContext, userIdContext } =
    useContext(UserContext);
  const loggedIn = loggedInContext[0];
  const setLoggedIn = loggedInContext[1];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUserId = userIdContext[1];

  const submitHandler = () => {
    fetch("https://boiling-forest-19458.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({
        username: username.trim().toLowerCase(),
        password: password.trim(),
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((userData) => {
          AsyncStorage.setItem("user", userData.cookies.user);
          setUserId(userData.cookies.user);
          setLoggedIn(true);
          navigation.goBack();
        });
      } else {
        console.log("login failed");
        setLoggedIn(false);
      }
    });
  };

  return (
    <ScrollView>
      <NavMenu navigation={navigation} loggedIn={loggedIn} />
      <View style={styles.body}>
        <View style={styles.inputContainer}>
          <Text>Login</Text>
          <TextInput
            name="username"
            style={styles.textInput}
            placeholder="Username"
            onChangeText={(newText) => setUsername(newText)}
          />
          <TextInput
            name="password"
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(newText) => {
              setPassword(newText);
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View>
            <Pressable
              style={styles.backButton}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.buttonText}>Back</Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              style={styles.submitButton}
              onPress={() => {
                submitHandler();
              }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    marginTop: 300,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textInput: {
    height: 35,
    width: 220,
    borderWidth: 0.5,
    marginVertical: 5,
    padding: 5,
  },
  backButton: {
    width: 100,
    backgroundColor: "gray",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  submitButton: {
    width: 100,
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  buttonContainer: {
    width: "70%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
});

export default Login;
