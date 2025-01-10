/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  interpolate,
  Extrapolate,
  withTiming,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/AntDesign";
import Icon2 from "@expo/vector-icons/Entypo";
import VideoCard from "./videoCard";

const SIZES = Dimensions.get("window");

// IMAGE SIZES
const IMAGE_TOP_DISTANCE = 100;
const IMAGE_BOTTOM_DISTANCE = SIZES.width / 1.2;
const BIG_IMAGE_SIZE = SIZES.height / 3.2;

// IMAGE WIDTH
const IMAGE_WIDTH_COL = (SIZES.width * 33) / 100;

const screenHeight = Dimensions.get("screen").height;
let bottomTranslateY = (screenHeight * 95) / 100 - IMAGE_WIDTH_COL - 20;

const YoutubePlayer = ({ onClose, selectedVideo, bottomPosition }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(300);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 300 });
  }, []);

  useEffect(() => {
    if (selectedVideo) {
      translateY.value = withTiming(0, { duration: 300 });
    }
  }, [selectedVideo]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.translateX = translateX.value;
      ctx.translateY = translateY.value;

      if (ctx.translateY === bottomTranslateY) {
        ctx.bottomSwipe = true;
      } else {
        ctx.bottomSwipe = false;
      }
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX + ctx.translateX;
      translateY.value = event.translationY + ctx.translateY;
    },
    onEnd: (_, ctx) => {
      if (ctx.bottomSwipe && bottomTranslateY - 80 > translateY.value) {
        translateY.value = withTiming(0, { duration: 300 });
        return;
      }

      if (translateY.value > 100) {
        translateY.value = withTiming(bottomTranslateY, {
          duration: 300,
        });
        return;
      }

      translateY.value = withTiming(0, { duration: 300 });
    },
  });

  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        translateY.value,
        [IMAGE_TOP_DISTANCE, IMAGE_BOTTOM_DISTANCE],
        [SIZES.width, IMAGE_WIDTH_COL],
        {
          extrapolateRight: Extrapolate.CLAMP,
          extrapolateLeft: Extrapolate.CLAMP,
        }
      ),
      height: interpolate(
        translateY.value,
        [IMAGE_TOP_DISTANCE, IMAGE_BOTTOM_DISTANCE],
        [BIG_IMAGE_SIZE, IMAGE_WIDTH_COL - 20],
        {
          extrapolateRight: Extrapolate.CLAMP,
          extrapolateLeft: Extrapolate.CLAMP,
        }
      ),
      padding: interpolate(
        translateY.value,
        [IMAGE_TOP_DISTANCE, (SIZES.height * 70) / 100],
        [0, 5],
        {
          extrapolateRight: Extrapolate.CLAMP,
          extrapolateLeft: Extrapolate.CLAMP,
        }
      ),
    };
  });

  const detailsStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateY.value,
        [IMAGE_TOP_DISTANCE, (SIZES.height * 70) / 100],
        [1, 0],
        {
          extrapolateRight: Extrapolate.CLAMP,
          extrapolateLeft: Extrapolate.CLAMP,
        }
      ),
    };
  });

  const expandPlayer = () => {
    if (translateY.value > 100) {
      translateY.value = withTiming(0, { duration: 300 });
    }
  };

  return (
    <Animated.View style={[translateStyle, styles.wrapper]}>
      {/* PLAYER Section */}
      <View style={styles.playerContainer}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View>
            <TouchableWithoutFeedback
              onPress={expandPlayer}
              style={styles.playerContainer}
            >
              <Animated.View style={[imageStyle]}>
                <Image
                  style={[
                    { width: "100%", height: "100%", resizeMode: "cover" },
                  ]}
                  source={{
                    uri:
                      selectedVideo?.thumbnail ||
                      "https://i.ytimg.com/vi/duJNVv9m2NY/maxresdefault.jpg",
                  }}
                />
              </Animated.View>

              <Text
                numberOfLines={2}
                style={[
                  styles.sideTitle,
                  {
                    width: (SIZES.width * 43) / 100,
                  },
                ]}
              >
                {selectedVideo?.title}
              </Text>
            </TouchableWithoutFeedback>
          </Animated.View>
        </PanGestureHandler>

        <View
          style={[styles.iconsContainer, { width: (SIZES.width * 23) / 100 }]}
        >
          <Icon2 name="controller-play" size={30} color="black" />
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <Icon name="close" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View style={[detailsStyle, styles.container]}>
        <Text style={styles.title}>{selectedVideo?.title}</Text>
        {/* Like Dislike Buttons */}
        <View style={styles.iconsContainer}>
          <Icon name="like2" size={30} color="black" />
          <Icon name="dislike2" size={30} color="black" />
          <Icon name="sharealt" size={30} color="black" />
          <Icon name="addfile" size={30} color="black" />
        </View>

        {/* Channel Info */}
        <View style={[styles.rowCenter, { justifyContent: "space-between" }]}>
          <View style={styles.rowCenter}>
            <Image
              style={styles.channelLogo}
              source={{
                uri:
                  selectedVideo?.channelLogo ||
                  "https://yt3.ggpht.com/ytc/AKedOLR-TP_Uc-gh9UWENj1CsWNVyxDRwCikaVARVwhY=s48-c-k-c0x00ffffff-no-rj",
              }}
            />
            <View>
              <Text
                style={{ fontWeight: "bold", fontSize: 18, marginBottom: 5 }}
              >
                {selectedVideo?.channelName}
              </Text>
              <Text>41.7K subscribers</Text>
            </View>
          </View>

          <Text style={styles.subBtn}>Subscribe</Text>
        </View>
        <Text style={{ fontWeight: "bold", marginTop: 20 }}>Comments - 20</Text>
        <Text style={styles.commentSection}>Add Comment...</Text>

        <VideoCard
          setSelectedVideo={() => {}}
          data={{
            channelLogo:
              "https://yt3.ggpht.com/ytc/AL5GRJWhzi26YnOvIsPfOTBEQkx8VaNUuieO-4ypxg4I7A=s88-c-k-c0x00ffffff-no-rj",
            thumbnail:
              "https://i.ytimg.com/vi/cu5BZNymMzs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD9uEFytdrh6GT6-VYv5qYmJEoFKg",
            title: "Top 10 Places To Visit in 2023 (Year of Travel)",
            channelTitle: "Ryan Shirley   150k views  3 months ago",
          }}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default YoutubePlayer;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    elevation: 10,
    width: "100%",
    height: SIZES.height,
    position: "absolute",
    zIndex: 9999,
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
    lineHeight: 30,
  },
  sideTitle: {
    paddingLeft: 5,
    fontSize: 18,
    color: "black",
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  iconsContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  subBtn: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "red",
    padding: 10,
  },
  playerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentSection: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 8,
    paddingLeft: 20,
    marginTop: 10,
  },
  channelLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50,
    resizeMode: "contain",
  },
});
