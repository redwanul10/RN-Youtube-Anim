import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Header() {
  return (
    <View style={styles.row}>
      <Image
        style={styles.logo}
        source={{
          uri: "https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6.jpg",
        }}
      />
      <View style={[styles.row, { width: "30%", marginRight: 10 }]}>
        <Feather name="cast" size={25} color="black" />
        <Ionicons name="notifications-outline" size={25} color="black" />
        <Feather name="search" size={25} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: { width: 150, height: 90, resizeMode: "contain" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
