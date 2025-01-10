import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useRef } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";
import { useRoute } from "@react-navigation/native";
import Icon from "@expo/vector-icons/Entypo";
import Cart, { HEIGHT, OPEN_HEIGHT } from "./components/Cart";
import { useCartStore } from "./context/CartProvider";

const IMAGE_HEIGHT = Dimensions.get("window").height * 0.4;
const foodInfo = [
  { title: "Energy", value: "210 cal", bgColor: "#fb6d37" },
  { title: "Proteins", value: "14.6 cal", bgColor: "#ffbe3d" },
  { title: "Fats", value: "14.6 cal", bgColor: "#7651dc" },
  { title: "Carbs", value: "14.6 cal", bgColor: "#84b468" },
];
export default function ProductPage() {
  const { cartList, addToCart } = useCartStore();
  const { params } = useRoute();
  const cartRef = useRef();
  return (
    <>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.center}>
            {/* Shared Element Image */}
            <Animated.Image
              style={{ width: "100%", height: IMAGE_HEIGHT }}
              sharedTransitionTag={params.tagName}
              source={{
                uri: params?.productInfo?.image,
              }}
            />
            {/* <View style={styles.backBtnWrapper}>
            <Icon name="arrow-long-left" size={20} color="grey" />
          </View> */}
          </View>

          {/* Title & description */}
          <Text style={styles.title}>Avocado Salad</Text>
          <Text style={styles.weight}>300 g</Text>
          <Text style={[styles.weight, { marginVertical: 20 }]}>
            Homemade italian dressing, cherry tomatoes, green olives,Homemade
            italian
          </Text>

          {/* Food Info */}
          <View>
            <FlatList
              data={foodInfo}
              keyExtractor={(_, index) => index.toString()}
              horizontal={true}
              ItemSeparatorComponent={<View style={{ width: 10 }} />}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.foodInfo,
                    {
                      backgroundColor: item.bgColor,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.whiteColor,
                      {
                        fontSize: 12,
                        marginBottom: 5,
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text style={[styles.whiteColor, { fontWeight: "bold" }]}>
                    {item.value}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
        {/* Add to Cart */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "45%",
              backgroundColor: "#f2f4f8",
              padding: 15,
              borderRadius: 10,
            }}
          >
            <Icon name="plus" color="black" size={20} />
            <Text style={{ marginHorizontal: 10, fontWeight: "bold" }}>1</Text>
            <Icon name="minus" color="black" size={20} />
          </View>

          <Pressable
            style={{ width: "45%" }}
            onPress={() => {
              addToCart(params?.productInfo);
              cartRef.current.open(OPEN_HEIGHT);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                // width: '45%',
                backgroundColor: "#1d212b",
                padding: 15,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  marginHorizontal: 10,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                $300
              </Text>

              <Text
                style={{
                  marginHorizontal: 10,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Add
              </Text>
            </View>
          </Pressable>
        </View>
        <SafeAreaView />
      </View>
      <Cart ref={cartRef} items={cartList} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: "#f9f9f9",
    paddingTop: 50,
  },
  center: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  weight: {
    color: "grey",
    fontSize: 17,
  },
  foodInfo: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  whiteColor: {
    color: "white",
  },
  backBtnWrapper: {
    position: "absolute",
    left: 0,
    top: 20,
    backgroundColor: "#e1e1e5",
    padding: 10,
    borderRadius: 5,
  },
});
