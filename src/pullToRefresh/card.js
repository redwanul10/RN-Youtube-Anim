import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/Entypo";

export default function Card({ item }) {
  return (
    <View style={styles.container}>
      {/* Post Header */}
      <View style={styles.spaceBetween}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.profilePhoto}
            source={{
              uri: item.photo,
            }}
          />
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={{ color: "gray" }}>July 26 2018, 01:03pm</Text>
          </View>
        </View>
        <Icon name="dots-three-vertical" size={20} color="gray" />
      </View>

      {/* Post Description */}
      <Text style={styles.description}>{item.description}</Text>

      <Image
        style={styles.postImage}
        source={{
          uri: item.postImage,
        }}
      />

      {/* Post Footer */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <View style={styles.likedUsers}>
          {item.likes.map((userPhoto, index) => (
            <Image
              style={styles.likedUserPhoto}
              key={index}
              source={{
                uri: userPhoto,
              }}
            />
          ))}
        </View>
        <View sty>
          <Text style={{ fontWeight: "bold", color: "black", fontSize: 12 }}>
            Milly, David
          </Text>
          <Text style={{ color: "gray", fontSize: 12 }}>
            and 23 more liked this
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", padding: 15, marginBottom: 10 },
  spaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 8,
    resizeMode: "contain",
  },
  name: { fontWeight: "bold", color: "black" },
  description: { color: "grey", marginTop: 10, marginBottom: 10 },
  postImage: { width: "100%", height: 180, borderRadius: 10 },
  likedUsers: {
    flexDirection: "row",
    alignItems: "center",

    marginRight: 20,
  },
  likedUserPhoto: { width: 30, height: 30, borderRadius: 30, marginRight: -8 },
});
