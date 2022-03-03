import { Button, Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import Profile from "./src/screens/Profile";
import Browse from "./src/screens/Browse";
import ProductDetail from "./src/screens/ProductDetail";
import Login from "./src/screens/Login";
import { createContext, useEffect, useState } from "react";
import Account from "./src/screens/Account";
import Tickets from "./src/screens/Tickets";
import Sell from "./src/screens/Sell";

const Stack = createNativeStackNavigator();
export const UserContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    points: 0,
    picture:
      "https://www.peachridgeglass.com/wp-content/uploads/2013/07/MoxieAd1.jpg",
    email: "",
    address: "",
    products: [],
    buyer_reviews: [],
    seller_reviews: [],
  });

  //Logs the user in using the encrypted hash from login fetch
  useEffect(() => {
    if (userId !== 0) {
      fetch("https://boiling-forest-19458.herokuapp.com/user", {
        headers: {
          user: userId,
        },
      }).then((r) => {
        if (r.ok) {
          r.json().then((userData) => {
            setUser(userData);
            setLoggedIn(true);
          });
        } else {
          setLoggedIn(false);
        }
      });
    }
  }, [userId]);

  return (
    <UserContext.Provider
      value={{
        userContext: [user, setUser],
        loggedInContext: [loggedIn, setLoggedIn],
        userIdContext: [userId, setUserId],
      }}
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Browse" component={Browse} />
          <Stack.Screen name="Product" component={ProductDetail} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Tickets" component={Tickets} />
          <Stack.Screen name="Sell" component={Sell} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
