import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";

const UpdatePasswordScreen = () => {
  const params = useLocalSearchParams(); // Get the passed parameters
  const [number, setNumber] = useState(
    Array.isArray(params.phoneNumber) ? params.phoneNumber[0] : params.phoneNumber ?? ""
  );
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

const router=useRouter();
  
  const handleUpdatePassword = async () => {
    if (!number || !otp || !newPassword) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch("http://192.154.230.43:3000/api/auth/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: number,
          otp: otp,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();
      setLoading(false); // Stop loading

      if (response.ok) {
        // Alert.alert("Success", "Password updated successfully!");
        router.push("/Login");
      } else {
        Alert.alert("Error", data.message || "Failed to update password");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Network error. Please try again.");
    }
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <ScrollView className="flex-1">
        {/* Green Header with Logo */}
        <View className="bg-[#4CAF50] pb-6">
          <View className="items-center pt-6">
            <Image className="w-32 h-12" source={require("../assets/images/headerlogo.png")} resizeMode="contain" />
          </View>
          <View className="mx-4 mt-5">
            <Text className="text-white text-lg font-extrabold">Update Password</Text>
            <Text className="text-white text-sm font-extrabold">Enter your details to reset password</Text>
          </View>
        </View>

        {/* Input Fields Section */}
        <View className="mx-4 mt-4">
          {/* Number Input */}
          <View className="flex-row items-center gap-2">
            <Image className="w-9 h-16" source={require("../assets/images/telephone.png")} resizeMode="contain" />
            <Text className="font-bold text-lg">Phone Number</Text>
          </View>
          <TextInput
            className="bg-white rounded-md p-3"
            value={number}
            onChangeText={setNumber}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            editable={false}
          />
        </View>

        {/* OTP Input */}
        <View className="mx-4 mt-4">
          <View className="flex-row items-center gap-2">
            <Image className="w-8 h-16" source={require("../assets/images/padlock.png")} resizeMode="contain" />
            <Text className="font-bold text-lg">OTP</Text>
          </View>
          <TextInput
            className="bg-white rounded-md p-3"
            value={otp}
            onChangeText={setOtp}
            placeholder="Enter OTP"
            keyboardType="numeric"
          />
        </View>

        {/* New Password Input */}
        <View className="mx-4 mt-4">
          <View className="flex-row items-center gap-2">
            <Image className="w-8 h-16" source={require("../assets/images/padlock.png")} resizeMode="contain" />
            <Text className="font-bold text-lg">New Password</Text>
          </View>
          <View className="relative">
            <TextInput
              className="bg-white rounded-md p-3"
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">
              <Image className="w-7 h-7" source={showPassword ? require("../assets/images/eye-hide.png") : require("../assets/images/eye.png")} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Update Button */}
        <View className="mx-4 my-7">
          <TouchableOpacity
            onPress={handleUpdatePassword}
            className="w-full items-center bg-green-600 p-3 rounded-full"
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-xl font-bold">Update Password</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default UpdatePasswordScreen;
