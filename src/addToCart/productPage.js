import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  Pressable,
} from "react-native";
import React from "react";
import AddToCart from ".";
import Icon from "@expo/vector-icons/AntDesign";

const isAndroid = Platform.OS === "android";

export default function ProductPage() {
  return (
    <>
      {isAndroid ? (
        <StatusBar backgroundColor="#425F57" />
      ) : (
        <>
          <SafeAreaView style={{ backgroundColor: "#425F57" }}></SafeAreaView>
          <StatusBar barStyle="light-content" backgroundColor="#425F57" />
        </>
      )}
      <View style={styles.mainContent}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.productImage}
            source={require("./productImg.jpeg")}
          />
        </View>

        <View style={styles.titleSection}>
          <Text style={[styles.heading]}>
            Levi's Men's Washed Cotton Hooded Military Jacket
          </Text>
          <Icon style={styles.review} name="hearto" size={25} color="#D61C4E" />
        </View>

        <Text style={[styles.heading, styles.price]}>$ 30</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon style={styles.review} name="star" size={13} color="#FDCC0D" />
          <Icon style={styles.review} name="star" size={13} color="#FDCC0D" />
          <Icon style={styles.review} name="star" size={13} color="#FDCC0D" />
          <Icon style={styles.review} name="star" size={13} color="#FDCC0D" />
          <Text style={{}}>(30 Reviews)</Text>
        </View>

        <Text style={styles.description}>
          Jacket with a slightly padded interior. Lapel collar and long sleeves
          with elasticated cuffs. Welt pockets at the hip and inside pocket
          detail.
        </Text>
      </View>
      <AddToCart />
    </>
  );
}

const styles = StyleSheet.create({
  mainContent: { flex: 1, padding: 25, marginTop: isAndroid ? 0 : "5%" },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 350,
    //   backgroundColor: 'red',
  },
  productImage: {
    width: "80%",
    height: "100%",
    resizeMode: "cover",
  },
  heading: {
    // marginTop: 30,
    // marginBottom: 15,
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
  review: {
    marginRight: 5,
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    alignItems: "center",
  },
  description: {
    marginTop: isAndroid ? 5 : 10,
    lineHeight: 20,
  },
  price: { color: "green", marginBottom: isAndroid ? 0 : 5 },
  backBtn: {
    width: 35,
    height: 35,
    backgroundColor: "white",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    left: 15,
    top: isAndroid ? 25 : "8%",
    zIndex: 4,
  },
});
