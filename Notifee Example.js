import React, { useEffect } from "react";
import { View, Button, StyleSheet, Alert } from "react-native";
import notifee, { AndroidImportance, EventType } from "@notifee/react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  useEffect(() => {
    // Foreground listener for notification interactions
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (
        type === EventType.ACTION_PRESS &&
        detail.pressAction?.id === "reply"
      ) {
        Alert.alert("Reply Pressed", "You clicked on the reply action!");
      }
    });

    // Background listener for notification interactions
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (
        type === EventType.ACTION_PRESS &&
        detail.pressAction?.id === "reply"
      ) {
        sendNotification(
          "ExponentPushToken[HsJlf2FXa_p-Zlf9ljeE8N]",
          "Notifee In Action",
          "Demo Stuff"
        );
      }
    });

    return () => unsubscribe();
  }, []);

  const displayNotification = async () => {
    // Create a channel (required for Android)
    await notifee.createChannel({
      id: "notifee",
      name: "Default Channel",
      importance: AndroidImportance.HIGH,
    });

    // Display a notification with an action button
    await notifee.displayNotification({
      title: "Interactive Notification",
      body: "Tap Reply to respond.",
      android: {
        channelId: "default",
        smallIcon: "ic_launcher", // Ensure you have a small icon in the native project
        actions: [
          {
            title: "Reply",
            pressAction: {
              id: "reply",
            },
          },
        ],
      },
      ios: {
        sound: "default",
        categoryId: "custom",
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Button
        title="Show Notification with Action"
        onPress={displayNotification}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});

async function sendNotification(expoPushToken, title, body) {
  if (!expoPushToken) {
    console.warn("No device token provided for notification");
    return;
  }

  const message = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: body,
    channelId: "default",
    priority: "high",
    categoryId: "MESSAGE_CATEGORY",
  };

  try {
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const responseData = await response.json();
    console.log("Notification sent:", responseData);
    return responseData;
  } catch (error) {
    console.error("Failed to send notification:", error);
    return null;
  }
}
