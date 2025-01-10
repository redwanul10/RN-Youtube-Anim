import { View, Text, StatusBar, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import Chat from "./chat";
import LinearGradient from "react-native-linear-gradient";
import AntIcon from "@expo/vector-icons/AntDesign";
import Swipable from "./swipable";

const data = [
  {
    id: 1,
    photo:
      "https://media-exp1.licdn.com/dms/image/C5603AQE-vA--43mj7g/profile-displayphoto-shrink_100_100/0/1550971822403?e=1671667200&v=beta&t=8NURm7MGVCQDksTmb54il9TK_Z9Kgyeop9xG2ztqqD8",
    title: "Sayaka Ono",
    time: "2m ago",
    avatarColor: "#f51b53",
    description: "Hi Dux, How are you today ?",
  },
  {
    id: 2,
    title: "Sarina Sajadi",
    photo:
      "https://media-exp1.licdn.com/dms/image/C5603AQEwldxEowRyOg/profile-displayphoto-shrink_100_100/0/1641499615043?e=1671667200&v=beta&t=OB43yX8WHlHmMesVW3u1n9FuCVyAYt99IPs6u0NSi6g",
    time: "30m ago",
    avatarColor: "#f51b53",
    description: "No, don’t be sorry...",
  },
  {
    id: 3,
    title: "David Glauber",
    photo:
      "https://media-exp1.licdn.com/dms/image/C5603AQGo71PDTejH3A/profile-displayphoto-shrink_100_100/0/1578381122645?e=1671667200&v=beta&t=2InLWvvAB1eJElvEQeuosx-mK3BtBX7XgWwuaYryMlc",
    time: "1h ago",
    avatarColor: "#f51b53",
    description: "Thank you for the invitation",
  },
  {
    id: 4,
    title: "Monarch Wadia",
    photo:
      "https://media-exp1.licdn.com/dms/image/C4D03AQGN2KmXvw6CGg/profile-displayphoto-shrink_100_100/0/1637640642044?e=1671667200&v=beta&t=YZcTC-SSGn8OCD5RWvceMMOOnWmYJqafX3tlM1kA83M",
    time: "2d ago",
    avatarColor: "#f51b53",
    description: "Ah, yes! I remember that",
  },
  {
    id: 5,
    title: "Jack Forge",
    photo:
      "https://media-exp1.licdn.com/dms/image/C4E03AQFzijW3X3GD_Q/profile-displayphoto-shrink_100_100/0/1616692227562?e=1671667200&v=beta&t=Bwo-H0ovvyRqV_8PR1o3tPpvn8d_s7QHSdVfwJ_zIjA",
    time: "2d ago",
    avatarColor: "#f51b53",
    description: "Well, I’ll see you later then.",
  },
  {
    id: 6,
    title: "Sandrine Debatty",
    photo:
      "https://media-exp1.licdn.com/dms/image/C5603AQE4k-eNnp4iBg/profile-displayphoto-shrink_100_100/0/1545414129146?e=1671667200&v=beta&t=a19wm36xVD-0k2QPwXu75C5-QelUTn0N7AdlWQxKc-w",
    time: "4d ago",
    avatarColor: "#f51b53",
    description: "Hi Dux, How are you today ?",
  },
  {
    id: 6,
    title: "Mohamed Hammamy",
    photo:
      "https://media-exp1.licdn.com/dms/image/C4D03AQGmB-ts7Z83_A/profile-displayphoto-shrink_100_100/0/1615734277084?e=1671667200&v=beta&t=BpCAB7MKqDLIjgHMW-NmPwjGmdz58tK0eaGJoL81sGQ",
    time: "4d ago",
    avatarColor: "#f51b53",
    description: "Thanks. See you later",
  },
];

export default function DeleteChat() {
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const [conversations, setConversations] = useState(data);

  const handleDelete = (deleteIndex, isApplicable) => {
    setTimeout(() => {
      const filteredList = conversations.filter((item, i) => i !== deleteIndex);
      setConversations(filteredList);
      console.log("DELETE FUNC CALLED");
    }, 400);
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#32c596", "#2faaab"]}
        style={{ height: 130 }}
      />

      <View style={styles.container}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatTxt}>Chat</Text>
          <AntIcon name="plus" size={25} color="#4283d7" />
        </View>

        <FlatList
          data={conversations}
          extraData={conversations.length}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <>
              <Swipable
                key={item.title}
                index={index}
                {...item}
                backgroundColor={item.avatarColor}
                handleDelete={handleDelete}
                setSelectedIndex={setSelectedIndex}
                selectedIndex={selectedIndex}
                totalConversation={conversations.length}
              >
                <Chat {...item} />
              </Swipable>
            </>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -30,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  chatTxt: { fontSize: 25, fontWeight: "bold" },
});
