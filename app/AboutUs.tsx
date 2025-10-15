import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import StstusBar  from "@/Components/StstusBar";

const AboutUs = () => {
  return (
    <View>
      <StstusBar />
      <Image
        className="w-full h-40 mt-10"
        source={require("../assets/images/about.webp")}
        resizeMode="contain"
      />

      <View className="mx-4 my-4">
        <Link href="/Privacy">
          <View className="container flex-row justify-between items-center p-3 bg-white rounded-xl">
            <View className="flex-row items-center gap-2">
              <Image
                className="w-10 h-9   `                                                                                                                               "
                source={require("../assets/images/app.png")}
                resizeMode="contain"
              />
              <Text className="text-lg font-bold">
                Confidentaility Agreement
              </Text>
            </View>
            <View>
              <Image
                className="w-9 h-10"
                source={require("../assets/images/next.png")}
                resizeMode="contain"
              />
            </View>
          </View>
        </Link>
      </View>

      <View className="mx-4">
        <Link href="/Privacy">
          <View className="container flex-row justify-between items-center p-3 bg-white rounded-xl">
            <View className="flex-row items-center gap-2">
              <Image
                className="w-10 h-8"
                source={require("../assets/images/videos.png")}
                resizeMode="contain"
              />
              <Text className="text-lg font-bold">
                Risk Disclosure Agreement
              </Text>
            </View>
            <View>
              <Image
                className="w-9 h-10"
                source={require("../assets/images/next.png")}
                resizeMode="contain"
              />
            </View>
          </View>
        </Link>
      </View>
    </View>
  );
};

export default AboutUs;
