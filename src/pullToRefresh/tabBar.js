import { View } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/AntDesign";

export default function TabBar() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingVertical: 15,
        backgroundColor: "white",
      }}
    >
      <Icon name="home" size={25} color="#E0144C" />
      <Icon name="heart" size={25} color="gray" />
      <Icon name="search1" size={25} color="gray" />
    </View>
  );
}
