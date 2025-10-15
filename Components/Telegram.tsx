import React from "react";
import { View, Text, TouchableOpacity, Image, Linking, Alert } from "react-native";

const openTelegramGroup = () => {
  const telegramGroupUrl = "https://t.me/accenture_exam_discussion_groups"; // Replace with your actual Telegram group link

  Linking.canOpenURL(telegramGroupUrl)
    .then((supported) => {
      if (supported) {
        Linking.openURL(telegramGroupUrl);
      } else {
        Alert.alert("Error", "Can't open Telegram group.");
      }
    })
    .catch((err) => console.error("An error occurred", err));
};

const GuideButton = () => {
  return (
    <View className="flex items-center">
      
       <TouchableOpacity onPress={openTelegramGroup} className="container flex-row justify-between items-center p-3">
                 <View className="flex-row items-center gap-2">
                   <Image
                     className="w-10 h-8"
                     source={require("../assets/images/agent.png")}
                     resizeMode="contain"
                   />
                   <Text className="text-lg font-bold">Join Telegram Channel!</Text>
                 </View>
                 <View>
                   <Image
                     className="w-9 h-10"
                     source={require("../assets/images/next.png")}
                     resizeMode="contain"
                   />
                 </View>
               </TouchableOpacity>
     
    </View>
  );
};

export default GuideButton;
