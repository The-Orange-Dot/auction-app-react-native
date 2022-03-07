import React, { useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import NavMenu from "../components/NavMenu";
import Product from "./Product";
import FilterModal from "../components/FilterModal";
import Fuse from "fuse.js";

const Browse = ({
  navigation,
  loggedIn,
  setLoggedIn,
  user,
  setUser,
  setProducts,
  products,
  productsLoaded,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState(products);
  const [filtering, setFiltering] = useState(false);
  const browseRef = useRef(null);
  const [categorySelected, setCategorySelected] = useState("");

  //Scrolls user back to the top of product list
  const scrollToTop = () => {
    browseRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  //FUSE.JS - Fuzzy search through category, name, and keywords
  const option = {
    keys: ["name", "keywords", "category"],
    threshold: 0.2,
    minMatchCharLength: 2,
  };
  const fuseFilter = new Fuse(products, option);

  //Submits search filter (If blank, then all products will be rendered)
  const submitFilterHandler = () => {
    if (search.length > 1) {
      setSearchFilter(fuseFilter.search(search));
      setFiltering(true);
    } else {
      setSearchFilter(products);
      setFiltering(false);
    }
  };

  //Maps products
  const product = searchFilter.map((product) => {
    return (
      <View key={product.id}>
        <Product
          product={filtering ? product.item : product}
          navigation={navigation}
          setProducts={setProducts}
        />
      </View>
    );
  });

  return (
    <View>
      <ScrollView ref={browseRef}>
        <NavMenu
          navigation={navigation}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          user={user}
          setUser={setUser}
        />
        <View style={styles.body}>
          {
            // Returns "no product found" if search returns nothing
            productsLoaded ? (
              searchFilter.length === 0 ? (
                <View style={styles.noProductContainer}>
                  <Text style={styles.noProductText}>No products found</Text>
                  <Pressable
                    style={styles.resetFilterButton}
                    onPress={() => {
                      setFiltering(false);
                      setSearchFilter(products);
                    }}
                  >
                    <Text style={styles.resetFilterText}>Reset filter</Text>
                  </Pressable>
                </View>
              ) : (
                // Renders "no more products found" when user reaches bottom of list
                <View>
                  <Text>{product}</Text>
                  <View style={styles.endOfFilter}>
                    <Text style={styles.noProductText}>
                      No more products found
                    </Text>
                    <Pressable
                      style={styles.resetFilterButton}
                      onPress={() => {
                        setFiltering(false);
                        setSearchFilter(products);
                        scrollToTop();
                      }}
                    >
                      <Text style={styles.resetFilterText}>
                        {filtering ? "Reset filter" : "Back to top"}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )
            ) : (
              <View style={styles.loadingContainer}>
                <View style={styles.logoContainer}>
                  <Text style={styles.logo}>M</Text>
                </View>
                <Text style={styles.loadingText}>Loading...</Text>
              </View>
            )
          }
        </View>
      </ScrollView>

      {/* Filter button */}
      <Pressable
        style={styles.filterButton}
        onPress={() => {
          setModalVisible(!modalVisible);
          setSearch("");
          setCategorySelected("");
        }}
      >
        <Image
          style={styles.searchIcon}
          source={require("../../images/search-icon.png")}
        />
      </Pressable>
      <FilterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setSearch={setSearch}
        submitFilterHandler={submitFilterHandler}
        setProducts={setProducts}
        categorySelected={categorySelected}
        setCategorySelected={setCategorySelected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    marginTop: 11,
    alignItems: "center",
    paddingBottom: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
    backgroundColor: "#f26867",
    borderRadius: 6,
  },
  logo: { fontSize: 25, color: "white", fontWeight: "bold" },
  loadingContainer: {
    marginTop: 300,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: { fontWeight: "bold", fontSize: 15 },
  noProductContainer: {
    height: 620,
    justifyContent: "center",
  },
  endOfFilter: { alignItems: "center", marginTop: 25 },
  noProductText: { fontWeight: "bold" },
  resetFilterButton: {
    width: 100,
    maxHeight: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 20,
    margin: 5,
  },
  resetFilterText: {
    color: "white",
    fontWeight: "bold",
  },
  filterButton: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: "#f26867",
    elevation: 1,
    position: "absolute",
    bottom: "2%",
    right: "2%",
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    width: 35,
    height: 35,
  },
});

export default Browse;
