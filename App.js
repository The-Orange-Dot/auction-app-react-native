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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
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
    created_at: "2020-01-10T16:36:36.178Z",
    username: "",
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

    //Fetches Products
    fetch("https://boiling-forest-19458.herokuapp.com/products")
      .then((r) => r.json())
      .then((items) => {
        setProducts(items);
        setProductsLoaded(true);
      });

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("user");
        if (value !== null) {
          return value;
        }
      } catch (error) {}
    };
    getData().then((thing) => setUserId);
  }, [userId]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              user={user}
              setUser={setUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Profile">
          {(props) => (
            <Profile
              {...props}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              user={user}
              setUser={setUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Browse">
          {(props) => (
            <Browse
              {...props}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              user={user}
              setUser={setUser}
              setProductsLoaded={setProductsLoaded}
              productsLoaded={productsLoaded}
              setProducts={setProducts}
              products={products}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Product">
          {(props) => (
            <ProductDetail
              {...props}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              user={user}
              setUser={setUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {(props) => (
            <Login
              {...props}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setUserId={setUserId}
              user={user}
              setUser={setUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Account">
          {(props) => (
            <Account
              {...props}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              user={user}
              setUser={setUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Tickets">
          {(props) => (
            <Tickets
              {...props}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              user={user}
              products={products}
              setProducts={setProducts}
              setUser={setUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Sell">
          {(props) => (
            <Sell
              {...props}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setUser={setUser}
              user={user}
              products={products}
              setProducts={setProducts}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
