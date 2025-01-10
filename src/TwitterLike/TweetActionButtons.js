import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Lottie from "lottie-react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const LIKE_COUNTER_HEIGHT = 18;

export default function TweetActionButtons({ Comments, retweets, likes }) {
  const lottieRef = useRef();
  const [toggleLike, setToggleLike] = useState(false);
  const translateX = useSharedValue(0);

  const translatsStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateX.value }],
    };
  });

  const toValue = (value) => {
    return withTiming(value, { duration: 300 }, (isFinished) => {
      if (isFinished && translateX.value === -LIKE_COUNTER_HEIGHT * 2)
        translateX.value = 0;
    });
  };

  useEffect(() => {
    if (toggleLike) lottieRef.current.play();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleLike]);

  const handleLike = () => {
    setToggleLike(!toggleLike);
    if (translateX.value === 0) {
      translateX.value = toValue(-LIKE_COUNTER_HEIGHT);
    }

    if (translateX.value === -LIKE_COUNTER_HEIGHT) {
      translateX.value = toValue(-LIKE_COUNTER_HEIGHT * 2);
    }
  };

  return (
    <>
      <View style={styles.row}>
        <View style={styles.iconRow}>
          <EvilIcons
            style={styles.icon}
            name="comment"
            size={28}
            color="gray"
          />
          <Text>{Comments}</Text>
        </View>
        <View style={styles.iconRow}>
          <EvilIcons
            style={styles.icon}
            name="retweet"
            size={28}
            color="gray"
          />
          <Text>{retweets}</Text>
        </View>
        <View style={styles.iconRow}>
          <Pressable onPress={handleLike}>
            <EvilIcons
              style={styles.icon}
              name="heart"
              size={28}
              color={toggleLike ? "transparent" : "gray"}
            />
          </Pressable>

          {/* LIKE COUNTER  */}
          <View style={styles.likeCounterSection}>
            <Animated.View style={translatsStyle}>
              <Text style={{ color: toggleLike ? "#f91980" : "black" }}>
                {likes}
              </Text>
              <Text style={{ color: toggleLike ? "#f91980" : "black" }}>
                {likes + 1}
              </Text>
              <Text style={{ color: toggleLike ? "#f91980" : "black" }}>
                {likes}
              </Text>
            </Animated.View>
          </View>

          {/* LIKE ICON */}
          {toggleLike && (
            <View style={styles.lottieBtn}>
              <Lottie
                ref={lottieRef}
                source={require("./like.json")}
                style={styles.lottie}
                autoPlay={false}
                loop={false}
                progress={0.3}
                resizeMode="cover"
              />
              <Pressable
                onPress={handleLike}
                style={styles.invisibleFloatingBTN}
              ></Pressable>
            </View>
          )}
        </View>

        <EvilIcons
          style={styles.icon}
          name="share-google"
          size={28}
          color="gray"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 25,
    position: "relative",
  },
  row: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },

  lottieBtn: {
    width: 30,
    height: 30,

    position: "absolute",
    backgroundColor: "transparent",
    marginTop: -15,

    left: -2,
    top: 10,
  },
  lottie: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    transform: [{ scale: 2.3 }],
  },
  invisibleFloatingBTN: {
    width: 20,
    height: 20,
    position: "absolute",
    left: 7,
    top: 5,
  },
  likeCounterSection: { height: LIKE_COUNTER_HEIGHT, overflow: "hidden" },
});
