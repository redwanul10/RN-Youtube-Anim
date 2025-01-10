import { Text, SafeAreaView, StyleSheet, StatusBar, View } from "react-native";
import React, { useState } from "react";
import { FlatList, PanGestureHandler } from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/Ionicons";
import Lottie from "lottie-react-native";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import TabBar from "./tabBar";
import Card from "./card";

const data = [
  {
    id: 2,
    photo: "https://friendkit.cssninja.io/assets/img/avatars/dan.jpg",
    postImage: "https://friendkit.cssninja.io/assets/img/demo/unsplash/1.jpg",
    name: "Dan Walker",
    description:
      "Yesterday with @Karen Miller and @Marvin Stemperd at the #Rock'n'Rolla concert in LA. Was totally fantastic!",
    animated: false,
    likes: [
      "https://friendkit.cssninja.io/assets/img/avatars/dan.jpg",
      ,
      "https://friendkit.cssninja.io/assets/img/avatars/david.jpg",
      ,
      "https://friendkit.cssninja.io/assets/img/avatars/edward.jpeg",
    ],
  },
  {
    id: 3,
    photo: "https://friendkit.cssninja.io/assets/img/avatars/elise.jpg",
    postImage: "https://friendkit.cssninja.io/assets/img/demo/unsplash/2.jpg",
    name: "Elise Walker",
    description:
      "Thanks a lot to @Gaelle and @Rolf for this wonderful team lunch. The food was really tasty and we had some great laughs. Thanks to all the team, you're all awesome !",
    animated: false,
    likes: [
      "https://friendkit.cssninja.io/assets/img/avatars/dan.jpg",
      ,
      "https://friendkit.cssninja.io/assets/img/avatars/david.jpg",
      ,
      "https://friendkit.cssninja.io/assets/img/avatars/edward.jpeg",
    ],
  },
];

const fDAta = {
  id: new Date().getTime(),
  photo:
    "https://media-exp1.licdn.com/dms/image/C4D03AQGkkyKueLxgqQ/profile-displayphoto-shrink_100_100/0/1614256871209?e=1672272000&v=beta&t=sHEWQYjkFBt-cmD1PMBDLiHC21gXHRFpw1-oFemZFQU",
  postImage:
    "https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  name: "Daniele Carta",
  description:
    "Join Next.js Conf to hear @kelseyhightower and @rauchg discuss the future of the Web, live from San Francisco on Oct 25.",
  title: "Milky Blueberry Ice Cream with Vanilla Essence",
  animated: true,
  likes: [
    "https://media-exp1.licdn.com/dms/image/C5603AQE-vA--43mj7g/profile-displayphoto-shrink_800_800/0/1550971822403?e=1672272000&v=beta&t=GyV8CUH9vUd2bCuiLfH63lVVN2w5Rm9QDbBC0XBNmRU",
    ,
    "https://friendkit.cssninja.io/assets/img/avatars/david.jpg",
    ,
    "https://media-exp1.licdn.com/dms/image/C4D03AQGi6YrXkRJN7g/profile-displayphoto-shrink_800_800/0/1657254123006?e=1672272000&v=beta&t=qBvd_rthwUaEo6HOwVm1gMRpV6nJKqnQAJ62POtMncA",
  ],
};

const REFRESH_AREA_HEIGHT = 130;

export default function PullToRefresh() {
  const [recipes, setRecipes] = useState(data);
  const [toggleLottie, setToggleLottie] = useState(false);
  const [toggleGesture, setToggleGesture] = useState(true);
  const [gestureActive, setGestureActive] = useState(false);

  const flatlistRef = useAnimatedRef();

  const translationY = useSharedValue(0);
  const pullUpTranslate = useSharedValue(0);

  const fetchData = () => {
    setTimeout(() => {
      setRecipes([fDAta, ...recipes]);
    }, 2000);

    setTimeout(() => {
      translationY.value = withTiming(0, { duration: 200 }, (finished) => {
        pullUpTranslate.value = 0;

        runOnJS(setToggleLottie)(false);
      });
    }, 3000);
  };

  const pullUpAnimation = () => {
    pullUpTranslate.value = withDelay(
      0,
      withTiming(
        pullUpTranslate.value === 0 ? -100 : 0,
        { duration: 200 },
        (finished) => {
          if (finished) {
            runOnJS(setToggleLottie)(true);
            runOnJS(fetchData)();
          }
        }
      )
    );
  };
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translationY.value;
      runOnJS(setGestureActive)(true);
    },
    onActive: (event, ctx) => {
      const total = ctx.startY + event.translationY;
      // console.log('translateY', total);

      if (total < REFRESH_AREA_HEIGHT) {
        translationY.value = total;
      } else {
        translationY.value = REFRESH_AREA_HEIGHT;
      }

      if (total < 0) {
        translationY.value = 0;
        scrollTo(flatlistRef, 0, total * -1, false);
      }
    },
    onEnd: () => {
      runOnJS(setGestureActive)(false);
      if (translationY.value <= REFRESH_AREA_HEIGHT - 1) {
        translationY.value = withTiming(0, { duration: 200 });
      } else {
        runOnJS(pullUpAnimation)();
      }
      if (!(translationY.value > 0)) {
        runOnJS(setToggleGesture)(false);
      }
    },
  });

  const handleOnScroll = (event) => {
    const position = event.nativeEvent.contentOffset.y;
    if (position === 0) {
      setToggleGesture(true);
    } else if (position > 0 && toggleGesture && !gestureActive) {
      setToggleGesture(false);
    }
  };

  const animatedSpace = useAnimatedStyle(() => {
    return {
      height: translationY.value,
    };
  });

  const pullDownIconSection = useAnimatedStyle(() => {
    const rotate = interpolate(
      translationY.value,
      [0, REFRESH_AREA_HEIGHT],
      [0, 180]
    );
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  const pullUpTranslateStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      [58, REFRESH_AREA_HEIGHT],
      [0, 1]
    );

    return {
      opacity,
      transform: [
        {
          translateY: pullUpTranslate.value,
        },
      ],
    };
  });

  const statusBarStyle = useAnimatedStyle(() => {
    const translate = interpolate(
      translationY.value,
      [80, REFRESH_AREA_HEIGHT],
      [0, -40],
      {
        extrapolateLeft: Extrapolate.CLAMP,
        extrapolateRight: Extrapolate.CLAMP,
      }
    );

    return {
      transform: [
        {
          translateY: translate,
        },
      ],
    };
  });

  return (
    <>
      <StatusBar
        translucent={true}
        // backgroundColor="#E0144C"
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Custom Status bar */}
      <Animated.View style={[styles.customStatusBar, statusBarStyle]} />

      <SafeAreaView
        style={{
          flex: 1,

          backgroundColor: "#f4f4f4",
        }}
      >
        <View style={styles.contentContainer}>
          {/* Pull to Refresh Section */}
          <Animated.View style={[styles.pullToRefreshArea, animatedSpace]}>
            <Animated.View style={[styles.center, pullUpTranslateStyle]}>
              <Animated.View style={pullDownIconSection}>
                <Icon name="arrow-down-circle" color="black" size={35} />
              </Animated.View>

              <Text>Pull Down to Refresh</Text>
            </Animated.View>
            {toggleLottie && (
              <>
                <Lottie
                  source={require("./circlesRotate.json")}
                  style={styles.lottieView}
                  autoPlay
                />
              </>
            )}
          </Animated.View>

          {/* Blog Post Section */}
          <FlatList
            data={recipes}
            ref={flatlistRef}
            onScroll={handleOnScroll}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <>
                {/* <RecipeCard item={item} /> */}
                <Card item={item} />
              </>
            )}
          />

          {toggleGesture && (
            <PanGestureHandler onGestureEvent={gestureHandler}>
              <Animated.View style={styles.gesture} />
            </PanGestureHandler>
          )}
        </View>
        <TabBar />
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "white" }} />
    </>
  );
}

const styles = StyleSheet.create({
  catagory: {
    marginRight: 20,
    fontWeight: "bold",
  },
  active: {
    width: 70,
    height: 2,
    backgroundColor: "black",
    marginBottom: 20,
  },
  catagoryContainer: { flexDirection: "row", marginBottom: 5, marginTop: 30 },
  lottieAnim: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    position: "absolute",
    left: -8,
    top: -8,
  },
  gesture: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 200,
    width: "100%",
    // backgroundColor: 'green',
    zIndex: 99999,
  },
  lottieView: {
    width: 80,
    height: 80,
    backgroundColor: "transparent",
    marginTop: -15,
  },
  pullToRefreshArea: {
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    overflow: "hidden",
  },
  customStatusBar: { height: 40, backgroundColor: "#E0144C" },
  contentContainer: { flex: 1, marginHorizontal: 15, marginVertical: 15 },
  center: { justifyContent: "center", alignItems: "center" },
});
