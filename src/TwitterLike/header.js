import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Header() {
  return (
    <View style={{ marginBottom: 10, backgroundColor: "white" }}>
      <View style={{ paddingHorizontal: 20 }}>
        <AntDesign
          style={styles.logo}
          name="twitter"
          size={30}
          color="rgba(29, 155, 240,1)"
        />

        <Image
          style={styles.profilePic}
          source={{
            uri: "https://121clicks.com/wp-content/uploads/2022/08/best_dating_profile_picture_02.jpg",
          }}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <View style={[styles.tabs]}>
          <Text style={[styles.tab, { color: "black" }]}>For you</Text>
          <Text style={styles.tab}>Following</Text>
          <Text style={styles.tab}>react-native</Text>
        </View>
        <View style={styles.active} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profilePic: {
    width: 35,
    height: 35,
    borderRadius: 35,
    marginTop: -33,
  },
  logo: {
    alignSelf: "center",
  },
  tabContainer: {
    borderWidth: 1,
    borderColor: "rgb(207, 217, 222)",
    paddingBottom: 10,
    marginTop: 10,
  },
  tabs: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 20,
  },
  tab: {
    // flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "gray",
    fontSize: 16,
  },
  active: {
    width: 58,
    height: 5,
    backgroundColor: "rgba(29, 155, 240,1)",
    marginLeft: 26,
    borderRadius: 20,
    marginTop: 10,
  },
});
