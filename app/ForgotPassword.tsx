import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";


const ResetPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    if (!phoneNumber) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://192.154.230.43:3000/api/auth/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      // Alert.alert("Success", "OTP sent successfully!");

      // Navigate to OTP verification screen
      // router.push("/UpdatePass", params:phoneNumber);
      router.push(`/UpdatePass?phoneNumber=${phoneNumber}`);
    } catch (error) {
      Alert.alert("Error", error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="">
        <ScrollView className="">
          <View className="bg-[#4CAF50] py-4">
            <View className="items-center">
              <Image className="w-32 h-12" source={require("../assets/images/headerlogo.png")} resizeMode="contain" />
            </View>
            <View className="mx-4 my-7">
              <Text className="text-white text-lg font-extrabold">Reset Password</Text>
              <Text className="text-white text-sm font-extrabold">Enter your phone number to continue</Text>
            </View>
          </View>

          <View className="mx-4 mt-4">
            <View className="flex-row items-center">
              <Image className="w-9 h-16" source={require("../assets/images/telephone.png")} resizeMode="contain" />
              <Text className="font-bold text-lg">Phone number</Text>
            </View>
            <TextInput
              className="bg-white rounded-md p-3"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View className="mx-4 my-7">
            <TouchableOpacity
              onPress={handleContinue}
              className={`w-full items-center ${loading ? "bg-gray-400" : "bg-green-600"} p-3 rounded-full`}
              disabled={loading}
            >
              <Text className="text-white text-xl font-bold">{loading ? "Processing..." : "Continue"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ResetPassword;
