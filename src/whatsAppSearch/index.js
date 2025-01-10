import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function WhatsappHeader({ navigation }) {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [showSearchHeader, setShowSearchHeader] = useState(false);

  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  const circleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const open = () => {
    scale.value = withTiming(50, { duration: 300 }, () => {
      runOnJS(setShowSearchHeader)(true);
    });
    opacity.value = 1;
    setToggleSearch(true);
  };

  const close = () => {
    scale.value = withTiming(1, { duration: 300 }, () => {
      opacity.value = 0;
    });
    setShowSearchHeader(false);
    setToggleSearch(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: toggleSearch ? "white" : "#075E54",
          height: StatusBar.currentHeight || 30,
        }}
      >
        <StatusBar
          translucent
          backgroundColor={toggleSearch ? "white" : "#075E54"}
          barStyle={toggleSearch ? "dark-content" : "light-content"}
        />
      </View>
      <View style={style.headerContainer}>
        {/* Circle Animation */}
        <Animated.View style={[style.circle, circleStyle]}></Animated.View>

        {/* Searchable Header */}
        {showSearchHeader && (
          <View style={[style.row, style.searchContainer]}>
            <TouchableOpacity onPress={close}>
              <Ionicons
                name="arrow-back"
                color="grey"
                size={20}
                style={{ marginRight: 5 }}
              />
            </TouchableOpacity>
            <TextInput
              style={style.search}
              textAlignVertical="center"
              autoFocus={true}
            />
          </View>
        )}
        {/* Default Header */}
        {!showSearchHeader && (
          <View style={[style.row]}>
            <Text style={style.headerText}>WhatsApp</Text>
            <View style={style.iconsContainer}>
              <TouchableOpacity onPress={open}>
                <AntDesign
                  name="search1"
                  color="white"
                  size={20}
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
              <Entypo name="dots-three-vertical" color="white" size={20} />
            </View>
          </View>
        )}

        <View style={style.row}>
          <AntDesign
            name="camera"
            color="white"
            size={20}
            style={{ marginRight: 15 }}
          />
          <Text style={[style.headerText, style.tab]}>Chats</Text>
          <Text style={[style.headerText, style.tab]}>Status</Text>
          <Text style={[style.headerText, style.tab]}>calls</Text>
        </View>
      </View>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Go Back to Animation List</Text>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 15,
    color: "rgba(255, 255, 255,0.6)",
  },
  circle: {
    width: 15,
    height: 15,
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 50,
    position: "absolute",
    right: "15%",
    top: "15%",
    // transform: [{scale: 50}],
    // zIndex: -1,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerContainer: {
    backgroundColor: "#075E54",
    paddingBottom: 5,
    overflow: "hidden",
  },
  searchContainer: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  search: {
    flex: 1,
    height: 30,
    paddingTop: 0,
    paddingBottom: 0,
    textAlignVertical: "center",
  },
});
